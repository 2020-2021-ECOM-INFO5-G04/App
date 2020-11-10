package fr.uga.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.uga.web.rest.TestUtil;

public class MoniteurTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Moniteur.class);
        Moniteur moniteur1 = new Moniteur();
        moniteur1.setId(1L);
        Moniteur moniteur2 = new Moniteur();
        moniteur2.setId(moniteur1.getId());
        assertThat(moniteur1).isEqualTo(moniteur2);
        moniteur2.setId(2L);
        assertThat(moniteur1).isNotEqualTo(moniteur2);
        moniteur1.setId(null);
        assertThat(moniteur1).isNotEqualTo(moniteur2);
    }
}
