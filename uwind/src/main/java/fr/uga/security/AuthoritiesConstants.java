package fr.uga.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";
    
    public static final String ETUDIANT = "ROLE_ETUDIANT";
    
    public static final String MONITEUR = "ROLE_MONITEUR";
    
    public static final String GESTIONNAIRE = "ROLE_GESTIONNAIRE";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    private AuthoritiesConstants() {
    }
}
