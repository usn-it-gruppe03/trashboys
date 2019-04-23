import {ProductItem} from "./ProductItem.js";
import * as x from '../function/global/functions.js';
import {ProfileBadge} from "./ProfileBadge.js";


/**
 * Shopping Cart
 *
 * @author Isak Hauge
 * @version 2.0
 * */
export class ShoppingCart extends HTMLElement {


    /**
     * Constructor.
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
            id: {
                self: 'shopping-cart',
                productList: 'product-list',
            },
            class: {
                div: {
                    productList: 'product-list',
                    cartDetails: 'shopping-cart-details',
                    cartQuantity: 'shopping-cart-quantity',
                    cartSum: 'shopping-cart-sum',
                },
                button: {
                    order: 'btn btn-green fx-3d-green'
                },
            },
            attribute: {},
            text: {
                button: {
                    order: 'Bestill varane',
                }
            },
            ajax: {
                sendOrder: {
                    file: 'src/php/ajax/register_order.php',
                },
            },
            ev: {
                name: {
                    addToCart: 'addToCart',
                    updateCart: 'updateCart',
                }
            }
        }
    }




    /**
     * Connected Callback
     * */
    connectedCallback(){
        if (this.isConnected){
            this.render();
            x.componentLoadedMessage(this);
        }
    }




    /**
     * Build
     * */
    build(){

        // * Create elements:
        this._div_productList = x.makeElement('div');
        this._div_cartDetails = x.makeElement('div');
        this._div_cartQuantity = x.makeElement('div');
        this._div_cartSum = x.makeElement('div');
        this._button_order = x.makeElement('button',ShoppingCart.rsc().text.button.order);

        // * Set ID:
        this.id = ShoppingCart.rsc().id.self;
        this._div_productList.id = ShoppingCart.rsc().id.productList;

        // * Add class:
        this._div_productList.classList.add(ShoppingCart.rsc().class.div.productList);
        this._div_cartDetails.classList.add(ShoppingCart.rsc().class.div.cartDetails);
        this._div_cartQuantity.classList.add(ShoppingCart.rsc().class.div.cartQuantity);
        this._div_cartSum.classList.add(ShoppingCart.rsc().class.div.cartSum);
        this._button_order.setAttribute('class', ShoppingCart.rsc().class.button.order);

        // * Add event listeners:
        this.addEventListener(
            ShoppingCart.ev().addToCart().type,
            ShoppingCart.ev().addToCart().listener
        );
        this.addEventListener(
            ShoppingCart.ev().updateCart().type,
            ShoppingCart.ev().updateCart().listener
        );
        this._button_order.addEventListener(
            ShoppingCart.ev().click_orderBtn().type,
            ShoppingCart.ev().click_orderBtn().listener
        );

    }




    /**
     * Render
     * */
    render(){

        this._div_cartDetails.append(
            this._div_cartQuantity,
            this._div_cartSum
        );

        this.append(
            this._div_productList,
            this._div_cartDetails,
            this._button_order
        );

    }




    /**
     * EventListeners
     * */
    static ev(){
        return{
            addToCart: () => {
                return {
                    type: ShoppingCart.rsc().ev.name.addToCart,
                    listener: event => {

                        // ! DEBUGGING:
                        x.eventDispatchMessage(event);

                        // * Init. self.
                        const self = event.target;

                        // * Get data from new product.
                        const {id,name,category,price,quantity} = event.detail;

                        // ? If the incoming product already exists in the cart.
                        if (ShoppingCart.hasDuplicate(id)) {

                            // * Get existing products.
                            const productArray = ShoppingCart.getProducts();

                            // * Iterate through each product.
                            for (let i=0; i<productArray.length; i++){

                                // * Get current product element and its data:
                                const currentProduct = productArray[i];
                                const currentProductData = ShoppingCart.getProductData(currentProduct);

                                // ? If examined product is the same as the incoming product.
                                if (currentProductData.id === id) {

                                    // * Overwrite product details:
                                    // Change quantity.
                                    ShoppingCart.setProductData(currentProduct).quantity(
                                        currentProductData.quantity + quantity
                                    );
                                    // Change price.
                                    ShoppingCart.setProductData(currentProduct).price(
                                        currentProductData.price + price
                                    );

                                }

                            }

                        } else {

                            // * Create new product item.
                            self._div_productList.append(
                                ShoppingCart.element().productItem(
                                    id,name,price,category,quantity
                                )
                            );

                        }

                    }
                }
            },
            updateCart: () => {
                return {
                    type: ShoppingCart.rsc().ev.name.updateCart,
                    listener: event => {

                        // ! DEBUGGING:
                        x.eventDispatchMessage(event);

                        // * Init. self.
                        const self = event.target;

                        // * Get cart data.
                        const {quantity,sum} = ShoppingCart.getCartData();

                        self._div_cartQuantity.innerText = quantity;
                        self._div_cartSum.innerText = sum.toFixed(2);

                    }

                }
            },
            click_orderBtn: () => {
                return {
                    type: 'click',
                    listener: event => {

                        // ! DEBUGGING:
                        x.eventDispatchMessage(event);

                        const userID = ShoppingCart.getUserID();

                        let jsonArray = [];
                        const productArray = ShoppingCart.getProducts();
                        for (let i=0; i<productArray.length; i++){
                            const data = ShoppingCart.getProductData(productArray[i]);
                            jsonArray.push({
                                user: userID,
                                id: data.id,
                                quantity: data.quantity
                            });
                        }

                        x.ajaxJSON(
                            jsonArray,
                            ShoppingCart.rsc().ajax.sendOrder.file,
                            (responseText) => {
                                x.cout(responseText, 'danger');
                            }
                        );

                    }
                }
            },
        }
    }




