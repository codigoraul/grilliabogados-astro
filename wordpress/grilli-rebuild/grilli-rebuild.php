<?php
/**
 * Plugin Name: Grilli Rebuild
 * Description: Dispara el rebuild del sitio Astro en GitHub Actions cuando se publica, actualiza o elimina una noticia.
 * Version: 1.0.0
 * Author: Grilli Abogados
 *
 * INSTALACIÓN:
 * 1. Copiar esta carpeta (grilli-rebuild) a wp-content/plugins/
 * 2. Agregar en wp-config.php (antes de "That's all, stop editing"):
 *      define('GRILLI_GITHUB_TOKEN', 'github_pat_XXXX');
 *    El token se crea en GitHub: Settings → Developer settings →
 *    Fine-grained tokens → repo "grilliabogados-astro" → permiso
 *    "Contents: Read and write".
 * 3. Activar el plugin en wp-admin → Plugins.
 */

if (!defined('ABSPATH')) exit;

define('GRILLI_GITHUB_REPO', 'codigoraul/grilliabogados-astro');

/** Llama a repository_dispatch de GitHub. */
function grilli_trigger_rebuild($reason = 'wordpress') {
    if (!defined('GRILLI_GITHUB_TOKEN') || GRILLI_GITHUB_TOKEN === '') {
        error_log('[Grilli Rebuild] Falta GRILLI_GITHUB_TOKEN en wp-config.php');
        return;
    }

    // Evita disparos duplicados en la misma petición / ráfaga de 60s
    if (get_transient('grilli_rebuild_lock')) return;
    set_transient('grilli_rebuild_lock', 1, 60);

    $response = wp_remote_post(
        'https://api.github.com/repos/' . GRILLI_GITHUB_REPO . '/dispatches',
        array(
            'timeout' => 15,
            'headers' => array(
                'Accept'               => 'application/vnd.github+json',
                'Authorization'        => 'Bearer ' . GRILLI_GITHUB_TOKEN,
                'X-GitHub-Api-Version' => '2022-11-28',
                'User-Agent'           => 'grilli-rebuild-plugin',
            ),
            'body' => wp_json_encode(array(
                'event_type'     => 'wordpress_publish',
                'client_payload' => array('reason' => $reason),
            )),
        )
    );

    if (is_wp_error($response)) {
        error_log('[Grilli Rebuild] Error: ' . $response->get_error_message());
    } else {
        $code = wp_remote_retrieve_response_code($response);
        error_log('[Grilli Rebuild] Dispatch enviado, HTTP ' . $code); // 204 = OK
    }
}

/** Publicación, actualización o despublicación de entradas. */
add_action('transition_post_status', function ($new_status, $old_status, $post) {
    if ($post->post_type !== 'post') return;
    // Publicar, actualizar algo ya publicado, o quitar de publicado
    if ($new_status === 'publish' || $old_status === 'publish') {
        grilli_trigger_rebuild("post '{$post->post_name}': {$old_status} → {$new_status}");
    }
}, 10, 3);

/** Aviso en el admin si falta el token. */
add_action('admin_notices', function () {
    if (!defined('GRILLI_GITHUB_TOKEN') || GRILLI_GITHUB_TOKEN === '') {
        echo '<div class="notice notice-warning"><p><strong>Grilli Rebuild:</strong> falta definir <code>GRILLI_GITHUB_TOKEN</code> en wp-config.php. Las noticias no se publicarán en el sitio hasta configurarlo.</p></div>';
    }
});

/** Renombra "Entradas" → "Noticias" en todo el admin. */
add_action('init', function () {
    $post_type = get_post_type_object('post');
    if (!$post_type) return;
    $labels = $post_type->labels;
    $labels->name               = 'Noticias';
    $labels->singular_name      = 'Noticia';
    $labels->menu_name          = 'Noticias';
    $labels->name_admin_bar     = 'Noticia';
    $labels->add_new            = 'Añadir noticia';
    $labels->add_new_item       = 'Añadir nueva noticia';
    $labels->new_item           = 'Nueva noticia';
    $labels->edit_item          = 'Editar noticia';
    $labels->view_item          = 'Ver noticia';
    $labels->view_items         = 'Ver noticias';
    $labels->all_items          = 'Todas las noticias';
    $labels->search_items       = 'Buscar noticias';
    $labels->not_found          = 'No se encontraron noticias';
    $labels->not_found_in_trash = 'No hay noticias en la papelera';
}, 20);

/** Botón manual: wp-admin → Herramientas → Publicar sitio. */
add_action('admin_menu', function () {
    add_management_page('Publicar sitio', 'Publicar sitio', 'edit_posts', 'grilli-rebuild', function () {
        if (isset($_POST['grilli_rebuild_now']) && check_admin_referer('grilli_rebuild')) {
            delete_transient('grilli_rebuild_lock');
            grilli_trigger_rebuild('manual');
            echo '<div class="notice notice-success"><p>✅ Rebuild solicitado. El sitio se actualizará en 2-3 minutos.</p></div>';
        }
        echo '<div class="wrap"><h1>Publicar sitio</h1>';
        echo '<p>Fuerza la actualización del sitio público con el contenido actual de WordPress.</p>';
        echo '<form method="post">';
        wp_nonce_field('grilli_rebuild');
        echo '<p><button type="submit" name="grilli_rebuild_now" value="1" class="button button-primary">Publicar sitio ahora</button></p>';
        echo '</form></div>';
    });
});
