import * as x from '../function/global/functions.js';


export class RouteToolbar extends HTMLElement {


    /**
     * Constructor
     * */
    constructor(){
        super();
        this._chachedStreetNames = [];
    }




    /**
     * Values
     * */
    static values(){
        return {
            id: {
                input: {
                    streetName: 'street-name',
                    houseNumber: 'house-number'
                },
                select: {
                    filterRoute: 'filter-route',
                    changeRoute: 'change-route'
                },
                button: {
                    saveRouteChanges: 'commit-change'
                },
                div: {
                    addressCount: 'address-count',
                    optionsStreet: 'options-street',
                }
            },
            class: {
                input: 'input input-flat',
                select: 'input input-flat',
                button: 'btn bg-danger text-white',
                div: {
                    addressCount: 'input bg-clay text-lighter',
                    options: 'options',
                    option: 'option',
                },
            },
            attributes: {
                label: {
                    for: 'for',
                },
                input: {
                    type: 'text',
                    placeholder: 'placeholder',
                },
            },
            text: {
                label: {
                    streetName: 'Gatenamn:',
                    houseNumber: 'Husnummer:',
                    filterRoute: 'Filtrer etter rute:',
                    addressCount: 'Antall valgte adresser:',
                    changeRoute: 'Endre rute på valgte adresser:',
                    saveRouteChanges: 'Lagre endring:',
                },
                input: {
                    streetName: 'Søk etter gatenamn',
                    houseNumber: 'Søk etter husnummner'
                },
                select: {
                    default: 'Ikkje valgt',
                },
                button: {
                    text: 'Lagre endring',
                },
                div: {
                    addressCount: 'Antall adresser valgt: ',
                }
            },
            ajax: {
                routeSearch: {
                    searchValue: '?route=all',
                    phpFileURL: 'src/php/ajax/get_all_routes.php',
                },
                streetNameSearch: {
                    searchValue: function (name) {
                        return '?name=' + name;
                    },
                    phpFileURL: 'src/php/ajax/search_street.php',
                }
            }
        }
    }




    /**
     * Connected Callback
     * */
    connectedCallback(){
        if (this.isConnected){

            this.build();
            x.cout('Custom element built: RouteToolbar');

            this.getRoutes((jsonObject) => {
                this.populateRoutes(jsonObject);
            });
        }
    }




    /**
     * Build
     * */
    build() {

        // * Create essential elements:
        // Get static objects:
        const create = RouteToolbar.essentialElements();
        const value = RouteToolbar.values();

        const labels = {
            streetName: create.label(value.text.label.streetName, value.id.input.streetName),
            houseNumber: create.label(value.text.label.houseNumber, value.id.input.houseNumber),
            filterRoute: create.label(value.text.label.filterRoute, value.id.select.filterRoute),
            addressCount: create.label(value.text.label.addressCount),
            changeRoute: create.label(value.text.label.changeRoute, value.id.select.changeRoute),
            saveRouteChanges: create.label(value.text.button.text, value.id.button.saveRouteChanges)
        };

        // Input: Search street name.
        this._input_streetName = create.input(
            value.attributes.input.type,
            value.id.input.streetName,
            value.class.input,
            value.text.input.streetName
        );

        this._options_streetName = create.options(
            value.id.div.optionsStreet,
        );

        // Input: Search house number.
        this._input_houseNumber = create.input(
            value.attributes.input.type,
            value.id.input.houseNumber,
            value.class.input,
            value.text.input.houseNumber
        );

        // Select: Filter route.
        this._select_filterRoute = create.select(
            value.id.select.filterRoute,
            value.id.select.filterRoute,
            value.class.select,
            0,
            value.text.select.default
        );

        // Select: Change route.
        this._select_changeRoute = create.select(
            value.id.select.changeRoute,
            value.id.select.changeRoute,
            value.class.select,
            0,
            value.text.select.default
        );

        // Div: Address counter:
        this._div_addressCount = x.makeElement('div');
        this._div_addressCount.setAttribute('id', value.id.div.addressCount);
        this._div_addressCount.setAttribute('class', value.class.div.addressCount);
        this._div_addressCount.innerText = value.text.div.addressCount;

        // Button: Save route changes:
        this._button_saveRouteChanges = x.makeElement('button', value.text.button.text);
        this._button_saveRouteChanges.setAttribute('id', value.id.button.saveRouteChanges);
        this._button_saveRouteChanges.setAttribute('class', value.class.button);
        // TODO: This is a temporary solution.
        this._button_saveRouteChanges.style.display = 'block';


        // * Add event listeners:

        // Retrieve the RouteTable element from DOM.
        /**@type{HTMLElement}*/
        const routeTable = document.querySelector('route-table');

        // Fetch the onInput event listener object.
        const ev_onInput = RouteToolbar.ev_input_onInput(this, routeTable);

        // Add EventListener.
        this._input_streetName.addEventListener(
            ev_onInput.type,
            ev_onInput.listener
        );

        // Add EventListener.
        this._input_houseNumber.addEventListener(
            ev_onInput.type,
            ev_onInput.listener
        );


        // * Create rows:
        const row1 = RouteToolbar.generateRowAnd3Columns(
            [labels.streetName, this._input_streetName, this._options_streetName],
            [labels.houseNumber, this._input_houseNumber],
            [labels.filterRoute, this._select_filterRoute]
        );

        const row2 = RouteToolbar.generateRowAnd3Columns(
            [labels.addressCount, this._div_addressCount],
            [labels.changeRoute, this._select_changeRoute],
            [labels.saveRouteChanges, this._button_saveRouteChanges]
        );


        // * Append rows to self.
        this.append(row1, row2);
    }




