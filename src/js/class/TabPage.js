import * as x from '../function/global/functions.js';
import {ProfileBadge} from "./ProfileBadge.js";


/**
 * Tab Page
 *
 * @author Isak K. Hauge
 * @version 2
 * */
export class TabPage extends HTMLElement {


    /**
     * Constructor
     * */
    constructor(){
        super();
        this.build();
    }




    /**
     * Connected Callback
     * */
    connectedCallback(){
        if (this.isConnected){
            x.componentLoadedMessage(this);
            this.harvestAttributes();
            this.update();
        }
    }




    /**
     * Observed Attributes
     * */
    static get observedAttributes(){
        return Object.values(
            TabPage.rsc().attribute
        );
    }




    /**
     * Attribute Change Callback
     * */
    attributeChangedCallback(name, oldValue, newValue){

        // * Process new input values.
        switch (name) {
            case TabPage.rsc().attribute.category:
                this._category = (oldValue !== newValue) ? newValue : oldValue;
                break;
        }

        // * Update.
        this.update();
    }




    /**
     * Resource
     * */
    static rsc(){
        return {
            id: {
                title: 'tab-title',
                date: 'tab-date',
                category: 'tab-category'
            },
            class: {},
            attribute: {
                lastDate: 'last-collection-date',
                nextDate: 'next-collection-date',
                category: 'waste-category',
            },
            text: {
                header: 'Neste tømmedag',
                category: 'Kategori: ',
            },
            translation: {
                norwegian: {
                    month: ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'],
                    weekday: ['Søndag','Måndag','Tysdag','Onsdag','Torsdag','Fredag','Laurdag'],
                }
            },
            fallback: {
                date: '2017-10-13',
                category: 'Partert lik',
            },
            ajax: {
                query: (id) => {
                    return '?id=' + id;
                },
                file: 'src/php/ajax/get_collection_date.php',
            }
        }
    }




    /**
     * Harvest Attributes
     * */
    harvestAttributes(){

        // * Waste categoryIndex:
        // ? If the waste categoryIndex attribute is defined.
        if (x.attrDefined(this, TabPage.rsc().attribute.category))
            this._category = this.getAttribute(TabPage.rsc().attribute.category);
        else this._category = TabPage.fallback().category;

    }




    /**
     * Build
     * */
    build(){

        // * Create title element.
        let title = document.createElement('h2');
        title.innerText = TabPage.rsc().text.header;
        title.setAttribute(
            'id', TabPage.rsc().id.title
        );

        // * Create date element.
        this._p_collectionDate = document.createElement('p');
        this._p_collectionDate.setAttribute(
            'id', TabPage.rsc().id.date
        );

        // * Create progress bar element.
        this._progressBar = document.createElement('progress-bar');

        // * Create category element.
        this._p_category = document.createElement('p');
        this._p_category.setAttribute('id', 'tab-category');

        // * Append child nodes to this object.
        this.append(
            title,
            this._p_collectionDate,
            this._progressBar,
            this._p_category
        );

        this.getCollectionDate(() => {

            // * Beautify date.
            this._niceDate = TabPage.beautifyDate(this._collectionDate);

            // * Update collection date.
            this._p_collectionDate.innerText = this._niceDate;

            // * Update progressbar:
            // Calculate number of days left.
            let days = TabPage.daysLeft(this._collectionDate);

            // Calculate progress percent.
            let percent = TabPage.dayPercent('2019-03-05', this._collectionDate);

            // Get relative time description.
            let text = TabPage.relTimeDesc(days);

            // Set attributes.
            this._progressBar.setAttribute('data-text', text);
            this._progressBar.setAttribute('data-percent', percent.toString());

        });

    }




    /**
     * Update
     * */
    update(){

        // * Update category.
        this._p_category.innerText = TabPage.rsc().text.category + this._category;

    }




    /**
     * Get Collection Date
     * */
    getCollectionDate(callback){
        this.ajax_collectionDate((jsonObject) => {

            switch (this._category) {
                case 'Våtorganisk avfall':
                    this._collectionDate = jsonObject[0]['date'];
                    break;
                case 'Papp':
                    this._collectionDate = jsonObject[1]['date'];
                    break;
                case 'Restavfall':
                    this._collectionDate = jsonObject[2]['date'];
                    break;
                case 'Plastemballasje':
                    this._collectionDate = jsonObject[3]['date'];
                    break;
                case 'Farleg avfall':
                    this._collectionDate = jsonObject[4]['date'];
                    break;
            }

            callback();

        });
    }




