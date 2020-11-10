package fr.uga.web.rest;

import fr.uga.UwindApp;
import fr.uga.domain.InscriptionSortie;
import fr.uga.repository.InscriptionSortieRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link InscriptionSortieResource} REST controller.
 */
@SpringBootTest(classes = UwindApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class InscriptionSortieResourceIT {

    @Autowired
    private InscriptionSortieRepository inscriptionSortieRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInscriptionSortieMockMvc;

    private InscriptionSortie inscriptionSortie;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InscriptionSortie createEntity(EntityManager em) {
        InscriptionSortie inscriptionSortie = new InscriptionSortie();
        return inscriptionSortie;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static InscriptionSortie createUpdatedEntity(EntityManager em) {
        InscriptionSortie inscriptionSortie = new InscriptionSortie();
        return inscriptionSortie;
    }

    @BeforeEach
    public void initTest() {
        inscriptionSortie = createEntity(em);
    }

    @Test
    @Transactional
    public void createInscriptionSortie() throws Exception {
        int databaseSizeBeforeCreate = inscriptionSortieRepository.findAll().size();
        // Create the InscriptionSortie
        restInscriptionSortieMockMvc.perform(post("/api/inscription-sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inscriptionSortie)))
            .andExpect(status().isCreated());

        // Validate the InscriptionSortie in the database
        List<InscriptionSortie> inscriptionSortieList = inscriptionSortieRepository.findAll();
        assertThat(inscriptionSortieList).hasSize(databaseSizeBeforeCreate + 1);
        InscriptionSortie testInscriptionSortie = inscriptionSortieList.get(inscriptionSortieList.size() - 1);
    }

    @Test
    @Transactional
    public void createInscriptionSortieWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = inscriptionSortieRepository.findAll().size();

        // Create the InscriptionSortie with an existing ID
        inscriptionSortie.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInscriptionSortieMockMvc.perform(post("/api/inscription-sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inscriptionSortie)))
            .andExpect(status().isBadRequest());

        // Validate the InscriptionSortie in the database
        List<InscriptionSortie> inscriptionSortieList = inscriptionSortieRepository.findAll();
        assertThat(inscriptionSortieList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInscriptionSorties() throws Exception {
        // Initialize the database
        inscriptionSortieRepository.saveAndFlush(inscriptionSortie);

        // Get all the inscriptionSortieList
        restInscriptionSortieMockMvc.perform(get("/api/inscription-sorties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(inscriptionSortie.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getInscriptionSortie() throws Exception {
        // Initialize the database
        inscriptionSortieRepository.saveAndFlush(inscriptionSortie);

        // Get the inscriptionSortie
        restInscriptionSortieMockMvc.perform(get("/api/inscription-sorties/{id}", inscriptionSortie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(inscriptionSortie.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingInscriptionSortie() throws Exception {
        // Get the inscriptionSortie
        restInscriptionSortieMockMvc.perform(get("/api/inscription-sorties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInscriptionSortie() throws Exception {
        // Initialize the database
        inscriptionSortieRepository.saveAndFlush(inscriptionSortie);

        int databaseSizeBeforeUpdate = inscriptionSortieRepository.findAll().size();

        // Update the inscriptionSortie
        InscriptionSortie updatedInscriptionSortie = inscriptionSortieRepository.findById(inscriptionSortie.getId()).get();
        // Disconnect from session so that the updates on updatedInscriptionSortie are not directly saved in db
        em.detach(updatedInscriptionSortie);

        restInscriptionSortieMockMvc.perform(put("/api/inscription-sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInscriptionSortie)))
            .andExpect(status().isOk());

        // Validate the InscriptionSortie in the database
        List<InscriptionSortie> inscriptionSortieList = inscriptionSortieRepository.findAll();
        assertThat(inscriptionSortieList).hasSize(databaseSizeBeforeUpdate);
        InscriptionSortie testInscriptionSortie = inscriptionSortieList.get(inscriptionSortieList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingInscriptionSortie() throws Exception {
        int databaseSizeBeforeUpdate = inscriptionSortieRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInscriptionSortieMockMvc.perform(put("/api/inscription-sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(inscriptionSortie)))
            .andExpect(status().isBadRequest());

        // Validate the InscriptionSortie in the database
        List<InscriptionSortie> inscriptionSortieList = inscriptionSortieRepository.findAll();
        assertThat(inscriptionSortieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInscriptionSortie() throws Exception {
        // Initialize the database
        inscriptionSortieRepository.saveAndFlush(inscriptionSortie);

        int databaseSizeBeforeDelete = inscriptionSortieRepository.findAll().size();

        // Delete the inscriptionSortie
        restInscriptionSortieMockMvc.perform(delete("/api/inscription-sorties/{id}", inscriptionSortie.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<InscriptionSortie> inscriptionSortieList = inscriptionSortieRepository.findAll();
        assertThat(inscriptionSortieList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
