import * as x from "../function/global/functions.js";
import {TabPage} from "./TabPage.js";


/**
 * Collection Grid
 * */
export class CollectionGrid extends HTMLElement {


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
            class: {
                div: {
                    collectionAddress: 'collection-address',
                    collectionCard: 'collection-card',
                    collectionDetails: 'collection-details',
                    wasteIcon: 'waste-icon',
                    wasteCategory: 'waste-category',
                    collectionDate: 'collection-date',
                    remainingDays: 'remaining-days',
                }
            },
            attribute: {
                addressID: 'address-id',
            },
            ev: {},
            text: {},
            ajax: {
                collectionDetails: {
                    query: (id) => {
                        return '?id=' + id
                    },
                    file: 'src/php/ajax/get_collection_details.php'
                }
            },
            icon: {
                organic:    {id: 1, url: 'src/media/img/icon/waste/organic.svg'},
                paper:      {id: 2, url: 'src/media/img/icon/waste/paper.svg'},
                residual:   {id: 3, url: 'src/media/img/icon/waste/residual.svg'},
                plastic:    {id: 4, url: 'src/media/img/icon/waste/plastic.svg'},
                hazardous:  {id: 5, url: 'src/media/img/icon/waste/hazardous.svg'},
            }
        }
    }




    /**
     * Observed Attributes
     * @static
     * */
    static get observedAttributes(){
        return Object.values(CollectionGrid.rsc().attribute);
    }




    /**
     * Attribute Changed Callback
     * */
    attributeChangedCallback(attributeName, oldValue, newValue){
        if (attributeName === CollectionGrid.rsc().attribute.addressID){
            this._addressID = (oldValue !== newValue) ? newValue : oldValue;
            this.update();
        }
    }




    /**
     * Connected Callback
     * */
    connectedCallback(){
        if (this.isConnected){
            x.componentLoadedMessage(this);
        }
    }




    /**
     * Build
     * */
    build(){
        this._addressID = null;
        this._rows = [];
        this._cols = [];
    }




    /**
     * Update
     * */
    update(){

        // * Clear cached tables:
        this._rows.length = 0;
        this._cols.length = 0;

        // ? If address ID is defined.
        if (this._addressID !== null){

            // * Get collection details from DB corresponding with the ID.
            this.getCollectionDetails(this._addressID, (jsonObject) => {

                // ? If the JSON object has any data.
                if (jsonObject.length > 0){

                    /*
                    * Create the collection address element, append it inside a column
                    * element and append the column element to the cached rows table.
                    * */
                    this._rows.push(
                        CollectionGrid.element().div.row([
                            CollectionGrid.element().div.col([
                                CollectionGrid.element().div.collectionAddress(
                                    jsonObject[0]['address'],
                                    jsonObject[0]['area']
                                )
                            ])
                        ])
                    );


                    /*
                    * Iterate through the JSON object in order to generate column elements
                    * consisting of collection details for each waste category.
                    * */
                    for (let i=0; i<jsonObject.length; i++){

                        // * Create card element.
                        const card = CollectionGrid.element().div.collectionCard(
                            jsonObject[i]['ID'],
                            jsonObject[i]['name'],
                            jsonObject[i]['date'],
                        );

                        // * Create column element.
                        const col = CollectionGrid.element().div.col([card]);

                        // * Add column to cached table.
                        this._cols.push(col);
                    }


                    /*
                    * Iterate through each of the cached column elements generated in the
                    * for-loop above, and distribute them into an array of cached rows with
                    * two columns per row element.
                    * */
                    for (let j=0; j<this._cols.length; j++){

                        // ? If the array has at least two more elements.
                        if (j+1 < this._cols.length){

                            // * Push two columns in one row.
                            this._rows.push(
                                CollectionGrid.element().div.row([
                                    this._cols[j], this._cols[j+1]
                                ])
                            );
                            j++;

                        } else {

                            // * Push one column in one row.
                            this._rows.push(
                                CollectionGrid.element().div.row([
                                    this._cols[j]
                                ])
                            );

                        }

                    }


                    // * Render the updated object.
                    this.render();

                }
            });
        }
    }





    /**
     * Render
     * */
    render(){

        // * Remove any previously created child nodes.
        x.removeChildren(this, () => {

            // * Iterate through each cached row element.
            for (let i=0; i<this._rows.length; i++){
                // Append to self.
                this.append(this._rows[i]);
            }

        });

    }




    /**
     * Get Collection Details
     * */
    getCollectionDetails(id, callback){
        x.ajaxFetch(
            CollectionGrid.rsc().ajax.collectionDetails.query(id),
            CollectionGrid.rsc().ajax.collectionDetails.file,
            (rawData) => {
                if (x.isJSON(rawData)){
                    callback(JSON.parse(rawData));
                }
            }
        );
    }




    /**
     * Element
     * */
    static element(){
        return {
            div: {
                collectionCard: (wasteCategoryID, wasteCategory, collectionDate) => {

                    // * Create elements:
                    const div_collectionCard = x.makeElement('div');
                    const img_wasteIcon = x.makeElement('img');
                    const div_collectionDetails = x.makeElement('div');
                    const div_wasteCategory = x.makeElement('div');
                    const div_collectionDate = x.makeElement('div');
                    const div_remainingDays = x.makeElement('div');

                    // * Add CSS classes:
                    div_collectionCard.setAttribute('class', CollectionGrid.rsc().class.div.collectionCard);
                    img_wasteIcon.setAttribute('class', CollectionGrid.rsc().class.div.wasteIcon);
                    div_collectionDetails.setAttribute('class', CollectionGrid.rsc().class.div.collectionDetails);
                    div_wasteCategory.setAttribute('class', CollectionGrid.rsc().class.div.wasteCategory);
                    div_collectionDate.setAttribute('class', CollectionGrid.rsc().class.div.collectionDate);
                    div_remainingDays.setAttribute('class', CollectionGrid.rsc().class.div.remainingDays);

                    // * Add content:
                    img_wasteIcon.src = CollectionGrid.iconFromWasteCatID(wasteCategoryID);
                    img_wasteIcon.alt = 'Waste category icon';
                    div_wasteCategory.innerText = wasteCategory;
                    div_collectionDate.innerText = TabPage.beautifyDate(collectionDate);
                    div_remainingDays.innerText = TabPage.relTimeDesc(TabPage.daysLeft(collectionDate));

                    // * Append nodes:
                    div_collectionDetails.append(div_wasteCategory, div_collectionDate, div_remainingDays);
                    div_collectionCard.append(img_wasteIcon,div_collectionDetails);

                    // * Return element.
                    return div_collectionCard;

                },
                collectionAddress: (address, area) => {
                    const elem = x.makeElement('div', address + ',<br>' + area);
                    elem.setAttribute('class', CollectionGrid.rsc().class.div.collectionAddress);
                    return elem;
                },
                col: (elementArray) => {
                    const col = x.makeElement('div');
                    col.classList.add('col');
                    for (let i=0; i<elementArray.length; i++){
                        col.append(
                            elementArray[i]
                        );
                    }
                    return col;
                },
                row: (columnArray) => {
                    const row = x.makeElement('div');
                    row.classList.add('row');
                    for (let i=0; i<columnArray.length; i++){
                        row.append(
                            columnArray[i]
                        );
                    }
                    return row;
                }
            }
        }
    }




    /**
     * Get Icon
     * */
    static iconFromWasteCatID(id){
        const icon = Object.values(CollectionGrid.rsc().icon);
        for (let i=0; i<icon.length; i++){
            if (icon[i]['id'] === id){
                return icon[i]['url'];
            }
        }
        return CollectionGrid.rsc().icon.residual.url;
    }




    /**
     * Event Listeners
     * */
    static ev(){}
}


































