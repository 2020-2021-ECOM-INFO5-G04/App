package fr.uga.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Evaluation.
 */
@Entity
@Table(name = "evaluation")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Evaluation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @DecimalMin(value = "0.0")
    @DecimalMax(value = "20.0")
    @Column(name = "note", nullable = false)
    private Float note;

    @Column(name = "commentaire")
    private String commentaire;

    @ManyToOne
    @JsonIgnoreProperties(value = "evaluations", allowSetters = true)
    private Etudiant etudiant;

    @ManyToOne
    @JsonIgnoreProperties(value = "evaluations", allowSetters = true)
    private Gestionnaire gestionnaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getNote() {
        return note;
    }

    public Evaluation note(Float note) {
        this.note = note;
        return this;
    }

    public void setNote(Float note) {
        this.note = note;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public Evaluation commentaire(String commentaire) {
        this.commentaire = commentaire;
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public Etudiant getEtudiant() {
        return etudiant;
    }

    public Evaluation etudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
        return this;
    }

    public void setEtudiant(Etudiant etudiant) {
        this.etudiant = etudiant;
    }

    public Gestionnaire getGestionnaire() {
        return gestionnaire;
    }

    public Evaluation gestionnaire(Gestionnaire gestionnaire) {
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
        if (!(o instanceof Evaluation)) {
            return false;
        }
        return id != null && id.equals(((Evaluation) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Evaluation{" +
            "id=" + getId() +
            ", note=" + getNote() +
            ", commentaire='" + getCommentaire() + "'" +
            "}";
    }
}
