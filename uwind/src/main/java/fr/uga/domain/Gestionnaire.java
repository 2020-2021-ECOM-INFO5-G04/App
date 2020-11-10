package fr.uga.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Gestionnaire.
 */
@Entity
@Table(name = "gestionnaire")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Gestionnaire implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Profil profil;

    @OneToMany(mappedBy = "gestionnaire")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Evaluation> evaluations = new HashSet<>();

    @OneToMany(mappedBy = "gestionnaire")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Observation> observations = new HashSet<>();

    @OneToMany(mappedBy = "gestionnaire")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Sortie> sorties = new HashSet<>();

    @OneToMany(mappedBy = "gestionnaire")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<InscriptionSortie> inscriptionSorties = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Profil getProfil() {
        return profil;
    }

    public Gestionnaire profil(Profil profil) {
        this.profil = profil;
        return this;
    }

    public void setProfil(Profil profil) {
        this.profil = profil;
    }

    public Set<Evaluation> getEvaluations() {
        return evaluations;
    }

    public Gestionnaire evaluations(Set<Evaluation> evaluations) {
        this.evaluations = evaluations;
        return this;
    }

    public Gestionnaire addEvaluation(Evaluation evaluation) {
        this.evaluations.add(evaluation);
        evaluation.setGestionnaire(this);
        return this;
    }

    public Gestionnaire removeEvaluation(Evaluation evaluation) {
        this.evaluations.remove(evaluation);
        evaluation.setGestionnaire(null);
        return this;
    }

    public void setEvaluations(Set<Evaluation> evaluations) {
        this.evaluations = evaluations;
    }

    public Set<Observation> getObservations() {
        return observations;
    }

    public Gestionnaire observations(Set<Observation> observations) {
        this.observations = observations;
        return this;
    }

    public Gestionnaire addObservation(Observation observation) {
        this.observations.add(observation);
        observation.setGestionnaire(this);
        return this;
    }

    public Gestionnaire removeObservation(Observation observation) {
        this.observations.remove(observation);
        observation.setGestionnaire(null);
        return this;
    }

    public void setObservations(Set<Observation> observations) {
        this.observations = observations;
    }

    public Set<Sortie> getSorties() {
        return sorties;
    }

    public Gestionnaire sorties(Set<Sortie> sorties) {
        this.sorties = sorties;
        return this;
    }

    public Gestionnaire addSortie(Sortie sortie) {
        this.sorties.add(sortie);
        sortie.setGestionnaire(this);
        return this;
    }

    public Gestionnaire removeSortie(Sortie sortie) {
        this.sorties.remove(sortie);
        sortie.setGestionnaire(null);
        return this;
    }

    public void setSorties(Set<Sortie> sorties) {
        this.sorties = sorties;
    }

    public Set<InscriptionSortie> getInscriptionSorties() {
        return inscriptionSorties;
    }

    public Gestionnaire inscriptionSorties(Set<InscriptionSortie> inscriptionSorties) {
        this.inscriptionSorties = inscriptionSorties;
        return this;
    }

    public Gestionnaire addInscriptionSortie(InscriptionSortie inscriptionSortie) {
        this.inscriptionSorties.add(inscriptionSortie);
        inscriptionSortie.setGestionnaire(this);
        return this;
    }

    public Gestionnaire removeInscriptionSortie(InscriptionSortie inscriptionSortie) {
        this.inscriptionSorties.remove(inscriptionSortie);
        inscriptionSortie.setGestionnaire(null);
        return this;
    }

    public void setInscriptionSorties(Set<InscriptionSortie> inscriptionSorties) {
        this.inscriptionSorties = inscriptionSorties;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Gestionnaire)) {
            return false;
        }
        return id != null && id.equals(((Gestionnaire) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Gestionnaire{" +
            "id=" + getId() +
            "}";
    }
}
