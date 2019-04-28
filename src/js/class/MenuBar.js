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
     * Resource.
     * */
    static rsc(){
        return {
            id: {
                div: {
                    home: 'menu-home',
                    shop: 'menu-shop',
                    settings: 'menu-settings',
                },
                i: {
                    shopBadge: 'shop-button-badge',
                },
            },
            class: {
                menuButton: 'menu-btn'
            },
            attribute: {
                targetHome: 'data-target-home',
                targetShop: 'data-target-shop',
                targetSettings: 'data-target-settings',
                state: {
                    value: {
                        active: 'active',
                        inactive: 'inactive',
                    }
                }
            },
            icon: {
                home: 'src/media/img/icon/outline-home-24px.svg',
                shop: 'src/media/img/icon/outline-shopping_cart-24px.svg',
                settings: 'src/media/img/icon/outline-settings-24px.svg',
            },
            text: {},
            ajax: {}
        }
    }




    /**
     * Elements.
     * */
    static elements(){
        return {
            div: {
                /**
                 * Menu Button
                 * @param {string} id - Element ID
                 * @param {string} icon - Icon URL
                 * @param {array} pageArray - An array of HTMLElements.
                 * @param {string} pageTarget - Element ID of target.
                 * @param {boolean} active - Boolean for either 'active' og 'inactive' state.
                 * @returns {HTMLElement}
                 * */
                menuButton: (id, icon, pageArray, pageTarget, active) => {
                    
                    // * Create menu button:
                    const div_menuBtn = x.makeElement('div');
                    div_menuBtn.setAttribute('id', id);
                    div_menuBtn.classList.add(MenuBar.rsc().class.menuButton);
                    x.setState(
                        div_menuBtn,
                        (active === true) ? 'active' : 'inactive'
                    );
                    
                    // * Create button icon:
                    const img_icon = x.makeElement('img');
                    img_icon.setAttribute('src', icon);

                    // * Add event listeners:
                    MenuBar.applyListenerToMultipleElements(
                        [div_menuBtn, img_icon],
                        MenuBar.ev().ev_menuBtn_onClick(
                            div_menuBtn,
                            Object.values(MenuBar.rsc().id.div),
                            pageArray,
                            pageTarget
                        )
                    );

                    // * Append icon to button.
                    div_menuBtn.append(img_icon);

                    // * Return a menu button.
                    return div_menuBtn;
                },
            }
        }
    }




    /**
     * Observed Attributes.
     * */
    static get observedAttributes(){
        return [
            MenuBar.rsc().attribute.targetHome,
            MenuBar.rsc().attribute.targetShop,
            MenuBar.rsc().attribute.targetSettings,
        ];
    }




    /**
     * Attribute Changed Callback.
     * */
    attributeChangedCallback(attributeName, oldValue, newValue){
        switch (attributeName) {
            case MenuBar.rsc().attribute.targetHome:
                this._targetHome = (oldValue !== newValue) ? newValue : oldValue;
                break;
            case MenuBar.rsc().attribute.targetShop:
                this._tagetShop = (oldValue !== newValue) ? newValue : oldValue;
                break;
            case MenuBar.rsc().attribute.targetSettings:
                this._targetSettings = (oldValue !== newValue) ? newValue : oldValue;
                break;
        }
    }




    /**
     * Harvest Attributes.
     * */
    harvestAttributes(){

        if (x.attrDefined(this, MenuBar.rsc().attribute.targetHome))
            this._targetHome = this.getAttribute(MenuBar.rsc().attribute.targetHome);

        if (x.attrDefined(this, MenuBar.rsc().attribute.targetShop))
            this._tagetShop = this.getAttribute(MenuBar.rsc().attribute.targetShop);

        if (x.attrDefined(this, MenuBar.rsc().attribute.targetSettings))
            this._targetSettings = this.getAttribute(MenuBar.rsc().attribute.targetSettings);

    }




    /**
     * Connected Callback.
     * */
    connectedCallback(){
        if (this.isConnected) {
            x.componentLoadedMessage(this);
            this.harvestAttributes();
            this.build();
        }
    }




    /**
     * EventListeners.
     * */
    static ev(){
        return {
            /**
             * Menu Button: On Click
             * @param {HTMLElement} div_menuBtn
             * @param {array} menuBtnIDArray - An array og menu button IDs.
             * @param {array} pageArray
             * @param {string} pageTarget
             * */
            ev_menuBtn_onClick: (div_menuBtn, menuBtnIDArray, pageArray, pageTarget) => {
                return {
                    type: 'click',
                    listener: () => {

                        // * Set state of this button.
                        x.setState(div_menuBtn, MenuBar.rsc().attribute.state.value.active);

                        // * Iterate through menu buttons and set state.
                        for (let i=0; i<menuBtnIDArray.length; i++) {

                            // ? If element ID does not match.
                            if (div_menuBtn.id !== menuBtnIDArray[i]) {
                                x.setState(
                                    document.getElementById(menuBtnIDArray[i]),
                                    MenuBar.rsc().attribute.state.value.inactive
                                );

                                // * Get shop button.
                                const shopBtn = document.getElementById(MenuBar.rsc().id.div.shop);

                                // * Create boolean values:
                                const shopBtnClicked = (div_menuBtn.id === MenuBar.rsc().id.div.shop);
                                const shopBtnActive = (x.getState(shopBtn) === MenuBar.rsc().attribute.state.value.active);

                                // ? If shop button is clicked and already active.
                                if (shopBtnClicked && shopBtnActive){
                                    // Scroll window to bottom in order to view cart.
                                    window.scrollTo(0, document.body.scrollHeight);
                                }
                            }
                        }

                        // * Iterate through pages and set visibility.
                        for (let j=0; j<pageArray.length; j++){

                            /**@type{HTMLElement}*/
                            const elem = pageArray[j];

                            // ? If target matches the element ID.
                            if (elem.id === pageTarget)
                                x.showNode(elem, true);
                            else x.showNode(elem, false);
                        }

                    }
                }
            }
        }
    }




    /**
     * Apply Event Listener to Multiple Elements.
     *
     * @param {array} htmlElementArray
     * @param {object} evObject
     * */
    static applyListenerToMultipleElements(htmlElementArray, evObject) {

        // * Destruct object.
        const {type, listener} = evObject;

        // * Iterate through elements and add event listener.
        for (let i=0; i<htmlElementArray.length; i++)
        htmlElementArray[i].addEventListener(type, listener);

    }




    /**
     * Fetch page array.
     *
     * @static
     * @description TODO: Write.
     *
     * @returns {array}
     * */
    static fetchPageArray(){
        return Array.from(document.getElementsByTagName('app-page'));
    }




    /**
     * Build.
     *
     * @description TODO: Write.
     * */
    build(){

        // * Fetch all AppPage elements.
        const pageArray = MenuBar.fetchPageArray();

        // * Create Menu Buttons:
        // Init. home button.
        this._div_homeBtn = MenuBar.elements().div.menuButton(
            MenuBar.rsc().id.div.home,
            MenuBar.rsc().icon.home,
            pageArray,
            this._targetHome,
            true
        );

        // Init. shop button.
        this._div_shopBtn = MenuBar.elements().div.menuButton(
            MenuBar.rsc().id.div.shop,
            MenuBar.rsc().icon.shop,
            pageArray,
            this._tagetShop,
            false
        );

        // Init. settings button.
        this._div_settingsBtn = MenuBar.elements().div.menuButton(
            MenuBar.rsc().id.div.settings,
            MenuBar.rsc().icon.settings,
            pageArray,
            this._targetSettings,
            false
        );

        // * Create shop badge:
        const shopBadge = document.createElement('i');
        shopBadge.id = MenuBar.rsc().id.i.shopBadge;
        x.showNode(shopBadge,false);
        shopBadge.innerText = '0';
        shopBadge.addEventListener(
            MenuBar.ev_updateShopIcon().type,
            MenuBar.ev_updateShopIcon().listener
        );

        // * Append shop badge to shop menu button.
        this._div_shopBtn.append(shopBadge);

        // * Add child nodes to this object.
        this.append(this._div_homeBtn, this._div_shopBtn, this._div_settingsBtn);

    }




    /**
     * Update Shop Icon.
     *
     * @static
     * @description TODO: Write
     * */
    static ev_updateShopIcon(){
        return {
            type: 'updateCart',
            listener: event => {

                const self = event.target;
                const quantity = ShoppingCart.getCartData().quantity;
                self.innerText = quantity;
                x.showNode(self, (quantity > 0));

            }
        };
    }

}