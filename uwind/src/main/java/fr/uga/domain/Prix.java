package fr.uga.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Prix.
 */
@Entity
@Table(name = "prix")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Prix implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    private LocalDate date;

    @NotNull
    @Column(name = "prix_fp", nullable = false)
    private Double prixFP;

    @NotNull
    @Column(name = "prix_fq", nullable = false)
    private Double prixFQ;

    @NotNull
    @Column(name = "active", nullable = false)
    private Boolean active;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Prix date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getPrixFP() {
        return prixFP;
    }

    public Prix prixFP(Double prixFP) {
        this.prixFP = prixFP;
        return this;
    }

    public void setPrixFP(Double prixFP) {
        this.prixFP = prixFP;
    }

    public Double getPrixFQ() {
        return prixFQ;
    }

    public Prix prixFQ(Double prixFQ) {
        this.prixFQ = prixFQ;
        return this;
    }

    public void setPrixFQ(Double prixFQ) {
        this.prixFQ = prixFQ;
    }

    public Boolean isActive() {
        return active;
    }

    public Prix active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Prix)) {
            return false;
        }
        return id != null && id.equals(((Prix) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Prix{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", prixFP=" + getPrixFP() +
            ", prixFQ=" + getPrixFQ() +
            ", active='" + isActive() + "'" +
            "}";
    }
}
