package fr.uga.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import fr.uga.domain.enumeration.PlanDEau;

/**
 * A Sortie.
 */
@Entity
@Table(name = "sortie")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Sortie implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 5, max = 20)
    @Column(name = "nom", length = 20, nullable = false)
    private String nom;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "plan_deau", nullable = false)
    private PlanDEau planDeau;

    @NotNull
    @Min(value = 0L)
    @Column(name = "coeff", nullable = false)
    private Long coeff;

    @Column(name = "commentaire")
    private String commentaire;

    @OneToMany(mappedBy = "sortie")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<InscriptionSortie> inscriptionSorties = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "sorties", allowSetters = true)
    private Gestionnaire gestionnaire;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Sortie nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public LocalDate getDate() {
        return date;
    }

    public Sortie date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public PlanDEau getPlanDeau() {
        return planDeau;
    }

    public Sortie planDeau(PlanDEau planDeau) {
        this.planDeau = planDeau;
        return this;
    }

    public void setPlanDeau(PlanDEau planDeau) {
        this.planDeau = planDeau;
    }

    public Long getCoeff() {
        return coeff;
    }

    public Sortie coeff(Long coeff) {
        this.coeff = coeff;
        return this;
    }

    public void setCoeff(Long coeff) {
        this.coeff = coeff;
    }

    public String getCommentaire() {
        return commentaire;
    }

    public Sortie commentaire(String commentaire) {
        this.commentaire = commentaire;
        return this;
    }

    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }

    public Set<InscriptionSortie> getInscriptionSorties() {
        return inscriptionSorties;
    }

    public Sortie inscriptionSorties(Set<InscriptionSortie> inscriptionSorties) {
        this.inscriptionSorties = inscriptionSorties;
        return this;
    }

    public Sortie addInscriptionSortie(InscriptionSortie inscriptionSortie) {
        this.inscriptionSorties.add(inscriptionSortie);
        inscriptionSortie.setSortie(this);
        return this;
    }

    public Sortie removeInscriptionSortie(InscriptionSortie inscriptionSortie) {
        this.inscriptionSorties.remove(inscriptionSortie);
        inscriptionSortie.setSortie(null);
        return this;
    }

    public void setInscriptionSorties(Set<InscriptionSortie> inscriptionSorties) {
        this.inscriptionSorties = inscriptionSorties;
    }

    public Gestionnaire getGestionnaire() {
        return gestionnaire;
    }

    public Sortie gestionnaire(Gestionnaire gestionnaire) {
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
        if (!(o instanceof Sortie)) {
            return false;
        }
        return id != null && id.equals(((Sortie) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sortie{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", date='" + getDate() + "'" +
            ", planDeau='" + getPlanDeau() + "'" +
            ", coeff=" + getCoeff() +
            ", commentaire='" + getCommentaire() + "'" +
            "}";
    }
}
