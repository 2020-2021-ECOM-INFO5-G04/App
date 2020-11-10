package fr.uga.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import fr.uga.domain.enumeration.NomCombinaison;

import fr.uga.domain.enumeration.TailleCombinaison;

import fr.uga.domain.enumeration.PoidsCombinaison;

/**
 * A Combinaison.
 */
@Entity
@Table(name = "combinaison")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Combinaison implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nom", nullable = false)
    private NomCombinaison nom;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "taille", nullable = false)
    private TailleCombinaison taille;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "poids", nullable = false)
    private PoidsCombinaison poids;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NomCombinaison getNom() {
        return nom;
    }

    public Combinaison nom(NomCombinaison nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(NomCombinaison nom) {
        this.nom = nom;
    }

    public TailleCombinaison getTaille() {
        return taille;
    }

    public Combinaison taille(TailleCombinaison taille) {
        this.taille = taille;
        return this;
    }

    public void setTaille(TailleCombinaison taille) {
        this.taille = taille;
    }

    public PoidsCombinaison getPoids() {
        return poids;
    }

    public Combinaison poids(PoidsCombinaison poids) {
        this.poids = poids;
        return this;
    }

    public void setPoids(PoidsCombinaison poids) {
        this.poids = poids;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Combinaison)) {
            return false;
        }
        return id != null && id.equals(((Combinaison) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Combinaison{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", taille='" + getTaille() + "'" +
            ", poids='" + getPoids() + "'" +
            "}";
    }
}
