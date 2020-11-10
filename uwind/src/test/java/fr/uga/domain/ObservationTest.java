package fr.uga.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.uga.web.rest.TestUtil;

public class ObservationTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Observation.class);
        Observation observation1 = new Observation();
        observation1.setId(1L);
        Observation observation2 = new Observation();
        observation2.setId(observation1.getId());
        assertThat(observation1).isEqualTo(observation2);
        observation2.setId(2L);
        assertThat(observation1).isNotEqualTo(observation2);
        observation1.setId(null);
        assertThat(observation1).isNotEqualTo(observation2);
    }
}
