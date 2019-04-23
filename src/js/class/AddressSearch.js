import * as x from "../function/global/functions.js";
import {ShoppingCart} from "./ShoppingCart";


/**
 * Address Search
 *
 * @author Isak K. Hauge
 * */
export class AddressSearch extends HTMLElement {

    constructor(){
        super();
        this.build();
    }

    static rsc(){
        return {
            id: {},
            class: {},
            attribute: {
                ajaxFile: 'data-ajax-file'
            }
        }
    }

    connectedCallback(){
        if (this.isConnected){
            this.render();
            x.componentLoadedMessage(this);
        }
    };

    static get observedAttributes(){
        return Object.values(AddressSearch.rsc().attribute);
    }

    attributeChangedCallback(attributeName, oldValue, newValue){
        if (attributeName === ShoppingCart.rsc().attribute.ajaxFile){
            this._ajaxFile = (oldValue !== newValue) ? newValue : oldValue;
        }
    }

    build(){
        this._input_street = null;
        this._div_options_street = null;
    }

    update(){}

    render(){}

    static ev(){}

}