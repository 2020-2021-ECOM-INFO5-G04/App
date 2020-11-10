package fr.uga.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import fr.uga.domain.enumeration.NomFlotteur;

import fr.uga.domain.enumeration.NiveauPlancheAVoile;

/**
 * A Flotteur.
 */
@Entity
@Table(name = "flotteur")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Flotteur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nom", nullable = false)
    private NomFlotteur nom;

    @NotNull
    @DecimalMin(value = "0.0")
    @Column(name = "volume", nullable = false)
    private Float volume;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "niveau_planche_a_voile", nullable = false)
    private NiveauPlancheAVoile niveauPlancheAVoile;

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

    public NomFlotteur getNom() {
        return nom;
    }

    public Flotteur nom(NomFlotteur nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(NomFlotteur nom) {
        this.nom = nom;
    }

    public Float getVolume() {
        return volume;
    }

    public Flotteur volume(Float volume) {
        this.volume = volume;
        return this;
    }

    public void setVolume(Float volume) {
        this.volume = volume;
    }

    public NiveauPlancheAVoile getNiveauPlancheAVoile() {
        return niveauPlancheAVoile;
    }

    public Flotteur niveauPlancheAVoile(NiveauPlancheAVoile niveauPlancheAVoile) {
        this.niveauPlancheAVoile = niveauPlancheAVoile;
        return this;
    }

    public void setNiveauPlancheAVoile(NiveauPlancheAVoile niveauPlancheAVoile) {
        this.niveauPlancheAVoile = niveauPlancheAVoile;
    }

    public Boolean isUtilisable() {
        return utilisable;
    }

    public Flotteur utilisable(Boolean utilisable) {
        this.utilisable = utilisable;
        return this;
    }

    public void setUtilisable(Boolean utilisable) {
        this.utilisable = utilisable;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public Flotteur commentaire(String commentaire) {
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
        if (!(o instanceof Flotteur)) {
            return false;
        }
        return id != null && id.equals(((Flotteur) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Flotteur{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", volume=" + getVolume() +
            ", niveauPlancheAVoile='" + getNiveauPlancheAVoile() + "'" +
            ", utilisable='" + isUtilisable() + "'" +
            ", commentaire='" + getCommentaire() + "'" +
            "}";
    }
}
