package fr.uga.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Observation.
 */
@Entity
@Table(name = "observation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Observation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "observation", nullable = false)
    private String observation;

    @ManyToOne
    @JsonIgnoreProperties(value = "observations", allowSetters = true)
    private Etudiant etudiant;

    @ManyToOne
    @JsonIgnoreProperties(value = "observations", allowSetters = true)
    private Moniteur moniteur;

    @ManyToOne
    @JsonIgnoreProperties(value = "observations", allowSetters = true)
    private Gestionnaire gestionnaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getObservation() {
        return observation;
    }

    public Observation observation(String observation) {
        this.observation = observation;
        return this;
    }

    public void setObservation(String observation) {
        this.observation = observation;
    }

    public Etudiant getEtudiant() {
        return etudiant;
    }

    public Observation etudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
        return this;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    public Moniteur getMoniteur() {
        return moniteur;
    }

    public Observation moniteur(Moniteur moniteur) {
        this.moniteur = moniteur;
        return this;
    }

    public void setMoniteur(Moniteur moniteur) {
        this.moniteur = moniteur;
    }

    public Gestionnaire getGestionnaire() {
        return gestionnaire;
    }

    public Observation gestionnaire(Gestionnaire gestionnaire) {
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
        if (!(o instanceof Observation)) {
            return false;
        }
        return id != null && id.equals(((Observation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Observation{" +
            "id=" + getId() +
            ", observation='" + getObservation() + "'" +
            "}";
    }
}
