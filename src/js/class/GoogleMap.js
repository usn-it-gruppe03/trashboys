import * as x from "../function/global/functions.js";


/**
 * Google Maps
 *
 * @author Isak K. Hauge
 * */
export class GoogleMap extends HTMLElement {


    /**
     * Constructor
     * */
    constructor(){
        super();
    }




    /**
     * Resources
     * */
    static rsc(){
        return {
            id: {},
            class: {},
            attribute: {

                script: {
                    async: 'async',
                    defer: 'defer',
                },
            },
            link: {
                script: {
                    googleMapAPI: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC_EHwnT0KkbVII_FK5y7fxazu_WfLTJBU&callback=initMap',
                },
            },
            text: {}
        }
    }




    /**
     * Observed Attributes
     * @static
     * */
    static get observedAttributes(){

    }




    /**
     * Attribute Changes Callback
     * */
    attributeChangedCallback(){

    }




    /**
     * Build
     * */
    build(){}




    /**
     * Update
     * */
    update(){}




    /**
     * Render
     * */
    render(){}




    /**
     * Element
     * @static
     * */
    static element(){}




    /**
     * Event Listener
     * @static
     * */
    static ev(){}

}
