import * as x from '../../function/global/functions.js';
import {AppPage} from "../../class/AppPage.js";
import {CustomerTable} from "../../class/CustomerTable.js";
import {RouteToolbar} from "../../class/RouteToolbar.js";
import {RouteTable} from "../../class/RouteTable.js";
import {OrderTable} from "../../class/OrderTable.js";
import {OrderBox} from "../../class/OrderBox.js";

window.addEventListener('load', function (event) {

    const cout = (msg) => {console.log(msg)};

    customElements.define('app-page', AppPage);
    cout('Custom element defined: AppPage');

    customElements.define('customer-table', CustomerTable);
    cout('Custom element defined: CustomerTable');

    customElements.define('route-toolbar', RouteToolbar);
    cout('Custom element defined: RouteToolbar');

    customElements.define('route-table', RouteTable);
    cout('Custom element defined: RouteTable');

    customElements.define('order-table', OrderTable);
    cout('Custom element defined: OrderTable');

    customElements.define('order-box', OrderBox);
    cout('Custom element defined: OrderBox');

});