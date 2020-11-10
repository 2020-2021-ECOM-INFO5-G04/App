package fr.uga.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A InscriptionSortie.
 */
@Entity
@Table(name = "inscription_sortie")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class InscriptionSortie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = "inscriptionSorties", allowSetters = true)
    private Etudiant etudiant;

    @ManyToOne
    @JsonIgnoreProperties(value = "inscriptionSorties", allowSetters = true)
    private Sortie sortie;

    @ManyToOne
    @JsonIgnoreProperties(value = "inscriptionSorties", allowSetters = true)
    private Moniteur moniteur;

    @ManyToOne
    @JsonIgnoreProperties(value = "inscriptionSorties", allowSetters = true)
    private Gestionnaire gestionnaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Etudiant getEtudiant() {
        return etudiant;
    }

    public InscriptionSortie etudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
        return this;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    public Sortie getSortie() {
        return sortie;
    }

    public InscriptionSortie sortie(Sortie sortie) {
        this.sortie = sortie;
        return this;
    }

    public void setSortie(Sortie sortie) {
        this.sortie = sortie;
    }

    public Moniteur getMoniteur() {
        return moniteur;
    }

    public InscriptionSortie moniteur(Moniteur moniteur) {
        this.moniteur = moniteur;
        return this;
    }

    public void setMoniteur(Moniteur moniteur) {
        this.moniteur = moniteur;
    }

    public Gestionnaire getGestionnaire() {
        return gestionnaire;
    }

    public InscriptionSortie gestionnaire(Gestionnaire gestionnaire) {
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
        if (!(o instanceof InscriptionSortie)) {
            return false;
        }
        return id != null && id.equals(((InscriptionSortie) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "InscriptionSortie{" +
            "id=" + getId() +
            "}";
    }
}
