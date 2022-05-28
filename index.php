<?php

/**
 * Plugin Name: Plugin Block Question
 * Description: Gutenberg Block to measure knowledge with questions and answers.
 * Version 0.1
 * Requires at least: 5.2
 * Requires PHP: 7.2
 * Author: Andrés Vega
 * Author URI: https://andrevega.com/about
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Update URI: https://andrevega.com/about
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
