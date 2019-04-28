import * as x from "../function/global/functions.js";
import {ShoppingCart} from "./ShoppingCart.js";
import {Address} from "./Address.js";


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
        this._cached_streets = [];
        this._filtered_streets = [];
        this._cached_addresses = [];
        this._filtered_addresses = [];
        this._chosenAddress = null;
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
                    optionsNumber: 'options-number',
                },
            },
            class: {
                div: {
                    row: 'row',
                    col: 'col',
                    formGroup: 'form-group',
                    options: 'options',
                },
                input: 'input input-3d',
            },
            attribute: {},
            text: {
                placeholder: {
                    street: 'Gatenavn',
                    number: 'Husnummer',
                    zip: 'Postnummer',
                    area: 'Poststed',
                },
            },
            ev: {
                type: {
                    sendAddress: 'sendAddress',
                    searchDB: 'searchDB',
                }
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
            value: {
                MIN_CHAR_LENGTH_SEARCH: 2
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
     * Build
     * */
    build(){


        // * Create main components:

        // Input element: Street name.
        this._input_street = AddressSearch.element(this).input(
            AddressSearch.rsc().id.input.street,
            AddressSearch.rsc().text.placeholder.street,
        );

        // Div element: Options of street names.
        this._div_options_street = AddressSearch.element(this).options(
            AddressSearch.rsc().id.div.optionsStreet,
        );

        // Input element: House number.
        this._input_number = AddressSearch.element(this).input(
            AddressSearch.rsc().id.input.number,
            AddressSearch.rsc().text.placeholder.number,
        );

        // Div element: Options of house numbers.
        this._div_options_number = AddressSearch.element(this).options(
            AddressSearch.rsc().id.div.optionsNumber,
        );

        // Input element: ZIP / postal code.
        this._input_zip = AddressSearch.element(this).input(
            AddressSearch.rsc().id.input.zip,
            AddressSearch.rsc().text.placeholder.zip,
            true
        );

        // Input element: Postal area.
        this._input_area = AddressSearch.element(this).input(
            AddressSearch.rsc().id.input.area,
            AddressSearch.rsc().text.placeholder.area,
            true
        );


        // * Create columns:

        // Column: Street name.
        const col_street = AddressSearch.element(this).col([
            this._input_street, this._div_options_street
        ]);

        // Column: House number.
        const col_number = AddressSearch.element(this).col([
            this._input_number, this._div_options_number
        ]);

        // Column: ZIP / postal code.
        const col_zip = AddressSearch.element(this).col([
            this._input_zip
        ]);

        // Column: postal area.
        const col_area = AddressSearch.element(this).col([
            this._input_area
        ]);


        // * Create rows:

        // Row: Street name and house number.
        this._div_row_streetAndHouseNumber = AddressSearch.element(this).row([
            col_street, col_number
        ]);

        // Row: ZIP code and postal area.
        this._div_row_zipAndPostalArea = AddressSearch.element(this).row([
            col_zip, col_area
        ]);


        // * Add event listeners:

        // Window:
        window.addEventListener(
            AddressSearch.ev(this).window.mouseDown().type,
            AddressSearch.ev(this).window.mouseDown().listener
        );

        // Street (input):
        this._input_street.addEventListener(
            AddressSearch.ev(this).input.street.input().type,
            AddressSearch.ev(this).input.street.input().listener
        );
        this._input_street.addEventListener(
            AddressSearch.ev(this).input.street.searchDB().type,
            AddressSearch.ev(this).input.street.searchDB().listener
        );

        // Options, street (div):
        this._div_options_street.addEventListener(
            AddressSearch.ev(this).div.options.showOptions().type,
            AddressSearch.ev(this).div.options.showOptions().listener
        );
        this._div_options_street.addEventListener(
            AddressSearch.ev(this).div.options_street.populateOptions().type,
            AddressSearch.ev(this).div.options_street.populateOptions().listener
        );

        // Number (input):
        this._input_number.addEventListener(
            AddressSearch.ev(this).input.number.input().type,
            AddressSearch.ev(this).input.number.input().listener
        );

        // Options, number (div):
        this._div_options_number.addEventListener(
            AddressSearch.ev(this).div.options.showOptions().type,
            AddressSearch.ev(this).div.options.showOptions().listener
        );
        this._div_options_number.addEventListener(
            AddressSearch.ev(this).div.options_number.populateOptions().type,
            AddressSearch.ev(this).div.options_number.populateOptions().listener
        );


    }




    /**
     * Update
     * */
    update(){}




    /**
     * Render
     * */
    render(){

        /*// ? If the client device is not a mobile.
        if (!x.clientIsMobile()){
        }*/

        this.append(
            this._div_row_streetAndHouseNumber,
            this._div_row_zipAndPostalArea,
        );

    }






    /**
     * Event Listeners
     * */
    static ev(object){
        return {

            // * Window:
            window: {
                mouseDown: () => {
                    return {
                        type: 'mousedown',
                        listener: event => {
                            x.cout('Cached streets: ' + object._cached_streets.length);
                            x.cout('Filtered streets: ' + object._filtered_streets.length);
                            x.cout('Cached addresses: ' + object._cached_addresses.length);
                        }
                    }
                },
                mouseUp: () => {
                    return {
                        type: 'mouseup',
                        listener: event => {

                        }
                    }
                },
            },

            self: {
                sendAddress: () => {
                    return {
                        type: AddressSearch.rsc().ev.type.sendAddress,
                        listener: event => {

                        }
                    }
                },
            },

            collectionGrid: addressID => {
                return {
                    typeArg: AddressSearch.rsc().ev.type.sendAddress,
                    eventInitDict: {
                        detail: {
                            addressID: addressID,
                        }
                    }
                }
            },

            // * Input Elements:
            input: {
                // Street Name:
                street: {
                    mouseDown: () => {
                        return {
                            type: 'mousedown',
                            listener: event => {
                                object._logic.mouseDown.input.street = true;
                                object._logic.mouseDown.input.street = false;
                            }
                        }
                    },
                    mouseUp: () => {
                        return {
                            type: 'mouseup',
                            listener: event => {
                                object._logic.mouseUp.input.street = true;
                                object._logic.mouseDown.input.street = false;
                            }
                        }
                    },
                    input: () => {
                        return {
                            type: 'input',
                            listener: event => {
                                const self = event.target;

                                x.cout('Street input charlen: ' + self.value.length);

                                // ? If the input value character length is equal to the given value.
                                if (self.value.length === AddressSearch.rsc().value.MIN_CHAR_LENGTH_SEARCH) {

                                    // * Dispatch a "search DB" event.
                                    self.dispatchEvent(new CustomEvent('searchDB'));

                                // ? If the input value character length is more than the given value.
                                } else if (self.value.length > AddressSearch.rsc().value.MIN_CHAR_LENGTH_SEARCH) {

                                    // ? If there are no cached addresses.
                                    if (object._cached_streets.length === 0 && object._cached_addresses.length === 0){

                                        // * Dispatch a "search DB" event.
                                        self.dispatchEvent(new CustomEvent('searchDB'));
                                    }

                                    // * Dispatch a "populate options" event.
                                    object._div_options_street.dispatchEvent(new CustomEvent('populateOptions'));

                                // ? If the input value character length is zero.
                                } else if (self.value.length === 0) {

                                    // * Flush option elements.
                                    AddressSearch.flushOptions(object._div_options_street);

                                    // * Reset all cache arrays:
                                    object._cached_streets.length = 0;
                                    object._cached_addresses.length = 0;
                                }

                                // * Dispatch a "show options" event.
                                object._div_options_street.dispatchEvent(new CustomEvent('showOptions'));
                            }
                        }
                    },
                    searchDB: () => {
                        return {
                            type: AddressSearch.rsc().ev.type.searchDB,
                            listener: event => {
                                const self = event.target;

                                // Clear cache.
                                object._cached_streets.length = 0;
                                object._filtered_streets.length = 0;

                                // Search new streets.
                                AddressSearch.ajax().getStreets(self.value, (jsonObject) => {
                                    for (let i=0; i<jsonObject.length; i++){
                                        object._cached_streets.push(jsonObject[i]['name']);
                                    }

                                    object._div_options_street.dispatchEvent(new CustomEvent('populateOptions'));

                                });
                            }
                        }
                    },
                },
                // House Number:
                number: {
                    mouseDown: () => {
                        return {
                            type: 'mousedown',
                            listener: event => {
                                object._logic.mouseDown.input.street = true;
                                object._logic.mouseDown.input.street = false;
                            }
                        }
                    },
                    mouseUp: () => {
                        return {
                            type: 'mouseup',
                            listener: event => {
                                object._logic.mouseUp.input.street = true;
                                object._logic.mouseDown.input.street = false;
                            }
                        }
                    },
                    input: () => {
                        return {
                            type: 'input',
                            listener: event => {

                                const self = event.target;

                                // * Populate house number options.
                                object._div_options_number.dispatchEvent(new CustomEvent('populateOptions'));

                            }
                        }
                    },
                    searchDB: () => {
                        return {
                            type: AddressSearch.rsc().ev.type.searchDB,
                            listener: event => {
                                const self = event.target;
                            }
                        }
                    },
                },
            },

            // * Div Elements:
            div: {
                options_street: {
                    populateOptions: () => {
                        return {
                            type: 'populateOptions',
                            listener: event => {

                                // * Init. essential reference.
                                const self = event.target;

                                // * Flush any existing child nodes.
                                AddressSearch.flushOptions(self);

                                // * Filter the cached street names in accordance with the input value.
                                AddressSearch.filterArray(object._input_street.value, object._cached_streets, (array) => {

                                    // Iterate through each array line.
                                    for (let i=0; i<array.length; i++){

                                        // * Append matching street name options.
                                        self.append(
                                            AddressSearch.element(object).option(array[i], array[i])
                                        );
                                    }
                                });

                                // * Dispatch the "show options" event.
                                object._div_options_street.dispatchEvent(new CustomEvent('showOptions'));
                            }
                        }
                    },
                },
                options_number: {
                    populateOptions: () => {
                        return {
                            type: 'populateOptions',
                            listener: event => {

                                // * Init. essential reference.
                                const self = event.target;

                                // * Flush any existing child nodes.
                                AddressSearch.flushOptions(self);

                                // ? If any addresses are stored in the cache table.
                                if (object._cached_addresses.length > 0){

                                    AddressSearch.filterAddressHouseNumber(
                                        object._input_number.value,
                                        object._cached_addresses,
                                        (array) => {

                                            for (let i=0; i<array.length; i++){

                                                // * Append options.
                                                self.append(
                                                    AddressSearch.element(object).option(
                                                        array[i].id.toString(),
                                                        array[i].number + ' ' + array[i].letter
                                                    )
                                                );

                                            }

                                        }
                                    );
                                }

                                // * Dispatch the "show options" event.
                                object._div_options_number.dispatchEvent(new CustomEvent('showOptions'));
                            }
                        }
                    },
                },
                options: {
                    showOptions: () => {
                        return {
                            type: 'showOptions',
                            listener: event => {
                                const self = event.target;
                                x.showNode(self, self.hasChildNodes());
                            }
                        }
                    },
                    hideOptions: () => {
                        return {
                            type: 'hideOptions',
                            listener: event => {
                                const self = event.target;
                                x.showNode(self, false);
                            }
                        }
                    }
                },
                option: {
                    click: () => {
                        return {
                            type: 'click',
                            listener: event => {

                                // * Init. essential references:
                                const self = event.target;
                                const parent = self.parentElement;
                                const dataValue = x.getDataValue(self);
                                const innerText = self.innerText;

                                // * Flush options.
                                AddressSearch.flushOptions(parent);

                                // * Dispatch the "show options" event.
                                object._div_options_street.dispatchEvent(new CustomEvent('showOptions'));
                                object._div_options_number.dispatchEvent(new CustomEvent('showOptions'));

                                // * Set the selected value.
                                x.setSelectedValue(parent, dataValue);

                                // ? If it is a street name option.
                                if (parent.id === AddressSearch.rsc().id.div.optionsStreet){

                                    // * Set the value of the input element.
                                    object._input_street.value = dataValue;

                                    // * Search for addresses that matches with the chosen street name.
                                    AddressSearch.ajax().getAddress(dataValue, (jsonObject) => {

                                        // * Reset the address cache array.
                                        object._cached_addresses.length = 0;

                                        // * Iterate through each JSON object.
                                        for (let i=0; i<jsonObject.length; i++){

                                            // * Push a new Address object to the cache table.
                                            object._cached_addresses.push(
                                                new Address(
                                                    jsonObject[i]['ID'],
                                                    jsonObject[i]['name'],
                                                    jsonObject[i]['house_number'],
                                                    jsonObject[i]['letter'],
                                                    jsonObject[i]['zip_code'],
                                                    jsonObject[i]['postal_location'],
                                                )
                                            );
                                        }

                                        // * Populate house number options.
                                        object._div_options_number.dispatchEvent(new CustomEvent('populateOptions'));

                                    });

                                // ? If it is a house number option.
                                } else if (parent.id === AddressSearch.rsc().id.div.optionsNumber){

                                    // * Set the value of the input element.
                                    object._input_number.value = innerText;

                                    AddressSearch.getCachedAddress(
                                        parseInt(x.getSelectedValue(parent)),
                                        object._cached_addresses,
                                        (address) => {

                                            x.setSelectedValue(object, address.id);

                                            object._input_zip.value = address.zip;
                                            object._input_area.value = address.area;
                                        }
                                    );

                                }
                            }
                        }
                    }
                },
            },
        }
    }




    /**
     * Filter array
     *
     * @param {string} searchValue - The search value.
     * @param {array} array - An array.
     * @param {function} callback - The callback function.
     * */
    static filterArray(searchValue, array, callback){
        let filteredArray = [];
        const rex = new RegExp(('(^' + searchValue.toLowerCase() + ')'));
        for (let i=0; i<array.length; i++){
            if (array[i].toLowerCase().match(rex)){
                filteredArray.push(array[i]);
            }
        }
        callback(filteredArray);
    }




    /**
     * Get Cached Address
     *
     * @param {number} id - The Address ID.
     * @param {array} array - The cached address array.
     * @param {function} callback - The callback function.
     * */
    static getCachedAddress(id, array, callback){
        for (let i=0; i<array.length; i++){
            if (id === array[i].id){
                callback(array[i]);
            }
        }
    }




    /**
     * Filter
     * */
    static filterAddressHouseNumber(houseNumber, array, callback){

        let returnArray = [];

        const numArray = houseNumber.split(' ');

        for (let i=0; i<array.length; i++){

            if (parseInt(numArray[0]) === array[i].number || houseNumber.length === 0){

                if (numArray.length > 1 && typeof array[i].letter === 'string'){

                    if (numArray[1] === array[i].letter){

                        returnArray.push(array[i]);
                    }

                } else {

                    returnArray.push(array[i]);

                }
            }
        }

        callback(returnArray);
    }




    /**
     * Flush Options
     * */
    static flushOptions(node){
        while(node.hasChildNodes()){
            node.firstChild.remove();
        }
    }




    /**
     * Element
     * */
    static element(object){
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
                if (disabled === true)
                    elem.setAttribute('disabled','');
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
                x.setScroll(elem,'y',true);
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
                elem.addEventListener(
                    AddressSearch.ev(object).div.option.click().type,
                    AddressSearch.ev(object).div.option.click().listener
                );
                return elem;
            },
        }

    }




    /**
     * AJAX Functions
     * */
    static ajax(){
        return {
            getStreets: (searchValue, callback) => {
                x.ajaxFetch(
                    AddressSearch.rsc().ajax.searchStreet.query(searchValue),
                    AddressSearch.rsc().ajax.searchStreet.file,
                    (rawData) => {
                        if (x.isJSON(rawData)){
                            callback(JSON.parse(rawData));
                        }
                    }

                );
            },
            getAddress: (searchValue, callback) => {
                x.ajaxFetch(
                    AddressSearch.rsc().ajax.searchAddress.query(searchValue),
                    AddressSearch.rsc().ajax.searchAddress.file,
                    (rawData) => {
                        if (x.isJSON(rawData)){
                            callback(JSON.parse(rawData));
                        }
                    }
                );
            },
        };
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