package fr.uga.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.uga.web.rest.TestUtil;

public class InscriptionSortieTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(InscriptionSortie.class);
        InscriptionSortie inscriptionSortie1 = new InscriptionSortie();
        inscriptionSortie1.setId(1L);
        InscriptionSortie inscriptionSortie2 = new InscriptionSortie();
        inscriptionSortie2.setId(inscriptionSortie1.getId());
        assertThat(inscriptionSortie1).isEqualTo(inscriptionSortie2);
        inscriptionSortie2.setId(2L);
        assertThat(inscriptionSortie1).isNotEqualTo(inscriptionSortie2);
        inscriptionSortie1.setId(null);
        assertThat(inscriptionSortie1).isNotEqualTo(inscriptionSortie2);
    }
}