    /**
     * Get routes
     *
     * @async
     * @description TODO: Write
     *
     * @param {function} callback - Callback function.
     * */
    async getRoutes(callback){

        // * Get AJAX parameters:
        const AJAX_SEARCH_VALUE = RouteToolbar.values().ajax.routeSearch.searchValue;
        const AJAX_PHP_FILE_URL = RouteToolbar.values().ajax.routeSearch.phpFileURL;

        // * Send and AJAX request.
        x.ajaxFetch(AJAX_SEARCH_VALUE, AJAX_PHP_FILE_URL, (rawData) => {

            // ? If retrieved data is of JSON format.
            if (x.isJSON(rawData)){

                // Invoke callback.
                callback(JSON.parse(rawData));
            }
        });
    }




    /**
     * Populate Routes
     *
     * @async
     * @description TODO: Write
     *
     * @param {object} jsonObject - A JSON object.
     * */
    async populateRoutes(jsonObject){

        const filterRoute_ID = RouteToolbar.values().id.select.filterRoute;
        const changeRoute_ID = RouteToolbar.values().id.select.changeRoute;
        const select_filterRoute = document.getElementById(filterRoute_ID);
        const select_changeRoute = document.getElementById(changeRoute_ID);

        for (let i=0; i<jsonObject.length; i++){

            const optionValue = jsonObject[i].ID;
            const optionText = jsonObject[i].no_nn;

            const optionFilterRoute = x.makeElement(
                'option',
                'Rute ' + optionValue + ': ' + optionText
            );
            const optionChangeRoute = x.makeElement(
                'option',
                'Rute ' + optionValue + ': ' + optionText
            );

            optionFilterRoute.value = optionValue;
            optionChangeRoute.value = optionValue;

            select_filterRoute.append(optionFilterRoute);
            select_changeRoute.append(optionChangeRoute);

        }

        x.cout('Route options populated!');
        x.cout(select_changeRoute.value);
    }




    /**
     * EventListener: On input
     *
     * @param {RouteToolbar} object - The object.
     * @param {HTMLInputElement} receiver - The receiving element.
     * */
    static ev_input_onInput(object, receiver){
        return {
            type: 'input',
            listener: event => {

                /**@type{HTMLSelectElement}*/
                const self = event.target;
                const value = self.value;

                // ? If the search value is greater than two characters.
                if (value.length > 2){

                    // * Fetch IDs:
                    const searchStreetName_ID = RouteToolbar.values().id.input.streetName;
                    const searchHouseNumber_ID = RouteToolbar.values().id.input.houseNumber;

                    // * Init. switch statement.
                    switch (self.getAttribute('id')) {

                        // ? If ID is equal to that of the searchStreetName element.
                        case searchStreetName_ID:

                            // * Get AJAX default data:
                            const ajax = RouteToolbar.values().ajax.streetNameSearch;
                            const query = ajax.searchValue(value);
                            const file = ajax.phpFileURL;

                            // * Invoke AJAX request.
                            x.ajaxFetch(query,file,(rawData) => {

                                // ? If raw data is of JSON format.
                                if (x.isJSON(rawData)){

                                    // Parse data to a JSON object.
                                    const jsonObject = JSON.parse(rawData);

                                    // Populate options.
                                    // TODO: Continue here.
                                    object.populateOptions(jsonObject);
                                }
                            });
                            break;


                        // ? If ID is equal to that of the searchHouseNumber element.
                        case searchHouseNumber_ID:

                            // * Init. custom event object.
                            const customEventObject = RouteToolbar.ev_input_houseNumber(object);

                            // * Instantiate new custom event object.
                            const customEvent = new CustomEvent(
                                customEventObject.typeArg,
                                customEventObject.eventInitDict
                            );

                            // * Dispatch event.
                            receiver.dispatchEvent(customEvent);
                            break;
                    }

                }
            }
        }
    }




