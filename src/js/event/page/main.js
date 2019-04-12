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

    // TODO: HTML elements (constants).
    const button_orderBags = document.getElementById('order-bags');
    button_orderBags.onclick = event => {
        const pageHome = document.getElementById('page-home');
        const pageShop = document.getElementById('page-shop');
        const pageSettings = document.getElementById('page-settings');
        const menuHome = document.getElementById('menu-home');
        const menuShop = document.getElementById('menu-shop');
        const menuSettings = document.getElementById('menu-settings');
        x.showNode(pageHome, false);
        x.showNode(pageShop, true);
        x.showNode(pageSettings, false);
        x.setState(menuHome, 'inactive');
        x.setState(menuShop, 'active');
        x.setState(menuSettings, 'inactive');
    };

    // TODO: Define event listener functions.

    // TODO: Invoke event listeners.

}




// ** Invoke main event listener **
window.addEventListener('load', window_onLoad);