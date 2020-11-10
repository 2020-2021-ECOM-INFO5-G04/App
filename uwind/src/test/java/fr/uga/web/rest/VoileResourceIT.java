package fr.uga.web.rest;

import fr.uga.UwindApp;
import fr.uga.domain.Voile;
import fr.uga.repository.VoileRepository;

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

import fr.uga.domain.enumeration.NomVoile;
import fr.uga.domain.enumeration.NiveauPlancheAVoile;
/**
 * Integration tests for the {@link VoileResource} REST controller.
 */
@SpringBootTest(classes = UwindApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class VoileResourceIT {

    private static final NomVoile DEFAULT_NOM_COMPLET = NomVoile.Loft_Purelip;
    private static final NomVoile UPDATED_NOM_COMPLET = NomVoile.Gun_Blow;

    private static final Float DEFAULT_SURFACE = 0.0F;
    private static final Float UPDATED_SURFACE = 1F;

    private static final NiveauPlancheAVoile DEFAULT_NIVEAU = NiveauPlancheAVoile.Deb;
    private static final NiveauPlancheAVoile UPDATED_NIVEAU = NiveauPlancheAVoile.DebPlus;

    private static final Boolean DEFAULT_UTILISABLE = false;
    private static final Boolean UPDATED_UTILISABLE = true;

    private static final String DEFAULT_COMMENTAIRE = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTAIRE = "BBBBBBBBBB";

    @Autowired
    private VoileRepository voileRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVoileMockMvc;

    private Voile voile;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Voile createEntity(EntityManager em) {
        Voile voile = new Voile()
            .nomComplet(DEFAULT_NOM_COMPLET)
            .surface(DEFAULT_SURFACE)
            .niveau(DEFAULT_NIVEAU)
            .utilisable(DEFAULT_UTILISABLE)
            .commentaire(DEFAULT_COMMENTAIRE);
        return voile;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Voile createUpdatedEntity(EntityManager em) {
        Voile voile = new Voile()
            .nomComplet(UPDATED_NOM_COMPLET)
            .surface(UPDATED_SURFACE)
            .niveau(UPDATED_NIVEAU)
            .utilisable(UPDATED_UTILISABLE)
            .commentaire(UPDATED_COMMENTAIRE);
        return voile;
    }

    @BeforeEach
    public void initTest() {
        voile = createEntity(em);
    }

    @Test
    @Transactional
    public void createVoile() throws Exception {
        int databaseSizeBeforeCreate = voileRepository.findAll().size();
        // Create the Voile
        restVoileMockMvc.perform(post("/api/voiles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(voile)))
            .andExpect(status().isCreated());

        // Validate the Voile in the database
        List<Voile> voileList = voileRepository.findAll();
        assertThat(voileList).hasSize(databaseSizeBeforeCreate + 1);
        Voile testVoile = voileList.get(voileList.size() - 1);
        assertThat(testVoile.getNomComplet()).isEqualTo(DEFAULT_NOM_COMPLET);
        assertThat(testVoile.getSurface()).isEqualTo(DEFAULT_SURFACE);
        assertThat(testVoile.getNiveau()).isEqualTo(DEFAULT_NIVEAU);
        assertThat(testVoile.isUtilisable()).isEqualTo(DEFAULT_UTILISABLE);
        assertThat(testVoile.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
    }

    @Test
    @Transactional
    public void createVoileWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = voileRepository.findAll().size();

        // Create the Voile with an existing ID
        voile.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVoileMockMvc.perform(post("/api/voiles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(voile)))
            .andExpect(status().isBadRequest());

        // Validate the Voile in the database
        List<Voile> voileList = voileRepository.findAll();
        assertThat(voileList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomCompletIsRequired() throws Exception {
        int databaseSizeBeforeTest = voileRepository.findAll().size();
        // set the field null
        voile.setNomComplet(null);

        // Create the Voile, which fails.


        restVoileMockMvc.perform(post("/api/voiles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(voile)))
            .andExpect(status().isBadRequest());

        List<Voile> voileList = voileRepository.findAll();
        assertThat(voileList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSurfaceIsRequired() throws Exception {
        int databaseSizeBeforeTest = voileRepository.findAll().size();
        // set the field null
        voile.setSurface(null);

        // Create the Voile, which fails.


        restVoileMockMvc.perform(post("/api/voiles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(voile)))
            .andExpect(status().isBadRequest());

        List<Voile> voileList = voileRepository.findAll();
        assertThat(voileList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNiveauIsRequired() throws Exception {
        int databaseSizeBeforeTest = voileRepository.findAll().size();
        // set the field null
        voile.setNiveau(null);

        // Create the Voile, which fails.


        restVoileMockMvc.perform(post("/api/voiles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(voile)))
            .andExpect(status().isBadRequest());

        List<Voile> voileList = voileRepository.findAll();
        assertThat(voileList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUtilisableIsRequired() throws Exception {
        int databaseSizeBeforeTest = voileRepository.findAll().size();
        // set the field null
        voile.setUtilisable(null);

        // Create the Voile, which fails.


        restVoileMockMvc.perform(post("/api/voiles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(voile)))
            .andExpect(status().isBadRequest());

        List<Voile> voileList = voileRepository.findAll();
        assertThat(voileList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVoiles() throws Exception {
        // Initialize the database
        voileRepository.saveAndFlush(voile);

        // Get all the voileList
        restVoileMockMvc.perform(get("/api/voiles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(voile.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomComplet").value(hasItem(DEFAULT_NOM_COMPLET.toString())))
            .andExpect(jsonPath("$.[*].surface").value(hasItem(DEFAULT_SURFACE.doubleValue())))
            .andExpect(jsonPath("$.[*].niveau").value(hasItem(DEFAULT_NIVEAU.toString())))
            .andExpect(jsonPath("$.[*].utilisable").value(hasItem(DEFAULT_UTILISABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE)));
    }
    
    @Test
    @Transactional
    public void getVoile() throws Exception {
        // Initialize the database
        voileRepository.saveAndFlush(voile);

        // Get the voile
        restVoileMockMvc.perform(get("/api/voiles/{id}", voile.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(voile.getId().intValue()))
            .andExpect(jsonPath("$.nomComplet").value(DEFAULT_NOM_COMPLET.toString()))
            .andExpect(jsonPath("$.surface").value(DEFAULT_SURFACE.doubleValue()))
            .andExpect(jsonPath("$.niveau").value(DEFAULT_NIVEAU.toString()))
            .andExpect(jsonPath("$.utilisable").value(DEFAULT_UTILISABLE.booleanValue()))
            .andExpect(jsonPath("$.commentaire").value(DEFAULT_COMMENTAIRE));
    }
    @Test
    @Transactional
    public void getNonExistingVoile() throws Exception {
        // Get the voile
        restVoileMockMvc.perform(get("/api/voiles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVoile() throws Exception {
        // Initialize the database
        voileRepository.saveAndFlush(voile);

        int databaseSizeBeforeUpdate = voileRepository.findAll().size();

        // Update the voile
        Voile updatedVoile = voileRepository.findById(voile.getId()).get();
        // Disconnect from session so that the updates on updatedVoile are not directly saved in db
        em.detach(updatedVoile);
        updatedVoile
            .nomComplet(UPDATED_NOM_COMPLET)
            .surface(UPDATED_SURFACE)
            .niveau(UPDATED_NIVEAU)
            .utilisable(UPDATED_UTILISABLE)
            .commentaire(UPDATED_COMMENTAIRE);

        restVoileMockMvc.perform(put("/api/voiles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedVoile)))
            .andExpect(status().isOk());

        // Validate the Voile in the database
        List<Voile> voileList = voileRepository.findAll();
        assertThat(voileList).hasSize(databaseSizeBeforeUpdate);
        Voile testVoile = voileList.get(voileList.size() - 1);
        assertThat(testVoile.getNomComplet()).isEqualTo(UPDATED_NOM_COMPLET);
        assertThat(testVoile.getSurface()).isEqualTo(UPDATED_SURFACE);
        assertThat(testVoile.getNiveau()).isEqualTo(UPDATED_NIVEAU);
        assertThat(testVoile.isUtilisable()).isEqualTo(UPDATED_UTILISABLE);
        assertThat(testVoile.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
    }

    @Test
    @Transactional
    public void updateNonExistingVoile() throws Exception {
        int databaseSizeBeforeUpdate = voileRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVoileMockMvc.perform(put("/api/voiles")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(voile)))
            .andExpect(status().isBadRequest());

        // Validate the Voile in the database
        List<Voile> voileList = voileRepository.findAll();
        assertThat(voileList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVoile() throws Exception {
        // Initialize the database
        voileRepository.saveAndFlush(voile);

        int databaseSizeBeforeDelete = voileRepository.findAll().size();

        // Delete the voile
        restVoileMockMvc.perform(delete("/api/voiles/{id}", voile.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Voile> voileList = voileRepository.findAll();
        assertThat(voileList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
