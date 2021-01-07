package fr.uga.web.rest;

import fr.uga.domain.Prix;
import fr.uga.repository.PrixRepository;
import fr.uga.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link fr.uga.domain.Prix}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PrixResource {

    private final Logger log = LoggerFactory.getLogger(PrixResource.class);

    private static final String ENTITY_NAME = "prix";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PrixRepository prixRepository;

    public PrixResource(PrixRepository prixRepository) {
        this.prixRepository = prixRepository;
    }

    /**
     * {@code POST  /prixes} : Create a new prix.
     *
     * @param prix the prix to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new prix, or with status {@code 400 (Bad Request)} if the prix has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prixes")
    public ResponseEntity<Prix> createPrix(@Valid @RequestBody Prix prix) throws URISyntaxException {
        log.debug("REST request to save Prix : {}", prix);
        if (prix.getId() != null) {
            throw new BadRequestAlertException("A new prix cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Prix result = prixRepository.save(prix);
        return ResponseEntity.created(new URI("/api/prixes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prixes} : Updates an existing prix.
     *
     * @param prix the prix to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prix,
     * or with status {@code 400 (Bad Request)} if the prix is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prix couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prixes")
    public ResponseEntity<Prix> updatePrix(@Valid @RequestBody Prix prix) throws URISyntaxException {
        log.debug("REST request to update Prix : {}", prix);
        if (prix.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Prix result = prixRepository.save(prix);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prix.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prixes/activate} : Updates an existing prix.
     *
     * @param prix the prix to activate. There can be only one active price rule.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the activated prix,
     * or with status {@code 400 (Bad Request)} if the prix is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prix couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prixes/activate")
    public ResponseEntity<Prix> activatePrix(@Valid @RequestBody Prix prix) throws URISyntaxException {
        log.debug("REST request to activate Prix : {}", prix);
        if (prix.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        //Deactivate all rules
        prixRepository.findAll().forEach((prixElem) -> {
            prixElem.setActive(false);
        });
        //And activate only the interesting one
        prix.setActive(true);

        Prix result = prixRepository.save(prix);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prix.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /prixes} : get all the prixes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prixes in body.
     */
    @GetMapping("/prixes")
    public List<Prix> getAllPrixes() {
        log.debug("REST request to get all Prixes");
        return prixRepository.findAll();
    }

    /**
     * {@code GET  /prixes/:id} : get the "id" prix.
     *
     * @param id the id of the prix to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the prix, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prixes/{id}")
    public ResponseEntity<Prix> getPrix(@PathVariable Long id) {
        log.debug("REST request to get Prix : {}", id);
        Optional<Prix> prix = prixRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(prix);
    }

    /**
     * {@code DELETE  /prixes/:id} : delete the "id" prix.
     *
     * @param id the id of the prix to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prixes/{id}")
    public ResponseEntity<Void> deletePrix(@PathVariable Long id) {
        log.debug("REST request to delete Prix : {}", id);
        prixRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
