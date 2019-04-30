import {ProfileBadge} from "../../class/ProfileBadge.js";
import {TabPage} from "../../class/TabPage.js";
import {ProgressBar} from "../../class/ProgressBar.js";
import {TabContainer} from "../../class/TabContainer.js";
import {MenuBar} from "../../class/MenuBar.js";
import {AppPage} from "../../class/AppPage.js";
import {ProductBox} from "../../class/ProductBox.js";
import {ShoppingCart} from "../../class/ShoppingCart.js";
import {ProductItem} from "../../class/ProductItem.js";
import {ToggleSwitch} from "../../class/ToggleSwitch.js";
import * as x from "../../function/global/functions.js";
import {ProductBoxContainer} from "../../class/ProductBoxContainer.js";


function window_onLoad() {

    // TODO: Console debugging.

    // TODO: Custom elements.
    customElements.define('profile-badge', ProfileBadge);
    customElements.define('tab-page', TabPage);
    customElements.define('progress-bar', ProgressBar);
    customElements.define('tab-container', TabContainer);
    customElements.define('menu-bar', MenuBar);
    customElements.define('app-page', AppPage);
    customElements.define('product-box', ProductBox);
    customElements.define('shopping-cart', ShoppingCart);
    customElements.define('product-item', ProductItem);
    customElements.define('toggle-switch', ToggleSwitch);
    customElements.define('product-box-container', ProductBoxContainer);

    // TODO: HTML elements (constants).
    const button_orderBags = document.getElementById('order-bags');
    const menuButton_shop = document.getElementById('menu-shop');
    const input_checkbox_sub = document.getElementById('toggle-notification');
    const profileBadge = document.querySelector('profile-badge');

    // TODO: Define event listener functions.
    function click_menuButton_shop(){
        menuButton_shop.click();
    }
    function click_toggle(event){
        const self = event.target;
        const toggle = parseInt(self.getAttribute('data-toggle'));
        const id = parseInt(profileBadge.getAttribute('badge-id'));

        updateToggle(id,toggle,(bool) => {
            let value = '';
            if (toggle === 1)
                value = 'on';
            else if (toggle === 0)
                value = 'off';
            x.cout('Toggle changed to ' + value + ': ' + bool.toString());
        });
    }

    // TODO: Apply event listeners.
    button_orderBags.onclick = click_menuButton_shop;
    input_checkbox_sub.onclick = click_toggle;

    // TODO: Define functions.
    function updateToggle(id,toggle,callback){
        const query = (id,toggle) => {return '?id='+id+'&sub='+toggle};
        const file = 'src/php/ajax/set_subscription.php';
        x.ajaxFetch(
            query(id,toggle),
            file,
            (rawData) => {
                if (rawData === 'true'){
                    callback(true);
                } else callback(false);
            }
        );
    }

    // TODO: Invoke functions.

}




// ** Invoke main event listener **
window.addEventListener('load', window_onLoad);