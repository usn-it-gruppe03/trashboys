import * as x from '../function/global/functions.js';
import {OrderBox} from "./OrderBox.js";


/**
 * Order Table
 *
 * @author Isak K. Hauge
 * */
export class OrderTable extends HTMLElement {


    /**
     * Constructor
     * */
    constructor(){
        super();
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

        // * Create essential elements:
        this._table = x.makeElement('table');
        this._thead = x.makeElement('thead');
        this._tbody = x.makeElement('tbody');

        // * Build columns.
        this.buildColumns(() => {

            // * Append all elements:
            this._table.append(this._thead,this._tbody);
            this.append(this._table);

        });

        this.populateTable();
    }




    /**
     * Essential Values
     * */
    static resource(){
        return {
            id: {},
            class: {
                button: {
                    viewButton: 'btn btn-clay'
                }
            },
            attribute: {},
            text: {
                tableHeadColumns: [
                    'Ordre-ID',
                    'Tidsmerke',
                    'Fornamn',
                    'Etternamn',
                    'Se ordrelinje',
                ],
            },
            ajax: {
                query: (rowStart, rowCount) => {
                    return '?row_start=' + rowStart + '&row_count=' + rowCount;
                },
                file: 'src/php/ajax/list_orders_range.php',
            },
        }
    }




    /**
     * General Elements
     * */
    static elements(){
        return {
            tr: (columnArray, columnType) => {
                const tr = x.makeElement('tr');
                for (let i=0; i<columnArray.length; i++){
                    const col = x.makeElement(columnType);
                    col.append(columnArray[i]);
                    tr.append(col);
                }
                return tr;
            },
            viewButton: (orderID) => {
                const elem = x.makeElement('button', 'Se ordre');
                elem.setAttribute('class', OrderTable.resource().class.button.viewButton);
                elem.addEventListener(
                    OrderTable.ev_viewBtn_onClick().type,
                    OrderTable.ev_viewBtn_onClick().listener
                );
                x.setDataValue(elem, orderID);
                return elem;
            }
        }
    }




    /**
     * Build Columns
     * */
    buildColumns(callback){

        const tr = OrderTable.elements().tr(
            OrderTable.resource().text.tableHeadColumns,
            'th'
        );

        this._thead.append(tr);

        callback();
    }




    /**
     * Populate Table
     * */
    populateTable(){

        x.removeChildren(this._tbody, () => {

            const ajax = OrderTable.resource().ajax;
            const query = ajax.query(0,50);
            const file = ajax.file;

            x.ajaxFetch(query,file, (rawData) => {
                if (x.isJSON(rawData)){

                    const jsonObject = JSON.parse(rawData);

                    for (let i=0; i<jsonObject.length; i++){

                        const columnArray = [
                            jsonObject[i].ID,
                            jsonObject[i].time,
                            jsonObject[i].first_name,
                            jsonObject[i].last_name,
                            OrderTable.elements().viewButton(jsonObject[i].ID),
                        ];

                        const tr = OrderTable.elements().tr(
                            columnArray, 'td'
                        );

                        this._tbody.append(tr);

                    }
                }
            });

        });

    }




    /**
     * EventListener: View Button On Click
     * */
    static ev_viewBtn_onClick(){
        return {
            type: 'click',
            listener: event => {
                const order_ID = x.getDataValue(event.target);
                const orderBox = x.makeElement('order-box');
                orderBox.setAttribute(
                    OrderBox.rsc().attribute.order_ID,
                    order_ID
                );
                const destination = document.querySelector('body');
                destination.append(orderBox);
            }
        }
    }

}