package fr.uga.web.rest;

import fr.uga.domain.Flotteur;
import fr.uga.repository.FlotteurRepository;
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
 * REST controller for managing {@link fr.uga.domain.Flotteur}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FlotteurResource {

    private final Logger log = LoggerFactory.getLogger(FlotteurResource.class);

    private static final String ENTITY_NAME = "flotteur";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FlotteurRepository flotteurRepository;

    public FlotteurResource(FlotteurRepository flotteurRepository) {
        this.flotteurRepository = flotteurRepository;
    }

    /**
     * {@code POST  /flotteurs} : Create a new flotteur.
     *
     * @param flotteur the flotteur to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new flotteur, or with status {@code 400 (Bad Request)} if the flotteur has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/flotteurs")
    public ResponseEntity<Flotteur> createFlotteur(@Valid @RequestBody Flotteur flotteur) throws URISyntaxException {
        log.debug("REST request to save Flotteur : {}", flotteur);
        if (flotteur.getId() != null) {
            throw new BadRequestAlertException("A new flotteur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Flotteur result = flotteurRepository.save(flotteur);
        return ResponseEntity.created(new URI("/api/flotteurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /flotteurs} : Updates an existing flotteur.
     *
     * @param flotteur the flotteur to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated flotteur,
     * or with status {@code 400 (Bad Request)} if the flotteur is not valid,
     * or with status {@code 500 (Internal Server Error)} if the flotteur couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/flotteurs")
    public ResponseEntity<Flotteur> updateFlotteur(@Valid @RequestBody Flotteur flotteur) throws URISyntaxException {
        log.debug("REST request to update Flotteur : {}", flotteur);
        if (flotteur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Flotteur result = flotteurRepository.save(flotteur);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, flotteur.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /flotteurs} : get all the flotteurs.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of flotteurs in body.
     */
    @GetMapping("/flotteurs")
    public List<Flotteur> getAllFlotteurs() {
        log.debug("REST request to get all Flotteurs");
        return flotteurRepository.findAll();
    }

    /**
     * {@code GET  /flotteurs/:id} : get the "id" flotteur.
     *
     * @param id the id of the flotteur to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the flotteur, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/flotteurs/{id}")
    public ResponseEntity<Flotteur> getFlotteur(@PathVariable Long id) {
        log.debug("REST request to get Flotteur : {}", id);
        Optional<Flotteur> flotteur = flotteurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(flotteur);
    }

    /**
     * {@code DELETE  /flotteurs/:id} : delete the "id" flotteur.
     *
     * @param id the id of the flotteur to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/flotteurs/{id}")
    public ResponseEntity<Void> deleteFlotteur(@PathVariable Long id) {
        log.debug("REST request to delete Flotteur : {}", id);
        flotteurRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
