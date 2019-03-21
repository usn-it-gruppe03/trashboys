export class Product {


    /**
     * Constructor
     *
     * @description This is the constructor.
     * */
    constructor(){

        /** @type {string} */
        this._name = '';

        /** @type {string} */
        this._img = '';

        /** @type {string} */
        this._price = '';

        /** @type {number} */
        this._categoryIndex = 0;
    }




    /**
     * Category
     *
     * @description This function will return an object
     * that contains all official categoryIndex names.
     *
     * @returns {object}
     * */
    static categories(){
        return {
            1: 'Våtorganisk avfall',
            2: 'Papp- og papiravfall',
            3: 'Restavfall',
            4: 'Plastemballasje',
            5: 'Farleg avfall',
        }
    }




    /**
     * Get category
     *
     * @description This function will return the nice
     * string version of the category.
     *
     * @returns {string}
     * */
    get category(){

        // Get all categories.
        let cat = Product.categories();

        // ? Bool: If the categoryIndex exists.
        let hasProp = cat.hasOwnProperty(this.categoryIndex);

        // Init. error message.
        let msg = 'Kategorien ' + this.categoryIndex + ' finnes ikke';

        // ? If the categoryIndex does not exist.
        if (!hasProp)
            new Error(msg);

        // Return categoryIndex or an error.
        return hasProp ? cat[this.categoryIndex] : 'udefinert';
    }




    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get img() {
        return this._img;
    }

    set img(value) {
        this._img = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get categoryIndex() {
        return this._categoryIndex;
    }

    set categoryIndex(value) {
        /** @type {number} */
        this._categoryIndex = value;
    }

}