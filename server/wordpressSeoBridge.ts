import JSZip from 'jszip';

// Distributed as a normal, optional WordPress plugin; no server files are read at runtime.
export const wordpressSeoBridgeSource = `<?php
/**
 * Plugin Name: GOM-MAR Academy SEO Bridge
 * Description: Academy-Übertragung: Rank-Math-Felder und BlogPosting-Schema für SEOPress Free.
 * Version: 1.1.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * License: GPL-2.0-or-later
 */
if ( ! defined( 'ABSPATH' ) ) { exit; }
add_action( 'init', function () {
    // SEOPress owns its SEO fields; this bridge registers only our opt-in marker.
    // A schema-capable SEO plugin remains the sole schema provider.
    if ( defined( 'SEOPRESS_VERSION' ) && ! defined( 'SEOPRESS_PRO_VERSION' ) && ! defined( 'RANK_MATH_VERSION' ) ) {
        register_post_meta( 'post', '_gommar_academy_blogposting', array(
            'type' => 'boolean', 'single' => true, 'default' => false,
            'sanitize_callback' => 'rest_sanitize_boolean',
            'auth_callback' => function ( $allowed, $key, $post_id ) {
                return get_post_type( $post_id ) === 'post' && current_user_can( 'edit_post', $post_id );
            },
            'show_in_rest' => array( 'schema' => array( 'type' => 'boolean', 'context' => array( 'edit' ) ) ),
        ) );
    }
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
add_action( 'wp_head', function () {
    if ( ! is_singular( 'post' ) || is_preview() || ! defined( 'SEOPRESS_VERSION' ) || defined( 'SEOPRESS_PRO_VERSION' ) || defined( 'RANK_MATH_VERSION' ) ) { return; }
    $post = get_queried_object();
    if ( ! ( $post instanceof WP_Post ) || 'publish' !== $post->post_status || post_password_required( $post ) || ! get_post_meta( $post->ID, '_gommar_academy_blogposting', true ) ) { return; }
    $url = get_permalink( $post );
    $schema = array(
        '@context' => 'https://schema.org', '@type' => 'BlogPosting', '@id' => $url . '#academy-blogposting',
        'mainEntityOfPage' => $url, 'url' => $url,
        'headline' => wp_strip_all_tags( get_the_title( $post ) ),
        'datePublished' => get_post_time( DATE_W3C, true, $post ),
        'dateModified' => get_post_modified_time( DATE_W3C, true, $post ),
        'inLanguage' => get_bloginfo( 'language' ),
    );
    $author = get_userdata( $post->post_author );
    if ( $author && trim( $author->display_name ) ) {
        $schema['author'] = array( '@type' => 'Person', 'name' => $author->display_name, 'url' => get_author_posts_url( $author->ID ) );
    }
    $description = get_post_meta( $post->ID, '_seopress_titles_desc', true );
    if ( is_string( $description ) && trim( $description ) ) { $schema['description'] = wp_strip_all_tags( $description ); }
    $image = get_the_post_thumbnail_url( $post, 'full' );
    if ( $image ) { $schema['image'] = esc_url_raw( $image ); }
    // Only WordPress facts: no generated reviews, earnings, FAQ or publisher identity.
    echo '<script type="application/ld+json" id="gommar-academy-blogposting">' . wp_json_encode( $schema, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES ) . '</script>';
}, 30 );
`;
export async function wordpressSeoBridgeZip(): Promise<Buffer> {
  const zip = new JSZip();
  zip.file('gommar-academy-seo/gommar-academy-seo.php', wordpressSeoBridgeSource);
  zip.file('gommar-academy-seo/readme.txt', 'GOM-MAR Academy SEO Bridge 1.1.0\n\nInstallation/Update: Plugins > Neues Plugin > Plugin hochladen. Vorhandene Version ersetzen und aktivieren. Danach in der Academy SEO-Verbindung prüfen.\n\nSEOPress Free: BlogPosting nur für von der Academy markierte öffentliche Beiträge; Fakten stammen aus WordPress. Keine Ausgabe auf Startseite, Archiven, Entwürfen, Vorschauen oder geschützten Beiträgen. Kein FAQ-Schema. Bei Rank Math oder SEOPress PRO keine zusätzliche Schema-Ausgabe. Andere Schema-Plugins oder individuelle Templates vorher auf doppelte Article-Schemata prüfen.\n\nRank Math: wie bisher nur drei SEO-Textfelder für berechtigte Bearbeiter freigeben. SEOPress-Felder und Rollensperren bleiben unverändert. Kein öffentlicher Schreibzugriff, keine Zugangsdaten. Deaktivieren entfernt die Schema-Ausgabe; Inhalte bleiben erhalten. Bereits veröffentlichte Artikel werden nicht automatisch markiert oder überschrieben.\n');
  return zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
}
