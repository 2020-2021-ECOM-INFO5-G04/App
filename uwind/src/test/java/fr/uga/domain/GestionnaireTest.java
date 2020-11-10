package fr.uga.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.uga.web.rest.TestUtil;

public class GestionnaireTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Gestionnaire.class);
        Gestionnaire gestionnaire1 = new Gestionnaire();
        gestionnaire1.setId(1L);
        Gestionnaire gestionnaire2 = new Gestionnaire();
        gestionnaire2.setId(gestionnaire1.getId());
        assertThat(gestionnaire1).isEqualTo(gestionnaire2);
        gestionnaire2.setId(2L);
        assertThat(gestionnaire1).isNotEqualTo(gestionnaire2);
        gestionnaire1.setId(null);
        assertThat(gestionnaire1).isNotEqualTo(gestionnaire2);
    }
}
