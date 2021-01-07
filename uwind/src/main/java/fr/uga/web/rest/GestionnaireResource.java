package fr.uga.web.rest;

import fr.uga.domain.Gestionnaire;
import fr.uga.domain.InscriptionSortie;
import fr.uga.domain.Sortie;
import fr.uga.domain.Observation;
import fr.uga.domain.Evaluation;
import fr.uga.repository.GestionnaireRepository;
import fr.uga.repository.InscriptionSortieRepository;
import fr.uga.repository.SortieRepository;
import fr.uga.repository.EvaluationRepository;
import fr.uga.repository.ObservationRepository;
import fr.uga.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Example;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.uga.domain.Gestionnaire}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GestionnaireResource {

    private final Logger log = LoggerFactory.getLogger(GestionnaireResource.class);

    private static final String ENTITY_NAME = "gestionnaire";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GestionnaireRepository gestionnaireRepository;

    private final InscriptionSortieRepository inscriptionSortiesRepository;

    private final SortieRepository sortieRepository;

    private final ObservationRepository observationRepository;

    private final EvaluationRepository evaluationRepository;

    public GestionnaireResource(GestionnaireRepository gestionnaireRepository, InscriptionSortieRepository inscriptionSortiesRepository,
    SortieRepository sortieRepository, ObservationRepository observationRepository, EvaluationRepository evaluationRepository) {
        this.gestionnaireRepository = gestionnaireRepository;
        this.inscriptionSortiesRepository = inscriptionSortiesRepository;
        this.sortieRepository = sortieRepository;
        this.observationRepository = observationRepository;
        this.evaluationRepository = evaluationRepository;
    }

    /**
     * {@code POST  /gestionnaires} : Create a new gestionnaire.
     *
     * @param gestionnaire the gestionnaire to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new gestionnaire, or with status {@code 400 (Bad Request)} if the gestionnaire has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/gestionnaires")
    public ResponseEntity<Gestionnaire> createGestionnaire(@RequestBody Gestionnaire gestionnaire) throws URISyntaxException {
        log.debug("REST request to save Gestionnaire : {}", gestionnaire);
        if (gestionnaire.getId() != null) {
            throw new BadRequestAlertException("A new gestionnaire cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Gestionnaire result = gestionnaireRepository.save(gestionnaire);
        return ResponseEntity.created(new URI("/api/gestionnaires/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /gestionnaires} : Updates an existing gestionnaire.
     *
     * @param gestionnaire the gestionnaire to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated gestionnaire,
     * or with status {@code 400 (Bad Request)} if the gestionnaire is not valid,
     * or with status {@code 500 (Internal Server Error)} if the gestionnaire couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/gestionnaires")
    public ResponseEntity<Gestionnaire> updateGestionnaire(@RequestBody Gestionnaire gestionnaire) throws URISyntaxException {
        log.debug("REST request to update Gestionnaire : {}", gestionnaire);
        if (gestionnaire.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Gestionnaire result = gestionnaireRepository.save(gestionnaire);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, gestionnaire.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /gestionnaires} : get all the gestionnaires.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of gestionnaires in body.
     */
    @GetMapping("/gestionnaires")
    public List<Gestionnaire> getAllGestionnaires() {
        log.debug("REST request to get all Gestionnaires");
        return gestionnaireRepository.findAll();
    }

    /**
     * {@code GET  /gestionnaires/:id} : get the "id" gestionnaire.
     *
     * @param id the id of the gestionnaire to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the gestionnaire, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/gestionnaires/{id}")
    public ResponseEntity<Gestionnaire> getGestionnaire(@PathVariable Long id) {
        log.debug("REST request to get Gestionnaire : {}", id);
        Optional<Gestionnaire> gestionnaire = gestionnaireRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(gestionnaire);
    }

    /**
     * {@code DELETE  /gestionnaires/:id} : delete the "id" gestionnaire.
     *
     * @param id the id of the gestionnaire to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/gestionnaires/{id}")
    public ResponseEntity<Void> deleteGestionnaire(@PathVariable Long id) {

        Optional<Gestionnaire> optGestionnaire = gestionnaireRepository.findById(id);
        if(optGestionnaire.isPresent()){
            Gestionnaire gestionnaire = optGestionnaire.get();

            InscriptionSortie insc = new InscriptionSortie();
            insc.setGestionnaire(gestionnaire);
            Example<InscriptionSortie> exampleInsc = Example.of(insc);
            inscriptionSortiesRepository.findAll(exampleInsc).forEach((inscElem) -> {
                inscriptionSortiesRepository.delete(inscElem);
            });

            Sortie sortie = new Sortie();
            sortie.setGestionnaire(gestionnaire);
            Example<Sortie> exampleSortie = Example.of(sortie);
            sortieRepository.findAll(exampleSortie).forEach((sortieElem) -> {
                sortieRepository.delete(sortieElem);
            });

            Observation obs = new Observation();
            obs.setGestionnaire(gestionnaire);
            Example<Observation> exampleObs = Example.of(obs);
            observationRepository.findAll(exampleObs).forEach((obsElem) -> {
                observationRepository.delete(obsElem);
            });

            Evaluation eval = new Evaluation();
            eval.setGestionnaire(gestionnaire);
            Example<Evaluation> exampleEval = Example.of(eval);
            evaluationRepository.findAll(exampleEval).forEach((evalElem) -> {
                evaluationRepository.delete(evalElem);
            });
        }
        log.debug("REST request to delete Gestionnaire : {}", id);
        gestionnaireRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
