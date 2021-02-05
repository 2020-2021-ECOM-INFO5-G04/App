package fr.uga.web.rest;

import fr.uga.domain.Etudiant;
import fr.uga.domain.InscriptionSortie;
import fr.uga.domain.Profil;
import fr.uga.domain.Sortie;
import fr.uga.repository.InscriptionSortieRepository;
import fr.uga.repository.SortieRepository;
import fr.uga.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.supercsv.io.CsvBeanWriter;
import org.supercsv.io.CsvListWriter;
import org.supercsv.io.ICsvBeanWriter;
import org.supercsv.io.ICsvListWriter;
import org.supercsv.prefs.CsvPreference;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.uga.domain.Sortie}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SortieResource {

    private final Logger log = LoggerFactory.getLogger(SortieResource.class);

    private static final String ENTITY_NAME = "sortie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SortieRepository sortieRepository;

    private final InscriptionSortieRepository inscriptionSortieRepository;

    public SortieResource(SortieRepository sortieRepository, InscriptionSortieRepository inscriptionSortieRepository) {
        this.sortieRepository = sortieRepository;
        this.inscriptionSortieRepository = inscriptionSortieRepository;
    }

    /**
     * {@code POST  /sorties} : Create a new sortie.
     *
     * @param sortie the sortie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sortie, or with status {@code 400 (Bad Request)} if the sortie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sorties")
    public ResponseEntity<Sortie> createSortie(@Valid @RequestBody Sortie sortie) throws URISyntaxException {
        log.debug("REST request to save Sortie : {}", sortie);
        if (sortie.getId() != null) {
            throw new BadRequestAlertException("A new sortie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Sortie result = sortieRepository.save(sortie);
        return ResponseEntity.created(new URI("/api/sorties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sorties} : Updates an existing sortie.
     *
     * @param sortie the sortie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sortie,
     * or with status {@code 400 (Bad Request)} if the sortie is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sortie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sorties")
    public ResponseEntity<Sortie> updateSortie(@Valid @RequestBody Sortie sortie) throws URISyntaxException {
        log.debug("REST request to update Sortie : {}", sortie);
        if (sortie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Sortie result = sortieRepository.save(sortie);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sortie.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sorties} : get all the sorties.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sorties in body.
     */
    @GetMapping("/sorties")
    public List<Sortie> getAllSorties() {
        log.debug("REST request to get all Sorties");
        return sortieRepository.findAll();
    }

    /**
     * {@code GET  /sorties/:id} : get the "id" sortie.
     *
     * @param id the id of the sortie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sortie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sorties/{id}")
    public ResponseEntity<Sortie> getSortie(@PathVariable Long id) {
        log.debug("REST request to get Sortie : {}", id);
        Optional<Sortie> sortie = sortieRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sortie);
    }

    /**
     * {@code DELETE  /sorties/:id} : delete the "id" sortie.
     *
     * @param id the id of the sortie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sorties/{id}")
    public ResponseEntity<Void> deleteSortie(@PathVariable Long id) {
        log.debug("REST request to delete Sortie : {}", id);
        sortieRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }


    @GetMapping("/sorties/export/{id}")
    public void export(HttpServletResponse response, @PathVariable Long id) throws IOException {
        response.setContentType("text/csv");
        DateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd_HH-mm-ss");
        String currentDateTime = dateFormatter.format(new Date());
         
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=etudiants_" + currentDateTime + ".csv";
        response.setHeader(headerKey, headerValue);
         
        List<InscriptionSortie> listInscriptions = inscriptionSortieRepository.findAll();
        List<Etudiant> listEtudiants= new ArrayList<Etudiant>();

        for(int i = 0 ; i < listInscriptions.size(); i++){
            if(sortieRepository.findById(id).isPresent()){
                if(sortieRepository.findById(id).get().getId().equals(listInscriptions.get(i).getSortie().getId())){
                    listEtudiants.add(listInscriptions.get(i).getEtudiant());
                }
            }
        }
        ICsvListWriter listWriter= new CsvListWriter(response.getWriter(), CsvPreference.STANDARD_PREFERENCE);
        String[] csvHeader = {"ID","Nom", "Prenom", "Email", "Num tel" , "Niveau Scolaire", "Departement", "Niveau Planche", "Permis de Conduire", "Lieu Depart", "Option Semestre", "Flotteur", "Voile", "Combinaison", "Gestionnaire"};

        listWriter.writeHeader(csvHeader);

        List<Object> elem;
        Profil profil;

        for (Etudiant etudiant : listEtudiants) {
            profil = etudiant.getProfil();
            elem = Arrays.asList(
                etudiant.getId(),
                profil.getNom(),
                profil.getPrenom(),
                profil.getEmail(),
                profil.getNumTel(),
                etudiant.getNiveauScolaire(),
                etudiant.getDepartement(),
                etudiant.getNiveauPlanche(),
                etudiant.isPermisDeConduire(),
                etudiant.getLieuDepart(),
                etudiant.isOptionSemestre(),
                etudiant.getFlotteur(),
                etudiant.getVoile(),
                etudiant.getCombinaison(),
                etudiant.getGestionnaire()
            );
            listWriter.write(elem);
        }
        if(listEtudiants.isEmpty()){
            elem = Arrays.asList("liste vide");
            listWriter.write(elem);
        }
        listWriter.close(); 
        
    }
}
