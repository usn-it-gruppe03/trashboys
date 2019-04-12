import * as x from "../../function/global/functions.js";
import {GoogleMap} from "../../class/GoogleMap.js";

window.onload = () => {

    customElements.define('google-map', GoogleMap);
    x.cout('Custom element defined: GoogleMap');

};