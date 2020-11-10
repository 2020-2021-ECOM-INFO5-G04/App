package fr.uga.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.uga.web.rest.TestUtil;

public class FlotteurTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Flotteur.class);
        Flotteur flotteur1 = new Flotteur();
        flotteur1.setId(1L);
        Flotteur flotteur2 = new Flotteur();
        flotteur2.setId(flotteur1.getId());
        assertThat(flotteur1).isEqualTo(flotteur2);
        flotteur2.setId(2L);
        assertThat(flotteur1).isNotEqualTo(flotteur2);
        flotteur1.setId(null);
        assertThat(flotteur1).isNotEqualTo(flotteur2);
    }
}
