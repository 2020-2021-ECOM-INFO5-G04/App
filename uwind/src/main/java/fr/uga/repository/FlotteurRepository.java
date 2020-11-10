package fr.uga.repository;

import fr.uga.domain.Flotteur;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Flotteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FlotteurRepository extends JpaRepository<Flotteur, Long> {
}
