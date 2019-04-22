import * as x from '../function/global/functions.js';
import {ProductBox} from "./ProductBox.js";
import {ShoppingCart} from "./ShoppingCart.js";


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
                    quantity: 'product-item-quantity',
                    description: 'product-item-description',
                    name: 'product-item-name',
                    category: 'product-item-category',
                    price: 'product-item-price',
                    delete: 'product-item-delete',
                },
                button: {
                    delete: 'btn btn-clay fx-3d-clay'
                }
            },
            attribute: {
                id: 'product-id',
                name: 'product-name',
                price: 'product-price',
                category: 'product-category',
                quantity: 'product-quantity',
            },
            text: {
                button: {
                    delete: 'Fjern',
                }
            },
            ev: {
                name: {
                    delete: 'deleteProductItem'
                }
            }
        }
    }




    /**
     * Fallback
     * */
    static fallback(){
        return {
            id: 0,
            name: 'Generic Product Name',
            price: 2.45,
            category: 'Example',
            quantity: 1,
        };
    }




    /**
     * Observed Attributes
     * */
    static get observedAttributes(){
        return Object.values(ProductItem.rsc().attribute);
    }




    /**
     * Attribute Changed Callback.
     *
     * @description TODO: Write desc.
     * */
    attributeChangedCallback(attributeName, oldValue, newValue){

        // * Process new input values.
        switch (attributeName) {

            case ProductItem.rsc().attribute.id:
                this._id = (oldValue !== newValue) ? newValue : oldValue;
                break;
            case ProductItem.rsc().attribute.name:
                this._name = (oldValue !== newValue) ? newValue : oldValue;
                break;
            case ProductItem.rsc().attribute.price:
                this._price = (oldValue !== newValue) ? newValue : oldValue;
                break;
            case ProductItem.rsc().attribute.category:
                this._category = (oldValue !== newValue) ? newValue : oldValue;
                break;
            case ProductItem.rsc().attribute.quantity:
                this._quantity = (oldValue !== newValue) ? newValue : oldValue;
                break;

        }

        // * Update object.
        this.update();

    }




    /**
     * Connected Callback.
     * */
    connectedCallback(){
        if (this.isConnected){
            this.harvestAttributes();
            this.render();
            x.componentLoadedMessage(this);
        }
    }




    /**
     * Disconnected Callback.
     * */
    disconnectedCallback(){

        // * Remove Event Listeners:
        this.removeEventListener(
            ProductItem.ev().deleteProductItem().typeArg,
            ProductItem.ev().deleteProductItem().listener
        );
        this._button_delete.removeEventListener(
            ProductItem.ev().button_onClick().type,
            ProductItem.ev().button_onClick().listener
        );

        // * Remove object variables:
        this._div_quantity.remove();
        this._div_description.remove();
        this._div_name.remove();
        this._div_category.remove();
        this._div_price.remove();
        this._div_delete.remove();
        this._button_delete.remove();

        x.componentRemovedMessage(this);

    }




    /**
     * Harvest Attributes.
     * */
    harvestAttributes(){

        // ? If ID attribute has been defined.
        if (x.attrDefined(this, ProductItem.rsc().attribute.id))
            this._id = this.getAttribute(ProductItem.rsc().attribute.id);

        // ? If name attribute has been defined.
        if (x.attrDefined(this, ProductItem.rsc().attribute.name))
            this._name = this.getAttribute(ProductItem.rsc().attribute.name);

        // ? If price attribute has been defined.
        if (x.attrDefined(this, ProductItem.rsc().attribute.price))
            this._price = this.getAttribute(ProductItem.rsc().attribute.price);

        // ? If category attribute has been defined.
        if (x.attrDefined(this, ProductItem.rsc().attribute.category))
            this._category = this.getAttribute(ProductItem.rsc().attribute.category);

        // ? If quantity attribute has been defined.
        if (x.attrDefined(this, ProductItem.rsc().attribute.quantity))
            this._quantity = this.getAttribute(ProductItem.rsc().attribute.quantity);

    }




    /**
     * Build.
     * */
    build(){

        // * Create elements:
        this._div_quantity = x.makeElement('div');
        this._div_description = x.makeElement('div');
        this._div_name = x.makeElement('div');
        this._div_category = x.makeElement('div');
        this._div_price = x.makeElement('div');
        this._div_delete = x.makeElement('div');
        this._button_delete = x.makeElement('button', ProductItem.rsc().text.button.delete);

        // * Add classes:
        this._div_description.classList.add(ProductItem.rsc().class.div.description);
        this._div_name.classList.add(ProductItem.rsc().class.div.name);
        this._div_category.classList.add(ProductItem.rsc().class.div.category);
        this._div_price.classList.add(ProductItem.rsc().class.div.price);
        this._div_delete.classList.add(ProductItem.rsc().class.div.delete);
        this._div_quantity.classList.add(ProductItem.rsc().class.div.quantity);
        this._button_delete.setAttribute('class', ProductItem.rsc().class.button.delete);

        // * Add event listeners:
        this._button_delete.addEventListener(
            ProductItem.ev().button_onClick(this).type,
            ProductItem.ev().button_onClick(this).listener
        );
        this.addEventListener(
            ProductItem.ev().deleteProductItem().typeArg,
            ProductItem.ev().deleteProductItem().listener
        );

    }




    /**
     * Update
     * */
    update(){

        // * Update data:
        this._div_quantity.innerText = this._quantity;
        this._div_name.innerText = this._name;
        this._div_category.innerText = this._category;
        this._div_price.innerText = this._price;

    }




    /**
     * Render
     * */
    render(){

        this._div_description.append(
            this._div_name,
            this._div_category,
            this._div_price
        );

        this._div_delete.append(this._button_delete);

        this.append(
            this._div_quantity,
            this._div_description,
            this._div_delete
        );

    }





    /**
     * EventListener
     * */
    static ev(){
        return {
            /**
             * Button: On Click
             * @param {ProductItem} productItemObject
             * */
            button_onClick: (productItemObject) => {
                return {
                    type: 'click',
                    listener: () => {

                        // * Create event listener.
                        const ev_deleteProduct = new CustomEvent(ProductItem.rsc().ev.name.delete);

                        // * Dispatch event.
                        productItemObject.dispatchEvent(ev_deleteProduct);

                    },
                }
            },
            deleteProductItem: () => {
                return {
                    typeArg: ProductItem.rsc().ev.name.delete,
                    listener: event => {

                        // * Remove element from DOM.
                        event.target.remove();

                        // * Update shopping cart.
                        ShoppingCart.updateCart();
                    }
                }
            },
        }
    }

}