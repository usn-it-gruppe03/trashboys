import {ProductItem} from "./ProductItem.js";


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
    }




    /**
     * Attributes.
     *
     * @static
     * @description TODO: Write.
     *
     * @returns {object}
     * */
    static attributes(){
        return {
            productList: {
                id: 'product-list',
                class: 'product-list',
            },
            shoppingCartDetails: {
                class: 'shopping-cart-details',
            },
            shoppingCartQuantity: {
                class: 'shopping-cart-quantity',
            },
            shoppingCartSum: {
                class: 'shopping-cart-sum',
            }
        };
    }




    /**
     * Connected Callback.
     * */
    connectedCallback(){
        if (this.isConnected)
            this.build();
    }




    /**
     * Build
     * */
    build(){

        // * Get legal attributes.
        const ATTR = ShoppingCart.attributes();

        // * Create elements:
        const PRODUCT_LIST = document.createElement('div');
        const CART_DETAILS = document.createElement('div');
        const CART_QUANTITY = document.createElement('div');
        const CART_SUM = document.createElement('div');
        const ORDER_BUTTON = document.createElement('button');


        // * Construct elements:
        PRODUCT_LIST.setAttribute('id', ATTR.productList.id);
        PRODUCT_LIST.classList.add(ATTR.productList.class);
        let event = ShoppingCart.addToCart(PRODUCT_LIST);
        PRODUCT_LIST.addEventListener(event.type, event.listener);

        CART_DETAILS.classList.add(ATTR.shoppingCartDetails.class);
        CART_QUANTITY.classList.add(ATTR.shoppingCartQuantity.class);
        CART_QUANTITY.innerText = '0';
        CART_SUM.classList.add(ATTR.shoppingCartSum.class);
        CART_SUM.innerText = '0.0';

        CART_DETAILS.append(CART_QUANTITY,CART_SUM);

        ORDER_BUTTON.innerText = 'Bestill varane';
        ORDER_BUTTON.classList.add('btn', 'btn-green', 'fx-3d-green');


        // * Append child nodes.
        this.append(PRODUCT_LIST,CART_DETAILS,ORDER_BUTTON);


        // * Add even listener.
        event = ShoppingCart.updateCart(PRODUCT_LIST, CART_QUANTITY, CART_SUM);
        this.addEventListener(event.type, event.listener);

    }




    /**
     * Event listener: Add to Cart
     *
     * @static
     * @description TODO: Write a description
     *
     * @param {HTMLElement} productList - The product list element.
     * */
    static addToCart(productList){
        return {
            // ** Init. event type. **
            type: 'addToCart',

            // ** Init. event listener. **
            listener: event => {

                // * Get legal attributes from ProductItem.
                let attr = ProductItem.attr();


                // * Deconstruct event detail object.
                const {
                    /**@type{number}*/id,
                    /**@type{string}*/name,
                    /**@type{number}*/price,
                    /**@type{number}*/categoryIndex,
                    /**@type{number}*/quantity,
                } = event.detail;


                // * Get all product items.
                const PRODUCT_ITEMS = ShoppingCart.getProductItems(productList);


                // * Create functions for automation:
                // This function will return an element if it finds a duplicate.
                const getDuplicate = (productID, productItemsArray) => {
                    let duplicateElement = null;
                    for (let i=0; i<productItemsArray.length; i++){
                        const attr = productItemsArray[i].getAllAttributes;
                        if (productID === attr.id){
                            duplicateElement = productItemsArray[i];
                        }
                    }
                    return duplicateElement;
                };

                // This function will add a ned product item to the shopping cart.
                const addNewProductItem = () => {
                    const PRODUCT_ITEM = document.createElement('product-item');
                    ShoppingCart.setAttributes(PRODUCT_ITEM, event.detail);
                    productList.append(PRODUCT_ITEM);
                };


                // * Main logic:
                // ? If the ShoppingCart has products.
                if (PRODUCT_ITEMS.length > 0){

                    let duplicateElement = getDuplicate(id, PRODUCT_ITEMS);

                    if (duplicateElement !== null){

                        let attrObject = duplicateElement.getAllAttributes;
                        attrObject.price += price;
                        attrObject.quantity += quantity;
                        ShoppingCart.setAttributes(duplicateElement, attrObject);

                    } else if (duplicateElement === null) {

                        addNewProductItem();

                    }
                    
                } else {

                    addNewProductItem();

                }

            }
        }
    }




    /**
     * Event listener: Update Cart
     *
     * @static
     * @description TODO: Write.
     *
     * @param {HTMLElement} productListElement - Desc.
     * @param {HTMLElement} quantityElement - Desc.
     * @param {HTMLElement} sumElement - Desc.
     * */
    static updateCart(productListElement, quantityElement, sumElement){
        return {
            type: 'updateCart',
            listener: event => {

                let objectData = ShoppingCart.getCartData(productListElement);
                quantityElement.innerText = objectData.quantity.toString();
                sumElement.innerText = objectData.sum.toFixed(2);

            },
        };
    }




    /**
     * Get Product Items.
     *
     * @static
     * @description TODO: Write.
     *
     * @param {HTMLElement} productList - The product list element.
     * */
    static getProductItems(productList){

        // * Init. empty array.
        let products = [];

        // ? If the provided object has child nodes.
        if (productList.hasChildNodes()){

            // * Convert childNodes to an array.
            products = Array.from(productList.childNodes);

        }

        // * Return array.
        return products;

    }




    /**
     * Set Attributes.
     *
     * @static
     * @description TODO: Write.
     *
     * @param {HTMLElement} productItem - A product item element.
     * @param {object} dataObject - An object containing
     * the following properties:
     * 1. ID.
     * 2. Name.
     * 3. Price.
     * 4. Category Index.
     * 5. Quantity.
     * */
    static setAttributes(productItem, dataObject){

        // * Get all legal attributes.
        const attr = ProductItem.attr();

        // * Deconstruct the object of data.
        const {
            /**@type{number}*/id,
            /**@type{string}*/name,
            /**@type{number}*/price,
            /**@type{number}*/categoryIndex,
            /**@type{number}*/quantity,
        } = dataObject;

        // * Sett all the attributes.
        productItem.setAttribute(attr.id, id.toString());
        productItem.setAttribute(attr.name, name);
        productItem.setAttribute(attr.price, price.toFixed(2));
        productItem.setAttribute(attr.categoryIndex, categoryIndex.toString());
        productItem.setAttribute(attr.quantity, quantity.toString());
        
    }




    /**
     * Get Cart Data
     *
     * @static
     * @description TODO: Write
     *
     * @param {HTMLElement} productList - The product list element.
     *
     * @returns {object} - An object consisting of the following
     * properties:
     * 1. Quantity
     * 2. Sum
     * */
    static getCartData(productList){

        // * Get all product items in the product list.
        const PRODUCT_ITEMS = Array.from(productList.childNodes);

        // * Get legal attribute names from ProductItem class.
        const ATTR = ProductItem.attr();

        // * Init. initial variables:
        let totalQuantity = 0;
        let totalSum = 0.0;

        // * Shorten function.
        const get = (node, attributeName) => {return node.getAttribute(attributeName);};

        // * Loop through all product items.
        for (let i=0; i<PRODUCT_ITEMS.length; i++){

            // Add values through iteration:
            totalQuantity += parseInt(get(PRODUCT_ITEMS[i],ATTR.quantity));
            totalSum += parseFloat(get(PRODUCT_ITEMS[i],ATTR.price));

        }

        // * Return object.
        return {
            quantity: totalQuantity,
            sum: totalSum,
        };

    }


}