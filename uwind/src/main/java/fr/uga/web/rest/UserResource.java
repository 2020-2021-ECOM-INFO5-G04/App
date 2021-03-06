package fr.uga.web.rest;

import fr.uga.config.Constants;
import fr.uga.domain.Etudiant;
import fr.uga.domain.Moniteur;
import fr.uga.domain.Gestionnaire;
import fr.uga.domain.Profil;
import fr.uga.domain.InscriptionSortie;
import fr.uga.domain.Sortie;
import fr.uga.domain.Observation;
import fr.uga.domain.Evaluation;
import fr.uga.domain.User;
import fr.uga.repository.ProfilRepository;
import fr.uga.repository.EtudiantRepository;
import fr.uga.repository.MoniteurRepository;
import fr.uga.repository.GestionnaireRepository;
import fr.uga.repository.InscriptionSortieRepository;
import fr.uga.repository.SortieRepository;
import fr.uga.repository.EvaluationRepository;
import fr.uga.repository.ObservationRepository;
import fr.uga.repository.UserRepository;
import fr.uga.security.AuthoritiesConstants;
import fr.uga.service.MailService;
import org.springframework.data.domain.Sort;
import java.util.Collections;
import fr.uga.service.UserService;
import fr.uga.service.dto.UserDTO;
import fr.uga.web.rest.errors.BadRequestAlertException;
import fr.uga.web.rest.errors.EmailAlreadyUsedException;
import fr.uga.web.rest.errors.LoginAlreadyUsedException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

/**
 * REST controller for managing users.
 * <p>
 * This class accesses the {@link User} entity, and needs to fetch its collection of authorities.
 * <p>
 * For a normal use-case, it would be better to have an eager relationship between User and Authority,
 * and send everything to the client side: there would be no View Model and DTO, a lot less code, and an outer-join
 * which would be good for performance.
 * <p>
 * We use a View Model and a DTO for 3 reasons:
 * <ul>
 * <li>We want to keep a lazy association between the user and the authorities, because people will
 * quite often do relationships with the user, and we don't want them to get the authorities all
 * the time for nothing (for performance reasons). This is the #1 goal: we should not impact our users'
 * application because of this use-case.</li>
 * <li> Not having an outer join causes n+1 requests to the database. This is not a real issue as
 * we have by default a second-level cache. This means on the first HTTP call we do the n+1 requests,
 * but then all authorities come from the cache, so in fact it's much better than doing an outer join
 * (which will get lots of data from the database, for each HTTP call).</li>
 * <li> As this manages users, for security reasons, we'd rather have a DTO layer.</li>
 * </ul>
 * <p>
 * Another option would be to have a specific JPA entity graph to handle this case.
 */
@RestController
@RequestMapping("/api")
public class UserResource {
    private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections.unmodifiableList(Arrays.asList("id", "login", "firstName", "lastName", "email", "activated", "langKey"));

    private final Logger log = LoggerFactory.getLogger(UserResource.class);

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserService userService;

    private final UserRepository userRepository;

    private final ProfilRepository profilRepository;

    private final EtudiantRepository etudiantRepository;

    private final MoniteurRepository moniteurRepository;

    private final GestionnaireRepository gestionnaireRepository;

    private final InscriptionSortieRepository inscriptionSortiesRepository;

    private final SortieRepository sortieRepository;

    private final ObservationRepository observationRepository;

    private final EvaluationRepository evaluationRepository;

    private final MailService mailService;

    public UserResource(UserService userService, UserRepository userRepository, MailService mailService,
    ProfilRepository profilRepository, EtudiantRepository etudiantRepository, MoniteurRepository moniteurRepository,
    GestionnaireRepository gestionnaireRepository, InscriptionSortieRepository inscriptionSortiesRepository, SortieRepository sortieRepository,
    ObservationRepository observationRepository, EvaluationRepository evaluationRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.mailService = mailService;
        this.profilRepository = profilRepository;
        this.etudiantRepository = etudiantRepository;
        this.moniteurRepository = moniteurRepository;
        this.gestionnaireRepository = gestionnaireRepository;
        this.inscriptionSortiesRepository = inscriptionSortiesRepository;
        this.sortieRepository = sortieRepository;
        this.observationRepository = observationRepository;
        this.evaluationRepository = evaluationRepository;
    }

