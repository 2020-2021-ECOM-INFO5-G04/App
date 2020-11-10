package fr.uga.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Moniteur.
 */
@Entity
@Table(name = "moniteur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Moniteur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @OneToMany(mappedBy = "moniteur")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Observation> observations = new HashSet<>();

    @OneToMany(mappedBy = "moniteur")
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

    public Moniteur profil(Profil profil) {
        this.profil = profil;
        return this;
    }

    public void setProfil(Profil profil) {
        this.profil = profil;
    }

    public Flotteur getFlotteur() {
        return flotteur;
    }

    public Moniteur flotteur(Flotteur flotteur) {
        this.flotteur = flotteur;
        return this;
    }

    public void setFlotteur(Flotteur flotteur) {
        this.flotteur = flotteur;
    }

    public Voile getVoile() {
        return voile;
    }

    public Moniteur voile(Voile voile) {
        this.voile = voile;
        return this;
    }

    public void setVoile(Voile voile) {
        this.voile = voile;
    }

    public Combinaison getCombinaison() {
        return combinaison;
    }

    public Moniteur combinaison(Combinaison combinaison) {
        this.combinaison = combinaison;
        return this;
    }

    public void setCombinaison(Combinaison combinaison) {
        this.combinaison = combinaison;
    }

    public Set<Observation> getObservations() {
        return observations;
    }

    public Moniteur observations(Set<Observation> observations) {
        this.observations = observations;
        return this;
    }

    public Moniteur addObservation(Observation observation) {
        this.observations.add(observation);
        observation.setMoniteur(this);
        return this;
    }

    public Moniteur removeObservation(Observation observation) {
        this.observations.remove(observation);
        observation.setMoniteur(null);
        return this;
    }

    public void setObservations(Set<Observation> observations) {
        this.observations = observations;
    }

    public Set<InscriptionSortie> getInscriptionSorties() {
        return inscriptionSorties;
    }

    public Moniteur inscriptionSorties(Set<InscriptionSortie> inscriptionSorties) {
        this.inscriptionSorties = inscriptionSorties;
        return this;
    }

    public Moniteur addInscriptionSortie(InscriptionSortie inscriptionSortie) {
        this.inscriptionSorties.add(inscriptionSortie);
        inscriptionSortie.setMoniteur(this);
        return this;
    }

    public Moniteur removeInscriptionSortie(InscriptionSortie inscriptionSortie) {
        this.inscriptionSorties.remove(inscriptionSortie);
        inscriptionSortie.setMoniteur(null);
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
        if (!(o instanceof Moniteur)) {
            return false;
        }
        return id != null && id.equals(((Moniteur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Moniteur{" +
            "id=" + getId() +
            "}";
    }
}
