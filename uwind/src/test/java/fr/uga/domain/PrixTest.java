package fr.uga.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.uga.web.rest.TestUtil;

public class PrixTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Prix.class);
        Prix prix1 = new Prix();
        prix1.setId(1L);
        Prix prix2 = new Prix();
        prix2.setId(prix1.getId());
        assertThat(prix1).isEqualTo(prix2);
        prix2.setId(2L);
        assertThat(prix1).isNotEqualTo(prix2);
        prix1.setId(null);
        assertThat(prix1).isNotEqualTo(prix2);
    }
}
