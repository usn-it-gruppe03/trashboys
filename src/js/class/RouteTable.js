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
                    routeBullet: 'bullet bg-warning',
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
            RouteTable.ev_searchStreetName(this).type,
            RouteTable.ev_searchStreetName(this).listener
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
     * EventListener
     *
     * @static
     * @description TODO: Write
     *
     * @returns {object}
     * */
    static ev_searchStreetName(object){
        return {
            type: 'searchStreetName',
            listener: event => {

                // * Deconstruct event detail object.
                const streetName = event.detail.searchValue;
                const routeNumber = event.detail.routeFilter;

                // * Fetch AJAX values:
                const ajax_searchStreet = {
                    searchValue: RouteTable.values().ajax.searchStreet.searchValue(streetName),
                    phpFileURL: RouteTable.values().ajax.searchStreet.phpFileURL,
                }

            },
        }
    }



















}