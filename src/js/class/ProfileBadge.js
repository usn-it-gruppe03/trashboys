import * as x from '../function/global/functions.js';


/**
 * Profile Badge
 *
 * @author Isak K. Hauge
 * */
export class ProfileBadge extends HTMLElement {


    /**
     * Constructor
     * */
    constructor() {
        super();
        this.build();
    }




    /**
     * Resource
     *
     * @returns {object}
     * */
    static rsc(){
        return {
            id: {
                id: 'badge-id',
                image:'badge-image',
                name:'badge-name',
                address:'badge-address',
            },
            class: {},
            attribute: {
                id: 'badge-id',
                image:'badge-image',
                name:'badge-name',
                address:'badge-address',
            },
            text: {},
            ajax: {
                address: {
                    query: (id) => {
                        return '?id=' + id;
                    },
                    file: 'src/php/ajax/get_personal_address.php'
                }
            }
        };
    }




    /**
     * Fallback Data
     *
     * This object contains data which will be used in case
     * where data has not been introduced.
     *
     * @returns {object}
     * */
    static fallback(){
        return {
            name:'Ola Nordmann',
            address:'Stasjonsvegen 21 B'
        };
    }




    /**
     * Connected Callback
     * */
    connectedCallback(){
        if (this.isConnected){
            x.componentLoadedMessage(this)
            this.harvestAttributes();
            this.update();
        }
    }




    /**
     * Observed Attributes
     *
     * @returns {array}
     * */
    static get observedAttributes(){
        return Object.values(
            ProfileBadge.rsc().attribute
        );
    }




    /**
     * Attribute Changed Callback
     *
     * This function will watch any changes to the object.
     * */
    attributeChangedCallback(attribute, oldValue, newValue){

        // * Process new input values.
        switch (attribute) {

            // User ID:
            case ProfileBadge.rsc().attribute.id:
                this._id = (oldValue !== newValue) ? newValue : oldValue;
                break;

            // Badge profile image URL:
            case ProfileBadge.rsc().attribute.image:
                this._profileImageURL = newValue;
                break;

            // Badge name:
            case ProfileBadge.rsc().attribute.name:
                this._name = (oldValue !== newValue) ? newValue : oldValue;
                break;

            // Badge address:
            case ProfileBadge.rsc().attribute.address:
                this._address = (oldValue !== newValue) ? newValue : oldValue;
                break;
        }

        // * Update.
        this.update();

    }




    /**
     * Harvest Attributes
     * */
    harvestAttributes(){

        // ? If image attribute is defined.
        if (x.attrDefined(this, ProfileBadge.rsc().attribute.image))
            this._profileImageURL = this.getAttribute(ProfileBadge.rsc().attribute.image);

        // ? If user ID attribute is defined.
        if (x.attrDefined(this, ProfileBadge.rsc().attribute.id))
            this._id = this.getAttribute(ProfileBadge.rsc().id);

        // ? If name attribute is defined.
        if (x.attrDefined(this, ProfileBadge.rsc().attribute.name))
            this._name = this.getAttribute(ProfileBadge.rsc().attribute.name);
        else this._name = ProfileBadge.fallback().name;

        // ? If address attribute is defined.
        if (x.attrDefined(this, ProfileBadge.rsc().attribute.address))
            this._address = this.getAttribute(ProfileBadge.rsc().attribute.address);
        else this._address = ProfileBadge.fallback().address;

    };




    /**
     * Build
     * */
    build(){

        // * Create badge image element:
        this._div_badgeImage = document.createElement('div');
        this._div_badgeImage.setAttribute('id', ProfileBadge.rsc().id.image);


        // * Create badge name element:
        this._h1_badgeName = document.createElement('h1');
        this._h1_badgeName.setAttribute('id', ProfileBadge.rsc().id.name);


        // * Create badge address element:
        this._h2_badgeAddress = document.createElement('h2');
        this._h2_badgeAddress.setAttribute('id', ProfileBadge.rsc().id.address);


        // * Append nodes.
        this.append(this._div_badgeImage, this._h1_badgeName, this._h2_badgeAddress);

    }




    /**
     *
     * */
    update(){

        this._div_badgeImage.style.backgroundImage = 'url("' + this._profileImageURL + '")';
        this._h1_badgeName.innerText = this._name;
        this._h2_badgeAddress.innerText = this._address;

    }



    /**
     * Get Collection Date
     * */
    getCollectionDate(callback){
        x.ajaxFetch(
            '?street=' + this._name + '&house_number=' + this._house_number,
            'src/php/ajax/get_collection_date.php',
            (rawData) => {
                if (x.isJSON(rawData)){
                    const jsonObject = JSON.parse(rawData);
                    callback(jsonObject);
                }
            }
        );
    }



}