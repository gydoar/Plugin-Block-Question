<?php

/**
 * Plugin Name: Plugin Block Question
 * Description: Plugin Block Question
 * Version 0.1
 * Author: Andrés Vega
 * Author URI: https://andrevega.com/about
 */


if (!defined('ABSPATH')) exit; //Exit if accessed directly

class PayingAttention
{
    function __construct()
    {
        add_action('init', array($this, 'adminAssets'));
    }

    function adminAssets()
    {
        wp_register_style('quizeditcss', plugin_dir_url(__FILE__) . 'build/index.css');
        wp_register_script('ournewblocktype', plugin_dir_url(__FILE__) . 'build/index.js', array('wp-blocks', 'wp-element', 'wp-editor'));
        register_block_type('ourplugin/paying-attention', array(
            'editor_script' => 'ournewblocktype',
            'style' => 'quizeditcss',
            'render_callback' => array($this, 'theHTML')
        ));
    }

    // Save: function
    function theHTML($attributes)
    {
        ob_start() ?>
        <div class="paying-attention-edit-block">

            <h3>Today the sky is <?php echo esc_html($attributes['skyColor']) ?> and the grass is <?php echo esc_html($attributes['grassColor']) ?>!</h3>
        </div>

<?php return ob_get_clean();
    }
}

$PayingAttention = new PayingAttention();
