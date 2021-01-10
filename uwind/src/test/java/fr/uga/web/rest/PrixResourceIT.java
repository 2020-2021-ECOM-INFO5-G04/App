package fr.uga.web.rest;

import fr.uga.UwindApp;
import fr.uga.domain.Prix;
import fr.uga.repository.PrixRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PrixResource} REST controller.
 */
@SpringBootTest(classes = UwindApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PrixResourceIT {

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_PRIX_FP = 1D;
    private static final Double UPDATED_PRIX_FP = 2D;

    private static final Double DEFAULT_PRIX_FQ = 1D;
    private static final Double UPDATED_PRIX_FQ = 2D;

    private static final Boolean DEFAULT_ACTIVE = false;
    private static final Boolean UPDATED_ACTIVE = true;

    @Autowired
    private PrixRepository prixRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPrixMockMvc;

    private Prix prix;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Prix createEntity(EntityManager em) {
        Prix prix = new Prix()
            .date(DEFAULT_DATE)
            .prixFP(DEFAULT_PRIX_FP)
            .prixFQ(DEFAULT_PRIX_FQ)
            .active(DEFAULT_ACTIVE);
        return prix;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Prix createUpdatedEntity(EntityManager em) {
        Prix prix = new Prix()
            .date(UPDATED_DATE)
            .prixFP(UPDATED_PRIX_FP)
            .prixFQ(UPDATED_PRIX_FQ)
            .active(UPDATED_ACTIVE);
        return prix;
    }

    @BeforeEach
    public void initTest() {
        prix = createEntity(em);
    }

    @Test
    @Transactional
    public void createPrix() throws Exception {
        int databaseSizeBeforeCreate = prixRepository.findAll().size();
        // Create the Prix
        restPrixMockMvc.perform(post("/api/prixes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prix)))
            .andExpect(status().isCreated());

        // Validate the Prix in the database
        List<Prix> prixList = prixRepository.findAll();
        assertThat(prixList).hasSize(databaseSizeBeforeCreate + 1);
        Prix testPrix = prixList.get(prixList.size() - 1);
        assertThat(testPrix.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testPrix.getPrixFP()).isEqualTo(DEFAULT_PRIX_FP);
        assertThat(testPrix.getPrixFQ()).isEqualTo(DEFAULT_PRIX_FQ);
        assertThat(testPrix.isActive()).isEqualTo(DEFAULT_ACTIVE);
    }

    @Test
    @Transactional
    public void createPrixWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prixRepository.findAll().size();

        // Create the Prix with an existing ID
        prix.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPrixMockMvc.perform(post("/api/prixes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prix)))
            .andExpect(status().isBadRequest());

        // Validate the Prix in the database
        List<Prix> prixList = prixRepository.findAll();
        assertThat(prixList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = prixRepository.findAll().size();
        // set the field null
        prix.setDate(null);

        // Create the Prix, which fails.


        restPrixMockMvc.perform(post("/api/prixes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prix)))
            .andExpect(status().isBadRequest());

        List<Prix> prixList = prixRepository.findAll();
        assertThat(prixList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrixFPIsRequired() throws Exception {
        int databaseSizeBeforeTest = prixRepository.findAll().size();
        // set the field null
        prix.setPrixFP(null);

        // Create the Prix, which fails.


        restPrixMockMvc.perform(post("/api/prixes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prix)))
            .andExpect(status().isBadRequest());

        List<Prix> prixList = prixRepository.findAll();
        assertThat(prixList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrixFQIsRequired() throws Exception {
        int databaseSizeBeforeTest = prixRepository.findAll().size();
        // set the field null
        prix.setPrixFQ(null);

        // Create the Prix, which fails.


        restPrixMockMvc.perform(post("/api/prixes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prix)))
            .andExpect(status().isBadRequest());

        List<Prix> prixList = prixRepository.findAll();
        assertThat(prixList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkActiveIsRequired() throws Exception {
        int databaseSizeBeforeTest = prixRepository.findAll().size();
        // set the field null
        prix.setActive(null);

        // Create the Prix, which fails.


        restPrixMockMvc.perform(post("/api/prixes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prix)))
            .andExpect(status().isBadRequest());

        List<Prix> prixList = prixRepository.findAll();
        assertThat(prixList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPrixes() throws Exception {
        // Initialize the database
        prixRepository.saveAndFlush(prix);

        // Get all the prixList
        restPrixMockMvc.perform(get("/api/prixes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prix.getId().intValue())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].prixFP").value(hasItem(DEFAULT_PRIX_FP.doubleValue())))
            .andExpect(jsonPath("$.[*].prixFQ").value(hasItem(DEFAULT_PRIX_FQ.doubleValue())))
            .andExpect(jsonPath("$.[*].active").value(hasItem(DEFAULT_ACTIVE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getPrix() throws Exception {
        // Initialize the database
        prixRepository.saveAndFlush(prix);

        // Get the prix
        restPrixMockMvc.perform(get("/api/prixes/{id}", prix.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(prix.getId().intValue()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.prixFP").value(DEFAULT_PRIX_FP.doubleValue()))
            .andExpect(jsonPath("$.prixFQ").value(DEFAULT_PRIX_FQ.doubleValue()))
            .andExpect(jsonPath("$.active").value(DEFAULT_ACTIVE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPrix() throws Exception {
        // Get the prix
        restPrixMockMvc.perform(get("/api/prixes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePrix() throws Exception {
        // Initialize the database
        prixRepository.saveAndFlush(prix);

        int databaseSizeBeforeUpdate = prixRepository.findAll().size();

        // Update the prix
        Prix updatedPrix = prixRepository.findById(prix.getId()).get();
        // Disconnect from session so that the updates on updatedPrix are not directly saved in db
        em.detach(updatedPrix);
        updatedPrix
            .date(UPDATED_DATE)
            .prixFP(UPDATED_PRIX_FP)
            .prixFQ(UPDATED_PRIX_FQ)
            .active(UPDATED_ACTIVE);

        restPrixMockMvc.perform(put("/api/prixes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPrix)))
            .andExpect(status().isOk());

        // Validate the Prix in the database
        List<Prix> prixList = prixRepository.findAll();
        assertThat(prixList).hasSize(databaseSizeBeforeUpdate);
        Prix testPrix = prixList.get(prixList.size() - 1);
        assertThat(testPrix.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testPrix.getPrixFP()).isEqualTo(UPDATED_PRIX_FP);
        assertThat(testPrix.getPrixFQ()).isEqualTo(UPDATED_PRIX_FQ);
        assertThat(testPrix.isActive()).isEqualTo(UPDATED_ACTIVE);
    }

    @Test
    @Transactional
    public void updateNonExistingPrix() throws Exception {
        int databaseSizeBeforeUpdate = prixRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPrixMockMvc.perform(put("/api/prixes")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prix)))
            .andExpect(status().isBadRequest());

        // Validate the Prix in the database
        List<Prix> prixList = prixRepository.findAll();
        assertThat(prixList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePrix() throws Exception {
        // Initialize the database
        prixRepository.saveAndFlush(prix);

        int databaseSizeBeforeDelete = prixRepository.findAll().size();

        // Delete the prix
        restPrixMockMvc.perform(delete("/api/prixes/{id}", prix.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Prix> prixList = prixRepository.findAll();
        assertThat(prixList).hasSize(databaseSizeBeforeDelete - 1);
    }


    @Test
    @Transactional
    public void useGetActive() throws Exception {
        // Initialize the database
        prixRepository.saveAndFlush(prix);

        // Get the active price rule
        restPrixMockMvc.perform(get("/api/prixes/getActive"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].active").value(hasItem(true)));
    }

    @Test
    @Transactional
    public void activatePrix() throws Exception {
        // Initialize the database
        prixRepository.saveAndFlush(prix);

        // Update the prix
        Prix prixToActivate = prixRepository.findById(prix.getId()).get();
        // Disconnect from session so that the updates on updatedPrix are not directly saved in db
        prixToActivate
            .date(DEFAULT_DATE)
            .prixFP(DEFAULT_PRIX_FP)
            .prixFQ(DEFAULT_PRIX_FQ)
            .active(false);

        //Saving the active one before making changes in order to put it back after
        Prix[] lastActivePrix = {null}; //Array because enclosing scope
        prixRepository.findAll().forEach((prixElem) -> {
            if(prixElem.isActive()){
                lastActivePrix[0] = prixElem;
            }
        });

        restPrixMockMvc.perform(put("/api/prixes/activate")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prixToActivate)))
            .andExpect(status().isOk());
    
        assertThat(!lastActivePrix[0].isActive());
        assertThat(prixToActivate.isActive()); //Assert the price rule is active
        prixRepository.findAll().forEach((prixElem) -> {
            if(prixElem.isActive()){
                assertThat(prixElem.getId() == prixToActivate.getId()); //Assert it is the only one active
            }
        });

        if(lastActivePrix[0] != null){ //Restoring everything
            restPrixMockMvc.perform(put("/api/prixes/activate")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(lastActivePrix[0])))
            .andExpect(status().isOk());

            assertThat(lastActivePrix[0].isActive());
            prixRepository.findAll().forEach((prixElem) -> {
                if(prixElem.isActive()){
                    assertThat(prixElem.getId() == lastActivePrix[0].getId()); //Assert it is the only one active
                }
            });
        }

    }
}
