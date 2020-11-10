package fr.uga.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.uga.web.rest.TestUtil;

public class VoileTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Voile.class);
        Voile voile1 = new Voile();
        voile1.setId(1L);
        Voile voile2 = new Voile();
        voile2.setId(voile1.getId());
        assertThat(voile1).isEqualTo(voile2);
        voile2.setId(2L);
        assertThat(voile1).isNotEqualTo(voile2);
        voile1.setId(null);
        assertThat(voile1).isNotEqualTo(voile2);
    }
}
