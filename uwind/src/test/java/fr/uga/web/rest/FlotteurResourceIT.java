package fr.uga.web.rest;

import fr.uga.UwindApp;
import fr.uga.domain.Flotteur;
import fr.uga.repository.FlotteurRepository;

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

import fr.uga.domain.enumeration.NomFlotteur;
import fr.uga.domain.enumeration.NiveauPlancheAVoile;
/**
 * Integration tests for the {@link FlotteurResource} REST controller.
 */
@SpringBootTest(classes = UwindApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FlotteurResourceIT {

    private static final NomFlotteur DEFAULT_NOM = NomFlotteur.Beach;
    private static final NomFlotteur UPDATED_NOM = NomFlotteur.Calipso;

    private static final Float DEFAULT_VOLUME = 0.0F;
    private static final Float UPDATED_VOLUME = 1F;

    private static final NiveauPlancheAVoile DEFAULT_NIVEAU_PLANCHE_A_VOILE = NiveauPlancheAVoile.Deb;
    private static final NiveauPlancheAVoile UPDATED_NIVEAU_PLANCHE_A_VOILE = NiveauPlancheAVoile.DebPlus;

    private static final Boolean DEFAULT_UTILISABLE = false;
    private static final Boolean UPDATED_UTILISABLE = true;

    private static final String DEFAULT_COMMENTAIRE = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTAIRE = "BBBBBBBBBB";

    @Autowired
    private FlotteurRepository flotteurRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFlotteurMockMvc;

    private Flotteur flotteur;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Flotteur createEntity(EntityManager em) {
        Flotteur flotteur = new Flotteur()
            .nom(DEFAULT_NOM)
            .volume(DEFAULT_VOLUME)
            .niveauPlancheAVoile(DEFAULT_NIVEAU_PLANCHE_A_VOILE)
            .utilisable(DEFAULT_UTILISABLE)
            .commentaire(DEFAULT_COMMENTAIRE);
        return flotteur;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Flotteur createUpdatedEntity(EntityManager em) {
        Flotteur flotteur = new Flotteur()
            .nom(UPDATED_NOM)
            .volume(UPDATED_VOLUME)
            .niveauPlancheAVoile(UPDATED_NIVEAU_PLANCHE_A_VOILE)
            .utilisable(UPDATED_UTILISABLE)
            .commentaire(UPDATED_COMMENTAIRE);
        return flotteur;
    }

    @BeforeEach
    public void initTest() {
        flotteur = createEntity(em);
    }

    @Test
    @Transactional
    public void createFlotteur() throws Exception {
        int databaseSizeBeforeCreate = flotteurRepository.findAll().size();
        // Create the Flotteur
        restFlotteurMockMvc.perform(post("/api/flotteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(flotteur)))
            .andExpect(status().isCreated());

        // Validate the Flotteur in the database
        List<Flotteur> flotteurList = flotteurRepository.findAll();
        assertThat(flotteurList).hasSize(databaseSizeBeforeCreate + 1);
        Flotteur testFlotteur = flotteurList.get(flotteurList.size() - 1);
        assertThat(testFlotteur.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testFlotteur.getVolume()).isEqualTo(DEFAULT_VOLUME);
        assertThat(testFlotteur.getNiveauPlancheAVoile()).isEqualTo(DEFAULT_NIVEAU_PLANCHE_A_VOILE);
        assertThat(testFlotteur.isUtilisable()).isEqualTo(DEFAULT_UTILISABLE);
        assertThat(testFlotteur.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
    }

    @Test
    @Transactional
    public void createFlotteurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = flotteurRepository.findAll().size();

        // Create the Flotteur with an existing ID
        flotteur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFlotteurMockMvc.perform(post("/api/flotteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(flotteur)))
            .andExpect(status().isBadRequest());

        // Validate the Flotteur in the database
        List<Flotteur> flotteurList = flotteurRepository.findAll();
        assertThat(flotteurList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = flotteurRepository.findAll().size();
        // set the field null
        flotteur.setNom(null);

        // Create the Flotteur, which fails.


        restFlotteurMockMvc.perform(post("/api/flotteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(flotteur)))
            .andExpect(status().isBadRequest());

        List<Flotteur> flotteurList = flotteurRepository.findAll();
        assertThat(flotteurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkVolumeIsRequired() throws Exception {
        int databaseSizeBeforeTest = flotteurRepository.findAll().size();
        // set the field null
        flotteur.setVolume(null);

        // Create the Flotteur, which fails.


        restFlotteurMockMvc.perform(post("/api/flotteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(flotteur)))
            .andExpect(status().isBadRequest());

        List<Flotteur> flotteurList = flotteurRepository.findAll();
        assertThat(flotteurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNiveauPlancheAVoileIsRequired() throws Exception {
        int databaseSizeBeforeTest = flotteurRepository.findAll().size();
        // set the field null
        flotteur.setNiveauPlancheAVoile(null);

        // Create the Flotteur, which fails.


        restFlotteurMockMvc.perform(post("/api/flotteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(flotteur)))
            .andExpect(status().isBadRequest());

        List<Flotteur> flotteurList = flotteurRepository.findAll();
        assertThat(flotteurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkUtilisableIsRequired() throws Exception {
        int databaseSizeBeforeTest = flotteurRepository.findAll().size();
        // set the field null
        flotteur.setUtilisable(null);

        // Create the Flotteur, which fails.


        restFlotteurMockMvc.perform(post("/api/flotteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(flotteur)))
            .andExpect(status().isBadRequest());

        List<Flotteur> flotteurList = flotteurRepository.findAll();
        assertThat(flotteurList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFlotteurs() throws Exception {
        // Initialize the database
        flotteurRepository.saveAndFlush(flotteur);

        // Get all the flotteurList
        restFlotteurMockMvc.perform(get("/api/flotteurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(flotteur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].volume").value(hasItem(DEFAULT_VOLUME.doubleValue())))
            .andExpect(jsonPath("$.[*].niveauPlancheAVoile").value(hasItem(DEFAULT_NIVEAU_PLANCHE_A_VOILE.toString())))
            .andExpect(jsonPath("$.[*].utilisable").value(hasItem(DEFAULT_UTILISABLE.booleanValue())))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE)));
    }
    
    @Test
    @Transactional
    public void getFlotteur() throws Exception {
        // Initialize the database
        flotteurRepository.saveAndFlush(flotteur);

        // Get the flotteur
        restFlotteurMockMvc.perform(get("/api/flotteurs/{id}", flotteur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(flotteur.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.volume").value(DEFAULT_VOLUME.doubleValue()))
            .andExpect(jsonPath("$.niveauPlancheAVoile").value(DEFAULT_NIVEAU_PLANCHE_A_VOILE.toString()))
            .andExpect(jsonPath("$.utilisable").value(DEFAULT_UTILISABLE.booleanValue()))
            .andExpect(jsonPath("$.commentaire").value(DEFAULT_COMMENTAIRE));
    }
    @Test
    @Transactional
    public void getNonExistingFlotteur() throws Exception {
        // Get the flotteur
        restFlotteurMockMvc.perform(get("/api/flotteurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFlotteur() throws Exception {
        // Initialize the database
        flotteurRepository.saveAndFlush(flotteur);

        int databaseSizeBeforeUpdate = flotteurRepository.findAll().size();

        // Update the flotteur
        Flotteur updatedFlotteur = flotteurRepository.findById(flotteur.getId()).get();
        // Disconnect from session so that the updates on updatedFlotteur are not directly saved in db
        em.detach(updatedFlotteur);
        updatedFlotteur
            .nom(UPDATED_NOM)
            .volume(UPDATED_VOLUME)
            .niveauPlancheAVoile(UPDATED_NIVEAU_PLANCHE_A_VOILE)
            .utilisable(UPDATED_UTILISABLE)
            .commentaire(UPDATED_COMMENTAIRE);

        restFlotteurMockMvc.perform(put("/api/flotteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFlotteur)))
            .andExpect(status().isOk());

        // Validate the Flotteur in the database
        List<Flotteur> flotteurList = flotteurRepository.findAll();
        assertThat(flotteurList).hasSize(databaseSizeBeforeUpdate);
        Flotteur testFlotteur = flotteurList.get(flotteurList.size() - 1);
        assertThat(testFlotteur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testFlotteur.getVolume()).isEqualTo(UPDATED_VOLUME);
        assertThat(testFlotteur.getNiveauPlancheAVoile()).isEqualTo(UPDATED_NIVEAU_PLANCHE_A_VOILE);
        assertThat(testFlotteur.isUtilisable()).isEqualTo(UPDATED_UTILISABLE);
        assertThat(testFlotteur.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
    }

    @Test
    @Transactional
    public void updateNonExistingFlotteur() throws Exception {
        int databaseSizeBeforeUpdate = flotteurRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFlotteurMockMvc.perform(put("/api/flotteurs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(flotteur)))
            .andExpect(status().isBadRequest());

        // Validate the Flotteur in the database
        List<Flotteur> flotteurList = flotteurRepository.findAll();
        assertThat(flotteurList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFlotteur() throws Exception {
        // Initialize the database
        flotteurRepository.saveAndFlush(flotteur);

        int databaseSizeBeforeDelete = flotteurRepository.findAll().size();

        // Delete the flotteur
        restFlotteurMockMvc.perform(delete("/api/flotteurs/{id}", flotteur.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Flotteur> flotteurList = flotteurRepository.findAll();
        assertThat(flotteurList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
