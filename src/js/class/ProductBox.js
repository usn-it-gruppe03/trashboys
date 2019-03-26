import * as x from '../function/global/functions.js';


/**
 * ProductBox
 *
 * @author Isak K. Hauge
 * */
export class ProductBox extends HTMLElement {


    /**
     * Constructor
     * */
    constructor(){
        super();
    }




    /**
     * Attribute names
     *
     * @description This function will return an object
     * that contains all expected attribute names for
     * this class.
     *
     * @returns {object}
     * */
    static attr(){
        return {
            id: 'product-id',
            name: 'data-name',
            img: 'data-img',
            price: 'data-price',
            category: 'data-category',
        };
    }




    /**
     * Connected callback
     * */
    connectedCallback(){
        if (this.isConnected)
            this._updateRendering();
    }




    /**
     * Update rendering
     * */
    _updateRendering(){
        this.harvestAttributes();
        this.build();
    }




    /**
     * Fallback
     *
     * @description This function will return an object
     * that contains fallback data that can be used in
     * case attributes were not correctly defined.
     *
     * @returns {object}
     * */
    static fallback(){
        return {
            id: 0,
            name: 'Generic Product Name',
            img: 'src/media/img/demo/bin.jpg',
            price: 150.0,
            category: 1,
        }
    }




    /**
     * Harvest Attributes
     *
     * @description This function will check for data in the
     * legal attributes defined in this class, and then assign
     * those values to the object's attributes.
     *
     * @see attr
     * @see fallback
     * */
    harvestAttributes(){

        // * Get static data:
        let a = ProductBox.attr();
        let fb = ProductBox.fallback();

        // * Assign data from attributes to object:
        this.id = (x.attrDefined(this, a.id)) ? parseInt(this.getAttribute(a.id)) : fb.id;
        this.name = (x.attrDefined(this, a.name)) ? this.getAttribute(a.name) : fb.name;
        this.img = (x.attrDefined(this, a.img)) ? this.getAttribute(a.img) : fb.img;
        this.price = (x.attrDefined(this, a.price)) ? parseFloat(this.getAttribute(a.price)) : fb.price;
        this.categoryIndex = (x.attrDefined(this, a.category)) ? parseInt(this.getAttribute(a.category)) : fb.category;
    }




    /**
     * Build
     * */
    build(){


        // * Simplify functions:
        const create = (elementTag) => {return document.createElement(elementTag);};


        // * Create elements:
        const IMG = create('div');
        const NAME = create('p');
        const CAT = create('i');
        const BTN = create('btn');
        const PRICE = create('p');


        // * Construct elements:
        // Product image:
        IMG.style.backgroundImage = 'url("' + this.img + '")';
        IMG.classList.add('product-box-img');

        // Name:
        NAME.innerText = this.name;
        NAME.classList.add('product-box-name');

        // Category:
        CAT.innerText = ProductBox.niceCategory(this.categoryIndex);
        CAT.classList.add('bullet');

        // Button:
        BTN.innerText = 'Legg til kurv';
        BTN.classList.add('btn', 'btn-green', 'fx-3d-green');
        let {type, listener} = ProductBox.btnOnClick(this);
        BTN.addEventListener(type,listener);

        // Price:
        PRICE.innerText = this.price;
        PRICE.classList.add('product-box-price');


        // * Append nodes to object.
        this.append(IMG,NAME,CAT,PRICE,BTN);

    }




    /**
     * Static: Button On Click
     *
     * @description This function will return object
     * that will be used as an event listener.
     *
     * @param {ProductBox} object - This object.
     *
     * @returns {object}
     * */
    static btnOnClick(object){
        return {
            // ** Init. event type. **
            type: 'click',

            // ** Init. event listener. **
            listener: event => {

                // * Custom event: Add to Cart:
                // Create custom event:
                let {typeArg, eventInitDict} = ProductBox.addToCart(object);
                const EV_ADD_TO_CART = new CustomEvent(typeArg, eventInitDict);

                // Get the product list element from DOM.
                const PRODUCT_LIST = document.getElementById('product-list');

                // Dispatch the custom event.
                PRODUCT_LIST.dispatchEvent(EV_ADD_TO_CART);


                // * Custom event: Update Cart:
                const SHOPPING_CART = document.querySelector('shopping-cart');
                const SHOP_BUTTON_BADGE = document.getElementById('shop-button-badge');
                const EV_UPDATE_CART = new CustomEvent('updateCart');
                SHOPPING_CART.dispatchEvent(EV_UPDATE_CART);
                SHOP_BUTTON_BADGE.dispatchEvent(EV_UPDATE_CART);

            }
        };
    }




    /**
     * Static: Add to Cart
     *
     * @description This function will return an object
     * that will be used as a custom event. The custom
     * event will be stored with data from this object.
     *
     * @param {ProductBox} object - This object.
     *
     * @returns {object}
     * */
    static addToCart(object){
        return {
            // * Init. event type.
            typeArg: 'addToCart',

            // * Init. custom event dictionary.
            eventInitDict: {
                detail: {
                    id: object.id,
                    name: object.name,
                    price: object.price,
                    categoryIndex: object.categoryIndex,
                    quantity: 1,
                }
            }
        };
    }




    /**
     * Getter: ID
     *
     * @returns {number}
     * */
    get id(){
        return this._id;
    }




    /**
     * Setter: ID
     *
     * @param {number} id - The ID
     * */
    set id(id){
        this._id = id;
    }




    /**
     * Getter: Name
     *
     * @returns {string}
     * */
    get name() {
        return this._name;
    }




    /**
     * Setter: Name
     *
     * @param {string} name  - The name
     * */
    set name(name) {
        this._name = name;
    }




    /**
     * Getter: Image
     *
     * @returns {string}
     * */
    get img() {
        return this._img;
    }




    /**
     * Setter: Image
     *
     * @param {string} url  - The image URL
     * */
    set img(url) {
        this._img = url;
    }




    /**
     * Getter: Price
     *
     * @returns {number}
     * */
    get price() {
        return this._price;
    }




    /**
     * Setter: Price
     *
     * @param {number} value  - The product value.
     * */
    set price(value) {
        this._price = value;
    }




    /**
     * Getter: Category index
     *
     * @returns {number}
     * */
    get categoryIndex() {
        return this._categoryIndex;
    }




    /**
     * Setter: Category index
     *
     * @param {number} index  - The index corresponding with
     * the legal categories defined in this class.
     *
     * @see categories
     * */
    set categoryIndex(index) {
        this._categoryIndex = index;
    }




    /**
     * Categories
     *
     * @description This function will return an object
     * that contains all official categoryIndex names.
     *
     * @returns {object}
     * */
    static categories(){
        return {
            1: 'Våtorganisk avfall',
            2: 'Papp- og papiravfall',
            3: 'Restavfall',
            4: 'Plastemballasje',
            5: 'Farleg avfall',
        }
    }




    /**
     * Get niceCategory
     *
     * @description This function will return the nice
     * string version of the niceCategory.
     *
     * @param {number} index - The index corresponding to
     * a niceCategory defined in this class.
     *
     * @see categories
     *
     * @returns {string}
     * */
    static niceCategory(index){

        // Get all categories.
        let cat = ProductBox.categories();

        // ? Bool: If the categoryIndex exists.
        let hasProp = cat.hasOwnProperty(index);

        // Init. error message.
        let msg = 'Kategorien ' + index + ' finnes ikke';

        // ? If the categoryIndex does not exist.
        if (!hasProp)
            new Error(msg);

        // Return categoryIndex or an error.
        return hasProp ? cat[index] : 'udefinert';

    }

}