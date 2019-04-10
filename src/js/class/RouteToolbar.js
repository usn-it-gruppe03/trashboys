import * as x from '../function/global/functions.js';


export class RouteToolbar extends HTMLElement {


    /**
     * Constructor
     * */
    constructor(){
        super();
        this._isTyping = false;
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
                }
            },
            class: {
                input: 'input input-flat',
                select: 'input input-flat',
                button: 'btn bg-danger text-white',
                div: {
                    addressCount: 'input bg-clay text-lighter'
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
                searchValue: '?route=all',
                phpFileURL: 'src/php/ajax/get_all_routes.php',
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
        const ev_onInput = RouteToolbar.ev_onInput(this, routeTable);

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
            [labels.streetName, this._input_streetName],
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
        const AJAX_SEARCH_VALUE = RouteToolbar.values().ajax.searchValue;
        const AJAX_PHP_FILE_URL = RouteToolbar.values().ajax.phpFileURL;

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
     * EventListener: Search Street Name
     *
     * @static
     * @description TODO: Write
     *
     * @param {RouteToolbar} object - The object.
     *
     * @returns {object}
     * */
    static ev_searchStreetName(object){
        return {
            typeArg: 'searchStreetName',
            eventInitDict: {
                detail: {
                    searchValue: object._input_streetName.value,
                    routeFilter: object._select_filterRoute.value,
                }
            }
        }

    }




    /**
     * EventListener: Search House Number
     *
     * @static
     * @description TODO: Write
     *
     * @param {RouteToolbar} object - The object.
     *
     * @returns {object}
     * */
    static ev_searchHouseNumber(object){
        return {
            typeArg: 'searchHouseNumber',
            eventInitDict: {
                detail: {
                    searchValue: object._input_houseNumber.value,
                    routeFilter: object._select_filterRoute.value,
                }
            }
        }

    }




    /**
     * EventListener: On input
     *
     * @param {RouteToolbar} object - The object.
     * @param {HTMLElement} receiver - The receiving element.
     * */
    static ev_onInput(object, receiver){
        return {
            type: 'input',
            listener: event => {

                /**@type{HTMLSelectElement}*/
                const self = event.target;
                const value = self.value;

                // ? If the search value is greater than two characters.
                if (value.length > 3){

                    // * Fetch IDs:
                    const searchStreetName_ID = RouteToolbar.values().id.input.streetName;
                    const searchHouseNumber_ID = RouteToolbar.values().id.input.houseNumber;

                    // Fetch custom event object.
                    let customEventObject = {};

                    // * Init. switch statement.
                    switch (self.getAttribute('id')) {

                        // ? If ID is equal to that of the searchStreetName element.
                        case searchStreetName_ID:
                            customEventObject = RouteToolbar.ev_searchStreetName(object);
                            break;

                        // ? If ID is equal to that of the searchHouseNumber element.
                        case searchHouseNumber_ID:
                            customEventObject = RouteToolbar.ev_searchHouseNumber(object);
                            break;
                    }

                    // * Instantiate new custom event object.
                    const customEvent = new CustomEvent(
                        customEventObject.typeArg,
                        customEventObject.eventInitDict
                    );

                    // * Dispatch event.
                    receiver.dispatchEvent(customEvent);

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
     * Type
     * */
    async activateTypeMode(){

        this._isTyping = true;
        setTimeout(()=> {
            this._isTyping = false;
        }, 3000);

    }
}


