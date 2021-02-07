package fr.uga.web.rest;

import fr.uga.UwindApp;
import fr.uga.domain.Etudiant;
import fr.uga.repository.EtudiantRepository;

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

import fr.uga.domain.enumeration.NiveauEtudes;
import fr.uga.domain.enumeration.Filiere;
import fr.uga.domain.enumeration.NiveauPlancheAVoile;
/**
 * Integration tests for the {@link EtudiantResource} REST controller.
 */
@SpringBootTest(classes = UwindApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EtudiantResourceIT {

    private static final NiveauEtudes DEFAULT_NIVEAU_SCOLAIRE = NiveauEtudes.Bac_plus_1;
    private static final NiveauEtudes UPDATED_NIVEAU_SCOLAIRE = NiveauEtudes.Bac_plus_2;

    private static final Filiere DEFAULT_DEPARTEMENT = Filiere.STAPS_Entrainement_sportif;
    private static final Filiere UPDATED_DEPARTEMENT = Filiere.STAPS_Management_du_sport;

    private static final NiveauPlancheAVoile DEFAULT_NIVEAU_PLANCHE = NiveauPlancheAVoile.Deb;
    private static final NiveauPlancheAVoile UPDATED_NIVEAU_PLANCHE = NiveauPlancheAVoile.DebPlus;

    private static final Boolean DEFAULT_PERMIS_DE_CONDUIRE = false;
    private static final Boolean UPDATED_PERMIS_DE_CONDUIRE = true;

    private static final String DEFAULT_LIEU_DEPART = "AAAAAAAAAA";
    private static final String UPDATED_LIEU_DEPART = "BBBBBBBBBB";

    private static final Boolean DEFAULT_OPTION_SEMESTRE = false;
    private static final Boolean UPDATED_OPTION_SEMESTRE = true;

    private static final Boolean DEFAULT_COMPTE_VALIDE = false;
    private static final Boolean UPDATED_COMPTE_VALIDE = true;

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEtudiantMockMvc;

    private Etudiant etudiant;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Etudiant createEntity(EntityManager em) {
        Etudiant etudiant = new Etudiant()
            .niveauScolaire(DEFAULT_NIVEAU_SCOLAIRE)
            .departement(DEFAULT_DEPARTEMENT)
            .niveauPlanche(DEFAULT_NIVEAU_PLANCHE)
            .permisDeConduire(DEFAULT_PERMIS_DE_CONDUIRE)
            .lieuDepart(DEFAULT_LIEU_DEPART)
            .optionSemestre(DEFAULT_OPTION_SEMESTRE)
            .compteValide(DEFAULT_COMPTE_VALIDE);
        return etudiant;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Etudiant createUpdatedEntity(EntityManager em) {
        Etudiant etudiant = new Etudiant()
            .niveauScolaire(UPDATED_NIVEAU_SCOLAIRE)
            .departement(UPDATED_DEPARTEMENT)
            .niveauPlanche(UPDATED_NIVEAU_PLANCHE)
            .permisDeConduire(UPDATED_PERMIS_DE_CONDUIRE)
            .lieuDepart(UPDATED_LIEU_DEPART)
            .optionSemestre(UPDATED_OPTION_SEMESTRE)
            .compteValide(UPDATED_COMPTE_VALIDE);
        return etudiant;
    }

    @BeforeEach
    public void initTest() {
        etudiant = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtudiant() throws Exception {
        int databaseSizeBeforeCreate = etudiantRepository.findAll().size();
        // Create the Etudiant
        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isCreated());

        // Validate the Etudiant in the database
        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeCreate + 1);
        Etudiant testEtudiant = etudiantList.get(etudiantList.size() - 1);
        assertThat(testEtudiant.getNiveauScolaire()).isEqualTo(DEFAULT_NIVEAU_SCOLAIRE);
        assertThat(testEtudiant.getDepartement()).isEqualTo(DEFAULT_DEPARTEMENT);
        assertThat(testEtudiant.getNiveauPlanche()).isEqualTo(DEFAULT_NIVEAU_PLANCHE);
        assertThat(testEtudiant.isPermisDeConduire()).isEqualTo(DEFAULT_PERMIS_DE_CONDUIRE);
        assertThat(testEtudiant.getLieuDepart()).isEqualTo(DEFAULT_LIEU_DEPART);
        assertThat(testEtudiant.isOptionSemestre()).isEqualTo(DEFAULT_OPTION_SEMESTRE);
        assertThat(testEtudiant.isCompteValide()).isEqualTo(DEFAULT_COMPTE_VALIDE);
    }

    @Test
    @Transactional
    public void createEtudiantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etudiantRepository.findAll().size();

        // Create the Etudiant with an existing ID
        etudiant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        // Validate the Etudiant in the database
        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNiveauScolaireIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantRepository.findAll().size();
        // set the field null
        etudiant.setNiveauScolaire(null);

        // Create the Etudiant, which fails.


        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDepartementIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantRepository.findAll().size();
        // set the field null
        etudiant.setDepartement(null);

        // Create the Etudiant, which fails.


        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNiveauPlancheIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantRepository.findAll().size();
        // set the field null
        etudiant.setNiveauPlanche(null);

        // Create the Etudiant, which fails.


        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPermisDeConduireIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantRepository.findAll().size();
        // set the field null
        etudiant.setPermisDeConduire(null);

        // Create the Etudiant, which fails.


        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLieuDepartIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantRepository.findAll().size();
        // set the field null
        etudiant.setLieuDepart(null);

        // Create the Etudiant, which fails.


        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOptionSemestreIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantRepository.findAll().size();
        // set the field null
        etudiant.setOptionSemestre(null);

        // Create the Etudiant, which fails.


        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCompteValideIsRequired() throws Exception {
        int databaseSizeBeforeTest = etudiantRepository.findAll().size();
        // set the field null
        etudiant.setCompteValide(null);

        // Create the Etudiant, which fails.


        restEtudiantMockMvc.perform(post("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEtudiants() throws Exception {
        // Initialize the database
        etudiantRepository.saveAndFlush(etudiant);

        // Get all the etudiantList
        restEtudiantMockMvc.perform(get("/api/etudiants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etudiant.getId().intValue())))
            .andExpect(jsonPath("$.[*].niveauScolaire").value(hasItem(DEFAULT_NIVEAU_SCOLAIRE.toString())))
            .andExpect(jsonPath("$.[*].departement").value(hasItem(DEFAULT_DEPARTEMENT.toString())))
            .andExpect(jsonPath("$.[*].niveauPlanche").value(hasItem(DEFAULT_NIVEAU_PLANCHE.toString())))
            .andExpect(jsonPath("$.[*].permisDeConduire").value(hasItem(DEFAULT_PERMIS_DE_CONDUIRE.booleanValue())))
            .andExpect(jsonPath("$.[*].lieuDepart").value(hasItem(DEFAULT_LIEU_DEPART)))
            .andExpect(jsonPath("$.[*].optionSemestre").value(hasItem(DEFAULT_OPTION_SEMESTRE.booleanValue())))
            .andExpect(jsonPath("$.[*].compteValide").value(hasItem(DEFAULT_COMPTE_VALIDE.booleanValue())));
    }
    
    @Test
    @Transactional
    public void getEtudiant() throws Exception {
        // Initialize the database
        etudiantRepository.saveAndFlush(etudiant);

        // Get the etudiant
        restEtudiantMockMvc.perform(get("/api/etudiants/{id}", etudiant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(etudiant.getId().intValue()))
            .andExpect(jsonPath("$.niveauScolaire").value(DEFAULT_NIVEAU_SCOLAIRE.toString()))
            .andExpect(jsonPath("$.departement").value(DEFAULT_DEPARTEMENT.toString()))
            .andExpect(jsonPath("$.niveauPlanche").value(DEFAULT_NIVEAU_PLANCHE.toString()))
            .andExpect(jsonPath("$.permisDeConduire").value(DEFAULT_PERMIS_DE_CONDUIRE.booleanValue()))
            .andExpect(jsonPath("$.lieuDepart").value(DEFAULT_LIEU_DEPART))
            .andExpect(jsonPath("$.optionSemestre").value(DEFAULT_OPTION_SEMESTRE.booleanValue()))
            .andExpect(jsonPath("$.compteValide").value(DEFAULT_COMPTE_VALIDE.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingEtudiant() throws Exception {
        // Get the etudiant
        restEtudiantMockMvc.perform(get("/api/etudiants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtudiant() throws Exception {
        // Initialize the database
        etudiantRepository.saveAndFlush(etudiant);

        int databaseSizeBeforeUpdate = etudiantRepository.findAll().size();

        // Update the etudiant
        Etudiant updatedEtudiant = etudiantRepository.findById(etudiant.getId()).get();
        // Disconnect from session so that the updates on updatedEtudiant are not directly saved in db
        em.detach(updatedEtudiant);
        updatedEtudiant
            .niveauScolaire(UPDATED_NIVEAU_SCOLAIRE)
            .departement(UPDATED_DEPARTEMENT)
            .niveauPlanche(UPDATED_NIVEAU_PLANCHE)
            .permisDeConduire(UPDATED_PERMIS_DE_CONDUIRE)
            .lieuDepart(UPDATED_LIEU_DEPART)
            .optionSemestre(UPDATED_OPTION_SEMESTRE)
            .compteValide(UPDATED_COMPTE_VALIDE);

        restEtudiantMockMvc.perform(put("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEtudiant)))
            .andExpect(status().isOk());

        // Validate the Etudiant in the database
        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeUpdate);
        Etudiant testEtudiant = etudiantList.get(etudiantList.size() - 1);
        assertThat(testEtudiant.getNiveauScolaire()).isEqualTo(UPDATED_NIVEAU_SCOLAIRE);
        assertThat(testEtudiant.getDepartement()).isEqualTo(UPDATED_DEPARTEMENT);
        assertThat(testEtudiant.getNiveauPlanche()).isEqualTo(UPDATED_NIVEAU_PLANCHE);
        assertThat(testEtudiant.isPermisDeConduire()).isEqualTo(UPDATED_PERMIS_DE_CONDUIRE);
        assertThat(testEtudiant.getLieuDepart()).isEqualTo(UPDATED_LIEU_DEPART);
        assertThat(testEtudiant.isOptionSemestre()).isEqualTo(UPDATED_OPTION_SEMESTRE);
        assertThat(testEtudiant.isCompteValide()).isEqualTo(UPDATED_COMPTE_VALIDE);
    }

    @Test
    @Transactional
    public void updateNonExistingEtudiant() throws Exception {
        int databaseSizeBeforeUpdate = etudiantRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEtudiantMockMvc.perform(put("/api/etudiants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etudiant)))
            .andExpect(status().isBadRequest());

        // Validate the Etudiant in the database
        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEtudiant() throws Exception {
        // Initialize the database
        etudiantRepository.saveAndFlush(etudiant);

        int databaseSizeBeforeDelete = etudiantRepository.findAll().size();

        // Delete the etudiant
        restEtudiantMockMvc.perform(delete("/api/etudiants/{id}", etudiant.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Etudiant> etudiantList = etudiantRepository.findAll();
        assertThat(etudiantList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void testexportcsv() throws Exception{
        restEtudiantMockMvc.perform(get("/api/etudiants/export"))
        .andExpect(status().isOk());
    }
}
