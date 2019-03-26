import * as x from '../function/global/functions.js';


/**
 * Toggle Switch
 *
 * @author Isak K. Hauge
 * @version 1.0
 * */
export class ToggleSwitch extends HTMLElement {


    /**
     * Constructor
     * */
    constructor(){
        super();
    }




    /**
     * Attributes
     *
     * @returns {object}
     * */
    static attributes(){
        return {
            toggle: 'data-toggle'
        }
    }




    /**
     * Values
     *
     * @static
     * @description TODO: Write
     *
     * @returns {object}
     * */
    static values(){
        return {
            ON: 'on',
            OFF: 'off',
        }
    }




    /**
     * Observed Attributes
     *
     * @static
     * */
    static get observedAttributes(){
        return [ToggleSwitch.attributes().toggle]
    }




    /**
     * Attribute Changed Callback
     * */
    attributeChangedCallback(attrName, oldValue, newValue){
        switch (attrName) {
            case ToggleSwitch.attributes().toggle:
                if (oldValue !== newValue){
                    if (typeof newValue === "string"){
                        if (newValue === ToggleSwitch.values().ON)
                            this.toggle = true;
                        else if (newValue === ToggleSwitch.values().OFF)
                            this.toggle = false;
                    }
                }
        }
    }




    /**
     * Connected Callback
     * */
    connectedCallback(){
        if (this.isConnected){
            this.harvestAttributes();
            this.build();
        }
    }




    /**
     * Build
     * */
    build(){

        // * Create elements.
        const SWITCH = document.createElement('div');

        // * Set Attribute.
        this.setAttribute(
            ToggleSwitch.attributes().toggle,
            this.toggle ?
                ToggleSwitch.values().ON :
                ToggleSwitch.values().OFF
        );

        // * Switch element.
        SWITCH.classList.add('toggle-switch-button');

        // * Event listener.
        const {
            /**@type{string}*/type,
            /**@type{function}*/listener
        } = ToggleSwitch.switchOnClick(this);
        SWITCH.addEventListener(type,listener);

        // * Append nodes.
        this.append(SWITCH);

    }




    /**
     * Harvest Attributes
     * */
    harvestAttributes(){
        if (x.attrDefined(this, ToggleSwitch.attributes().toggle)){
            this.toggle = ToggleSwitch.isToggled(this);
        } else this.toggle = false;
    }




    /**
     * Switch: On Click
     *
     * @static
     * @description TODO: Write.
     *
     * @param {ToggleSwitch} object - The object.
     * */
    static switchOnClick(object){
        return {
            type: 'click',
            listener: () => {

                // * Get static objects:
                const attr = ToggleSwitch.attributes();
                const value = ToggleSwitch.values();

                // ? If the toggle switch is toggled.
                if (object.toggle){
                    object.setAttribute(attr.toggle, value.OFF);
                    object.toggle = false;

                // ? If the toggle switch is not toggles.
                } else if (!object.toggle){
                    object.setAttribute(attr.toggle, value.ON);
                    object.toggle = true;
                }

            }
        }
    }




    /**
     * Getter: Toggle
     *
     * @returns {boolean} - Either 0(OFF) or 1(ON).
     * */
    get toggle(){
        return this._toggle;
    }




    /**
     * Setter: Toggle
     *
     * @param {boolean} value - 0(OFF) or 1(ON)
     * */
    set toggle(value){
       this._toggle = value;
    }




    /**
     * Is toggled
     *
     * @static
     * @description TODO: Write.
     *
     * @param {HTMLElement} element - A ToggleSwitch element.
     *
     * @returns {boolean}
     * */
    static isToggled(element){
        return (
            element.getAttribute(ToggleSwitch.attributes().toggle) === ToggleSwitch.values().ON
        );
    }

}