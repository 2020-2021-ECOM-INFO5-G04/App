package fr.uga.web.rest;

import fr.uga.domain.InscriptionSortie;
import fr.uga.repository.InscriptionSortieRepository;
import fr.uga.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.uga.domain.InscriptionSortie}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InscriptionSortieResource {

    private final Logger log = LoggerFactory.getLogger(InscriptionSortieResource.class);

    private static final String ENTITY_NAME = "inscriptionSortie";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InscriptionSortieRepository inscriptionSortieRepository;

    public InscriptionSortieResource(InscriptionSortieRepository inscriptionSortieRepository) {
        this.inscriptionSortieRepository = inscriptionSortieRepository;
    }

    /**
     * {@code POST  /inscription-sorties} : Create a new inscriptionSortie.
     *
     * @param inscriptionSortie the inscriptionSortie to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new inscriptionSortie, or with status {@code 400 (Bad Request)} if the inscriptionSortie has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/inscription-sorties")
    public ResponseEntity<InscriptionSortie> createInscriptionSortie(@RequestBody InscriptionSortie inscriptionSortie) throws URISyntaxException {
        log.debug("REST request to save InscriptionSortie : {}", inscriptionSortie);
        if (inscriptionSortie.getId() != null) {
            throw new BadRequestAlertException("A new inscriptionSortie cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InscriptionSortie result = inscriptionSortieRepository.save(inscriptionSortie);
        return ResponseEntity.created(new URI("/api/inscription-sorties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /inscription-sorties} : Updates an existing inscriptionSortie.
     *
     * @param inscriptionSortie the inscriptionSortie to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated inscriptionSortie,
     * or with status {@code 400 (Bad Request)} if the inscriptionSortie is not valid,
     * or with status {@code 500 (Internal Server Error)} if the inscriptionSortie couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/inscription-sorties")
    public ResponseEntity<InscriptionSortie> updateInscriptionSortie(@RequestBody InscriptionSortie inscriptionSortie) throws URISyntaxException {
        log.debug("REST request to update InscriptionSortie : {}", inscriptionSortie);
        if (inscriptionSortie.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InscriptionSortie result = inscriptionSortieRepository.save(inscriptionSortie);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, inscriptionSortie.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /inscription-sorties} : get all the inscriptionSorties.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of inscriptionSorties in body.
     */
    @GetMapping("/inscription-sorties")
    public List<InscriptionSortie> getAllInscriptionSorties() {
        log.debug("REST request to get all InscriptionSorties");
        return inscriptionSortieRepository.findAll();
    }

    /**
     * {@code GET  /inscription-sorties/:id} : get the "id" inscriptionSortie.
     *
     * @param id the id of the inscriptionSortie to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the inscriptionSortie, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/inscription-sorties/{id}")
    public ResponseEntity<InscriptionSortie> getInscriptionSortie(@PathVariable Long id) {
        log.debug("REST request to get InscriptionSortie : {}", id);
        Optional<InscriptionSortie> inscriptionSortie = inscriptionSortieRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(inscriptionSortie);
    }

    /**
     * {@code DELETE  /inscription-sorties/:id} : delete the "id" inscriptionSortie.
     *
     * @param id the id of the inscriptionSortie to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/inscription-sorties/{id}")
    public ResponseEntity<Void> deleteInscriptionSortie(@PathVariable Long id) {
        log.debug("REST request to delete InscriptionSortie : {}", id);
        inscriptionSortieRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
