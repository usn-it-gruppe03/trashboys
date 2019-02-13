import {ProfileBadge} from "../../class/ProfileBadge.js";
import {TabPage} from "../../class/TabPage.js";
import {ProgressBar} from "../../class/ProgressBar.js";
import {TabContainer} from "../../class/TabContainer.js";


function window_onLoad() {

    // TODO: Console debugging.

    // TODO: Custom elements.
    customElements.define('profile-badge', ProfileBadge);
    customElements.define('tab-page', TabPage);
    customElements.define('progress-bar', ProgressBar);
    customElements.define('tab-container', TabContainer);

    // TODO: HTML elements (constants).

    // TODO: Define event listener functions.

    // TODO: Invoke event listeners.

}




// ** Invoke main event listener **
window.addEventListener('load', window_onLoad);