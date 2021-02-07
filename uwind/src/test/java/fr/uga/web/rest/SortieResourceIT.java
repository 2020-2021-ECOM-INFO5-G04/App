package fr.uga.web.rest;

import fr.uga.UwindApp;
import fr.uga.domain.Sortie;
import fr.uga.repository.SortieRepository;

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

import fr.uga.domain.enumeration.PlanDEau;
/**
 * Integration tests for the {@link SortieResource} REST controller.
 */
@SpringBootTest(classes = UwindApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SortieResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final PlanDEau DEFAULT_PLAN_DEAU = PlanDEau.Laffrey;
    private static final PlanDEau UPDATED_PLAN_DEAU = PlanDEau.Monteynard;

    private static final Long DEFAULT_COEFF = 0L;
    private static final Long UPDATED_COEFF = 1L;

    private static final String DEFAULT_COMMENTAIRE = "AAAAAAAAAA";
    private static final String UPDATED_COMMENTAIRE = "BBBBBBBBBB";

    @Autowired
    private SortieRepository sortieRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSortieMockMvc;

    private Sortie sortie;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sortie createEntity(EntityManager em) {
        Sortie sortie = new Sortie()
            .nom(DEFAULT_NOM)
            .date(DEFAULT_DATE)
            .planDeau(DEFAULT_PLAN_DEAU)
            .coeff(DEFAULT_COEFF)
            .commentaire(DEFAULT_COMMENTAIRE);
        return sortie;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Sortie createUpdatedEntity(EntityManager em) {
        Sortie sortie = new Sortie()
            .nom(UPDATED_NOM)
            .date(UPDATED_DATE)
            .planDeau(UPDATED_PLAN_DEAU)
            .coeff(UPDATED_COEFF)
            .commentaire(UPDATED_COMMENTAIRE);
        return sortie;
    }

    @BeforeEach
    public void initTest() {
        sortie = createEntity(em);
    }

    @Test
    @Transactional
    public void createSortie() throws Exception {
        int databaseSizeBeforeCreate = sortieRepository.findAll().size();
        // Create the Sortie
        restSortieMockMvc.perform(post("/api/sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sortie)))
            .andExpect(status().isCreated());

        // Validate the Sortie in the database
        List<Sortie> sortieList = sortieRepository.findAll();
        assertThat(sortieList).hasSize(databaseSizeBeforeCreate + 1);
        Sortie testSortie = sortieList.get(sortieList.size() - 1);
        assertThat(testSortie.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testSortie.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testSortie.getPlanDeau()).isEqualTo(DEFAULT_PLAN_DEAU);
        assertThat(testSortie.getCoeff()).isEqualTo(DEFAULT_COEFF);
        assertThat(testSortie.getCommentaire()).isEqualTo(DEFAULT_COMMENTAIRE);
    }

    @Test
    @Transactional
    public void createSortieWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sortieRepository.findAll().size();

        // Create the Sortie with an existing ID
        sortie.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSortieMockMvc.perform(post("/api/sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sortie)))
            .andExpect(status().isBadRequest());

        // Validate the Sortie in the database
        List<Sortie> sortieList = sortieRepository.findAll();
        assertThat(sortieList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = sortieRepository.findAll().size();
        // set the field null
        sortie.setNom(null);

        // Create the Sortie, which fails.


        restSortieMockMvc.perform(post("/api/sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sortie)))
            .andExpect(status().isBadRequest());

        List<Sortie> sortieList = sortieRepository.findAll();
        assertThat(sortieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateIsRequired() throws Exception {
        int databaseSizeBeforeTest = sortieRepository.findAll().size();
        // set the field null
        sortie.setDate(null);

        // Create the Sortie, which fails.


        restSortieMockMvc.perform(post("/api/sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sortie)))
            .andExpect(status().isBadRequest());

        List<Sortie> sortieList = sortieRepository.findAll();
        assertThat(sortieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPlanDeauIsRequired() throws Exception {
        int databaseSizeBeforeTest = sortieRepository.findAll().size();
        // set the field null
        sortie.setPlanDeau(null);

        // Create the Sortie, which fails.


        restSortieMockMvc.perform(post("/api/sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sortie)))
            .andExpect(status().isBadRequest());

        List<Sortie> sortieList = sortieRepository.findAll();
        assertThat(sortieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCoeffIsRequired() throws Exception {
        int databaseSizeBeforeTest = sortieRepository.findAll().size();
        // set the field null
        sortie.setCoeff(null);

        // Create the Sortie, which fails.


        restSortieMockMvc.perform(post("/api/sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sortie)))
            .andExpect(status().isBadRequest());

        List<Sortie> sortieList = sortieRepository.findAll();
        assertThat(sortieList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSorties() throws Exception {
        // Initialize the database
        sortieRepository.saveAndFlush(sortie);

        // Get all the sortieList
        restSortieMockMvc.perform(get("/api/sorties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sortie.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].planDeau").value(hasItem(DEFAULT_PLAN_DEAU.toString())))
            .andExpect(jsonPath("$.[*].coeff").value(hasItem(DEFAULT_COEFF.intValue())))
            .andExpect(jsonPath("$.[*].commentaire").value(hasItem(DEFAULT_COMMENTAIRE)));
    }
    
    @Test
    @Transactional
    public void getSortie() throws Exception {
        // Initialize the database
        sortieRepository.saveAndFlush(sortie);

        // Get the sortie
        restSortieMockMvc.perform(get("/api/sorties/{id}", sortie.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sortie.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.planDeau").value(DEFAULT_PLAN_DEAU.toString()))
            .andExpect(jsonPath("$.coeff").value(DEFAULT_COEFF.intValue()))
            .andExpect(jsonPath("$.commentaire").value(DEFAULT_COMMENTAIRE));
    }
    @Test
    @Transactional
    public void getNonExistingSortie() throws Exception {
        // Get the sortie
        restSortieMockMvc.perform(get("/api/sorties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSortie() throws Exception {
        // Initialize the database
        sortieRepository.saveAndFlush(sortie);

        int databaseSizeBeforeUpdate = sortieRepository.findAll().size();

        // Update the sortie
        Sortie updatedSortie = sortieRepository.findById(sortie.getId()).get();
        // Disconnect from session so that the updates on updatedSortie are not directly saved in db
        em.detach(updatedSortie);
        updatedSortie
            .nom(UPDATED_NOM)
            .date(UPDATED_DATE)
            .planDeau(UPDATED_PLAN_DEAU)
            .coeff(UPDATED_COEFF)
            .commentaire(UPDATED_COMMENTAIRE);

        restSortieMockMvc.perform(put("/api/sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSortie)))
            .andExpect(status().isOk());

        // Validate the Sortie in the database
        List<Sortie> sortieList = sortieRepository.findAll();
        assertThat(sortieList).hasSize(databaseSizeBeforeUpdate);
        Sortie testSortie = sortieList.get(sortieList.size() - 1);
        assertThat(testSortie.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testSortie.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testSortie.getPlanDeau()).isEqualTo(UPDATED_PLAN_DEAU);
        assertThat(testSortie.getCoeff()).isEqualTo(UPDATED_COEFF);
        assertThat(testSortie.getCommentaire()).isEqualTo(UPDATED_COMMENTAIRE);
    }

    @Test
    @Transactional
    public void updateNonExistingSortie() throws Exception {
        int databaseSizeBeforeUpdate = sortieRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSortieMockMvc.perform(put("/api/sorties")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sortie)))
            .andExpect(status().isBadRequest());

        // Validate the Sortie in the database
        List<Sortie> sortieList = sortieRepository.findAll();
        assertThat(sortieList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSortie() throws Exception {
        // Initialize the database
        sortieRepository.saveAndFlush(sortie);

        int databaseSizeBeforeDelete = sortieRepository.findAll().size();

        // Delete the sortie
        restSortieMockMvc.perform(delete("/api/sorties/{id}", sortie.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Sortie> sortieList = sortieRepository.findAll();
        assertThat(sortieList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void testexportcsv() throws Exception{
        sortieRepository.saveAndFlush(sortie);

        restSortieMockMvc.perform(get("/api/sorties/export/{id}",sortie.getId()))
        .andExpect(status().isOk());
    }
}
