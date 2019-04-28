import * as x from '../function/global/functions.js';


/**
 * Order Box
 *
 * @author Isak K. Hauge
 * */
export class OrderBox extends HTMLElement {


    /**
     * Constructor
     * */
    constructor(){
        super();
        this._order_ID = null;
        this._sum = 0;
        this._useFallback = false;
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

        // * Harvest attributes.
        this.harvestAttributes();


        // * Build essential elements:
        this._button_close = x.makeElement('button', 'Lukk');
        this._table_customerDetails = x.makeElement('table');
        this._tbody_customerDetails = x.makeElement('tbody');
        this._table_productDetails = x.makeElement('table');
        this._thead_productDetails = x.makeElement('thead');
        this._tbody_productDetails = x.makeElement('tbody');
        this._tfoot_productDetails = x.makeElement('tfoot');


        // * Build div elements:
        const div_card = x.makeElement('div');
        div_card.setAttribute('class', OrderBox.rsc().class.div.collectionCard);
        const div_closeBtn = x.makeElement('div');
        div_closeBtn.setAttribute('class', OrderBox.rsc().class.div.closeBtn);
        const div_customerDetails = x.makeElement('div');
        div_customerDetails.setAttribute('class', OrderBox.rsc().class.div.customerDetails);
        const div_productDetails = x.makeElement('div');
        div_productDetails.setAttribute('class', OrderBox.rsc().class.div.productDetails);


        // * Build close button.
        this._button_close.setAttribute('class', OrderBox.rsc().class.button.closeBtn);


        // * Add event listeners.
        this._button_close.addEventListener(
            OrderBox.ev_closeBtn_onClick(this).type,
            OrderBox.ev_closeBtn_onClick(this).listener
        );


        // * Arrange and append:
        // Append table body to table.
        this._table_customerDetails.append(
            this._tbody_customerDetails
        );

        // Append all table elements.
        this._table_productDetails.append(
            this._thead_productDetails,
            this._tbody_productDetails,
            this._tfoot_productDetails
        );

        // Append close button into div element.
        div_closeBtn.append(this._button_close);

        // Append customer table to container div.
        div_customerDetails.append(this._table_customerDetails);

        // Append product table to container div.
        div_productDetails.append(this._table_productDetails);

        // Append main content to card.
        div_card.append(div_closeBtn,div_customerDetails,div_productDetails);

        // Last append.
        this.append(div_card);


        // * Populate customer details:
        this.populateCustomerDetails();


        // * Populate product details:
        this.populateProductDetails();
    }




    /**
     * Resources
     * */
    static rsc(){
        return {
            id: {
                div: {
                    customerDetails: 'customer-details',
                    productDetails: 'product-details',
                }
            },
            class: {
                div: {
                    collectionCard: 'card card-white p-1',
                    closeBtn: 'w-100 text-right',
                    customerDetails: 'my-2 table-container',
                    productDetails: 'table-container'
                },
                button: {
                    closeBtn: 'btn btn-clay'
                }
            },
            attribute: {
                order_ID: 'order-id',
            },
            text: {
                table1: {
                    customer_ID: 'Kundenummer:',
                    time: 'Tid:',
                    firstName: 'Fornamn:',
                    lastName: 'Etternamn:',
                    address: 'Adresse:',
                },
                table2: {
                    product_ID: 'Produktkode:',
                    description: 'Beskrivelse:',
                    quantity: 'Antall:',
                    unitPrice: 'Enhetspris:',
                    cost: 'Kostnad:',
                    sum: 'Sum:'
                },
                button: {
                    close: 'Lukk',
                }
            },
            ajax: {
                customerDetails: {
                    query: (id) => {
                        return '?id=' + id;
                    },
                    file: 'src/php/ajax/get_order_customer.php',
                },
                productDetails: {
                    query: (id) => {
                        return '?id=' + id;
                    },
                    file: 'src/php/ajax/get_order_product.php',
                }
            },
            fallback: {
                customerDetails: {
                    customer_ID: 1337,
                    time: new Date(),
                    firstName: 'Arnold',
                    lastName: 'Schwarzenegger',
                    address: 'Gullbringvegen 36B, 3800 BØ I TELEMARK',
                },
                productDetails: {
                    product_ID: 1010,
                    description: 'Machine gun',
                    quantity: 2,
                    unitPrice: 35000,
                }
            }
        }
    }




    /**
     * General elements
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
        }
    }




    /**
     * Harvest Attributes
     * */
    harvestAttributes(){

        // ? If this object has been assigned with an order ID.
        if (x.attrDefined(this, OrderBox.rsc().attribute.order_ID)){

            // * Get the order ID from its attribute.
            this._order_ID = parseInt(this.getAttribute(
                OrderBox.rsc().attribute.order_ID
            ));

        } else this._useFallback = true;
    }




