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
            this.render();
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
        if (name === TabPage.rsc().attribute.category){
            this._category = (oldValue !== newValue) ? newValue : oldValue;

            // * Update.
            this.update();
        }

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
            },
            icon: {
                organic:    {id: 1, url: 'src/media/img/icon/waste/organic.svg'},
                paper:      {id: 2, url: 'src/media/img/icon/waste/paper.svg'},
                residual:   {id: 3, url: 'src/media/img/icon/waste/residual.svg'},
                plastic:    {id: 4, url: 'src/media/img/icon/waste/plastic.svg'},
                hazardous:  {id: 5, url: 'src/media/img/icon/waste/hazardous.svg'},
            }
        }
    }




    /**
     * Build
     * */
    build(){

        // * Create title element.
        this._title = x.makeElement('h2');
        this._title.innerText = TabPage.rsc().text.header;
        this._title.setAttribute(
            'class', TabPage.rsc().id.title
        );

        // * Create date element.
        this._p_collectionDate = x.makeElement('p');
        this._p_collectionDate.setAttribute(
            'class', TabPage.rsc().id.date
        );

        // * Days left element.
        this._daysLeft = x.makeElement('div');
        this._daysLeft.setAttribute('class', 'tab-days-left');

        // * Create category container.
        this._categoryContainer = x.makeElement('div');
        this._categoryContainer.setAttribute('class', 'tab-category-container');

        // * Create waste category icon.
        this._wasteIcon = x.makeElement('img');
        this._wasteIcon.setAttribute('class', 'waste-icon');

        // * Create category element.
        this._p_category = x.makeElement('div');
        this._p_category.setAttribute('class', 'tab-category');

        // * Append nodes:
        this._categoryContainer.append(this._wasteIcon, this._p_category);

    }




    /**
     * Update
     * */
    update(){

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
            this._daysLeft.innerText = text;
            if (days < 1){
                this._daysLeft.classList.add('text-danger');
            } else if (days > 1 && days <= 3) {
                this._daysLeft.classList.add('text-warning');
            } else this._daysLeft.classList.add('text-green');

        });

        // * Update category.
        x.cout(this._category);
        this._p_category.innerText = this._category;

    }




    /**
     * Render
     * */
    render(){

        this.append(
            this._categoryContainer,
            this._title,
            this._p_collectionDate,
            this._daysLeft,
        );

    }




    /**
     * Get Collection Date
     * */
    getCollectionDate(callback){
        this.ajax_collectionDate((jsonObject) => {

            switch (this._category) {
                case 'Våtorganisk avfall':
                    this._collectionDate = jsonObject[0]['date'];
                    this._wasteIcon.src = TabPage.rsc().icon.organic.url;
                    break;
                case 'Papp':
                    this._collectionDate = jsonObject[1]['date'];
                    this._wasteIcon.src = TabPage.rsc().icon.paper.url;
                    break;
                case 'Restavfall':
                    this._collectionDate = jsonObject[2]['date'];
                    this._wasteIcon.src = TabPage.rsc().icon.residual.url;
                    break;
                case 'Plastemballasje':
                    this._collectionDate = jsonObject[3]['date'];
                    this._wasteIcon.src = TabPage.rsc().icon.plastic.url;
                    break;
                case 'Farleg avfall':
                    this._collectionDate = jsonObject[4]['date'];
                    this._wasteIcon.src = TabPage.rsc().icon.hazardous.url;
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
                return Math.abs(Math.ceil(daysLeft)) + ' dagar siden';

        // ? If waste collection date is today.
        } else if (today) {

            // * Return value.
            return 'i dag';

        // ? If waste collection date will happen in the future.
        } else if (future) {

            // ? If waste collection is tomorrow.
            if ( Math.floor(daysLeft) === 0)
                // * Return value.
                return 'i morgon';
            else
                // * Return value.
                return Math.abs(Math.ceil(daysLeft)) + ' dagar til';

        }

    }




    /**
     * Get Icon
     * */
    static iconFromWasteCatID(id){
        const icon = Object.values(TabPage.rsc().icon);
        for (let i=0; i<icon.length; i++){
            if (icon[i]['id'] === id){
                return icon[i]['url'];
            }
        }
        return TabPage.rsc().icon.residual.url;
    }

}