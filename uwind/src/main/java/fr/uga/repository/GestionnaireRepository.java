package fr.uga.repository;

import fr.uga.domain.Gestionnaire;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Gestionnaire entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GestionnaireRepository extends JpaRepository<Gestionnaire, Long> {
}