    /**
     * {@code POST  /users}  : Creates a new user.
     * <p>
     * Creates a new user if the login and email are not already used, and sends an
     * mail with an activation link.
     * The user needs to be activated on creation.
     *
     * @param userDTO the user to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new user, or with status {@code 400 (Bad Request)} if the login or email is already in use.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     * @throws BadRequestAlertException {@code 400 (Bad Request)} if the login or email is already in use.
     */
    @PostMapping("/users")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) throws URISyntaxException {
        log.debug("REST request to save User : {}", userDTO);

        if (userDTO.getId() != null) {
            throw new BadRequestAlertException("A new user cannot already have an ID", "userManagement", "idexists");
            // Lowercase the user login before comparing with database
        } else if (userRepository.findOneByLogin(userDTO.getLogin().toLowerCase()).isPresent()) {
            throw new LoginAlreadyUsedException();
        } else if (userRepository.findOneByEmailIgnoreCase(userDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyUsedException();
        } else {
            User newUser = userService.createUser(userDTO);
            mailService.sendCreationEmail(newUser);
            return ResponseEntity.created(new URI("/api/users/" + newUser.getLogin()))
                .headers(HeaderUtil.createAlert(applicationName,  "userManagement.created", newUser.getLogin()))
                .body(newUser);
        }
    }

    /**
     * {@code PUT /users} : Updates an existing User.
     *
     * @param userDTO the user to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated user.
     * @throws EmailAlreadyUsedException {@code 400 (Bad Request)} if the email is already in use.
     * @throws LoginAlreadyUsedException {@code 400 (Bad Request)} if the login is already in use.
     */
    @PutMapping("/users")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<UserDTO> updateUser(@Valid @RequestBody UserDTO userDTO) {
        log.debug("REST request to update User : {}", userDTO);
        Optional<User> existingUser = userRepository.findOneByEmailIgnoreCase(userDTO.getEmail());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new EmailAlreadyUsedException();
        }
        existingUser = userRepository.findOneByLogin(userDTO.getLogin().toLowerCase());
        if (existingUser.isPresent() && (!existingUser.get().getId().equals(userDTO.getId()))) {
            throw new LoginAlreadyUsedException();
        }
        Optional<UserDTO> updatedUser = userService.updateUser(userDTO);

        return ResponseUtil.wrapOrNotFound(updatedUser,
            HeaderUtil.createAlert(applicationName, "userManagement.updated", userDTO.getLogin()));
    }

    /**
     * {@code GET /users} : get all users.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body all users.
     */
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers(Pageable pageable) {
        if (!onlyContainsAllowedProperties(pageable)) {
            return ResponseEntity.badRequest().build();
        }

        final Page<UserDTO> page = userService.getAllManagedUsers(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    private boolean onlyContainsAllowedProperties(Pageable pageable) {
        return pageable.getSort().stream().map(Sort.Order::getProperty).allMatch(ALLOWED_ORDERED_PROPERTIES::contains);
    }

    /**
     * Gets a list of all roles.
     * @return a string list of all roles.
     */
    @GetMapping("/users/authorities")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public List<String> getAuthorities() {
        return userService.getAuthorities();
    }

    /**
     * {@code GET /users/:login} : get the "login" user.
     *
     * @param login the login of the user to find.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the "login" user, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/users/{login:" + Constants.LOGIN_REGEX + "}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String login) {
        log.debug("REST request to get User : {}", login);
        return ResponseUtil.wrapOrNotFound(
            userService.getUserWithAuthoritiesByLogin(login)
                .map(UserDTO::new));
    }

    /**
     * {@code DELETE /users/:login} : delete the "login" User.
     *
     * @param login the login of the user to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/users/{login:" + Constants.LOGIN_REGEX + "}")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<Void> deleteUser(@PathVariable String login) {
        log.debug("REST request to delete User: {}", login);
        /* 
        We can't delete a user if there are dependencies to this user.
        It means we have to delete the corresponding profil and thus etudiant/moniteur/gestionnaire */
        Optional<User> optUser = userService.getUserWithAuthoritiesByLogin(login);
        if(optUser.isPresent()){
            User user = optUser.get();
            Profil profil = new Profil();
            profil.setUtilisateur(user);
            Example<Profil> exampleProfil = Example.of(profil);
            List<Profil> listProfil = profilRepository.findAll(exampleProfil);
            listProfil.forEach((profilElem) -> {
                //finding all dependences to this user and removing them

                //A student can be linked to InscriptionSortie, Observation or Evaluation
                Etudiant etudiant = new Etudiant();
                etudiant.setProfil(profilElem);
                Example<Etudiant> exampleEtudiant = Example.of(etudiant);
                etudiantRepository.findAll(exampleEtudiant).forEach((etudiantElem) -> {

                    InscriptionSortie insc = new InscriptionSortie();
                    insc.setEtudiant(etudiantElem);
                    Example<InscriptionSortie> exampleInsc = Example.of(insc);
                    inscriptionSortiesRepository.findAll(exampleInsc).forEach((inscElem) -> {
                        inscriptionSortiesRepository.delete(inscElem);
                    });

                    Observation obs = new Observation();
                    obs.setEtudiant(etudiantElem);
                    Example<Observation> exampleObs = Example.of(obs);
                    observationRepository.findAll(exampleObs).forEach((obsElem) -> {
                        observationRepository.delete(obsElem);
                    });

                    Evaluation eval = new Evaluation();
                    eval.setEtudiant(etudiantElem);
                    Example<Evaluation> exampleEval = Example.of(eval);
                    evaluationRepository.findAll(exampleEval).forEach((evalElem) -> {
                        evaluationRepository.delete(evalElem);
                    });

                    etudiantRepository.delete(etudiantElem); //deleting every possible etudiant linked to this profil (there should be only one)
                });

                //A moniteur can be linked to InscriptionSorti or Observation
                Moniteur moniteur = new Moniteur();
                moniteur.setProfil(profilElem);
                Example<Moniteur> exampleMoniteur = Example.of(moniteur);
                moniteurRepository.findAll(exampleMoniteur).forEach((moniteurElem) -> {

                    InscriptionSortie insc = new InscriptionSortie();
                    insc.setMoniteur(moniteurElem);
                    Example<InscriptionSortie> exampleInsc = Example.of(insc);
                    inscriptionSortiesRepository.findAll(exampleInsc).forEach((inscElem) -> {
                        inscriptionSortiesRepository.delete(inscElem);
                    });

                    Observation obs = new Observation();
                    obs.setMoniteur(moniteurElem);
                    Example<Observation> exampleObs = Example.of(obs);
                    observationRepository.findAll(exampleObs).forEach((obsElem) -> {
                        observationRepository.delete(obsElem);
                    });

                    moniteurRepository.delete(moniteurElem);
                });

                //A Gestonnaire an be linked to a Sortie, an InscriptonSortie, an Observation or an Evaluation
                Gestionnaire gestionnaire = new Gestionnaire();
                gestionnaire.setProfil(profilElem);
                Example<Gestionnaire> exampleGestionnaire = Example.of(gestionnaire);
                gestionnaireRepository.findAll(exampleGestionnaire).forEach((gestionnaireElem) -> {

                    InscriptionSortie insc = new InscriptionSortie();
                    insc.setGestionnaire(gestionnaireElem);
                    Example<InscriptionSortie> exampleInsc = Example.of(insc);
                    inscriptionSortiesRepository.findAll(exampleInsc).forEach((inscElem) -> {
                        inscriptionSortiesRepository.delete(inscElem);
                    });

                    Sortie sortie = new Sortie();
                    sortie.setGestionnaire(gestionnaireElem);
                    Example<Sortie> exampleSortie = Example.of(sortie);
                    sortieRepository.findAll(exampleSortie).forEach((sortieElem) -> {
                        sortieRepository.delete(sortieElem);
                    });

                    Observation obs = new Observation();
                    obs.setGestionnaire(gestionnaireElem);
                    Example<Observation> exampleObs = Example.of(obs);
                    observationRepository.findAll(exampleObs).forEach((obsElem) -> {
                        observationRepository.delete(obsElem);
                    });

                    Evaluation eval = new Evaluation();
                    eval.setGestionnaire(gestionnaireElem);
                    Example<Evaluation> exampleEval = Example.of(eval);
                    evaluationRepository.findAll(exampleEval).forEach((evalElem) -> {
                        evaluationRepository.delete(evalElem);
                    });

                    gestionnaireRepository.delete(gestionnaireElem);
                });

                profilRepository.delete(profilElem);
            });
        }
        userService.deleteUser(login);
        return ResponseEntity.noContent().headers(HeaderUtil.createAlert(applicationName,  "userManagement.deleted", login)).build();
    }
}
