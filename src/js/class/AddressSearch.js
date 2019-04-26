import * as x from "../function/global/functions.js";
import {ShoppingCart} from "./ShoppingCart";


/**
 * Address Search
 *
 * @author Isak K. Hauge
 * */
export class AddressSearch extends HTMLElement {


    /**
     * Constructor
     * */
    constructor(){
        super();
        this.build();
        this._logic = AddressSearch.booleanLogic();
        this._cache_streets = [];
        this._cache_addresses = [];
    }




    /**
     * Resource
     * */
    static rsc(){
        return {
            id: {
                input: {
                    street: 'street',
                    number: 'number',
                    zip: 'zip',
                    area: 'area'
                },
                div: {
                    optionsStreet: 'options-street',
                    optionsNumber: 'options-street',
                },
                button: {
                    findMe: 'find-me-btn',
                    submit: 'collection-search-btn',
                }
            },
            class: {
                div: {
                    row: 'row',
                    col: 'col',
                    formGroup: 'form-group',
                    options: 'options',
                },
                input: 'input input-3d',
                button: {
                    findMe: 'btn btn-clay fx-3d-clay',
                    submit: 'btn btn-green fx-3d-green',
                },
            },
            attribute: {
                ajaxFile: 'data-ajax-file'
            },
            text: {
                placeholder: {
                    street: 'Gatenavn',
                    number: 'Husnummer',
                    zip: 'Postnummer',
                    area: 'Poststed',
                },
                button: {
                    findMe: 'Finn min adresse',
                    submit: 'Sjå tømmedatoar',
                },
            },
            ajax: {
                searchStreet: {
                    query: (value) => {
                        return '?name=' + value
                    },
                    file: 'src/php/ajax/search_street.php',
                },
                searchAddress: {
                    query: (value) => {
                        return '?name=' + value
                    },
                    file: 'src/php/ajax/search_address.php',
                }
            },
        }
    }




    /**
     * Connected Callback
     * */
    connectedCallback(){
        if (this.isConnected){
            this.render();
            x.componentLoadedMessage(this);
        }
    };




    /**
     * Getter: Observed Attributes
     * */
    static get observedAttributes(){
        return Object.values(AddressSearch.rsc().attribute);
    }




    /**
     * Attribute Changed Callback
     * */
    attributeChangedCallback(attributeName, oldValue, newValue){
        if (attributeName === ShoppingCart.rsc().attribute.ajaxFile){
            this._ajaxFile = (oldValue !== newValue) ? newValue : oldValue;
        } else this._ajaxFile = null;
    }




