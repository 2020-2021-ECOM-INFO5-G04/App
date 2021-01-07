package fr.uga.web.rest;

import fr.uga.domain.Etudiant;
import fr.uga.domain.InscriptionSortie;
import fr.uga.domain.Observation;
import fr.uga.domain.Evaluation;
import fr.uga.repository.EtudiantRepository;
import fr.uga.repository.InscriptionSortieRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.prefs.CsvPreference;
import org.springframework.core.io.Resource;

/**
 * REST controller for managing {@link fr.uga.domain.Etudiant}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EtudiantResource {

    private final Logger log = LoggerFactory.getLogger(EtudiantResource.class);

    private static final String ENTITY_NAME = "etudiant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EtudiantRepository etudiantRepository;

    private final InscriptionSortieRepository inscriptionSortiesRepository;

    private final ObservationRepository observationRepository;

    private final EvaluationRepository evaluationRepository;

    public EtudiantResource(EtudiantRepository etudiantRepository, InscriptionSortieRepository inscriptionSortiesRepository,
    ObservationRepository observationRepository, EvaluationRepository evaluationRepository) {
        this.etudiantRepository = etudiantRepository;
        this.inscriptionSortiesRepository = inscriptionSortiesRepository;
        this.observationRepository = observationRepository;
        this.evaluationRepository = evaluationRepository;
    }

    /**
     * {@code POST  /etudiants} : Create a new etudiant.
     *
     * @param etudiant the etudiant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new etudiant, or with status {@code 400 (Bad Request)} if the etudiant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/etudiants")
    public ResponseEntity<Etudiant> createEtudiant(@Valid @RequestBody Etudiant etudiant) throws URISyntaxException {
        log.debug("REST request to save Etudiant : {}", etudiant);
        if (etudiant.getId() != null) {
            throw new BadRequestAlertException("A new etudiant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Etudiant result = etudiantRepository.save(etudiant);
        return ResponseEntity.created(new URI("/api/etudiants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /etudiants} : Updates an existing etudiant.
     *
     * @param etudiant the etudiant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated etudiant,
     * or with status {@code 400 (Bad Request)} if the etudiant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the etudiant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/etudiants")
    public ResponseEntity<Etudiant> updateEtudiant(@Valid @RequestBody Etudiant etudiant) throws URISyntaxException {
        log.debug("REST request to update Etudiant : {}", etudiant);
        if (etudiant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Etudiant result = etudiantRepository.save(etudiant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, etudiant.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /etudiants} : get all the etudiants.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of etudiants in body.
     */
    @GetMapping("/etudiants")
    public List<Etudiant> getAllEtudiants() {
        log.debug("REST request to get all Etudiants");
        return etudiantRepository.findAll();
    }

    /**
     * {@code GET  /etudiants/:id} : get the "id" etudiant.
     *
     * @param id the id of the etudiant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the etudiant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/etudiants/{id}")
    public ResponseEntity<Etudiant> getEtudiant(@PathVariable Long id) {
        log.debug("REST request to get Etudiant : {}", id);
        Optional<Etudiant> etudiant = etudiantRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(etudiant);
    }

    /**
     * {@code DELETE  /etudiants/:id} : delete the "id" etudiant.
     *
     * @param id the id of the etudiant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/etudiants/{id}")
    public ResponseEntity<Void> deleteEtudiant(@PathVariable Long id) {
        Optional<Etudiant> optEtudiant = etudiantRepository.findById(id);
        if(optEtudiant.isPresent()){
            Etudiant etudiant = optEtudiant.get();

            InscriptionSortie insc = new InscriptionSortie();
            insc.setEtudiant(etudiant);
            Example<InscriptionSortie> exampleInsc = Example.of(insc);
            inscriptionSortiesRepository.findAll(exampleInsc).forEach((inscElem) -> {
                inscriptionSortiesRepository.delete(inscElem);
            });

            Observation obs = new Observation();
            obs.setEtudiant(etudiant);
            Example<Observation> exampleObs = Example.of(obs);
            observationRepository.findAll(exampleObs).forEach((obsElem) -> {
                observationRepository.delete(obsElem);
            });

            Evaluation eval = new Evaluation();
            eval.setEtudiant(etudiant);
            Example<Evaluation> exampleEval = Example.of(eval);
            evaluationRepository.findAll(exampleEval).forEach((evalElem) -> {
                evaluationRepository.delete(evalElem);
            });
        }
        log.debug("REST request to delete Etudiant : {}", id);
        etudiantRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
    

    
    @GetMapping("/etudiants/export")
    public void export(HttpServletResponse response) throws IOException {
        response.setContentType("text/csv");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormatter.format(new Date());
         
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=etudiants_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);
         
        List<Etudiant> listEtudiants = etudiantRepository.findAll();
 
        ICsvBeanWriter csvWriter = new CsvBeanWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = {"ID", "Niveau Scolaire", "Departement", "Niveau Planche", "Permis de Conduire", "Lieu Depart", "Option Semestre", "Compte Valide", "Profil", "Flotteur", "Voile", "Combinaison", "Gestionnaire"};
        String[] nameMapping = {"id", "niveauScolaire", "departement", "niveauPlanche", "permisDeConduire", "lieuDepart", "optionSemestre", "compteValide", "profil", "flotteur", "voile", "combinaison", "Gestionnaire"};
         
        csvWriter.writeHeader(csvHeader);
         
        for (Etudiant etudiant : listEtudiants) {
            csvWriter.write(etudiant, nameMapping);
        }
         
        csvWriter.close();

         
    }
    
    
}
