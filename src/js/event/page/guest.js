// Import Address class.
import {Address} from "../../class/address.js";



/**
 * Event listener: Window (on load).
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

    
    
    
    // TODO: Respective event listeners as functions.
    function streetOnInput(){

        // Refresh options for every input.
        flushOptions(OPTIONS_STREET);

        // Get input value.
        let inputValue = getInputValue(this);

        // ? If number of characters in the search is 2.
        if (inputValue.length === 2) {

            // Reset cached array of street names.
            cachedStreets.length = 0;

            // Invoke loading function.
            initLoading(OPTIONS_STREET, function () {

                isLoading = true;

                // Invoke AJAX fetch function.
                ajaxFetch(inputValue, PHP_SEARCH_STREET, function (data) {

                    // ? If data is in JSON format.
                    if (isJSON(data)) {

                        // Parse JSON to object.
                        let jsonObject = JSON.parse(data);

                        // Loop through object.
                        for (let i = 0; i < jsonObject.length; i++)
                            cachedStreets.push(jsonObject[i]['name']);

                        isLoading = false;
                        flushOptions(OPTIONS_STREET);

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
            flushOptions(OPTIONS_STREET);
            showNode(OPTIONS_STREET, false);
        }

    }
    
    
    function numberOnInput(){

        // Refresh options.
        flushOptions(OPTIONS_NUMBER);

        // Get value.
        let inputValue = getInputValue(this);

        // Init. distinction array.
        let distinctions = [];

        // Loop through all cached addresses.
        cachedAddresses.forEach(function (address) {
            // Push distinctions to array.
            distinctions.push(address.number + ' ' + address.letter);
        });

        distinctions = filterArray(inputValue, distinctions);

        populateOptions(OPTIONS_NUMBER, distinctions);
        showNode(OPTIONS_NUMBER, true);

    }

    
    function windowOnMouseDown(){
         if (!inputMouseDown && !optionMouseDown) {
             flushOptions(OPTIONS_STREET);
             showNode(OPTIONS_STREET, false);
             flushOptions(OPTIONS_NUMBER)
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
                flushOptions(OPTIONS_NUMBER);
                showNode(OPTIONS_NUMBER, false);
                break;

            case INPUT_NUMBER:
                flushOptions(OPTIONS_STREET);
                showNode(OPTIONS_STREET, false);
                break;

            case INPUT_ZIP || INPUT_AREA:
                flushOptions(OPTIONS_STREET);
                showNode(OPTIONS_STREET, false);
                flushOptions(OPTIONS_NUMBER);
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

            case OPTIONS_STREET:
                setSelectedValue(parent, getDataValue(this));
                setInputValue(INPUT_STREET, getDataValue(this));

                // ? If street options element has a value.
                if (hasSelectedValue(parent)) {

                    // Get value.
                    let inputValue = getSelectedValue(parent);

                    // Refresh options.
                    flushOptions(OPTIONS_NUMBER);

                    // Init. loading.
                    initLoading(OPTIONS_NUMBER, function () {

                        isLoading = true;

                        // Init. AJAX fetch function.
                        ajaxFetch(inputValue, PHP_SEARCH_ADDRESS, function (data) {

                            // ? If data is in JSON format.
                            if (isJSON(data)){

                                let jsonObject = JSON.parse(data);
                                let objectArray = Object.values(jsonObject);

                                let numberArray = [];

                                // Loop through each address.
                                objectArray.forEach(function (address) {

                                    // Push each address into a cached array of Address objects.
                                    cachedAddresses.push(
                                        new Address(
                                            address['ID'],
                                            address['name'],
                                            address['house_number'],
                                            address['letter'],
                                            address['zip_code'],
                                            address['postal_location'],
                                        )
                                    );

                                    // Push house number and apartment letter into an array.
                                    numberArray.push(
                                        address['house_number'] + ' ' + address['letter']
                                    );

                                });

                                isLoading = false;
                                flushOptions(OPTIONS_NUMBER);

                                populateOptions(OPTIONS_NUMBER, numberArray.sort());

                            }

                        });

                    });

                }

                break;

            case OPTIONS_NUMBER:
                setSelectedValue(parent, getDataValue(this));
                setInputValue(INPUT_NUMBER, getDataValue(this));

                // ? If number options element has selected value.
                if (hasSelectedValue(parent)){

                    // Get selected street name.
                    let name = getSelectedValue(OPTIONS_STREET);

                    // Get selected house distinction.
                    let distinction = getSelectedValue(parent).split(' ');

                    // Reset options.
                    flushOptions(parent);

                    // Loop through all cached addresses.
                    cachedAddresses.forEach(function (address) {

                        // ? If house distinction is both alphabetical and numerical.
                        if (distinction.length > 1) {

                            // ? If current address matches with selected values.
                            if (address.name === name && address.number.toString() === distinction[0] && address.letter.toString() === distinction[1]) {
                                setInputValue(INPUT_ZIP, address.zip);
                                setInputValue(INPUT_AREA, address.area);
                                addressID = address.id;
                            }

                        // ? If house distinction is numerical only.
                        } else {

                            // ? If current address matches with selected values.
                            if (address.name === name && address.number.toString() === distinction[0]) {
                                setInputValue(INPUT_ZIP, address.zip);
                                setInputValue(INPUT_AREA, address.area);
                                addressID = address.id;
                            }

                        }

                    });

                }

                break;

            default:
                console.log(parent + ' is an unknown parent node.');
                break;

        }

        flushOptions(parent);
        showNode(parent, false);

        flushOptions(parent);
        showNode(parent, false);

    }

    
    function optionOnMouseUp(){
        optionMouseDown = false;
        flushOptions(this.parentNode);
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

    function getInputValue(node){
        return node.value;
    }

    function setInputValue(node, value) {
        node.value = value;
    }

    function getDataValue(node) {
        return node.getAttribute('data-value');
    }

    function setDataValue(node, value) {
        node.setAttribute('data-value', value);
    }

    function getSelectedValue(node) {

        const ATTRIBUTE_NAME = 'data-selected';

        // ? If node has given attribute.
        if (node.hasAttribute(ATTRIBUTE_NAME))
            return node.getAttribute(ATTRIBUTE_NAME);

    }

    function setSelectedValue(node, value) {
        node.setAttribute('data-selected', value);
    }

    function hasSelectedValue(node) {
        return node.hasAttribute('data-selected') && node.getAttribute('data-selected').length > 0;
    }

    function showNode(node, boolean) {

        // ? If node is visible
        if (typeof boolean === 'boolean') {
            node.setAttribute('data-visible', boolean);
        } else
            console.error('Second parameter must be a boolean type. Your parameter type: ' + typeof boolean);

    }

    function hasOptions(node){
        return node.hasChildNodes();
    }

    function getOptions(node){

        // ? If node has options.
        if (hasOptions(node))
            return node.children;

    }

    function flushOptions(node) {

        // ? If node has options.
        if (hasOptions(node))
            while (hasOptions(node))
                node.firstChild.remove();

        showNode(node, false);
        verticalScroll(node, false);

    }

    function initLoading(node, callback) {

        if (node === OPTIONS_STREET || node === OPTIONS_NUMBER) {

            let statusDiv = document.createElement('div');
            statusDiv.classList.add('text-gray');
            statusDiv.setAttribute('id', 'status-div');
            let loadingText = document.createTextNode('Searching ...');
            statusDiv.appendChild(loadingText);
            flushOptions(node);
            node.appendChild(statusDiv);
            showNode(node, true);

            callback();

        }

    }

    function filterArray(searchValue, array) {

        // Force lowercase.
        searchValue = searchValue.toLowerCase();

        // Init. regular expression.
        const REGEX = new RegExp(searchValue + '.+');
        let returnArray = [];

        // Loop through array.
        array.forEach(function (row) {

            // ? If row matches pattern.
            if (REGEX.exec(row.toLowerCase())){
                returnArray.push(row);
            }

        });

        return returnArray;

    }

    function populateOptions(node, array) {

        if (node === OPTIONS_STREET) {

            array.forEach(function (street) {

                // Init. constants.
                let option_elem = document.createElement('div');

                // Set value.
                setDataValue(option_elem, street);

                // Append text node to option element.
                option_elem.innerText = street;

                // Add event listeners.
                option_elem.addEventListener('mousedown', optionOnMouseDown);
                option_elem.addEventListener('mouseup', optionOnMouseUp);

                // Append option to options container.
                OPTIONS_STREET.appendChild(option_elem);

            });

        } else if (node === OPTIONS_NUMBER) {

            array.forEach(function (number) {

                // Init. constants.
                let option_elem = document.createElement('div');

                // Set value.
                setDataValue(option_elem, number);

                // Append text node to option element.
                option_elem.innerText = number;

                // Add event listeners.
                option_elem.addEventListener('mousedown', optionOnMouseDown);
                option_elem.addEventListener('mouseup', optionOnMouseUp);

                // Append option to options container.
                OPTIONS_NUMBER.appendChild(option_elem);

            });

        }

        showNode(node, true);
        verticalScroll(node, true);

    }

    function setStatusDiv(text, className) {
        let statusDiv = document.getElementById('status-div');
        statusDiv.innerText = text;
        statusDiv.removeAttribute('class');
        statusDiv.classList.add(className);
    }

    function isJSON(data) {
        try {
            JSON.parse(data);
            return true;
        } catch (e) {
            return false;
        }
    }
    
    function verticalScroll(node, boolean) {

        if (typeof boolean === 'boolean'){
            if (boolean)
                node.classList.add('y-scroll');
            else
                node.classList.remove('y-scroll');
        }

    }


});




/**
 * AJAX Fetch
 *
 * @author Isak Hauge
 *
 * @param {string} searchValue - The search value.
 * @param {string} phpFile - The path and filename of the PHP AJAX handler.
 * @param {function} callback - A callback function.
 * */
function ajaxFetch(searchValue, phpFile, callback) {

    // Instantiate AJAX object.
    const AJAX = new XMLHttpRequest();

    // Init. on-ready event handler.
    AJAX.onreadystatechange = function () {

        // ? If data was successfully received.
        if (this.readyState === 4 && this.status === 200) {

            // Send debug message to console.
            console.log('DB request initiated.');

            // Callback.
            callback(this.responseText);

        }

    };

    // Open connection to PHP file.
    AJAX.open("GET", phpFile + searchValue, true);

    // Send data through GET API.
    AJAX.send();

}

