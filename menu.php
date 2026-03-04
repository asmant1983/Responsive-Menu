<?php
/* WordPress template integration */
?>

<nav class="nav1" aria-label="Main navigation">
    <div class="navbar">   
        <section class="menu-toggle">
            <h3>Menu</h3> 
            <button id="menu-btn" class="menu-toggle-btn" aria-label="Toggle menu" aria-expanded="false">
                <?php 
                for ($i = 0; $i < 3; $i++) {
                    echo "<span></span>";
                }
                ?>
            </button>
        </section>
    </div>

    <?php if ( has_nav_menu( 'my-custom-menu' ) ) : ?>
        
        <?php
        /*
        -- Optional ACF Integration -- 
        Use the Advanced Custom Fields (Pro) or Secure Custom Fields plugin
        to allow admins to dynamically choose a menu type in the backend.
        Create a 'Select' field named 'menu_options' with the following choices:
            horizontal : Horizontal dropdown
            vertical   : Vertical flyout
            accordion  : Accordion menu
            megamenu   : Megamenu
        */

        // Default fallback style
        $menu_style = 'horizontal'; 

        // Prevent 'Fatal Error' by checking if the ACF plugin is active
        if ( function_exists('get_field') ) {
            // Fetch field (Note: 'option' requires ACF Pro)
            $menu_options = get_field('menu_options', 'option');
            $menu_types = ['horizontal', 'vertical', 'accordion', 'megamenu'];
            
            // Strict validation against allowed styles
            if ( in_array($menu_options, $menu_types, true) ) {
                $menu_style = $menu_options;
            }
        }
        ?>

        <!-- Output the menu with the safe, escaped data attribute -->
        <ul id="respMenu" class="Versatile_Resp_Menu" data-menu-style="<?php echo esc_attr($menu_style); ?>">
            <?php
            wp_nav_menu( array(
                'theme_location' => 'my-custom-menu',
                'depth'          => 3, /* One main level and two sublevels max. */
                'container'      => false,
                'items_wrap'     => '%3$s',
            ) );
            ?>
        </ul>

    <?php endif; ?>
</nav>