import * as x from '../function/global/functions.js';
import {ShoppingCart} from "./ShoppingCart.js";


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
        this.build();
    }




    /**
     * Resource
     * */
    static rsc(){
        return {
            id: {
                div: {},
                p: {},
                i: {},
                button: {},
            },
            class: {
                div: {
                    productImage: 'product-box-img'
                },
                p: {
                    productName: 'product-box-name',
                    productPrice: 'product-box-price',
                },
                i: {
                    productCategory: 'bullet'
                },
                button: {
                    addToCart: 'btn btn-green fx-3d-green',
                },
            },
            attribute: {
                productID: 'product-id',
                productImage: 'product-img',
                productName: 'product-name',
                productCategory: 'product-category',
                productPrice: 'product-price',

            },
            text: {
                button: {
                    addToCart: 'Legg til kurv'
                }
            },
        }
    }




    /**
     * Harvest Attributes
     * */
    harvestAttributes(){

        // ? If ID attribute is defined.
        if (x.attrDefined(this, ProductBox.rsc().attribute.productID))
            this._productID = this.getAttribute(ProductBox.rsc().attribute.productID);
        else this._productID = ProductBox.fallback().id;

        // ? If image attribute is defined.
        if (x.attrDefined(this, ProductBox.rsc().attribute.productImage))
            this._productImage = this.getAttribute(ProductBox.rsc().attribute.productImage);
        else this._productImage = ProductBox.fallback().img;

        // ? If name attribute is defined.
        if (x.attrDefined(this, ProductBox.rsc().attribute.productName))
            this._productName = this.getAttribute(ProductBox.rsc().attribute.productName);
        else this._productName = ProductBox.fallback().name;

        // ? If category attribute is defined.
        if (x.attrDefined(this, ProductBox.rsc().attribute.productCategory))
            this._productCategory = this.getAttribute(ProductBox.rsc().attribute.productCategory);
        else this._productCategory = ProductBox.fallback().category;

        // ? If price attribute is defined.
        if (x.attrDefined(this, ProductBox.rsc().attribute.productPrice))
            this._productPrice = this.getAttribute(ProductBox.rsc().attribute.productPrice);
        else this._productPrice = ProductBox.fallback().price;

    }




    /**
     * Observed Attributes
     * */
    static get observedAttributes(){
        return Object.values(ProductBox.rsc().attribute);
    }




    /**
     * Attribute Changed Callback
     * */
    attributeChangedCallback(attributeName, oldValue, newValue){

        // * Process new input value.
        switch (attributeName) {
            case ProductBox.rsc().attribute.productID:
                this._productID = (oldValue !== newValue) ? newValue : oldValue;
                break;
            case ProductBox.rsc().attribute.productImage:
                this._productImage = (oldValue !== newValue) ? newValue : oldValue;
                this._productImage = newValue;
                break;
            case ProductBox.rsc().attribute.productName:
                this._productName = (oldValue !== newValue) ? newValue : oldValue;
                break;
            case ProductBox.rsc().attribute.productCategory:
                this._productCategory = (oldValue !== newValue) ? newValue : oldValue;
                break;
            case ProductBox.rsc().attribute.productPrice:
                this._productPrice = (oldValue !== newValue) ? newValue : oldValue;
                break;
        }


        // * Update object.
        this.update();

    }




    /**
     * Connected callback
     * */
    connectedCallback(){
        if (this.isConnected){
            x.componentLoadedMessage(this);
            this.harvestAttributes();
            this.render();
        }
    }




    /**
     * Fallback
     * */
    static fallback(){
        return {
            id: 0,
            name: 'Generic Product Name',
            img: 'src/media/img/demo/bin.jpg',
            price: 150.0,
            category: 'Example',
        }
    }




    /**
     * Update
     * */
    update(){

        // * Set the product image.
        this._div_productImage.style.backgroundImage = 'url("' + this._productImage + '")';

        // * Set the product name.
        this._p_productName.innerText = this._productName;

        // * Set the product category.
        this._i_productCategory.innerText = this._productCategory;

        // * Set the product price.
        this._p_productPrice.innerText = this._productPrice;

    }




    /**
     * Build
     * */
    build(){

        // * Create Elements:
        // Product image:
        this._div_productImage = x.makeElement('div');
        this._div_productImage.classList.add(ProductBox.rsc().class.div.productImage);

        // Product name:
        this._p_productName = x.makeElement('p');
        this._p_productName.classList.add(ProductBox.rsc().class.p.productName);

        // Product category:
        this._i_productCategory = x.makeElement('i');
        this._i_productCategory.classList.add(ProductBox.rsc().class.i.productCategory);

        // Product price:
        this._p_productPrice = x.makeElement('p');
        this._p_productPrice.classList.add(ProductBox.rsc().class.p.productPrice);

        // Product add-to-cart-button:
        this._button_addToCart = x.makeElement('button');
        this._button_addToCart.setAttribute('class', ProductBox.rsc().class.button.addToCart);
        this._button_addToCart.innerText = ProductBox.rsc().text.button.addToCart;


        // * Add event listener.
        this._button_addToCart.addEventListener(
            ProductBox.ev().button_onClick(this).type,
            ProductBox.ev().button_onClick(this).listener
        );

    }




    /**
     * Append
     * */
    render(){

        this.append(
            this._div_productImage,
            this._p_productName,
            this._i_productCategory,
            this._p_productPrice,
            this._button_addToCart
        );

    }




    /**
     * EventListeners
     * */
    static ev() {
        return {
            /**
             * Button On Click.
             * @param {ProductBox} productBoxObject - This object.
             * */
            button_onClick: (productBoxObject) => {
                return {
                    type: 'click',
                    listener: () => {

                        // * Create events:
                        const ev_addToCart = new CustomEvent(
                            ProductBox.ev().addToCart(productBoxObject).typeArg,
                            ProductBox.ev().addToCart(productBoxObject).eventInitDict
                        );

                        // * Get elements:
                        const shoppingCart = document.querySelector('shopping-cart');

                        // * Dispatch events:
                        shoppingCart.dispatchEvent(ev_addToCart);

                        // * Update cart.
                        ShoppingCart.updateCart();

                    }
                };
            },
            /**
             * Add to Cart.
             * @param {ProductBox} productBoxObject - This object.
             * */
            addToCart: (productBoxObject) => {
                return {
                    typeArg: 'addToCart',
                    eventInitDict: {
                        detail: {
                            id: parseInt(productBoxObject._productID),
                            name: productBoxObject._productName,
                            category: productBoxObject._productCategory,
                            price: parseFloat(productBoxObject._productPrice),
                            quantity: 1,
                        }
                    }
                };
            }
        }
    }

}