    /**
     * Update Cart
     * */
    static updateCart(){

        // * Fetch elements:
        const shoppingCart = document.querySelector('shopping-cart');
        const shopButtonBadge = document.getElementById('shop-button-badge');

        // * Create custom event.
        const ev_updateCart = new CustomEvent(ShoppingCart.rsc().ev.name.updateCart);

        // * Dispatch custom events:
        shoppingCart.dispatchEvent(ev_updateCart);
        shopButtonBadge.dispatchEvent(ev_updateCart);

    }




    /**
     * Get Cart Data
     * */
    static getCartData(){

        // * Init. object.
        const obj = {
            quantity: 0,
            sum: 0.0
        };

        // ? If there are any products in the cart.
        if (ShoppingCart.hasProducts()){

            // * Get all products in the form of an array.
            const products = ShoppingCart.getProducts();

            // * Iterate through each product.
            for (let i=0; i<products.length; i++){

                // Get data from the examined product.
                const data = ShoppingCart.getProductData(products[i]);

                // Update both quantity and sum.
                obj.quantity += data.quantity;
                obj.sum += data.price;
            }

            // * Return an updated object of data.
            return obj;

        } else {

            // * Return the initial object.
            return obj;
        }
    }




    /**
     * Has products
     * @returns {boolean}
     * */
    static hasProducts(){

        // * Fetch product list element.
        const productList = document.getElementById(ShoppingCart.rsc().id.productList);

        // * Return value.
        return productList.hasChildNodes();
    }




    /**
     * Get products
     * */
    static getProducts(){

        // * Fetch product list element.
        const productList = document.getElementById(ShoppingCart.rsc().id.productList);

        // ? If product list has products.
        if (productList.hasChildNodes()){

            return Array.from(productList.childNodes);

        } else return [];
    }




    /**
     * Has duplicate
     * */
    static hasDuplicate(productID){

        if (ShoppingCart.hasProducts()){

            // * Fetch products.
            const products = ShoppingCart.getProducts();

            for (let i=0; i<products.length; i++) {

                let id = ShoppingCart.getProductData(products[i]).id;
                id = (typeof id === 'string') ? parseInt(id) : id;
                productID = (typeof productID === 'string') ? parseInt(productID) : productID;

                if (id === productID) return true;

            }

            return false;

        } else return false;

    }




    /**
     * Get product data
     * @param {HTMLElement} product
     * @returns {object}
     * */
    static getProductData(product){
        return {
            id: parseInt(product.getAttribute(ProductItem.rsc().attribute.id)),
            name: product.getAttribute(ProductItem.rsc().attribute.name),
            price: parseFloat(product.getAttribute(ProductItem.rsc().attribute.price)),
            category: product.getAttribute(ProductItem.rsc().attribute.category),
            quantity: parseFloat(product.getAttribute(ProductItem.rsc().attribute.quantity)),
        }
    }




    /**
     * Set product data
     * */
    static setProductData(product){
        return {
            id: id => {product.setAttribute(ProductItem.rsc().attribute.id,id)},
            name: name => {product.setAttribute(ProductItem.rsc().attribute.name,name)},
            price: price => {product.setAttribute(ProductItem.rsc().attribute.price,price.toFixed(2))},
            category: category => {product.setAttribute(ProductItem.rsc().attribute.category,category)},
            quantity: quantity => {product.setAttribute(ProductItem.rsc().attribute.quantity,quantity)}
        }
    }




    /**
     * Elements
     * */
    static element(){
        return {
            productItem: (id,name,price,category,quantity) => {
                const elem = x.makeElement('product-item');
                ShoppingCart.setProductData(elem).id(id);
                ShoppingCart.setProductData(elem).name(name);
                ShoppingCart.setProductData(elem).price(price);
                ShoppingCart.setProductData(elem).category(category);
                ShoppingCart.setProductData(elem).quantity(quantity);
                return elem;
            }
        }
    }




    /**
     * Get User ID
     * */
    static getUserID(){
        const profileBadge = document.querySelector('profile-badge');
        return profileBadge.getAttribute(ProfileBadge.rsc().attribute.id);
    }

}