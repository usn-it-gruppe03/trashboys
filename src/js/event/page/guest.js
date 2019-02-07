// Import Address class.
import {Address} from "../../class/address.js";


window.addEventListener('load', function () {

    console.log('Main event listener initiated.');




    // * Event listener states **
    let suggestionClicked = false;




    // ** Constants **
    const input = document.getElementById('address');
    const suggestions = document.getElementById('suggestions');
    const zip = document.getElementById('zip');
    const area = document.getElementById('area');




    // TODO: Get real data from database.
    let addresses = [];




    // ** Predefine event listeners **

    /**
     * Event listener (input) on input.
     * */
    let input_onInput = input.addEventListener('input', function () {

        if (input.value.length === 1) {

            getAddress(getData(), function (data) {

                let object = JSON.parse(data);

                for (let i=0; i<object.length; i++) {

                    let id = object[i]['ID'];
                    let name = object[i]['name'];
                    let number = object[i]['house_number'];
                    let letter = object[i]['letter'];
                    let zip = object[i]['zip_code'];
                    let area = object[i]['postal_location'];

                    addresses.push(
                        new Address(id,name,number,letter,zip,area)
                    );

                }

            });

        }

        // ? If child nodes exist.
        if (hasChildren())
            flushChildren();


        // Filter array of addresses.
        let filtered = arrayFilter(getData(), addresses);


        // ? If array is not empty.
        if (filtered.length > 0)
            showParent(true);
        else {
            flushChildren();
            showParent(false);
        }

        // Loop through array.
        for (let i=0; i<filtered.length; i++){

            // Create DIV element.
            let node = document.createElement('option');

            // Add class to element.
            node.classList.add('suggestion');

            // Set ID.
            node.value = filtered[i].id;

            suggestion_onMouseDown(node, filtered[i]);
            suggestion_onMouseUp(node);

            // Create text node.
            let content = document.createTextNode(filtered[i].short);

            // Append text node to DIV element.
            node.appendChild(content);

            // Append DIV node to suggestions element.
            suggestions.appendChild(node);

        }

        // ? If data string length is zero.
        if (getData().length === 0){
            flushChildren();
            resetFamily();
            showParent(false);
        }

    });

    /**
     * Event listener (suggestion) on mouse down.
     *
     * @param {object} node - The element to which the listener shall be attached.
     * @param {object} object - An Address object.
     * */
    function suggestion_onMouseDown(node, object){
        node.addEventListener('mousedown', function () {
            suggestionClicked = true;
            input.value = object.short;
            zip.value = object.zip;
            area.value = object.area;
        });
    }

    /**
     * Event listener (suggestion) on mouse up.
     *
     * @param {object} node - The element to which the listener shall be attached.
     * */
    function suggestion_onMouseUp(node) {
        node.addEventListener('mouseup', function () {
            suggestionClicked = false;
            flushChildren();
            showParent(false);
        })
    }

    /**
     * Event listener (window) on mouse down.
     * */
    const window_onMouseDown = window.addEventListener('mousedown', function () {

        // ? If a suggestion option is not clicked.
        if (!suggestionClicked){
            flushChildren();
            showParent(false);
        }

    });




    // ** Invoke event listeners **
    input_onInput();
    window_onMouseDown();




    // ** Reusable functions **

    // Filter array:
    function arrayFilter(value, array) {

        // Init. empty array.
        let _array = [];

        // Loop through array.
        for (let i=0; i<array.length; i++){

            // Init. regular expression.
            let regex = new RegExp('(^' + value.toLowerCase() + ')(.+)');

            // ? If current row matches the input pattern.
            if (regex.exec( (array[i].short).toLowerCase() ))

                // Push data to array.
                _array.push(array[i]);

        }

        // Return array.
        return _array;

    }

    // Get data from input.
    function getData() {
        return input.value;
    }

    // Check if suggestions node has children nodes.
    function hasChildren() {
        let arr = document.getElementsByClassName('suggestion');
        return arr.length > 0;
    }

    // Delete child nodes.
    function flushChildren() {
        while (suggestions.firstChild != null)
            suggestions.removeChild(suggestions.firstChild);
    }

    // Show or hide suggestions.
    function showParent(boolean) {
        let val = boolean ? 'true' : 'false';
        suggestions.setAttribute('data-visible', val);
    }

    // Reset input fields for ZIP code and postal area.
    function resetFamily() {
        area.value = '';
        zip.value = '';
    }

});

function getAddress(searchValue, callback) {

    const ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {

        if (this.readyState === 4 && this.status === 200) {
            callback(this.responseText);
        }

    };

    ajax.open("GET", "src/php/ajax/search_address.php?value=" + searchValue, false);
    ajax.send();

}