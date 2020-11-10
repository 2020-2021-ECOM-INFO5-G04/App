package fr.uga.web.rest;

import fr.uga.UwindApp;
import fr.uga.domain.Observation;
import fr.uga.repository.ObservationRepository;

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
 * Integration tests for the {@link ObservationResource} REST controller.
 */
@SpringBootTest(classes = UwindApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ObservationResourceIT {

    private static final String DEFAULT_OBSERVATION = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVATION = "BBBBBBBBBB";

    @Autowired
    private ObservationRepository observationRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restObservationMockMvc;

    private Observation observation;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Observation createEntity(EntityManager em) {
        Observation observation = new Observation()
            .observation(DEFAULT_OBSERVATION);
        return observation;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Observation createUpdatedEntity(EntityManager em) {
        Observation observation = new Observation()
            .observation(UPDATED_OBSERVATION);
        return observation;
    }

    @BeforeEach
    public void initTest() {
        observation = createEntity(em);
    }

    @Test
    @Transactional
    public void createObservation() throws Exception {
        int databaseSizeBeforeCreate = observationRepository.findAll().size();
        // Create the Observation
        restObservationMockMvc.perform(post("/api/observations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(observation)))
            .andExpect(status().isCreated());

        // Validate the Observation in the database
        List<Observation> observationList = observationRepository.findAll();
        assertThat(observationList).hasSize(databaseSizeBeforeCreate + 1);
        Observation testObservation = observationList.get(observationList.size() - 1);
        assertThat(testObservation.getObservation()).isEqualTo(DEFAULT_OBSERVATION);
    }

    @Test
    @Transactional
    public void createObservationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = observationRepository.findAll().size();

        // Create the Observation with an existing ID
        observation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restObservationMockMvc.perform(post("/api/observations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(observation)))
            .andExpect(status().isBadRequest());

        // Validate the Observation in the database
        List<Observation> observationList = observationRepository.findAll();
        assertThat(observationList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkObservationIsRequired() throws Exception {
        int databaseSizeBeforeTest = observationRepository.findAll().size();
        // set the field null
        observation.setObservation(null);

        // Create the Observation, which fails.


        restObservationMockMvc.perform(post("/api/observations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(observation)))
            .andExpect(status().isBadRequest());

        List<Observation> observationList = observationRepository.findAll();
        assertThat(observationList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllObservations() throws Exception {
        // Initialize the database
        observationRepository.saveAndFlush(observation);

        // Get all the observationList
        restObservationMockMvc.perform(get("/api/observations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(observation.getId().intValue())))
            .andExpect(jsonPath("$.[*].observation").value(hasItem(DEFAULT_OBSERVATION)));
    }
    
    @Test
    @Transactional
    public void getObservation() throws Exception {
        // Initialize the database
        observationRepository.saveAndFlush(observation);

        // Get the observation
        restObservationMockMvc.perform(get("/api/observations/{id}", observation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(observation.getId().intValue()))
            .andExpect(jsonPath("$.observation").value(DEFAULT_OBSERVATION));
    }
    @Test
    @Transactional
    public void getNonExistingObservation() throws Exception {
        // Get the observation
        restObservationMockMvc.perform(get("/api/observations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateObservation() throws Exception {
        // Initialize the database
        observationRepository.saveAndFlush(observation);

        int databaseSizeBeforeUpdate = observationRepository.findAll().size();

        // Update the observation
        Observation updatedObservation = observationRepository.findById(observation.getId()).get();
        // Disconnect from session so that the updates on updatedObservation are not directly saved in db
        em.detach(updatedObservation);
        updatedObservation
            .observation(UPDATED_OBSERVATION);

        restObservationMockMvc.perform(put("/api/observations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedObservation)))
            .andExpect(status().isOk());

        // Validate the Observation in the database
        List<Observation> observationList = observationRepository.findAll();
        assertThat(observationList).hasSize(databaseSizeBeforeUpdate);
        Observation testObservation = observationList.get(observationList.size() - 1);
        assertThat(testObservation.getObservation()).isEqualTo(UPDATED_OBSERVATION);
    }

    @Test
    @Transactional
    public void updateNonExistingObservation() throws Exception {
        int databaseSizeBeforeUpdate = observationRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restObservationMockMvc.perform(put("/api/observations")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(observation)))
            .andExpect(status().isBadRequest());

        // Validate the Observation in the database
        List<Observation> observationList = observationRepository.findAll();
        assertThat(observationList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteObservation() throws Exception {
        // Initialize the database
        observationRepository.saveAndFlush(observation);

        int databaseSizeBeforeDelete = observationRepository.findAll().size();

        // Delete the observation
        restObservationMockMvc.perform(delete("/api/observations/{id}", observation.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Observation> observationList = observationRepository.findAll();
        assertThat(observationList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
