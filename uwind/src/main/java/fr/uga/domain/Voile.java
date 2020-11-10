package fr.uga.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import fr.uga.domain.enumeration.NomVoile;

import fr.uga.domain.enumeration.NiveauPlancheAVoile;

/**
 * A Voile.
 */
@Entity
@Table(name = "voile")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Voile implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nom_complet", nullable = false)
    private NomVoile nomComplet;

    @NotNull
    @DecimalMin(value = "0.0")
    @Column(name = "surface", nullable = false)
    private Float surface;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "niveau", nullable = false)
    private NiveauPlancheAVoile niveau;

    @NotNull
    @Column(name = "utilisable", nullable = false)
    private Boolean utilisable;

    @Column(name = "commentaire")
    private String commentaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NomVoile getNomComplet() {
        return nomComplet;
    }

    public Voile nomComplet(NomVoile nomComplet) {
        this.nomComplet = nomComplet;
        return this;
    }

    public void setNomComplet(NomVoile nomComplet) {
        this.nomComplet = nomComplet;
    }

    public Float getSurface() {
        return surface;
    }

    public Voile surface(Float surface) {
        this.surface = surface;
        return this;
    }

    public void setSurface(Float surface) {
        this.surface = surface;
    }

    public NiveauPlancheAVoile getNiveau() {
        return niveau;
    }

    public Voile niveau(NiveauPlancheAVoile niveau) {
        this.niveau = niveau;
        return this;
    }

    public void setNiveau(NiveauPlancheAVoile niveau) {
        this.niveau = niveau;
    }

    public Boolean isUtilisable() {
        return utilisable;
    }

    public Voile utilisable(Boolean utilisable) {
        this.utilisable = utilisable;
        return this;
    }

    public void setUtilisable(Boolean utilisable) {
        this.utilisable = utilisable;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public Voile commentaire(String commentaire) {
        this.commentaire = commentaire;
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Voile)) {
            return false;
        }
        return id != null && id.equals(((Voile) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Voile{" +
            "id=" + getId() +
            ", nomComplet='" + getNomComplet() + "'" +
            ", surface=" + getSurface() +
            ", niveau='" + getNiveau() + "'" +
            ", utilisable='" + isUtilisable() + "'" +
            ", commentaire='" + getCommentaire() + "'" +
            "}";
    }
}
