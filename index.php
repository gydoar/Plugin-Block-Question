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
        register_block_type(__DIR__, array(
            'render_callback' => array($this, 'theHTML')
        ));
    }

    // Save: function
    function theHTML($attributes)
    {

        ob_start() ?>
        <div class="paying-attention-update-me">
            <pre style="display:none"><?php echo wp_json_encode($attributes) ?></pre>
        </div>

<?php return ob_get_clean();
    }
}

$PayingAttention = new PayingAttention();
