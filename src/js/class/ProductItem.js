import * as x from '../function/global/functions.js';
import {ProductBox} from "./ProductBox.js";


/**
 * Product Item
 *
 * @author Isak Hauge
 * @version 2.0
 * */
export class ProductItem extends HTMLElement {


    /**
     * Constructor.
     * */
    constructor(){
        super();
    }




    /**
     * Attributes.
     *
     * @static
     * @description TODO: Write desc.
     *
     * @returns {object}
     * */
    static attr(){
        return {
            id: 'product-id',
            name: 'data-name',
            price: 'data-price',
            categoryIndex: 'data-category',
            quantity: 'data-quantity',
            class: {
                quantity: 'product-item-quantity',
                description: 'product-item-description',
                name: 'product-item-name',
                category: 'product-item-category',
                price: 'product-item-price',
                delete: 'product-item-delete',
            },
        };
    }




    /**
     * Fallback.
     *
     * @static
     * @description TODO: Write desc.
     *
     * @returns {object}
     * */
    static fallback(){
        return {
            id: 0,
            name: 'Generic Product Name',
            price: 2.45,
            categoryIndex: 1,
            quantity: 1,
        };
    }




    /**
     * Observed Attributes.
     *
     * @static
     * @description TODO: Write desc.
     *
     * @returns {object}
     * */
    static get observedAttributes(){
        return [
            ProductItem.attr().id,
            ProductItem.attr().name,
            ProductItem.attr().price,
            ProductItem.attr().categoryIndex,
            ProductItem.attr().quantity,
        ];
    }




    /**
     * Attribute Changed Callback.
     *
     * @description TODO: Write desc.
     * */
    attributeChangedCallback(attrName, oldValue, newValue){

        // ? If the element has been built.
        if (this.hasBeenBuilt) {

            // * Get all legal attributes.
            let a = ProductItem.attr();

            // * Switch: Check the attribute name.
            switch (attrName) {

                // ? If attribute is name:
                case a.name:
                    this.nameElement.innerText = newValue;
                    break;

                // ? If attribute is price:
                case a.price:
                    this.priceElement.innerText = newValue;
                    break;

                // ? If attribute is category:
                case a.categoryIndex:
                    this.categoryElement.innerText = ProductBox.niceCategory(newValue);
                    break;

                // ? If attribute is quantity:
                case a.quantity:
                    this.quantityElement.innerText = newValue;
                    break;
            }

        }

    }




    /**
     * Connected Callback.
     * */
    connectedCallback(){
        if (this.isConnected){
            this.build();
        }
    }




    /**
     * Build.
     * */
    build(){

        // * Process attributes.
        this.harvestAttributes();

        // * Get all legal attributes.
        const attr = ProductItem.attr();

        // * Simplify create function.
        const create = (tag) => {return document.createElement(tag)};

        this.setAttribute(attr.id, this.id.toString());

        // * Create elements:
        this.quantityElement = create('div');
        const DESCRIPTION = create('div');
        this.nameElement = create('div');
        this.categoryElement = create('div');
        this.priceElement = create('div');
        const DELETE = create('div');
        this.buttonElement = create('button');

        // * Arrange elements:
        DESCRIPTION.append(this.nameElement,this.categoryElement,this.priceElement);
        DELETE.append(this.buttonElement);

        // * Construct elements:
        this.quantityElement.classList.add(attr.class.quantity);
        this.quantityElement.innerText = this.quantity.toString();

        DESCRIPTION.classList.add(attr.class.description);

        this.nameElement.classList.add(attr.class.name);
        this.nameElement.innerText = this.name;

        this.categoryElement.classList.add(attr.class.category);
        this.categoryElement.innerText = ProductBox.niceCategory(this.categoryIndex);

        this.priceElement.classList.add(attr.class.price);
        this.priceElement.innerText = parseInt(this.price).toFixed(2);

        DELETE.classList.add(attr.class.delete);

        this.buttonElement.classList.add('btn', 'btn-shop-remove');
        this.buttonElement.innerText = 'Fjern';
        this.buttonElement.addEventListener(
            ProductItem.btnOnClick(this).type,
            ProductItem.btnOnClick(this).listener
        );


        // * Append child nodes to main node.
        this.append(this.quantityElement,DESCRIPTION,DELETE);


        // * Add event listener.
        this.addEventListener(
            ProductItem.deleteProductItem(this).type,
            ProductItem.deleteProductItem(this).listener
        );


        // * Set build status.
        this.hasBeenBuilt = true;

    }