    /**
     * Populate Customer Details
     * */
    populateCustomerDetails(){

        // ? If attribute has been defined.
        if (this._order_ID !== null && !this._useFallback){

            // * Invoke AJAX request.
            x.ajaxFetch(
                OrderBox.rsc().ajax.customerDetails.query(this._order_ID),
                OrderBox.rsc().ajax.customerDetails.file,
                (rawData) => {

                    // ? If raw data is of JSON format.
                    if (x.isJSON(rawData)){

                        // * Get column text.
                        const textArray = Object.values(OrderBox.rsc().text.table1);

                        // * Convert raw data to JSON object.
                        const jsonObject = JSON.parse(rawData);

                        // * Create an array of the JSON object.
                        const dataArray = [
                            jsonObject[0]['user_ID'],
                            jsonObject[0]['time'],
                            jsonObject[0]['first_name'],
                            jsonObject[0]['last_name'],
                            jsonObject[0]['address']
                        ];

                        // * Iterate through the data.
                        for (let i=0; i<dataArray.length; i++){

                            // * Init. column array.
                            const columnArray = [
                                textArray[i],
                                dataArray[i]
                            ];

                            // * Generate table row.
                            const tr = OrderBox.elements().tr(
                                columnArray, 'td'
                            );

                            // * Append table row to table body.
                            this._tbody_customerDetails.append(tr);

                        }

                    }

                }
            );

        } else {

            // * Get fallback data:
            const textArray = Object.values(OrderBox.rsc().text.table1);
            const dataArray = Object.values(OrderBox.rsc().fallback.customerDetails);

            // * Iterate through arrays.
            for (let i=0; i<dataArray.length; i++){

                // * Init a column array.
                const columnArray = [
                    textArray[i],
                    dataArray[i]
                ];

                // * Generate a table row element.
                const tr = OrderBox.elements().tr(
                    columnArray, 'td'
                );

                // * Append row to table body.
                this._tbody_customerDetails.append(tr);

            }

        }

    }




    /**
     * Populate Product Details
     * */
    populateProductDetails(){

        // * Create table head columns:
        // Fetch the text and put it into an array.
        const columnArray = Object.values(
            OrderBox.rsc().text.table2
        );

        // Remove the last value "sum".
        columnArray.length = columnArray.length - 1;

        // Generate table row.
        const tableHeadRow = OrderBox.elements().tr(
            columnArray, 'th'
        );

        // * Append table head row to <thead> element.
        this._thead_productDetails.append(tableHeadRow);


        // * Populate table content:
        // ? If an order ID has been assigned through attribute.
        if (this._order_ID !== null && !this._useFallback){

            // * Invoke AJAX request.
            x.ajaxFetch(
                OrderBox.rsc().ajax.productDetails.query(this._order_ID),
                OrderBox.rsc().ajax.productDetails.file,
                (rawData) => {

                    // ? If raw data is of JSON format.
                    if (x.isJSON(rawData)){

                        // Convert raw data to a JSON object.
                        const jsonObject = JSON.parse(rawData);

                        // Iterate through object.
                        for (let i=0; i<jsonObject.length; i++){

                            // Add to sum for each loop.
                            this._sum += parseFloat(jsonObject[i]['total']);

                            // Init. column array.
                            const columnArray = [
                                jsonObject[i]['product_ID'],
                                jsonObject[i]['name'],
                                jsonObject[i]['quantity'],
                                jsonObject[i]['price'],
                                jsonObject[i]['total']
                            ];

                            // Generate table row.
                            const tr = OrderBox.elements().tr(columnArray, 'td');

                            // Append table row to table footer element.
                            this._tbody_productDetails.append(tr);

                        }

                        // * Create the table footer:
                        // Create sum text column:
                        const th_sum_text = x.makeElement(
                            'th', OrderBox.rsc().text.table2.sum
                        );
                        th_sum_text.setAttribute('colspan', '4');

                        // Create sum value column.
                        const th_sum_value = x.makeElement(
                            'th', this._sum
                        );

                        // Create table row.
                        const tr = x.makeElement('tr');

                        // * Append:
                        tr.append(th_sum_text,th_sum_value);
                        this._tfoot_productDetails.append(tr);

                    }

                }
            );

        }

    }




    /**
     * EventListener: Close Button On Click
     *
     * @param {OrderBox} object - The OrderBox object.
     * */
    static ev_closeBtn_onClick(object){
        return {
            type: 'click',
            listener: event => {
                object.remove();
            }
        }
    }

}