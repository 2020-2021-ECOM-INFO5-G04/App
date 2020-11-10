package fr.uga.repository;

import fr.uga.domain.Voile;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Voile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VoileRepository extends JpaRepository<Voile, Long> {
}
