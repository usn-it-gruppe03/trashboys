import * as x from '../function/global/functions.js';


/**
 * ProgressBar
 *
 * @author Isak K. Hauge
 * */
export class ProgressBar extends HTMLElement {


    /**
     * Constructor
     * */
    constructor(){
        super();
        this.build();
    }




    /**
     * Resource
     * */
    static rsc(){
        return {
            id: {},
            class: {},
            attribute: {
                percent: 'data-percent',
                text: 'data-text',
            },
            text: {},
        };
    }




    /**
     * Connected Callback
     * */
    connectedCallback(){
        if (this.isConnected){
            x.componentLoadedMessage(this);
            this.harvestAttributes();
            this.update();
        }
    }




    /**
     * Observed Attributes
     * @static
     * */
    static get observedAttributes(){
        return Object.values(ProgressBar.rsc().attribute);
    }




    /**
     * Attribute Changed Callback
     * */
    attributeChangedCallback(attributeName, oldValue, newValue){

        // * Process new input value.
        switch (attributeName) {
            case ProgressBar.rsc().attribute.percent:
                this._percent = (oldValue !== newValue) ? newValue : oldValue;
                break;
            case ProgressBar.rsc().attribute.text:
                this._text = (oldValue !== newValue) ? newValue : oldValue;
                break;
        }

        // * Update.
        this.update();

    }




    /**
     * Harvest Attributes
     * */
    harvestAttributes() {

        // ? If percent attribute is defined.
        if (x.attrDefined(this, ProgressBar.rsc().attribute.percent))
            this._percent = this.getAttribute(ProgressBar.rsc().attribute.percent);
        else this._percent = 0;

        // ? If text attribute is defined.
        if (x.attrDefined(this, ProgressBar.rsc().attribute.text))
            this._text = this.getAttribute(ProgressBar.rsc().attribute.text);
        else this._text = 'No data given';
    }




    /**
     * Build
     * */
    build(){

        // * Create elements:
        this._div_bar = document.createElement('div');
        this._p_text = document.createElement('p');

        // * Append.
        this.append(this._div_bar, this._p_text);
    }




    /**
     * Update
     * */
    update(){

        // * Init. the inner text:
        this._p_text.innerText = this._text;

        // * Set the progress bar's width.
        this._div_bar.style.width = (this._percent * 100) + '%';

    }

}