import {ProfileBadge} from "../../class/ProfileBadge.js";
import {TabPage} from "../../class/TabPage.js";
import {ProgressBar} from "../../class/ProgressBar.js";
import {TabContainer} from "../../class/TabContainer.js";
import {MenuBar} from "../../class/MenuBar.js";
import {AppPage} from "../../class/AppPage.js";
import {ProductBox} from "../../class/ProductBox.js";
import {ShoppingCart} from "../../class/ShoppingCart.js";
import {ProductItem} from "../../class/ProductItem.js";


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

    // TODO: HTML elements (constants).
    const BUTTONS = document.getElementsByClassName('btn-shop');
    const SHOPPING_CART = document.getElementById('shopping-cart');
    const PRODUCT_LIST = document.getElementById('product-list');
    const PRODUCT_SUM = document.getElementById('product-sum');

    // TODO: Define event listener functions.

    // TODO: Invoke event listeners.

}




// ** Invoke main event listener **
window.addEventListener('load', window_onLoad);