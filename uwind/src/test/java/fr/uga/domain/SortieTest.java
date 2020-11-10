package fr.uga.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.uga.web.rest.TestUtil;

public class SortieTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sortie.class);
        Sortie sortie1 = new Sortie();
        sortie1.setId(1L);
        Sortie sortie2 = new Sortie();
        sortie2.setId(sortie1.getId());
        assertThat(sortie1).isEqualTo(sortie2);
        sortie2.setId(2L);
        assertThat(sortie1).isNotEqualTo(sortie2);
        sortie1.setId(null);
        assertThat(sortie1).isNotEqualTo(sortie2);
    }
}
