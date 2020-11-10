package fr.uga.repository;

import fr.uga.domain.Moniteur;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Moniteur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MoniteurRepository extends JpaRepository<Moniteur, Long> {
}
