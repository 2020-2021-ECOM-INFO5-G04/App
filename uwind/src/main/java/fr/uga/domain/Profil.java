package fr.uga.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Profil.
 */
@Entity
@Table(name = "profil")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Profil implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 2, max = 20)
    @Column(name = "prenom", length = 20, nullable = false)
    private String prenom;

    @NotNull
    @Size(min = 2, max = 20)
    @Column(name = "nom", length = 20, nullable = false)
    private String nom;

    @NotNull
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+.[^@\\s]+$")
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Size(min = 10)
    @Column(name = "num_tel", nullable = false)
    private String numTel;

    @OneToOne
    @JoinColumn(unique = true)
    private User utilisateur;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPrenom() {
        return prenom;
    }

    public Profil prenom(String prenom) {
        this.prenom = prenom;
        return this;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public Profil nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return email;
    }

    public Profil email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNumTel() {
        return numTel;
    }

    public Profil numTel(String numTel) {
        this.numTel = numTel;
        return this;
    }

    public void setNumTel(String numTel) {
        this.numTel = numTel;
    }

    public User getUtilisateur() {
        return utilisateur;
    }

    public Profil utilisateur(User user) {
        this.utilisateur = user;
        return this;
    }

    public void setUtilisateur(User user) {
        this.utilisateur = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Profil)) {
            return false;
        }
        return id != null && id.equals(((Profil) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Profil{" +
            "id=" + getId() +
            ", prenom='" + getPrenom() + "'" +
            ", nom='" + getNom() + "'" +
            ", email='" + getEmail() + "'" +
            ", numTel='" + getNumTel() + "'" +
            "}";
    }
}