    /**
     * Build
     * */
    build(){

        // * Create main components:
        // Div Element: Google Map.
        this._div_googleMap = AddressSearch.element().googleMap();

        // Input element: Street name.
        this._input_street = AddressSearch.element().input(
            AddressSearch.rsc().id.input.street,
            AddressSearch.rsc().text.placeholder.street,
        );

        // Div element: Options of street names.
        this._div_options_street = AddressSearch.element().options(
            AddressSearch.rsc().id.div.optionsStreet,
        );

        // Input element: House number.
        this._input_number = AddressSearch.element().input(
            AddressSearch.rsc().id.input.number,
            AddressSearch.rsc().text.placeholder.number,
        );

        // Div element: Options of house numbers.
        this._div_options_number = AddressSearch.element().options(
            AddressSearch.rsc().id.div.optionsNumber,
        );

        // Input element: ZIP / postal code.
        this._input_zip = AddressSearch.element().input(
            AddressSearch.rsc().id.input.zip,
            AddressSearch.rsc().text.placeholder.zip,
        );

        // Input element: Postal area.
        this._input_area = AddressSearch.element().input(
            AddressSearch.rsc().id.input.area,
            AddressSearch.rsc().text.placeholder.area,
        );

        // Button element: Find location.
        this._button_findMe = AddressSearch.element().button(
            AddressSearch.rsc().id.button.findMe,
            AddressSearch.rsc().text.button.findMe,
            AddressSearch.rsc().class.button.findMe
        );

        // Button element: Submit location.
        this._button_submit = AddressSearch.element().button(
            AddressSearch.rsc().id.button.submit,
            AddressSearch.rsc().text.button.submit,
            AddressSearch.rsc().class.button.submit
        );
        this._button_submit.type = 'submit';
        this._button_submit.name = 'submit';




        // * Create columns:
        // Column: Google Map.
        const col_googleMap = AddressSearch.element().col([
            this._button_findMe,
            this._div_googleMap
        ]);

        // Column: Street name.
        const col_street = AddressSearch.element().col([
            this._input_street, this._div_options_street
        ]);

        // Column: House number.
        const col_number = AddressSearch.element().col([
            this._input_number, this._div_options_number
        ]);

        // Column: ZIP / postal code.
        const col_zip = AddressSearch.element().col([
            this._input_zip
        ]);

        // Column: postal area.
        const col_area = AddressSearch.element().col([
            this._input_area
        ]);

        // Column: Submit button.
        const col_submit = AddressSearch.element().col([
            this._button_submit
        ]);


        // * Create rows:
        // Row: Google Map.
        this._div_row_googleMap = AddressSearch.element().row([
            col_googleMap
        ]);

        // Row: Street name and house number.
        this._div_row_streetAndHouseNumber = AddressSearch.element().row([
            col_street, col_number
        ]);

        // Row: ZIP code and postal area.
        this._div_row_zipAndPostalArea = AddressSearch.element().row([
            col_zip, col_area
        ]);

        // Row: Submit button.
        this._div_row_submit = AddressSearch.element().row([
            col_submit
        ]);


        // * Create form element.
        this._form = x.makeElement('form');


        // * Add event listeners:


    }




    /**
     * Update
     * */
    update(){



    }




    /**
     * Render
     * */
    render(){

        // ? If the client device is not a mobile.
        if (!x.clientIsMobile()){
            this._ro
        }

        // ? If an AJAX file is defined.
        if (this._ajaxFile !== null){
        }

    }






    /**
     * Event Listeners
     * */
    static ev(){
        return {

            // * Window:
            window: {
                mouseDown: object => {
                    return {
                        type: 'mousedown',
                        listener: event => {

                        }
                    }
                },
                mouseUp: object => {
                    return {
                        type: 'mouseup',
                        listener: event => {

                        }
                    }
                },
            },

            // * Input Elements:
            input: {
                // Street Name:
                street: {
                    mouseDown: object => {
                        return {
                            type: 'mousedown',
                            listener: event => {
                                object._logic.mouseDown.input.street = true;
                                object._logic.mouseDown.input.street = false;
                            }
                        }
                    },
                    mouseUp: object => {
                        return {
                            type: 'mouseup',
                            listener: event => {
                                object._logic.mouseUp.input.street = true;
                                object._logic.mouseDown.input.street = false;
                            }
                        }
                    },
                    input: object => {
                        return {
                            type: 'input',
                            listener: event => {

                            }
                        }
                    },
                },
                // House Number:
                number: {
                    mouseDown: object => {
                        return {
                            type: 'mousedown',
                            listener: event => {
                                object._logic.mouseDown.input.street = true;
                                object._logic.mouseDown.input.street = false;
                            }
                        }
                    },
                    mouseUp: object => {
                        return {
                            type: 'mouseup',
                            listener: event => {
                                object._logic.mouseUp.input.street = true;
                                object._logic.mouseDown.input.street = false;
                            }
                        }
                    },
                    input: object => {
                        return {
                            type: 'input',
                            listener: event => {

                            }
                        }
                    },
                },
            },

            // * Div Elements:
            div: {
                options_street: {},
                options_number: {},
                option: {},
            },

            // * Button Elements:
            button: {
                findMe: () => {
                    return {
                        type: 'click',
                        listener: event => {

                        }
                    }
                },
                submit: {},
            },
        }
    }




