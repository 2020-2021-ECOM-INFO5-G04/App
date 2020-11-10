package fr.uga.web.rest;

import fr.uga.UwindApp;
import fr.uga.domain.Moniteur;
import fr.uga.repository.MoniteurRepository;

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
 * Integration tests for the {@link MoniteurResource} REST controller.
 */
@SpringBootTest(classes = UwindApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MoniteurResourceIT {

    @Autowired
    private MoniteurRepository moniteurRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMoniteurMockMvc;

    private Moniteur moniteur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Moniteur createEntity(EntityManager em) {
        Moniteur moniteur = new Moniteur();
        return moniteur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Moniteur createUpdatedEntity(EntityManager em) {
        Moniteur moniteur = new Moniteur();
        return moniteur;
    }

    @BeforeEach
    public void initTest() {
        moniteur = createEntity(em);
    }

    @Test
    @Transactional
    public void createMoniteur() throws Exception {
        int databaseSizeBeforeCreate = moniteurRepository.findAll().size();
        // Create the Moniteur
        restMoniteurMockMvc.perform(post("/api/moniteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(moniteur)))
            .andExpect(status().isCreated());

        // Validate the Moniteur in the database
        List<Moniteur> moniteurList = moniteurRepository.findAll();
        assertThat(moniteurList).hasSize(databaseSizeBeforeCreate + 1);
        Moniteur testMoniteur = moniteurList.get(moniteurList.size() - 1);
    }

    @Test
    @Transactional
    public void createMoniteurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = moniteurRepository.findAll().size();

        // Create the Moniteur with an existing ID
        moniteur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMoniteurMockMvc.perform(post("/api/moniteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(moniteur)))
            .andExpect(status().isBadRequest());

        // Validate the Moniteur in the database
        List<Moniteur> moniteurList = moniteurRepository.findAll();
        assertThat(moniteurList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMoniteurs() throws Exception {
        // Initialize the database
        moniteurRepository.saveAndFlush(moniteur);

        // Get all the moniteurList
        restMoniteurMockMvc.perform(get("/api/moniteurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(moniteur.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getMoniteur() throws Exception {
        // Initialize the database
        moniteurRepository.saveAndFlush(moniteur);

        // Get the moniteur
        restMoniteurMockMvc.perform(get("/api/moniteurs/{id}", moniteur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(moniteur.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingMoniteur() throws Exception {
        // Get the moniteur
        restMoniteurMockMvc.perform(get("/api/moniteurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMoniteur() throws Exception {
        // Initialize the database
        moniteurRepository.saveAndFlush(moniteur);

        int databaseSizeBeforeUpdate = moniteurRepository.findAll().size();

        // Update the moniteur
        Moniteur updatedMoniteur = moniteurRepository.findById(moniteur.getId()).get();
        // Disconnect from session so that the updates on updatedMoniteur are not directly saved in db
        em.detach(updatedMoniteur);

        restMoniteurMockMvc.perform(put("/api/moniteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMoniteur)))
            .andExpect(status().isOk());

        // Validate the Moniteur in the database
        List<Moniteur> moniteurList = moniteurRepository.findAll();
        assertThat(moniteurList).hasSize(databaseSizeBeforeUpdate);
        Moniteur testMoniteur = moniteurList.get(moniteurList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingMoniteur() throws Exception {
        int databaseSizeBeforeUpdate = moniteurRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMoniteurMockMvc.perform(put("/api/moniteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(moniteur)))
            .andExpect(status().isBadRequest());

        // Validate the Moniteur in the database
        List<Moniteur> moniteurList = moniteurRepository.findAll();
        assertThat(moniteurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMoniteur() throws Exception {
        // Initialize the database
        moniteurRepository.saveAndFlush(moniteur);

        int databaseSizeBeforeDelete = moniteurRepository.findAll().size();

        // Delete the moniteur
        restMoniteurMockMvc.perform(delete("/api/moniteurs/{id}", moniteur.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Moniteur> moniteurList = moniteurRepository.findAll();
        assertThat(moniteurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