    /**
     * EventListener: Option on click
     *
     * @param {RouteToolbar} object - The RouteToolbar object.
     *
     * @returns {object}
     * */
    static ev_option_onClick(object){
        return {
            type: 'click',
            listener: event => {

                // * Init. self.
                const self = event.target;

                // * Transfer value to input field.
                object._input_streetName.value = x.getDataValue(self);

                // * Refer to RouteTable element.
                const routeTable = document.querySelector('route-table');

                // * Init. custom event object.
                const customEventObject = RouteToolbar.ev_option_streetNameChosen(
                    x.getDataValue(self)
                );

                // * Instantiate new custom event.
                const ev_streetNameChosen = new CustomEvent(
                    customEventObject.typeArg,
                    customEventObject.eventInitDict
                );

                // * Dispatch event.
                routeTable.dispatchEvent(ev_streetNameChosen);

                // * Remove option children from options parent.
                x.removeChildren(object._options_streetName, () => {

                    // * Hide node.
                    x.showNode(object._options_streetName, false);
                });
            },
        }
    }




    /**
     * EventListener: Street Name Chosen
     *
     * @static
     * @description TODO: Write
     *
     * @param {string} dataValue - The data value of the element.
     *
     * @return {object}
     * */
    static ev_option_streetNameChosen(dataValue){
        return {
            typeArg: 'streetNameChosen',
            eventInitDict: {
                detail: {
                    dataValue: dataValue
                }
            }
        }
    }




    /**
     * EventListener: Input House Number
     *
     * @static
     * @description TODO: Write
     *
     *
     * */
    static ev_input_houseNumber(object){
        return {
            typeArg: 'searchHouseNumber',
            eventInitDict: {
                detail: {
                    houseNumber: object._input_houseNumber.value,
                }
            }
        }
    }




    /**
     * Essential Elements
     *
     * @static
     * @description TODO: Write
     *
     * @returns {object}
     * */
    static essentialElements(){
        return {
            label: function (title, pointTo = '') {
                const elem = x.makeElement('label');
                elem.setAttribute('for', pointTo);
                elem.innerText = title;
                return elem;
            },
            input: function (type, id, className, placeholder) {
                const elem = x.makeElement('input');
                elem.setAttribute('type', type);
                elem.setAttribute('id', id);
                elem.setAttribute('name', id);
                elem.setAttribute('class', className);
                elem.setAttribute('placeholder', placeholder);
                return elem;
            },
            options: function(id){
                const className = RouteToolbar.values().class.div.options;
                const elem = x.makeElement('div');
                elem.setAttribute('id', id);
                elem.setAttribute('class', className);
                x.showNode(elem,false);
                x.setScroll(elem,'y', true  );
                return elem;
            },
            option: function(text){
                const className = RouteToolbar.values().class.div.option;
                const elem = x.makeElement('div', text);
                elem.setAttribute('class', className);
                x.setDataValue(elem,text);
            },
            select: function (id, name, className, defaultValue, defaultName) {
                const elem = x.makeElement('select');
                elem.setAttribute('id', id);
                elem.setAttribute('name', id);
                elem.setAttribute('name', name);
                elem.setAttribute('class', className);
                const defaultOption = x.makeElement('option');
                defaultOption.value = defaultValue;
                defaultOption.innerText = defaultName;
                elem.append(defaultOption);
                return elem;
            }
        }
    }




    /**
     * Generate rows and columns
     *
     * @static
     * @description This function will return a populated row with three columns.
     *
     * @param {array} contentArray1 - An array of HTMLElement objects.
     * @param {array} contentArray2 - An array of HTMLElement objects.
     * @param {array} contentArray3 - An array of HTMLElement objects.
     *
     * @returns {HTMLElement}
     * */
    static generateRowAnd3Columns(contentArray1, contentArray2, contentArray3){

        // * Make an array of columns.
        const columnArray = [contentArray1, contentArray2, contentArray3];

        // * Create a row element:
        const row = x.makeElement('div');
        row.classList.add('row');

        // * Loop through column array.
        for (let i=0; i<3; i++){

            // Create column element:
            const col = x.makeElement('div');
            col.classList.add('col');

            // Loop through each column content.
            for (let j=0; j<columnArray[i].length; j++)
                col.append(columnArray[i][j]);

            // Append column to row.
            row.append(col);
        }

        // * Return row element.
        return row;

    }




    /**
     * Populate Options
     *
     * @param {object} jsonObject - The JSON object.
     * */
    populateOptions(jsonObject){

        // * Remove child nodes before introducing new ones.
        x.removeChildren(this._options_streetName, () => {

            // * Loop through all JSON objects.
            for (let i=0; i<jsonObject.length; i++){

                // * Create new option element:
                const option = x.makeElement('div');
                option.innerText = jsonObject[i].name;
                x.setDataValue(option, jsonObject[i].name);

                // * Add event listener.
                const eventObject = RouteToolbar.ev_option_onClick(this);
                option.addEventListener(
                    eventObject.type,
                    eventObject.listener
                );

                // * Append option element to options element.
                this._options_streetName.append(option);

                x.showNode(this._options_streetName, true);
            }
        });
    }

}


