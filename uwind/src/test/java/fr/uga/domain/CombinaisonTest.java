package fr.uga.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.uga.web.rest.TestUtil;

public class CombinaisonTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Combinaison.class);
        Combinaison combinaison1 = new Combinaison();
        combinaison1.setId(1L);
        Combinaison combinaison2 = new Combinaison();
        combinaison2.setId(combinaison1.getId());
        assertThat(combinaison1).isEqualTo(combinaison2);
        combinaison2.setId(2L);
        assertThat(combinaison1).isNotEqualTo(combinaison2);
        combinaison1.setId(null);
        assertThat(combinaison1).isNotEqualTo(combinaison2);
    }
}
