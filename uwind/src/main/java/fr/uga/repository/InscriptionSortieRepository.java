package fr.uga.repository;

import fr.uga.domain.InscriptionSortie;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InscriptionSortie entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InscriptionSortieRepository extends JpaRepository<InscriptionSortie, Long> {
}
