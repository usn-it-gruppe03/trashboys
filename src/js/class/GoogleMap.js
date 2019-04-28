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
            class: {
                googleMap: 'card card-white',
                p: {
                    loadingStatus: 'm-0',
                },
            },
            attribute: {
                googleMap: {
                    target: 'data-target',
                },
                script: {
                    async: 'async',
                    defer: 'defer',
                },
            },
            link: {
                script: {
                    googleMapAPI: functionName => {
                        return 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC_EHwnT0KkbVII_FK5y7fxazu_WfLTJBU&callback=' + functionName;
                    },
                },
            },
            text: {
                p: {
                    loadingStatus: 'Lastar data frå Google Maps ...',
                },
            }
        }
    }




    /**
     * Observed Attributes
     * @static
     * */
    static get observedAttributes(){
        return Object.values(GoogleMap.rsc().attribute.googleMap);
    }




    /**
     * Attribute Changes Callback
     * */
    attributeChangedCallback(attributeName, oldValue, newValue){
        if (attributeName === GoogleMap.rsc().attribute.googleMap.target) {
            this._target = (oldValue !== newValue) ? newValue : oldValue;
        }
    }




    /**
     * Build
     * */
    build(){

        this._coordinates = {lat: null, lng: null};

        this.setAttribute('class', GoogleMap.rsc().class.googleMap);

        this._p_loadingStatus = GoogleMap.element().p.loadingStatus(GoogleMap.rsc().text.p.loadingStatus);

    }




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
    static element(){
        return {
            p: {
                loadingStatus: (text) => {
                    const elem = x.makeElement('p');
                    elem.setAttribute('class', GoogleMap.rsc().class.p.loadingStatus);
                    elem.innerText = text;
                    return elem;
                },
            },
            script: {
                googleMaps: () => {
                    const elem = x.makeElement('script');
                    elem.setAttribute(GoogleMap.rsc().attribute.script.async,'');
                    elem.setAttribute(GoogleMap.rsc().attribute.script.defer,'');
                    elem.src = GoogleMap.rsc().link.script.googleMapAPI('initMap');
                },
                initMap: (content) => {
                    const elem = x.makeElement('script');
                    elem.innerHTML = content;
                    return elem;
                },
            },
        }
    }




    /**
     * Event Listener
     * @static
     * */
    static ev(){}




    /**
     * Get Coordinates
     * */
    static getCoordinates(obj, callback){
        window.navigator.geolocation.getCurrentPosition( location => {
            obj._coordinates.lat = location.coords.latitude;
            obj._coordinates.lng = location.coords.longitude;
            callback();
        });
    }




    /**
     * Create Google Map
     * */
    createGoogleMap(){


    }




    /**
     * Function
     * */
    static function(){

        function initMap(){
            const a = document.getElementsByTagName('google-maps')[0];
            a.createGoogleMap();
        }

        return initMap.toString();

    }

}
