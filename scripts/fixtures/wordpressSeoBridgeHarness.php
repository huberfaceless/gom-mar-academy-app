<?php
// Isolated WordPress adapter: execute the actual distributed PHP, without a site or credentials.
define('ABSPATH', '/');
define('SEOPRESS_VERSION', '10.4');
$hooks = array(); $metas = array(); $is_post = true; $preview = false; $protected = false; $enabled = true; $may_edit = true;
class WP_Post { public $ID = 7; public $post_author = 9; public $post_status = 'publish'; }
$post = new WP_Post();
function add_action($name, $callback, $priority = 10) { global $hooks; $hooks[$name] = $callback; }
function register_post_meta($type, $key, $options) { global $metas; $metas[$key] = $options; }
function get_post_type($id) { return 'post'; }
function current_user_can($permission, $id) { global $may_edit; return $may_edit; }
function is_singular($type) { global $is_post; return $is_post; }
function is_preview() { global $preview; return $preview; }
function get_queried_object() { global $post; return $post; }
function post_password_required($post) { global $protected; return $protected; }
function get_post_meta($id, $key, $single) { global $enabled; return $key === '_gommar_academy_blogposting' ? $enabled : 'Ehrliche Beschreibung </script><script>bad()</script>'; }
function get_permalink($post) { return 'https://gomo-marketing.at/test/'; }
function get_the_title($post) { return 'Echter Titel'; }
function wp_strip_all_tags($text) { return strip_tags($text); }
function get_post_time($format, $gmt, $post) { return '2026-11-15T10:00:00+00:00'; }
function get_post_modified_time($format, $gmt, $post) { return '2026-11-16T10:00:00+00:00'; }
function get_bloginfo($field) { return 'de-AT'; }
function get_userdata($id) { return (object) array('ID' => 9, 'display_name' => 'Echter Autor'); }
function get_author_posts_url($id) { return 'https://gomo-marketing.at/author/autor/'; }
function get_the_post_thumbnail_url($post, $size) { return 'https://gomo-marketing.at/wp-content/uploads/bild.jpg'; }
function esc_url_raw($url) { return $url; }
function wp_json_encode($value, $flags) { return json_encode($value, $flags); }
function check($ok, $message) { if (!$ok) { throw new Exception($message); } }
function output_schema() { global $hooks; ob_start(); $hooks['wp_head'](); return ob_get_clean(); }

/* Academy plugin injected here */

$hooks['init']();
check(isset($metas['_gommar_academy_blogposting']), 'Schema marker registered');
$auth = $metas['_gommar_academy_blogposting']['auth_callback'];
check($auth(false, '', 7), 'Editor may mark own editable post');
$may_edit = false; check(!$auth(false, '', 7), 'Permission is required'); $may_edit = true;
$output = output_schema();
check(substr_count($output, '<script') === 1, 'One schema block, no injected script');
preg_match('/>(.*)<\/script>$/s', $output, $match);
$schema = json_decode($match[1], true);
check($schema['@type'] === 'BlogPosting', 'BlogPosting schema');
check($schema['headline'] === 'Echter Titel', 'Real title');
check($schema['author']['name'] === 'Echter Autor', 'Real WordPress author');
check($schema['datePublished'] !== $schema['dateModified'], 'Actual WordPress dates');
check($schema['image'] === 'https://gomo-marketing.at/wp-content/uploads/bild.jpg', 'Real featured image');
check(!isset($schema['mainEntity']) && !isset($schema['review']), 'No invented FAQ/reviews');
$is_post = false; check(output_schema() === '', 'No archives/homepage'); $is_post = true;
$preview = true; check(output_schema() === '', 'No previews'); $preview = false;
$protected = true; check(output_schema() === '', 'No protected posts'); $protected = false;
$post->post_status = 'draft'; check(output_schema() === '', 'No drafts'); $post->post_status = 'publish';
$enabled = false; check(output_schema() === '', 'No unmarked existing posts'); $enabled = true;
define('SEOPRESS_PRO_VERSION', '10.4');
check(output_schema() === '', 'No competing PRO schema');
$metas = array(); $hooks['init'](); check(count($metas) === 0, 'No marker registered with PRO');
define('RANK_MATH_VERSION', '1.0');
$hooks['init'](); check(count($metas) === 3, 'Legacy Rank Math fields preserved');
check(output_schema() === '', 'No competing Rank Math schema');
echo "Academy PHP schema: output, facts, escaping, permissions and exclusions passed.\n";
