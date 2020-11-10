package fr.uga.repository;

import fr.uga.domain.Profil;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Profil entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfilRepository extends JpaRepository<Profil, Long> {
}