    /**
     * AJAX: Get Collection Date
     * */
    ajax_collectionDate(callback){
        const profileBadge = document.querySelector('profile-badge');
        if (profileBadge !== null) {
            const id = profileBadge.getAttribute(ProfileBadge.rsc().attribute.id);
            x.ajaxFetch(
                TabPage.rsc().ajax.query(id),
                TabPage.rsc().ajax.file,
                (rawData) => {
                    if (x.isJSON(rawData)){
                        callback(JSON.parse(rawData));
                    }
                }
            );
        }
    }




    /**
     * Beautify Date
     *
     * @description This function will transform a date from a default
     * date format (YYYY-MM-DD) to a beautiful format (Weekday DD. Month).
     *
     * @example 1666-10-31 => Søndag 31. Oktober
     *
     * @param {string} date - The date to beautify.
     *
     * @returns {string} The beautified date.
     * */
    static beautifyDate(date){

        // * Split given date into an array.
        let arr_date = date.split(new RegExp('[-]'));

        // * Get number of month and day:
        let numOfMonth = parseInt(arr_date[1]);
        let numOfDay = parseInt(arr_date[2]);

        // * Get Norwegian weekday and month:
        let month = TabPage.rsc().translation.norwegian.month[numOfMonth - 1];
        let weekday = TabPage.rsc().translation.norwegian.weekday[new Date(date).getDay()];

        // * Return the beautified date.
        return weekday + ' ' + numOfDay + '. ' + month;

    }




    /**
     * Days left
     *
     * @description This function will return the number of days
     * remaining until the day of waste collection.
     *
     * @param {string} nextDate - The next waste collection date.
     *
     * @returns {number} The number of days left.
     * */
    static daysLeft(nextDate){

        // * Create dates from strings:
        let nowDate = new Date();
        let collectionDate = new Date(nextDate);

        // * Calculate remaining days.
        let daysLeft = ((collectionDate - nowDate)/1000/60/60/24);

        // * Return value.
        return daysLeft;

    }




    /**
     * Day Percent
     *
     * @description This function will return the percentage value
     * of the current date in relation to both the last and next
     * waste collection date.
     *
     * @param {string} lastDate - The last waste collection date.
     * @param {string} nextDate - The next waste collection date.
     *
     * @returns {number} The percentage of the current date in relation
     * to the last and next waste collection date.
     * */
    static dayPercent(lastDate, nextDate){

        // * Create dates from strings:
        let obj_lastDate = new Date(lastDate);
        let obj_nextDate = new Date(nextDate);
        let obj_nowDate = new Date();

        // * Calculate percentage:
        let delta_nextDate = obj_nextDate - obj_lastDate;
        let delta_nowDate = obj_nowDate - obj_lastDate;
        let percent = delta_nowDate / delta_nextDate;

        // * Return value.
        return (percent >= 1.0 ? 1 : percent);

    }




    /**
     * Relative Time Description
     *
     * @description This function will evaluate and return a description
     * of the given collection date relative to the current date.
     *
     * @example 2 dager siden || i går || i dag || i morgen || 2 dager til
     *
     * @param {number} daysLeft - The number of days left until the date
     * og waste collection.
     *
     * @returns {string} The relative time description.
     * */
    static relTimeDesc(daysLeft){

        // * Create boolean logic:
        let past = daysLeft <= -1.0;
        let future = daysLeft > 0.0;
        let today = !past && !future;

        // ? If waste collection date has already been.
        if (past) {

            // ? If waste collection was yesterday.
            if ( Math.ceil(daysLeft) === -1 )
                // * Return value.
                return 'i går';
            else
                // * Return value.
                return Math.abs(Math.ceil(daysLeft)) + ' dager siden';

        // ? If waste collection date is today.
        } else if (today) {

            // * Return value.
            return 'i dag';

        // ? If waste collection date will happen in the future.
        } else if (future) {

            // ? If waste collection is tomorrow.
            if ( Math.floor(daysLeft) === 0)
                // * Return value.
                return 'i morgen';
            else
                // * Return value.
                return Math.abs(Math.ceil(daysLeft)) + ' dager til';

        }

    }

}