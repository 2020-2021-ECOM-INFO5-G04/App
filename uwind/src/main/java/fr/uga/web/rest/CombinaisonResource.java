package fr.uga.web.rest;

import fr.uga.domain.Combinaison;
import fr.uga.repository.CombinaisonRepository;
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
 * REST controller for managing {@link fr.uga.domain.Combinaison}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CombinaisonResource {

    private final Logger log = LoggerFactory.getLogger(CombinaisonResource.class);

    private static final String ENTITY_NAME = "combinaison";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CombinaisonRepository combinaisonRepository;

    public CombinaisonResource(CombinaisonRepository combinaisonRepository) {
        this.combinaisonRepository = combinaisonRepository;
    }

    /**
     * {@code POST  /combinaisons} : Create a new combinaison.
     *
     * @param combinaison the combinaison to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new combinaison, or with status {@code 400 (Bad Request)} if the combinaison has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/combinaisons")
    public ResponseEntity<Combinaison> createCombinaison(@Valid @RequestBody Combinaison combinaison) throws URISyntaxException {
        log.debug("REST request to save Combinaison : {}", combinaison);
        if (combinaison.getId() != null) {
            throw new BadRequestAlertException("A new combinaison cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Combinaison result = combinaisonRepository.save(combinaison);
        return ResponseEntity.created(new URI("/api/combinaisons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /combinaisons} : Updates an existing combinaison.
     *
     * @param combinaison the combinaison to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated combinaison,
     * or with status {@code 400 (Bad Request)} if the combinaison is not valid,
     * or with status {@code 500 (Internal Server Error)} if the combinaison couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/combinaisons")
    public ResponseEntity<Combinaison> updateCombinaison(@Valid @RequestBody Combinaison combinaison) throws URISyntaxException {
        log.debug("REST request to update Combinaison : {}", combinaison);
        if (combinaison.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Combinaison result = combinaisonRepository.save(combinaison);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, combinaison.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /combinaisons} : get all the combinaisons.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of combinaisons in body.
     */
    @GetMapping("/combinaisons")
    public List<Combinaison> getAllCombinaisons() {
        log.debug("REST request to get all Combinaisons");
        return combinaisonRepository.findAll();
    }

    /**
     * {@code GET  /combinaisons/:id} : get the "id" combinaison.
     *
     * @param id the id of the combinaison to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the combinaison, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/combinaisons/{id}")
    public ResponseEntity<Combinaison> getCombinaison(@PathVariable Long id) {
        log.debug("REST request to get Combinaison : {}", id);
        Optional<Combinaison> combinaison = combinaisonRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(combinaison);
    }

    /**
     * {@code DELETE  /combinaisons/:id} : delete the "id" combinaison.
     *
     * @param id the id of the combinaison to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/combinaisons/{id}")
    public ResponseEntity<Void> deleteCombinaison(@PathVariable Long id) {
        log.debug("REST request to delete Combinaison : {}", id);
        combinaisonRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
