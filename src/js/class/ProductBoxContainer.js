import * as x from '../function/global/functions.js';
import {ProductBox} from "./ProductBox.js";


/**
 * ProductBoxContainer
 *
 * @author Isak K. Hauge
 * @version 1
 * @copyright 2019-04-16
 * */
export class ProductBoxContainer extends HTMLElement {


    /**
     * Constructor
     * */
    constructor(){
        super();
        this.build();
    }




    /**
     * Resources
     * */
    static rsc(){
        return {
            id: {},
            class: {
                self: 'w-100',
                div: {
                    row: 'row',
                    col: 'col text-center flex-column-center-center mt-2',
                }
            },
            attribute: {},
            tagName: {
                productBox: 'product-box',
            },
            text: {},
            ajax: {
                getProducts: {
                    query: '?products=all',
                    file: 'src/php/ajax/get_all_products.php',
                }
            },
            images: [
                {id: 1, url: 'src/media/img/demo/pose_bio.jpg'},
                {id: 2, url: 'src/media/img/demo/pose_bio.jpg'},
                {id: 3, url: 'src/media/img/demo/pose_bio.jpg'},
                {id: 4, url: 'src/media/img/demo/bin.jpg'},
            ],

        }
    }




    /**
     * Connected Callback
     * */
    connectedCallback(){
        if (this.isConnected){
            x.componentLoadedMessage(this);
            this.render();
        }
    }




    /**
     * Build
     * */
    build(){

        // * Set class on self.
        this.classList.add(ProductBoxContainer.rsc().class.self);

        // * Create row:
        this._div_row = x.makeElement('div');
        this._div_row.classList.add(ProductBoxContainer.rsc().class.div.row);

    }




    /**
     * Render
     * */
    render(){

        ProductBoxContainer.ajax_getProducts((jsonObject) => {

            // * Iterate through JSON object.
            for (let i=0; i<jsonObject.length; i++){
                this._div_row.append(
                    ProductBoxContainer.elements().col([
                        ProductBoxContainer.elements().productBox(
                            jsonObject[i]['ID'],
                            ProductBoxContainer.getCorrespondingImage(
                                jsonObject[i]['ID']
                            ),
                            jsonObject[i]['name'],
                            jsonObject[i]['category'],
                            jsonObject[i]['price']
                        )
                    ])
                );
            }

            // * Append.
            this.append(this._div_row);

        });

    }




    /**
     * AJAX: Get Products
     * */
    static ajax_getProducts(callback){
        x.ajaxFetch(
            ProductBoxContainer.rsc().ajax.getProducts.query,
            ProductBoxContainer.rsc().ajax.getProducts.file,
            (rawData) => {
                // ? If the raw data is of JSON format.
                if (x.isJSON(rawData)){
                    callback(JSON.parse(rawData));
                }

            }
        );
    }




    /**
     * Get Corresponding Image
     * */
    static getCorrespondingImage(id){
        const imageArray = ProductBoxContainer.rsc().images;
        for (let i=0; i<imageArray.length; i++){
            if (imageArray[i]['id'] === id){
                return imageArray[i]['url'];
            }
        }
        return 'src/media/img/demo/boks_farlig.png';
    }




    /**
     * Elements
     * */
    static elements(){
        return {
            col: (elementArray) => {
                const elem = x.makeElement('div');
                elem.setAttribute(
                    'class',
                    ProductBoxContainer.rsc().class.div.col
                );
                for (let i=0; i<elementArray.length; i++) {
                    elem.append(elementArray[i]);
                }
                return elem;
            },
            productBox: (id,img,name,category,price) => {
                const elem = x.makeElement('product-box');
                elem.setAttribute(ProductBox.rsc().attribute.productID, id);
                elem.setAttribute(ProductBox.rsc().attribute.productImage, img);
                elem.setAttribute(ProductBox.rsc().attribute.productName, name);
                elem.setAttribute(ProductBox.rsc().attribute.productCategory, category);
                elem.setAttribute(ProductBox.rsc().attribute.productPrice, price);
                return elem;
            }
        }

    }

}