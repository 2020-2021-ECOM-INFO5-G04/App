package fr.uga.web.rest;

import fr.uga.UwindApp;
import fr.uga.domain.Combinaison;
import fr.uga.repository.CombinaisonRepository;

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

import fr.uga.domain.enumeration.NomCombinaison;
import fr.uga.domain.enumeration.TailleCombinaison;
import fr.uga.domain.enumeration.PoidsCombinaison;
/**
 * Integration tests for the {@link CombinaisonResource} REST controller.
 */
@SpringBootTest(classes = UwindApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CombinaisonResourceIT {

    private static final NomCombinaison DEFAULT_NOM = NomCombinaison.Decat_W;
    private static final NomCombinaison UPDATED_NOM = NomCombinaison.Decat_W_N;

    private static final TailleCombinaison DEFAULT_TAILLE = TailleCombinaison.T_150_155;
    private static final TailleCombinaison UPDATED_TAILLE = TailleCombinaison.T_155_160;

    private static final PoidsCombinaison DEFAULT_POIDS = PoidsCombinaison.P_50_55;
    private static final PoidsCombinaison UPDATED_POIDS = PoidsCombinaison.P_55_60;

    @Autowired
    private CombinaisonRepository combinaisonRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCombinaisonMockMvc;

    private Combinaison combinaison;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Combinaison createEntity(EntityManager em) {
        Combinaison combinaison = new Combinaison()
            .nom(DEFAULT_NOM)
            .taille(DEFAULT_TAILLE)
            .poids(DEFAULT_POIDS);
        return combinaison;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Combinaison createUpdatedEntity(EntityManager em) {
        Combinaison combinaison = new Combinaison()
            .nom(UPDATED_NOM)
            .taille(UPDATED_TAILLE)
            .poids(UPDATED_POIDS);
        return combinaison;
    }

    @BeforeEach
    public void initTest() {
        combinaison = createEntity(em);
    }

    @Test
    @Transactional
    public void createCombinaison() throws Exception {
        int databaseSizeBeforeCreate = combinaisonRepository.findAll().size();
        // Create the Combinaison
        restCombinaisonMockMvc.perform(post("/api/combinaisons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(combinaison)))
            .andExpect(status().isCreated());

        // Validate the Combinaison in the database
        List<Combinaison> combinaisonList = combinaisonRepository.findAll();
        assertThat(combinaisonList).hasSize(databaseSizeBeforeCreate + 1);
        Combinaison testCombinaison = combinaisonList.get(combinaisonList.size() - 1);
        assertThat(testCombinaison.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testCombinaison.getTaille()).isEqualTo(DEFAULT_TAILLE);
        assertThat(testCombinaison.getPoids()).isEqualTo(DEFAULT_POIDS);
    }

    @Test
    @Transactional
    public void createCombinaisonWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = combinaisonRepository.findAll().size();

        // Create the Combinaison with an existing ID
        combinaison.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCombinaisonMockMvc.perform(post("/api/combinaisons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(combinaison)))
            .andExpect(status().isBadRequest());

        // Validate the Combinaison in the database
        List<Combinaison> combinaisonList = combinaisonRepository.findAll();
        assertThat(combinaisonList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = combinaisonRepository.findAll().size();
        // set the field null
        combinaison.setNom(null);

        // Create the Combinaison, which fails.


        restCombinaisonMockMvc.perform(post("/api/combinaisons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(combinaison)))
            .andExpect(status().isBadRequest());

        List<Combinaison> combinaisonList = combinaisonRepository.findAll();
        assertThat(combinaisonList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTailleIsRequired() throws Exception {
        int databaseSizeBeforeTest = combinaisonRepository.findAll().size();
        // set the field null
        combinaison.setTaille(null);

        // Create the Combinaison, which fails.


        restCombinaisonMockMvc.perform(post("/api/combinaisons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(combinaison)))
            .andExpect(status().isBadRequest());

        List<Combinaison> combinaisonList = combinaisonRepository.findAll();
        assertThat(combinaisonList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPoidsIsRequired() throws Exception {
        int databaseSizeBeforeTest = combinaisonRepository.findAll().size();
        // set the field null
        combinaison.setPoids(null);

        // Create the Combinaison, which fails.


        restCombinaisonMockMvc.perform(post("/api/combinaisons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(combinaison)))
            .andExpect(status().isBadRequest());

        List<Combinaison> combinaisonList = combinaisonRepository.findAll();
        assertThat(combinaisonList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCombinaisons() throws Exception {
        // Initialize the database
        combinaisonRepository.saveAndFlush(combinaison);

        // Get all the combinaisonList
        restCombinaisonMockMvc.perform(get("/api/combinaisons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(combinaison.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].taille").value(hasItem(DEFAULT_TAILLE.toString())))
            .andExpect(jsonPath("$.[*].poids").value(hasItem(DEFAULT_POIDS.toString())));
    }
    
    @Test
    @Transactional
    public void getCombinaison() throws Exception {
        // Initialize the database
        combinaisonRepository.saveAndFlush(combinaison);

        // Get the combinaison
        restCombinaisonMockMvc.perform(get("/api/combinaisons/{id}", combinaison.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(combinaison.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.taille").value(DEFAULT_TAILLE.toString()))
            .andExpect(jsonPath("$.poids").value(DEFAULT_POIDS.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCombinaison() throws Exception {
        // Get the combinaison
        restCombinaisonMockMvc.perform(get("/api/combinaisons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCombinaison() throws Exception {
        // Initialize the database
        combinaisonRepository.saveAndFlush(combinaison);

        int databaseSizeBeforeUpdate = combinaisonRepository.findAll().size();

        // Update the combinaison
        Combinaison updatedCombinaison = combinaisonRepository.findById(combinaison.getId()).get();
        // Disconnect from session so that the updates on updatedCombinaison are not directly saved in db
        em.detach(updatedCombinaison);
        updatedCombinaison
            .nom(UPDATED_NOM)
            .taille(UPDATED_TAILLE)
            .poids(UPDATED_POIDS);

        restCombinaisonMockMvc.perform(put("/api/combinaisons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCombinaison)))
            .andExpect(status().isOk());

        // Validate the Combinaison in the database
        List<Combinaison> combinaisonList = combinaisonRepository.findAll();
        assertThat(combinaisonList).hasSize(databaseSizeBeforeUpdate);
        Combinaison testCombinaison = combinaisonList.get(combinaisonList.size() - 1);
        assertThat(testCombinaison.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testCombinaison.getTaille()).isEqualTo(UPDATED_TAILLE);
        assertThat(testCombinaison.getPoids()).isEqualTo(UPDATED_POIDS);
    }

    @Test
    @Transactional
    public void updateNonExistingCombinaison() throws Exception {
        int databaseSizeBeforeUpdate = combinaisonRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCombinaisonMockMvc.perform(put("/api/combinaisons")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(combinaison)))
            .andExpect(status().isBadRequest());

        // Validate the Combinaison in the database
        List<Combinaison> combinaisonList = combinaisonRepository.findAll();
        assertThat(combinaisonList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCombinaison() throws Exception {
        // Initialize the database
        combinaisonRepository.saveAndFlush(combinaison);

        int databaseSizeBeforeDelete = combinaisonRepository.findAll().size();

        // Delete the combinaison
        restCombinaisonMockMvc.perform(delete("/api/combinaisons/{id}", combinaison.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Combinaison> combinaisonList = combinaisonRepository.findAll();
        assertThat(combinaisonList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
