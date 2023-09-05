<?php
/**
 * Plugin Name:       HUisHU Slide in Content
 * Description:       Add function to show content based on scroll position
 * Version:           1.0
 * Requires at least: 5.8
 * Requires PHP:      7.4
 * Author:            HUisHU. Digitale Kreativagentur GmbH
 * Author URI:        https://www.huishu-agentur.de
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

/**
 * Load Gutenberg Plugin.
 */
function hu_sic_add_gutenberg_assets() {
    $asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php' );
    wp_register_script( 'hu-sic-editor', plugin_dir_url( __FILE__ ).'build/index.js', $asset_file['dependencies'], $asset_file['version']);
	wp_enqueue_script( 'hu-sic-editor' );
}
add_action( 'enqueue_block_editor_assets', 'hu_sic_add_gutenberg_assets' );

function hu_sic_load_scripts_in_frontend(){
    wp_register_script( 'hu-sic-frontend-script', plugin_dir_url( __FILE__ ) . 'assets/js/hu-slide-in-content-frontend.js', array(), filemtime( plugin_dir_path( __FILE__ ) . 'assets/js/hu-slide-in-content-frontend.js' ), true );
    wp_enqueue_script( 'hu-sic-frontend-script' );
    wp_enqueue_style( 'hu-sic-styles', plugin_dir_url( __FILE__ ) . 'assets/css/styles.css', array(), filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/styles.css' ) );
}
add_action( 'wp_enqueue_scripts', 'hu_sic_load_scripts_in_frontend' );