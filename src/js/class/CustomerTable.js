import * as x from '../function/global/functions.js';


/**
 * Customer Table
 *
 * @author Isak K. Hauge
 * */
export class CustomerTable extends HTMLElement {


    /**
     * Constructor
     * */
    constructor(){
        super();

        // * Create table fundamentals:
        this._table = x.makeElement('table');
        this._tableHead = x.makeElement('thead');
        this._tableBody = x.makeElement('tbody');
    }




    /**
     * Default values
     *
     * @static
     * @description TODO: Write.
     * */
    static values(){
        return {
            attribute:{
                customerID: 'customer-id'
            },
            tableHead:{
                column1: 'Fornamn',
                column2: 'Etternamn',
                column3: 'Abbonent',
                column4: 'Brukartype',
                column5: 'Adresse',
            },
            tablePage:{
                rows: 20
            }
        }
    }




    /**
     * AJAX settings
     *
     * @static
     * @description TODO: Write
     * */
    static ajaxSettings(){
        return {
            query: function (rowStart, rowEnd) {
                return '?row_start=' + rowStart + '&row_count=' + rowEnd;
            },
            phpFileURL: 'src/php/ajax/list_users_range.php'
        }
    }




    /**
     * Connected Callback
     * */
    connectedCallback(){
        if (this.isConnected)
            this.build();
    }




    /**
     * Build
     * */
    build(){

        this.buildHeadColumns(this._tableHead);
        this.populateBody(this._tableBody);
        this._table.append(this._tableHead, this._tableBody);
        this.append(this._table);

    }




    /**
     * Build Table Head Columns
     *
     * @description TODO: Write
     *
     * @param {HTMLElement} tableHead - This object's <thead> element.
     * */
    buildHeadColumns(tableHead){

        // * Fetch standard values.
        const columns = CustomerTable.values().tableHead;

        // * Init. table head columns.
        const TABLE_HEAD_COLUMNS = [
            x.makeElement('th', columns.column1),
            x.makeElement('th', columns.column2),
            x.makeElement('th', columns.column3),
            x.makeElement('th', columns.column4),
            x.makeElement('th', columns.column5)
        ];

        // * Append columns to table head.
        for (let i=0; i<TABLE_HEAD_COLUMNS.length; i++){
            tableHead.append(TABLE_HEAD_COLUMNS[i]);
        }

    }




    /**
     * Populate Table Body
     *
     * @description TODO: Write
     *
     * @param {HTMLElement} tableBody - This object's <tbody> element.
     * */
    populateBody(tableBody){

        // * Fetch default values:
        const DEFAULT = CustomerTable.values();
        const SEARCH_VALUE = CustomerTable.ajaxSettings().query(0, DEFAULT.tablePage.rows);
        const PHP_FILE_URL = CustomerTable.ajaxSettings().phpFileURL;


        // * Fetch data via AJAX.
        x.ajaxFetch(SEARCH_VALUE, PHP_FILE_URL, (rawData) => {

            // ? If text data is of JSON format.
            if (x.isJSON(rawData)){

                // Convert JSON object to an array of objects.
                const OBJECT_ARRAY = Object.values(JSON.parse(rawData));

                // Loop through the object array.
                for (let i=0; i<OBJECT_ARRAY.length; i++){

                    // Init. table row element.
                    const TABLE_ROW = x.makeElement('tr');

                    // Convert object to an array of values.
                    const CUSTOMER_DATA = Object.values(OBJECT_ARRAY[i]);

                    // Loop through the array.
                    for (let j=1; j<CUSTOMER_DATA.length; j++){

                        // Init. table data element.
                        let COLUMN = x.makeElement('td');

                        // ? If array index is 3.
                        if (j === 3){

                            // ? If value is 0.
                            if (CUSTOMER_DATA[j] === 0)
                                COLUMN.innerText = 'Nei';

                            // ? If value is 1.
                            else if (CUSTOMER_DATA[j] === 1)
                                COLUMN.innerText = 'Ja';

                        } else {

                            // Init. table data element.
                            COLUMN.innerText = CUSTOMER_DATA[j];

                        }

                        // Append table data element to table row.
                        TABLE_ROW.append(COLUMN);

                        // Set customer ID attribute.
                        TABLE_ROW.setAttribute('customer-id', CUSTOMER_DATA[0]);
                    }

                    // Append table row to table body.
                    tableBody.append(TABLE_ROW);

                }

            } else {
                x.cout('AJAX error. Data is not of JSON format.');
            }
        });
    }


}