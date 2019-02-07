/**
 * Address.
 *
 * @author Isak Hauge
 * @version 1
 * */
export class Address {

    /**
     * Constructor.
     *
     * @param {string} name Name of the street.
     * @param {number} number House number.
     * @param {string} letter Apartment number.
     * @param {string} zip Postal code.
     * @param {string} area Postal area.
     * */
    constructor(id, name, number, letter, zip, area){
        this._id = id;
        this._name = name;
        this._number = number;
        this._letter = letter;
        this._zip = zip;
        this._area = area.toUpperCase();
    }


    /**
     * Get ID.
     * @return {number} - The address ID.
     * */
    get id() {
        return this._id;
    }


    /**
     * Set ID.
     * @param {number} value - The address ID.
     * */
    set id(value) {
        this._id = value;
    }


    /**
     * Get name.
     * @return {string} - The street name.
     * */
    get name() {
        return this._name;
    }


    /**
     * Set name.
     * @param {string} value - The street name.
     * */
    set name(value) {
        this._name = value;
    }


    /**
     * Get number.
     * @return {number} - The house number.
     * */
    get number() {
        return this._number;
    }


    /**
     * Set number.
     * @param {number} value - The house number.
     * */
    set number(value) {
        this._number = value;
    }


    /**
     * Get letter.
     * @return {string} - The apartment letter.
     * */
    get letter() {
        return this._letter;
    }


    /**
     * Set letter.
     * @param {string} value - The apartment letter.
     * */
    set letter(value) {
        this._letter = value;
    }


    /**
     * Get ZIP.
     * @return {string} - The ZIP code.
     * */
    get zip() {
        return this._zip;
    }


    /**
     * Set ZIP.
     * @param {string} value - The ZIP code.
     * */
    set zip(value) {
        this._zip = value;
    }


    /**
     * Get area.
     * @return {string} - The area name.
     * */
    get area() {
        return this._area;
    }


    /**
     * Set area.
     * @param {string} value - The area name.
     * */
    set area(value) {
        this._area = value;
    }


    /**
     * Get short.
     * @return {string} - The short address, containing the name, number, and letter.
     * */
    get short() {
        return this._name + ' ' + this._number + this._letter;
    }

}