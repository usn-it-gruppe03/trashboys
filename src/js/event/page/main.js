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

    // TODO: Define event listener functions.
    function click_menuButton_shop(){
        menuButton_shop.click();
    }

    // TODO: Apply event listeners.
    button_orderBags.onclick = click_menuButton_shop;

    // TODO: Define functions.

    // TODO: Invoke functions.

}




// ** Invoke main event listener **
window.addEventListener('load', window_onLoad);