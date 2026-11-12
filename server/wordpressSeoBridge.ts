import JSZip from 'jszip';

// Distributed as a normal, optional WordPress plugin; no server files are read at runtime.
export const wordpressSeoBridgeSource = `<?php
/**
 * Plugin Name: GOM-MAR Academy SEO Bridge
 * Description: Erlaubt berechtigten WordPress-Benutzern die Rank-Math-Felder über die Beiträge-API zu speichern.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * License: GPL-2.0-or-later
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
add_action( 'init', function () {
    if ( ! defined( 'RANK_MATH_VERSION' ) ) { return; }
    foreach ( array( 'rank_math_title', 'rank_math_description', 'rank_math_focus_keyword' ) as $key ) {
        register_post_meta( 'post', $key, array(
            'type' => 'string',
            'single' => true,
            'default' => '',
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback' => function ( $allowed, $meta_key, $post_id ) {
                return get_post_type( $post_id ) === 'post' && current_user_can( 'edit_post', $post_id );
            },
            'show_in_rest' => array( 'schema' => array( 'type' => 'string', 'context' => array( 'edit' ) ) ),
        ) );
    }
}, 100 );
`;
export async function wordpressSeoBridgeZip(): Promise<Buffer> {
  const zip = new JSZip();
  zip.file('gommar-academy-seo/gommar-academy-seo.php', wordpressSeoBridgeSource);
  zip.file('gommar-academy-seo/readme.txt', 'GOM-MAR Academy SEO Bridge 1.0.0\n\nVoraussetzung: Rank Math aktiv. Installation: Plugins > Neues Plugin > Plugin hochladen, ZIP auswählen, installieren und aktivieren. Danach in der Academy die SEO-Verbindung erneut prüfen.\n\nRegistriert ausschließlich drei Rank-Math-Textfelder für Beiträge. Kein neuer öffentlicher Schreibzugriff, keine Zugangsdaten im Plugin. WordPress prüft Anmeldung und Bearbeitungsrechte pro Beitrag. Keine eigenen Meta-Tags oder Schema-Ausgaben. Deaktivieren beendet die API-Freigabe; gespeicherte SEO-Werte bleiben erhalten.\n');
  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
}
