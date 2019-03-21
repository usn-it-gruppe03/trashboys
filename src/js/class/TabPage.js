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
        this.dataCheck();
        this.populate();
    }




    /**
     * Element text
     *
     * @description This static object contains text that will
     * be used inside this element.
     * */
    static text(){
        return {
            header: 'Neste tømmedag',
            category: 'Kategori:',
        };
    }




    /**
     * Element attributes
     *
     * @description This static object contains legal attributes
     * that will act as constructor parameters.
     * */
    static attr(){
        return {
            lastDate: 'last-collection-date',
            nextDate: 'next-collection-date',
            category: 'waste-categoryIndex',
        };
    }




    /**
     * Fallback
     *
     * @description Dummy data in case attributes are undefined.
     * */
    static fallback(){
        return {
            date: '2017-10-13',
            category: 'Partert lik',
        };
    }




    /**
     * Norwegian
     *
     * @description Dates in norwegian.
     * */
    static norwegian(){
        return {
            month: ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'],
            weekday: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
        }
    }




    /**
     * Data check
     *
     * @description This function process the data gathered through
     * the HTML attributes.
     * */
    dataCheck(){

        // * Last collection date:
        // ? If the last collection date attribute is defined.
        if (this.attrDefined(TabPage.attr().lastDate)){
            // Get the last collection.
            this.lastDate = this.getAttribute(TabPage.attr().lastDate);
        }

        // * Next collection date:
        // ? If the next collection date attribute is defined.
        if (this.attrDefined(TabPage.attr().nextDate)){
            // Get the next collection date.
            this.nextDate = this.getAttribute(TabPage.attr().nextDate);
            // Beautify the next collection date.
            this.niceDate = TabPage.beautifyDate(this.nextDate);
        } else this.niceDate = TabPage.beautifyDate(TabPage.fallback().date);

        // * Waste categoryIndex:
        // ? If the waste categoryIndex attribute is defined.
        if (this.attrDefined(TabPage.attr().category))
            // Get the waste categoryIndex.
            this.category = this.getAttribute(TabPage.attr().category);
        else this.category = TabPage.fallback().category;
    }




    /**
     * Populate
     *
     * @description This function populates the element with child
     * nodes and other content.
     * */
    populate(){

        // * Init. H2 title element.
        let head = document.createElement('h2');
        head.innerText = TabPage.text().header;
        head.setAttribute('id', 'tab-title');

        // * Init. paragraph element.
        let date = document.createElement('p');
        date.innerText = this.niceDate;
        date.setAttribute('id', 'tab-date');

        // * Init. progress bar element.
        let progress = document.createElement('progress-bar');

        // Calculate number of days left.
        let days = TabPage.daysLeft(this.nextDate);

        // Calculate progress percent.
        let percent = TabPage.dayPercent(this.lastDate, this.nextDate);

        // Get relative time description.
        let text = TabPage.relTimeDesc(days);

        // Set attributes.
        progress.setAttribute('data-text', text);
        progress.setAttribute('data-percent', percent.toString());

        // * Create paragraph element.
        let category = document.createElement('p');
        category.innerText = TabPage.text().category + ' ' + this.category;
        category.setAttribute('id', 'tab-categoryIndex');

        // * Append child nodes to this object.
        this.append(head, date, progress, category);

    }




    /**
     * Attribute Defined
     *
     * @description This function will return a boolean value in
     * accordance with the question whether a given attribute
     * has been defined or not.
     *
     * @param {string} attr - The HTML attribute.
     *
     * @returns {boolean}
     * */
    attrDefined(attr){
        // ? If tis object has the given attribute.
        if (this.hasAttribute(attr))
            return this.getAttribute(attr).length > 0;
        else return false;
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
        let month = TabPage.norwegian().month[numOfMonth - 1];
        let weekday = TabPage.norwegian().weekday[new Date(date).getDay()];

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