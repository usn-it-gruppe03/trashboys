import * as x from '../function/global/functions.js';
import {Address} from "./Address.js";


/**
 * Route Table
 *
 * @author Isak K. Hauge
 * */
export class RouteTable extends HTMLElement {


    /**
     * Constructor
     * */
    constructor(){
        super();
        this._cachedAddresses = [];
        this._checkedRowCount = 0;
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
            id: {},
            class: {
                i: {
                    routeBullet: 'bullet bg-warning m-0',
                },
            },
            attribute: {
                input: {
                    checkBox: {
                        address_ID: 'data-address-id',
                    }
                }
            },
            text: {
                th: {
                    2: 'Køyrerute',
                    3: 'Gatenamn',
                    4: 'Husnummer',
                    5: 'Postkode',
                    6: 'Poststed'
                }
            },
            ajax: {
                searchAddress: {
                    searchValue: function(name, rowStart, rowCount){
                        return '?name=' + name + '&row_start=' + rowStart + '&row_count=' + rowCount;
                    },
                    phpFileURL: 'src/php/ajax/search_address_continuously.php',
                },
                searchStreet: {
                    searchValue: function(name){
                        return '?name=' + name;
                    },
                    phpFileURL: 'src/php/ajax/search_street.php',
                },
            }
        }
    }




    /**
     * Connected Callback
     * */
    connectedCallback(){
        if (this.isConnected){
            this.build();
        }
    }




    /**
     * Build
     * */
    build(){

        // * Create basic elements:
        const table = x.makeElement('table');
        const thead = x.makeElement('thead');
        this._tbody = x.makeElement('tbody');


        // * Create row and columns for the table head:
        // Init. "check all" checkbox element.
        this._checkAll = x.makeElement('input');
        this._checkAll.setAttribute('type','checkbox');

        // Create the table head column array.
        const columnArray = [
            this._checkAll,
            document.createTextNode(RouteTable.values().text.th["2"]),
            document.createTextNode(RouteTable.values().text.th["3"]),
            document.createTextNode(RouteTable.values().text.th["4"]),
            document.createTextNode(RouteTable.values().text.th["5"]),
            document.createTextNode(RouteTable.values().text.th["6"]),
        ];

        // Init. table row for the table header element.
        const tableHeadRow = RouteTable.essentialElements().tableRow(columnArray,'th');


        // * Add event listeners:
        this.addEventListener(
            RouteTable.ev_streetNameChosen(this).type,
            RouteTable.ev_streetNameChosen(this).listener
        );


        // * Append all:
        thead.append(tableHeadRow);
        table.append(thead,this._tbody);
        this.append(table);

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
            routeBullet: (innerText) => {
                const elem = x.makeElement('i');
                const className = RouteTable.values().class.i.routeBullet;
                elem.setAttribute('class', className);
                innerText = (innerText == null) ? 'Udefinert' : 'Rute ' + innerText;
                elem.innerText = innerText;
                return elem;
            },
            checkBox: (address_ID) => {
                const elem = x.makeElement('input');
                const attribute = RouteTable.values().attribute.input.checkBox.address_ID;
                elem.setAttribute('type', 'checkbox');
                elem.setAttribute(attribute, address_ID);
                return elem;
            },
            tableRow: (columnArray, columnType) => {
                const tableRow = x.makeElement('tr');
                for (let i=0; i<columnArray.length; i++){
                    const column = x.makeElement(columnType);
                    column.append(columnArray[i]);
                    tableRow.append(column);
                }
                return tableRow;
            }
        }
    }




    /**
     * EventListener: Street Name Chosen
     *
     * @static
     * @description TODO: Write
     *
     * @returns {object}
     * */
    static ev_streetNameChosen(object){
        return {
            type: 'streetNameChosen',
            listener: event => {

                // * Deconstruct event detail object.
                const streetName = event.detail.dataValue;

                // * Fetch AJAX values:
                const ajax = RouteTable.values().ajax.searchAddress;
                const query = ajax.searchValue(streetName,0,100);
                const file = ajax.phpFileURL;

                // * Invoke AJAX request.
                x.ajaxFetch(query,file,(rawData) => {

                    // ? If raw data is of JSON format.
                    if (x.isJSON(rawData)){

                        // Convert raw data to JSON object.
                        const jsonObject = JSON.parse(rawData);

                        object.populateTable(jsonObject);
                    }
                });

            },
        }
    }




    /**
     * Populate table
     * */
    populateTable(jsonObject){

        // * Remove child nodes before introducing new ones.
        x.removeChildren(this._tbody, () => {

            // Loop through all objects.
            for (let i=0; i<jsonObject.length; i++){

                // * Create a column array.
                const columnArray = [
                    RouteTable.essentialElements().checkBox(jsonObject[i].ID),
                    RouteTable.essentialElements().routeBullet(jsonObject[i].route_ID),
                    jsonObject[i].name,
                    jsonObject[i].house_number + ' ' + jsonObject[i].letter,
                    jsonObject[i].zip_code,
                    jsonObject[i].postal_location
                ];

                // * Generate a table row.
                const tableRow = RouteTable.essentialElements().tableRow(
                    columnArray, 'td'
                );

                // * Append row to table body.
                this._tbody.append(tableRow);

            }

        });

    }



















}