    /**
     * Element
     * */
    static element(){
        return {
            /**
             * Create a row
             * @param {array} colArray - An array of HTML elements.
             * @returns {HTMLElement}
             * */
            row: colArray => {
                const elem = x.makeElement('div');
                elem.classList.add(AddressSearch.rsc().class.div.row);
                for (let i=0; i<colArray.length; i++){
                    elem.append(colArray[i]);
                }
                return elem;
            },
            /**
             * Create a column
             * @param {array} elementArray - An array of HTML elements.
             * @returns {HTMLElement}
             * */
            col: elementArray => {
                const elem = x.makeElement('div');
                elem.classList.add(AddressSearch.rsc().class.div.col);
                for (let i=0; i<elementArray.length; i++){
                    elem.append(elementArray[i]);
                }
                return elem;
            },
            /**
             * Create an input element
             * @param {string} id - Element ID.
             * @param {string} placeholder - The input placeholder.
             * @param {boolean} disabled - Whether or not the element should be disabled.
             * @returns {HTMLElement}
             * */
            input: (id, placeholder, disabled = false) => {
                const elem = x.makeElement('input');
                elem.id = id;
                elem.type = 'text';
                elem.placeholder = placeholder;
                elem.setAttribute('class', AddressSearch.rsc().class.input);
                elem.setAttribute((disabled === true) ? 'disabled' : '', '');
                return elem;
            },
            /**
             * Create an options element.
             * @param {string} id - Element ID.
             * @returns {HTMLElement}
             * */
            options: (id) => {
                const elem = x.makeElement('div');
                elem.id = id;
                elem.setAttribute('class', AddressSearch.rsc().class.div.options);
                x.showNode(elem, false);
                return elem;
            },
            /**
             * Create an option element.
             * @param {string} value - The value of the option.
             * @param {string} text - The visible text of the option.
             * @returns {HTMLElement}
             * */
            option: (value, text) => {
                const elem = x.makeElement('div');
                x.setDataValue(elem,value);
                elem.innerText = text;
                return elem;
            },
            /**
             * Create button element.
             * @param {string} id - Element ID.
             * @param {string} text - Button text.
             * @param {string} className - The CSS class name(s).
             * @returns {HTMLElement}
             * */
            button: (id, text, className) => {
                const elem = x.makeElement('button',text);
                elem.id = id;
                elem.setAttribute('class', className);
                return elem;
            },
            /**
            * Create a Google Map.
            * @returns {HTMLElement}
            * */
            googleMap: () => {
                const elem = x.makeElement('div');
                elem.id = 'google-map';
                elem.setAttribute('class', 'card cart-white');
                x.showNode(elem, false);
                return elem;
            },
        }

    }




    /**
     * Logic
     * */
    static booleanLogic(){
        return {
            mouseDown: {
                input: {
                    street: false,
                    number: false,
                    zip: false,
                    area: false,
                },
                div: {
                    options_street: false,
                    options_number: false,
                    option: false,
                }
            },
            mouseUp: {
                input: {
                    street: false,
                    number: false,
                    zip: false,
                    area: false,
                },
                div: {
                    options_street: false,
                    options_number: false,
                    option: false,
                }
            },
            hover: {
                input: {
                    street: false,
                    number: false,
                    zip: false,
                    area: false,
                },
                div: {
                    options_street: false,
                    options_number: false,
                    option: false,
                }
            },
            hasContent: {
                input: {
                    street: false,
                    number: false,
                    zip: false,
                    area: false,
                },
                div: {
                    options_street: false,
                    options_number: false,
                },
                cache: {
                    streetName: false,
                    address: false,
                }
            },
            eligibleForSearch: {
                input: {
                    street: false,
                    number: false,
                }
            },
        }
    }

}