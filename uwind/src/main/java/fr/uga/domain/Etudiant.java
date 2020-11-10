package fr.uga.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import fr.uga.domain.enumeration.NiveauEtudes;

import fr.uga.domain.enumeration.Filiere;

import fr.uga.domain.enumeration.NiveauPlancheAVoile;

/**
 * A Etudiant.
 */
@Entity
@Table(name = "etudiant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Etudiant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "niveau_scolaire", nullable = false)
    private NiveauEtudes niveauScolaire;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "departement", nullable = false)
    private Filiere departement;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "niveau_planche", nullable = false)
    private NiveauPlancheAVoile niveauPlanche;

    @NotNull
    @Column(name = "permis_de_conduire", nullable = false)
    private Boolean permisDeConduire;

    @NotNull
    @Column(name = "lieu_depart", nullable = false)
    private String lieuDepart;

    @NotNull
    @Column(name = "option_semestre", nullable = false)
    private Boolean optionSemestre;

    @NotNull
    @Column(name = "compte_valide", nullable = false)
    private Boolean compteValide;

    @OneToOne
    @JoinColumn(unique = true)
    private Profil profil;

    @OneToOne
    @JoinColumn(unique = true)
    private Flotteur flotteur;

    @OneToOne
    @JoinColumn(unique = true)
    private Voile voile;

    @OneToOne
    @JoinColumn(unique = true)
    private Combinaison combinaison;

    @OneToMany(mappedBy = "etudiant")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Observation> observations = new HashSet<>();

    @OneToMany(mappedBy = "etudiant")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Evaluation> evaluations = new HashSet<>();

    @OneToMany(mappedBy = "etudiant")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<InscriptionSortie> inscriptionSorties = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "etudiants", allowSetters = true)
    private Gestionnaire gestionnaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NiveauEtudes getNiveauScolaire() {
        return niveauScolaire;
    }

    public Etudiant niveauScolaire(NiveauEtudes niveauScolaire) {
        this.niveauScolaire = niveauScolaire;
        return this;
    }

    public void setNiveauScolaire(NiveauEtudes niveauScolaire) {
        this.niveauScolaire = niveauScolaire;
    }

    public Filiere getDepartement() {
        return departement;
    }

    public Etudiant departement(Filiere departement) {
        this.departement = departement;
        return this;
    }

    public void setDepartement(Filiere departement) {
        this.departement = departement;
    }

    public NiveauPlancheAVoile getNiveauPlanche() {
        return niveauPlanche;
    }

    public Etudiant niveauPlanche(NiveauPlancheAVoile niveauPlanche) {
        this.niveauPlanche = niveauPlanche;
        return this;
    }

    public void setNiveauPlanche(NiveauPlancheAVoile niveauPlanche) {
        this.niveauPlanche = niveauPlanche;
    }

    public Boolean isPermisDeConduire() {
        return permisDeConduire;
    }

    public Etudiant permisDeConduire(Boolean permisDeConduire) {
        this.permisDeConduire = permisDeConduire;
        return this;
    }

    public void setPermisDeConduire(Boolean permisDeConduire) {
        this.permisDeConduire = permisDeConduire;
    }

    public String getLieuDepart() {
        return lieuDepart;
    }

    public Etudiant lieuDepart(String lieuDepart) {
        this.lieuDepart = lieuDepart;
        return this;
    }

    public void setLieuDepart(String lieuDepart) {
        this.lieuDepart = lieuDepart;
    }

    public Boolean isOptionSemestre() {
        return optionSemestre;
    }

    public Etudiant optionSemestre(Boolean optionSemestre) {
        this.optionSemestre = optionSemestre;
        return this;
    }

    public void setOptionSemestre(Boolean optionSemestre) {
        this.optionSemestre = optionSemestre;
    }

    public Boolean isCompteValide() {
        return compteValide;
    }

    public Etudiant compteValide(Boolean compteValide) {
        this.compteValide = compteValide;
        return this;
    }

    public void setCompteValide(Boolean compteValide) {
        this.compteValide = compteValide;
    }

    public Profil getProfil() {
        return profil;
    }

    public Etudiant profil(Profil profil) {
        this.profil = profil;
        return this;
    }

    public void setProfil(Profil profil) {
        this.profil = profil;
    }

    public Flotteur getFlotteur() {
        return flotteur;
    }

    public Etudiant flotteur(Flotteur flotteur) {
        this.flotteur = flotteur;
        return this;
    }

    public void setFlotteur(Flotteur flotteur) {
        this.flotteur = flotteur;
    }

    public Voile getVoile() {
        return voile;
    }

    public Etudiant voile(Voile voile) {
        this.voile = voile;
        return this;
    }

    public void setVoile(Voile voile) {
        this.voile = voile;
    }

    public Combinaison getCombinaison() {
        return combinaison;
    }

    public Etudiant combinaison(Combinaison combinaison) {
        this.combinaison = combinaison;
        return this;
    }

    public void setCombinaison(Combinaison combinaison) {
        this.combinaison = combinaison;
    }

    public Set<Observation> getObservations() {
        return observations;
    }

    public Etudiant observations(Set<Observation> observations) {
        this.observations = observations;
        return this;
    }

    public Etudiant addObservation(Observation observation) {
        this.observations.add(observation);
        observation.setEtudiant(this);
        return this;
    }

    public Etudiant removeObservation(Observation observation) {
        this.observations.remove(observation);
        observation.setEtudiant(null);
        return this;
    }

    public void setObservations(Set<Observation> observations) {
        this.observations = observations;
    }

    public Set<Evaluation> getEvaluations() {
        return evaluations;
    }

    public Etudiant evaluations(Set<Evaluation> evaluations) {
        this.evaluations = evaluations;
        return this;
    }

    public Etudiant addEvaluation(Evaluation evaluation) {
        this.evaluations.add(evaluation);
        evaluation.setEtudiant(this);
        return this;
    }

    public Etudiant removeEvaluation(Evaluation evaluation) {
        this.evaluations.remove(evaluation);
        evaluation.setEtudiant(null);
        return this;
    }

    public void setEvaluations(Set<Evaluation> evaluations) {
        this.evaluations = evaluations;
    }

    public Set<InscriptionSortie> getInscriptionSorties() {
        return inscriptionSorties;
    }

    public Etudiant inscriptionSorties(Set<InscriptionSortie> inscriptionSorties) {
        this.inscriptionSorties = inscriptionSorties;
        return this;
    }

    public Etudiant addInscriptionSortie(InscriptionSortie inscriptionSortie) {
        this.inscriptionSorties.add(inscriptionSortie);
        inscriptionSortie.setEtudiant(this);
        return this;
    }

    public Etudiant removeInscriptionSortie(InscriptionSortie inscriptionSortie) {
        this.inscriptionSorties.remove(inscriptionSortie);
        inscriptionSortie.setEtudiant(null);
        return this;
    }

    public void setInscriptionSorties(Set<InscriptionSortie> inscriptionSorties) {
        this.inscriptionSorties = inscriptionSorties;
    }

    public Gestionnaire getGestionnaire() {
        return gestionnaire;
    }

    public Etudiant gestionnaire(Gestionnaire gestionnaire) {
        this.gestionnaire = gestionnaire;
        return this;
    }

    public void setGestionnaire(Gestionnaire gestionnaire) {
        this.gestionnaire = gestionnaire;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Etudiant)) {
            return false;
        }
        return id != null && id.equals(((Etudiant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Etudiant{" +
            "id=" + getId() +
            ", niveauScolaire='" + getNiveauScolaire() + "'" +
            ", departement='" + getDepartement() + "'" +
            ", niveauPlanche='" + getNiveauPlanche() + "'" +
            ", permisDeConduire='" + isPermisDeConduire() + "'" +
            ", lieuDepart='" + getLieuDepart() + "'" +
            ", optionSemestre='" + isOptionSemestre() + "'" +
            ", compteValide='" + isCompteValide() + "'" +
            "}";
    }
}
