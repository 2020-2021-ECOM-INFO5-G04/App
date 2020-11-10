package fr.uga.web.rest;

import fr.uga.domain.Voile;
import fr.uga.repository.VoileRepository;
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
 * REST controller for managing {@link fr.uga.domain.Voile}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VoileResource {

    private final Logger log = LoggerFactory.getLogger(VoileResource.class);

    private static final String ENTITY_NAME = "voile";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VoileRepository voileRepository;

    public VoileResource(VoileRepository voileRepository) {
        this.voileRepository = voileRepository;
    }

    /**
     * {@code POST  /voiles} : Create a new voile.
     *
     * @param voile the voile to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new voile, or with status {@code 400 (Bad Request)} if the voile has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/voiles")
    public ResponseEntity<Voile> createVoile(@Valid @RequestBody Voile voile) throws URISyntaxException {
        log.debug("REST request to save Voile : {}", voile);
        if (voile.getId() != null) {
            throw new BadRequestAlertException("A new voile cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Voile result = voileRepository.save(voile);
        return ResponseEntity.created(new URI("/api/voiles/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /voiles} : Updates an existing voile.
     *
     * @param voile the voile to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated voile,
     * or with status {@code 400 (Bad Request)} if the voile is not valid,
     * or with status {@code 500 (Internal Server Error)} if the voile couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/voiles")
    public ResponseEntity<Voile> updateVoile(@Valid @RequestBody Voile voile) throws URISyntaxException {
        log.debug("REST request to update Voile : {}", voile);
        if (voile.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Voile result = voileRepository.save(voile);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, voile.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /voiles} : get all the voiles.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of voiles in body.
     */
    @GetMapping("/voiles")
    public List<Voile> getAllVoiles() {
        log.debug("REST request to get all Voiles");
        return voileRepository.findAll();
    }

    /**
     * {@code GET  /voiles/:id} : get the "id" voile.
     *
     * @param id the id of the voile to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the voile, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/voiles/{id}")
    public ResponseEntity<Voile> getVoile(@PathVariable Long id) {
        log.debug("REST request to get Voile : {}", id);
        Optional<Voile> voile = voileRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(voile);
    }

    /**
     * {@code DELETE  /voiles/:id} : delete the "id" voile.
     *
     * @param id the id of the voile to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/voiles/{id}")
    public ResponseEntity<Void> deleteVoile(@PathVariable Long id) {
        log.debug("REST request to delete Voile : {}", id);
        voileRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
