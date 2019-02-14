// Import Address main.
import {Address} from "../../class/Address.js";
import * as func from "../../function/global/functions.js";


/**
 * Event listener: Window (on load).
 *
 * @author Isak Hauge
 * @version 2.0
 *
 * @description This event listener is activated when the browser window is loaded.
 * */
window.addEventListener('load', function () {

    // ** Debug message **

    console.log('Main listener initiated.');




    // ** PHP File constants **

    const PHP_SEARCH_STREET = "src/php/ajax/search_street.php?name=";
    const PHP_SEARCH_ADDRESS = "src/php/ajax/search_address.php?name=";

    
    
    
    // ** HTML element constants **

    const INPUT_STREET = document.getElementById('street');
    const INPUT_NUMBER = document.getElementById('number');
    const INPUT_ZIP = document.getElementById('zip');
    const INPUT_AREA = document.getElementById('area');
    const OPTIONS_STREET = document.getElementById('options-street');
    const OPTIONS_NUMBER = document.getElementById('options-number');

    
    
    
    // ** Boolean program state **

    let inputMouseDown = false;
    let optionMouseDown = false;
    let isLoading = false;
    let addressID = 0;
    
    
    
    
    // ** Arrays **

    let cachedStreets = [];
    let cachedAddresses = [];

    
    
    
    // ** Init. functions **

    function streetOnInput(){

        // Refresh options for every input.
        flushChildren(OPTIONS_STREET);

        // Get input value.
        let inputValue = getValue(this);

        // ? If number of characters in the search is 2.
        if (inputValue.length === 2) {

            // Reset cached array of street names.
            cachedStreets.length = 0;

            // Invoke loading function.
            initLoading(OPTIONS_STREET, () => {

                isLoading = true;

                // Invoke AJAX fetch function.
                func.ajaxFetch(inputValue, PHP_SEARCH_STREET, (data) => {

                    // ? If data is in JSON format.
                    if (isJSON(data)) {

                        // Parse JSON to object.
                        let jsonObject = JSON.parse(data);

                        // Loop through object.
                        for (let i = 0; i < jsonObject.length; i++)
                            cachedStreets.push(jsonObject[i]['name']);

                        isLoading = false;
                        flushChildren(OPTIONS_STREET);

                        let filteredArray = filterArray(inputValue, cachedStreets);
                        populateOptions(OPTIONS_STREET, filteredArray);

                    } else setStatusDiv('Gatenavnet finnes ikke.', 'text-light-clay');

                });

            });

        // ? If number of characters in the search is more than 2.
        } else if (inputValue.length > 2) {

            let filteredArray = filterArray(inputValue, cachedStreets);
            if (filteredArray.length > 0)
                populateOptions(OPTIONS_STREET, filteredArray);
            else
                showNode(OPTIONS_STREET, false);

        // ? If number of characters in the search is 0.
        } else if (inputValue.length === 0) {
            flushChildren(OPTIONS_STREET);
            showNode(OPTIONS_STREET, false);
        }

    }
    
    
    function numberOnInput(){

        // Refresh options.
        flushChildren(OPTIONS_NUMBER);

        // Get value.
        let inputValue = getValue(this);

        // Init. distinction array.
        let houseNumbers = [];

        // Loop through all cached addresses.
        cachedAddresses.forEach((address) => {
            // Push distinctions to array.
            houseNumbers.push(address.number + ' ' + address.letter);
        });

        houseNumbers = filterArray(inputValue, houseNumbers);

        populateOptions(OPTIONS_NUMBER, houseNumbers);
        showNode(OPTIONS_NUMBER, true);

    }

    
    function windowOnMouseDown(){

        // ? If mousedown listener was invoked.
        if (!inputMouseDown && !optionMouseDown) {

            flushChildren(OPTIONS_STREET);
            showNode(OPTIONS_STREET, false);
            flushChildren(OPTIONS_NUMBER)
            showNode(OPTIONS_NUMBER, false);

        } else {

            inputMouseDown = false;
            optionMouseDown = false;

        }

    }

    
    function inputOnMouseDown(){

        inputMouseDown = true;

        switch (this) {

            case INPUT_STREET:
                flushChildren(OPTIONS_NUMBER);
                showNode(OPTIONS_NUMBER, false);
                break;

            case INPUT_NUMBER:
                flushChildren(OPTIONS_STREET);
                showNode(OPTIONS_STREET, false);
                break;

            case INPUT_ZIP || INPUT_AREA:
                flushChildren(OPTIONS_STREET);
                showNode(OPTIONS_STREET, false);
                flushChildren(OPTIONS_NUMBER);
                showNode(OPTIONS_NUMBER, false);
                break;

            default:
                console.log('OnMouseDown handler for ' + node + ' is undefined.');
                break;
        }
        
    }

    
    function inputOnMouseUp(){

        inputMouseDown = false;

    }

    
    function optionOnMouseDown(){

        optionMouseDown = true;
        let parent = this.parentNode;

        switch (parent) {

            // ? If node is OPTIONS_STREET
            case OPTIONS_STREET:
                setSelectedValue(parent, getDataValue(this));
                setValue(INPUT_STREET, getDataValue(this));

                // ? If street options element has a value.
                if (hasSelectedValue(parent)) {

                    // Get value.
                    let inputValue = getSelectedValue(parent);

                    // Refresh options.
                    flushChildren(OPTIONS_NUMBER);

                    // Init. loading.
                    initLoading(OPTIONS_NUMBER, () => {

                        isLoading = true;

                        // Init. AJAX fetch function.
                        func.ajaxFetch(inputValue, PHP_SEARCH_ADDRESS, (data) => {

                            // ? If data is in JSON format.
                            if (isJSON(data)){

                                let jsonObject = JSON.parse(data);
                                let objectArray = Object.values(jsonObject);

                                let numberArray = [];

                                // Loop through each address.
                                for (let i=0; i<objectArray.length; i++) {

                                    // Push each address into a cached array of Address objects.
                                    cachedAddresses.push(
                                        new Address(
                                            objectArray[i]['ID'],
                                            objectArray[i]['name'],
                                            objectArray[i]['house_number'],
                                            objectArray[i]['letter'],
                                            objectArray[i]['zip_code'],
                                            objectArray[i]['postal_location'],
                                        )
                                    );

                                    // Push house number and apartment letter into an array.
                                    numberArray.push(
                                        objectArray[i]['house_number'] + ' ' + objectArray[i]['letter']
                                    );

                                }

                                isLoading = false;
                                flushChildren(OPTIONS_NUMBER);

                                populateOptions(OPTIONS_NUMBER, numberArray.sort());

                            }

                        });

                    });

                }

                break;


            // ? If node is OPTIONS_NUMBER
            case OPTIONS_NUMBER:
                setSelectedValue(parent, getDataValue(this));
                setValue(INPUT_NUMBER, getDataValue(this));

                // ? If number options element has selected value.
                if (hasSelectedValue(parent)){

                    // Get selected street name.
                    let name = getSelectedValue(OPTIONS_STREET);

                    // Get selected house distinction.
                    let houseNumbers = getSelectedValue(parent).split(' ');

                    // Reset options.
                    flushChildren(parent);

                    // Loop through all cached addresses.
                    for (let i=0; i<cachedAddresses.length; i++) {

                        // ? If house distinction is both alphabetical and numerical.
                        if (houseNumbers.length > 1) {

                            // ? If current address matches with selected values.
                            if (cachedAddresses[i].name === name && cachedAddresses[i].number.toString() === houseNumbers[0] && cachedAddresses[i].letter.toString() === houseNumbers[1]) {
                                setValue(INPUT_ZIP, cachedAddresses[i].zip);
                                setValue(INPUT_AREA, cachedAddresses[i].area);
                                addressID = cachedAddresses[i].id;
                            }

                        // ? If house distinction is numerical only.
                        } else {

                            // ? If current address matches with selected values.
                            if (cachedAddresses[i].name === name && cachedAddresses[i].number.toString() === houseNumbers[0]) {
                                setValue(INPUT_ZIP, cachedAddresses[i].zip);
                                setValue(INPUT_AREA, cachedAddresses[i].area);
                                addressID = cachedAddresses[i].id;
                            }

                        }

                    }

                }

                break;

            default:
                console.log(parent + ' is an unknown parent node.');
                break;

        }

        flushChildren(parent);
        showNode(parent, false);

        flushChildren(parent);
        showNode(parent, false);

    }

    
    function optionOnMouseUp(){

        optionMouseDown = false;
        flushChildren(this.parentNode);
        showNode(this.parentNode, false);

    }

    
    
    
    // ** Invoke event listeners **

    INPUT_STREET.addEventListener('input', streetOnInput);
    INPUT_STREET.addEventListener('mousedown', inputOnMouseDown);
    INPUT_STREET.addEventListener('mouseup', inputOnMouseUp);
    
    INPUT_NUMBER.addEventListener('input', numberOnInput);
    INPUT_NUMBER.addEventListener('mousedown', inputOnMouseDown);
    INPUT_NUMBER.addEventListener('mouseup', inputOnMouseUp);

    INPUT_ZIP.addEventListener('mousedown', inputOnMouseDown);
    INPUT_ZIP.addEventListener('mouseup', inputOnMouseUp);

    INPUT_AREA.addEventListener('mousedown', inputOnMouseDown);
    INPUT_AREA.addEventListener('mouseup', inputOnMouseUp);
    
    window.addEventListener('click', windowOnMouseDown);


    
    
    // ** Utility functions **

    /**
     * Get value.
     *
     * @description This function will return the value of an HTML element.
     * Important: This function only works with element that natively
     * supports value parameters.
     *
     * @param {object} node - HTML element.
     * @return string
     * */
    function getValue(node){
        return node.value;
    }


    /**
     * Set value.
     *
     * @description This function will set the value of an HTML element.
     * Important: This function only works with element that natively
     * supports value parameters.
     *
     * @param {object} node - HTML element.
     * @param {string} value - The value to be attached.
     * */
    function setValue(node, value) {
        node.value = value;
    }


    /**
     * Get data value.
     *
     * @description This function will return the value of an HTML element
     * with a custom value attribute. Works with all elements.
     *
     * @param {object} node - HTML element.
     * @return string
     * */
    function getDataValue(node) {
        return node.getAttribute('data-value');
    }


    /**
     * Set data value.
     *
     * @description This function will set the value to an HTML element
     * with a custom value attribute. Works with all elements.
     *
     * @param {object} node - HTML element.
     * @param {string} value - The value to be attached.
     * */
    function setDataValue(node, value) {
        node.setAttribute('data-value', value);
    }


    /**
     * Get selected value.
     *
     * @description This function will return a selected value of an HTML element
     * with a custom value attribute. Works with all elements.
     *
     * @param {object} node - HTML element.
     * */
    function getSelectedValue(node) {

        const ATTRIBUTE_NAME = 'data-selected';

        // ? If node has given attribute.
        if (node.hasAttribute(ATTRIBUTE_NAME))
            return node.getAttribute(ATTRIBUTE_NAME);

    }


    /**
     * Set selected value.
     *
     * @description This function will set a selected value to an HTML element
     * with a custom value attribute. Works with all elements.
     *
     * @param {object} node - HTML element.
     * @param {string} value - The value to be attached.
     * */
    function setSelectedValue(node, value) {
        node.setAttribute('data-selected', value);
    }


    /**
     * Has selected value.
     *
     * @description This function will return a boolean value based on whether
     * an HTML element has a selected value. Works with all elements.
     *
     * @param {object} node - HTML element.
     * */
    function hasSelectedValue(node) {
        return node.hasAttribute('data-selected') &&
            node.getAttribute('data-selected').length > 0;
    }


    /**
     * [APP] Show node.
     *
     * @description This function will either show or hide an HTML element
     * depending on the boolean value entered in the boolean parameter.
     *
     * @param {object} node - HTML element.
     * @param {boolean} boolean - True or false.
     * */
    function showNode(node, boolean) {

        // ? If node is visible
        if (typeof boolean === 'boolean') {
            node.setAttribute('data-visible', boolean);
        } else
            console.error('Second parameter must be a boolean type. Your parameter type: ' + typeof boolean);

    }


    /**
     * Has children.
     *
     * @description This function will return a boolean value based on whether
     * the given node object has children elements.
     *
     * @param {object} node - HTML element.
     * @return boolean
     * */
    function hasChildren(node){
        return node.hasChildNodes();
    }


    /**
     * Get children.
     *
     * @description This function will return an array of child nodes if the
     * given node has children.
     *
     * @param {object} node - HTML element.
     * @return array
     * */
    function getChildren(node){

        // ? If node has options.
        if (hasChildren(node))
            return node.children;

    }


    /**
     * Flush options.
     *
     * @description This function will delete all child nodes of the given
     * node, if it has child nodes.
     *
     * @param {object} node - HTML element.
     * */
    function flushChildren(node) {

        // ? If node has options.
        if (hasChildren(node))
            while (hasChildren(node))
                node.firstChild.remove();

        showNode(node, false);
        setScroll(node, 'y', false);

    }


    /**
     * [APP] Initiate loading sequence.
     *
     * @async
     * @description This function will make the user interface to indicate
     * a loading process.
     *
     * @param {object} node - HTML element.
     * @param {function} callback - Callback function.
     *
     * @callback This callback should start the actual loading from DB.
     * */
    function initLoading(node, callback) {

        // ? If node is one of the following two.
        if (node === OPTIONS_STREET || node === OPTIONS_NUMBER) {

            let statusDiv = document.createElement('div');
            statusDiv.classList.add('text-gray');
            statusDiv.setAttribute('id', 'status-div');
            let loadingText = document.createTextNode('Loading ...');
            statusDiv.appendChild(loadingText);
            flushChildren(node);
            node.appendChild(statusDiv);
            showNode(node, true);

            callback();

        }

    }


    /**
     * [APP] Filter array.
     *
     * @description This function will return an RegEx filtered array.
     *
     * @param {string} searchValue - The search value.
     * @param {array} array - The processed array.
     * */
    function filterArray(searchValue, array) {

        // Force lowercase.
        searchValue = searchValue.toLowerCase();

        // Init. regular expression.
        const REGEX = new RegExp(searchValue + '.+');
        let returnArray = [];

        // Loop through array.
        for (let i=0; i<array.length; i++) {

            // ? If row matches pattern.
            if (REGEX.exec(array[i].toLowerCase()))
                returnArray.push(array[i]);

        }

        return returnArray;

    }


    /**
     * [APP] Populate options.
     *
     * @description This function will populate child nodes inside the
     * given element.
     *
     * @param {object} node - HTML element.
     * @param {array} array - Array of string values, of which the child nodes will inhabit.
     * */
    function populateOptions(node, array) {

        // ? If given node is OPTION_STREET element.
        if (node === OPTIONS_STREET) {

            for (let i=0; i<array.length; i++) {

                // Init. constants.
                let option_elem = document.createElement('div');

                // Set value.
                setDataValue(option_elem, array[i]);

                // Append text node to option element.
                option_elem.innerText = array[i];

                // Add event listeners.
                option_elem.addEventListener('mousedown', optionOnMouseDown);
                option_elem.addEventListener('mouseup', optionOnMouseUp);

                // Append option to options container.
                OPTIONS_STREET.appendChild(option_elem);

            }

        // ? If given node is OPTION_STREET element.
        } else if (node === OPTIONS_NUMBER) {

            for (let i=0; i<array.length; i++) {

                // Init. constants.
                let option_elem = document.createElement('div');

                // Set value.
                setDataValue(option_elem, array[i]);

                // Append text node to option element.
                option_elem.innerText = array[i];

                // Add event listeners.
                option_elem.addEventListener('mousedown', optionOnMouseDown);
                option_elem.addEventListener('mouseup', optionOnMouseUp);

                // Append option to options container.
                OPTIONS_NUMBER.appendChild(option_elem);

            }

        }

        showNode(node, true);
        setScroll(node, 'y', true);

    }


    /**
     * [APP] Set status DIV.
     *
     * @description This function will status div created during the loading sequence.
     *
     * @param {string} text - The text to be displayed.
     * @param {string} className - The name of the main to be enabled for the status div.
     * */
    function setStatusDiv(text, className) {

        let statusDiv = document.getElementById('status-div');
        statusDiv.innerText = text;
        statusDiv.removeAttribute('main');
        statusDiv.classList.add(className);

    }


    /**
     * Is JSON.
     *
     * @description This function will return a boolean value based on whether the given string
     * data is JSON format compliant.
     *
     * @param {string} data - The data string to be analyzed.
     * @return boolean
     * */
    function isJSON(data) {

        try {

            JSON.parse(data);
            return true;

        } catch (e) {

            return false;

        }

    }


    /**
     * Set scroll.
     *
     * @description This function will enable axis scroll on any given node.
     *
     * @param {object} node - HTML element.
     * @param {string} axis - Either X or Y.
     * @param {boolean} boolean - Enable (true) or disable (false).
     * */
    function setScroll(node, axis, boolean) {

        // ? If boolean parameter is an actual boolean type.
        if (typeof boolean === 'boolean' || (axis === 'y' || axis === 'x')){

            if (boolean)
                node.classList.add(axis + '-scroll');
            else
                node.classList.remove(axis + '-scroll');

        }

    }


});

