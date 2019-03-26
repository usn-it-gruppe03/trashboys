import * as x from "../function/global/functions.js";
import {ShoppingCart} from "./ShoppingCart.js";


/**
 * MenuBar
 *
 * @author Isak K. Hauge
 * @version 1.1
 * */
export class MenuBar extends HTMLElement {


    /**
     * Constructor.
     * */
    constructor(){
        super();
    }




    /**
     * Icons.
     *
     * @static
     * @description TODO: Write
     *
     * @returns {object}
     * */
    static icons(){
        return {
            home: 'src/media/img/icon/outline-home-24px.svg',
            shop: 'src/media/img/icon/outline-shopping_cart-24px.svg',
            settings: 'src/media/img/icon/outline-settings-24px.svg',
        }
    }




    /**
     * Attributes.
     *
     * @static
     * @description TODO: Write
     *
     * @returns {object}
     * */
    static attr(){
        return {
            id: {
                home: 'menu-home',
                shop: 'menu-shop',
                settings: 'menu-settings',
            },
            class: 'menu-btn'
        }
    }




    /**
     * Fetch pages.
     *
     * @static
     * @description TODO: Write.
     *
     * @returns {object}
     * */
    static fetchPages(){
        return {
            home: document.getElementById('page-home'),
            shop: document.getElementById('page-shop'),
            settings: document.getElementById('page-settings')
        };
    }




    /**
     * Connected Callback
     * */
    connectedCallback(){
        if (this.isConnected)
            this.build();
    }




    /**
     * Build.
     *
     * @description TODO: Write.
     * */
    build(){

        // * Create div elements:
        let home = document.createElement('div');
        let shop = document.createElement('div');
        let settings = document.createElement('div');

        // * Create img elements:
        let img_home = document.createElement('img');
        let img_shop = document.createElement('img');
        let img_settings = document.createElement('img');

        let shop_badge = document.createElement('i');
        shop_badge.setAttribute('id','shop-button-badge');
        x.showNode(shop_badge,false);
        shop_badge.innerText = '0';
        let event = MenuBar.updateShopIcon(shop_badge);
        shop_badge.addEventListener(event.type,event.listener);

        // * Add resources to images:
        img_home.src = MenuBar.icons().home;
        img_shop.src = MenuBar.icons().shop;
        img_settings.src = MenuBar.icons().settings;

        // * Set ID and class:
        home.setAttribute('id', MenuBar.attr().id.home);
        shop.setAttribute('id', MenuBar.attr().id.shop);
        settings.setAttribute('id', MenuBar.attr().id.settings);
        home.setAttribute('class', MenuBar.attr().class);
        shop.setAttribute('class', MenuBar.attr().class);
        settings.setAttribute('class', MenuBar.attr().class);

        // * Add event listeners:
        event = MenuBar.onClick();
        home.addEventListener(event.type, event.listener);
        shop.addEventListener(event.type, event.listener);
        settings.addEventListener(event.type, event.listener);

        // * Append nodes:
        home.appendChild(img_home);
        shop.append(img_shop,shop_badge);
        settings.appendChild(img_settings);

        // * Add child nodes to this object.
        this.append(home,shop,settings);

    }




    /**
     * On click.
     * */
    static onClick(){
        return {
            type: 'click',
            listener: event => {

                // * Get the ID of the clicked object.
                let id = event.target.getAttribute('id');

                // * Fetch all pages.
                let pages = MenuBar.fetchPages();

                let attr = MenuBar.attr();
                const get = (id) => {return document.getElementById(id)};

                // * Examine ID.
                switch (id) {

                    // ? If the ID belongs to the home button.
                    case MenuBar.attr().id.home:
                        x.showNode(pages.home, true);
                        x.showNode(pages.shop, false);
                        x.showNode(pages.settings, false);
                        x.setState(get(attr.id.home), 'active');
                        x.setState(get(attr.id.shop), 'inactive');
                        x.setState(get(attr.id.settings), 'inactive');
                        console.log('Click: Home');
                        break;

                    // ? If the ID belongs to the shop button.
                    case MenuBar.attr().id.shop:
                        x.showNode(pages.home, false);
                        x.showNode(pages.shop, true);
                        x.showNode(pages.settings, false);
                        x.setState(get(attr.id.home), 'inactive');
                        x.setState(get(attr.id.shop), 'active');
                        x.setState(get(attr.id.settings), 'inactive');
                        console.log('Click: Shop');
                        break;

                    // ? If the ID belongs to the settings button.
                    case MenuBar.attr().id.settings:
                        x.showNode(pages.home, false);
                        x.showNode(pages.shop, false);
                        x.showNode(pages.settings, true);
                        x.setState(get(attr.id.home), 'inactive');
                        x.setState(get(attr.id.shop), 'inactive');
                        x.setState(get(attr.id.settings), 'active');
                        console.log('Click: Settings');
                        break;

                }

            },
        };
    }




    /**
     * Update Shop Icon.
     *
     * @static
     * @description TODO: Write
     *
     * @returns {object}
     * */
    static updateShopIcon(shopIcon){
        return {
            /**@type{string}*/
            type: 'updateCart',
            /**@type{function}*/
            listener: event => {

                const PRODUCT_LIST = document.getElementById('product-list');
                const CART_DATA = ShoppingCart.getCartData(PRODUCT_LIST);
                shopIcon.innerText = CART_DATA.quantity.toString();
                let cartIsEmpty = parseInt(shopIcon.innerText) < 1;

                if (cartIsEmpty){
                    x.showNode(shopIcon, false);
                } else if (!cartIsEmpty) {
                    x.showNode(shopIcon, true);
                }

            }
        };
    }

}