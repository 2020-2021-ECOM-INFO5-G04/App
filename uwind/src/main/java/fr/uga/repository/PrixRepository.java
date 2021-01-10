package fr.uga.repository;

import fr.uga.domain.Prix;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Prix entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PrixRepository extends JpaRepository<Prix, Long> {
}