    /**
     * Button on click.
     *
     * @static
     * @description TODO: Write.
     *
     * @param {ProductItem} productItem - The object.
     * */
    static btnOnClick(productItem){
        return {
            type: 'click',
            listener: event => {

                const DELETE_PRODUCT_ITEM = new CustomEvent('deleteProductItem');
                productItem.dispatchEvent(DELETE_PRODUCT_ITEM);

                const SHOPPING_CART = document.querySelector('shopping-cart');
                const SHOP_BUTTON_BADGE = document.getElementById('shop-button-badge');
                const UPDATE_CART = new CustomEvent('updateCart');
                SHOPPING_CART.dispatchEvent(UPDATE_CART);
                SHOP_BUTTON_BADGE.dispatchEvent(UPDATE_CART);

            },
        };
    }




    /**
     * Delete Product Item.
     *
     * @static
     * @description TODO: Write.
     * */
    static deleteProductItem(object){
        return {
            type: 'deleteProductItem',
            listener: event => {

                object.buttonElement.removeEventListener(
                    ProductItem.btnOnClick(object).type,
                    ProductItem.btnOnClick(object).listener,
                );
                object.removeEventListener(
                    ProductItem.deleteProductItem(object).type,
                    ProductItem.deleteProductItem(object).listener,
                );
                object.remove();
            }
        }
    }




    /**
     * Harvest Attributes.
     *
     * @description TODO: Write.
     * */
    harvestAttributes(){

        // * Get all legal attributes.
        let attr = ProductItem.attr();

        // * Get fallback data.
        let fb = ProductItem.fallback();

        // * Harvest attributes:
        this.id = (x.attrDefined(this,attr.id)) ? parseInt(this.getAttribute(attr.id)) : fb.id;
        this.name = (x.attrDefined(this,attr.name)) ? this.getAttribute(attr.name) : fb.name;
        this.price = (x.attrDefined(this,attr.price)) ? parseFloat(this.getAttribute(attr.price)) : fb.price;
        this.categoryIndex = (x.attrDefined(this,attr.categoryIndex)) ? parseInt(this.getAttribute(attr.categoryIndex)) : fb.categoryIndex;
        this.quantity = (x.attrDefined(this,attr.quantity)) ? parseInt(this.getAttribute(attr.quantity)) : fb.quantity;
    }




    /**
     * Get All Attributes.
     *
     * @returns {object}
     * */
    get getAllAttributes(){
        this.harvestAttributes();
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            categoryIndex: this.categoryIndex,
            quantity: this.quantity,
        }
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
     * Getter: Quantity
     *
     * @returns {number}
     * */
    get quantity() {
        return this._quantity;
    }




    /**
     * Setter: Quantity
     *
     * @param {number} value  - The product value.
     * */
    set quantity(value) {
        this._quantity = value;
    }




    /**
     * Getter: Quantity Element.
     *
     * @return {HTMLElement}
     * */
    get quantityElement(){
        return this._quantityElement;
    }




    /**
     * Setter: Quantity Element.
     *
     * @param {HTMLElement} element - An HTML element.
     * */
    set quantityElement(element){
        this._quantityElement = element;
    }




    /**
     * Getter: Name Element.
     *
     * @return {HTMLElement}
     * */
    get nameElement(){
        return this._nameElement;
    }




    /**
     * Setter: Name Element.
     *
     * @param {HTMLElement} element - An HTML element.
     * */
    set nameElement(element){
        this._nameElement = element;
    }




    /**
     * Getter: Category Element.
     *
     * @return {HTMLElement}
     * */
    get categoryElement(){
        return this._categoryElement;
    }




    /**
     * Setter: Category Element.
     *
     * @param {HTMLElement} element - An HTML element.
     * */
    set categoryElement(element){
        this._categoryElement = element;
    }




    /**
     * Getter: Price Element.
     *
     * @return {HTMLElement}
     * */
    get priceElement(){
        return this._priceElement;
    }




    /**
     * Setter: Price Element.
     *
     * @param {HTMLElement} element - An HTML element.
     * */
    set priceElement(element){
        this._priceElement = element;
    }




    /**
     * Getter: Button Element.
     *
     * @return {HTMLElement}
     * */
    get buttonElement(){
        return this._buttonElement;
    }




    /**
     * Setter: Button Element.
     *
     * @param {HTMLElement} element - An HTML element.
     * */
    set buttonElement(element){
        this._buttonElement = element;
    }




    get hasBeenBuilt(){
        return this._hasBeenBuilt;
    }

    set hasBeenBuilt(boolean){
        this._hasBeenBuilt = boolean;
    }


}