/**
 * Make Element
 *
 * @description This function will return an HTML element
 *
 * @param {string} tagName - The desired HTML tag.
 * @param {string} content - Inner HTML content.
 *
 * @returns {HTMLElement}
 * */
export function makeElement(tagName, content = ''){
    let element = document.createElement(tagName);
    element.innerHTML = content;
    return element;
}


/**
 * Get value.
 *
 * @description This function will return the value of an HTML element.
 * Important: This function only works with element that natively
 * supports value parameters.
 *
 * @param {object} node - HTML element.
 * @returns string
 * */
export function getValue(node){
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
export function setValue(node, value){
    node.value = value;
}


/**
 * Get data value.
 *
 * @description This function will return the value of an HTML element
 * with a custom value attribute. Works with all elements.
 *
 * @param {object} node - HTML element.
 * @returns {string}
 * */
export function getDataValue(node){
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
export function setDataValue(node, value){
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
export function getSelectedValue(node){

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
export function setSelectedValue(node, value){
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
export function hasSelectedValue(node){
    return node.hasAttribute('data-selected') &&
        node.getAttribute('data-selected').length > 0;
}


/**
 * AJAX Fetch
 *
 * @author Isak Hauge
 *
 * @param {string} searchValue - The search value.
 * @param {string} phpFileURL - The path and filename of the PHP AJAX handler.
 * @param {function} callback - A callback function.
 * */
export function ajaxFetch(searchValue, phpFileURL, callback){

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
    AJAX.open('GET', phpFileURL + searchValue, true);

    // Send data through GET API.
    AJAX.send();

}


/**
 * AJAX Send JSON
 * */
export function ajaxJSON(jsonObject, phpFileURL, callback){

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200){
            callback(this.responseText);
        }
    };

    xhr.open('POST', phpFileURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(jsonObject));

}


/**
 * Is JSON.
 *
 * @description This function will return a boolean value based on whether the given string
 * data is JSON format compliant.
 *
 * @param {string} data - The data string to be analyzed.
 * @returns {boolean}
 * */
export function isJSON(data) {

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
export function setScroll(node, axis, boolean) {

    // ? If boolean parameter is an actual boolean type.
    if (typeof boolean === 'boolean' || (axis === 'y' || axis === 'x')){

        if (boolean)
            node.classList.add(axis + '-scroll');
        else
            node.classList.remove(axis + '-scroll');

    }

}


/**
 * Show node.
 *
 * @description This function will either show or hide an HTML element
 * depending on the boolean value entered in the boolean parameter.
 *
 * @param {object} node - HTML element.
 * @param {boolean} boolean - True or false.
 * */
export function showNode(node, boolean) {

    // ? If node is visible
    if (typeof boolean === 'boolean') {
        node.setAttribute('data-visible', boolean);
    } else
        console.error('Second parameter must be a boolean type. Your parameter type: ' + typeof boolean);

}


/**
 * Set state.
 *
 * @description This function will set the state of an HTML element
 * given in the parameters.
 *
 * @param {HTMLElement} node - HTML element.
 * @param {string} state - The state.
 * */
export function setState(node, state) {
    node.setAttribute('data-state', state);
}


/**
 * Get state.
 *
 * @description This function will get the state of an HTML element
 * given in the parameters.
 *
 * @param {HTMLElement} node - HTML element.
 *
 * @return {string}
 * */
export function getState(node) {
    return node.getAttribute('data-state');
}


/**
 * Is hidden.
 *
 * @description This function will return a boolean value based on
 * whether the given node is hidden or visible.
 *
 * @param {object} node - The HTML element.
 *
 * @returns {boolean}
 * */
export function isHidden(node) {

    // ? If node has the "data-visible" attribute.
    if (node.hasAttribute('data-visible'))
        return node.getAttribute('data-visible') === 'true';
    else return false;
}


/**
 * Has previous sibling.
 *
 * @description This function will return a boolean value based on whether
 * the given node has a previous sibling.
 *
 * @param {object} node - HTML element.
 * @returns {boolean}
 * */
export function hasPrevSibling(node){
    return node.previousElementSibling != null;
}


/**
 * Has next sibling.
 *
 * @description This function will return a boolean value based on whether
 * the given node has a next sibling.
 *
 * @param {object} node - HTML element.
 * @returns {boolean}
 * */
export function hasNextSibling(node){
    return node.nextElementSibling != null;
}


/**
 * Attribute defined.
 *
 * @description This function will return a boolean value based
 * on whether a node's attribute is defined.
 *
 * @param {object} node - HTML element.
 * @param {string} attr - The attribute name.
 * @returns {boolean}
 * */
export function attrDefined(node, attr){

    if (node.hasAttribute(attr))
        return node.getAttribute(attr).length > 0;
    else return false;

}


/**
 * Console Out.
 *
 * @description This function simplifies the console log
 * function.
 *
 * @param {string} msg - The message.
 * @param {string} colorName - The color.
 * */
export function cout(msg, colorName = '') {

    // * Init. object of standard Bootstrap colors.
    const color = {
        primary:      '#007bff',
        secondary:    '#6c757d',
        success:      '#28a745',
        danger:       '#dc3545',
        warning:      '#ffc107',
        info:         '#17a2b8',
        muted:        '#6c757d',
        light:        '#f8f9fa',
        dark:         '#343a40',
        white:        '#ffffff',
        white50:      'rgba(255,255,255,.5)',
        black50:      'rgba(0,0,0,.5)',
        none:         'rgba(0,0,0,0)',
        border: {
            light: 'rgba(255,255,255,0.2)',
            dark: 'rgba(0,0,0,0.2)'
        }
    };

    // * Init. color combination object.
    const combo = {color: '', background: '', border: ''};

    switch (colorName) {
        case Object.keys(color)[0]:
            combo.color = color.white;
            combo.background = color.primary;
            combo.border = color.border.light;
            break;
        case Object.keys(color)[1]:
            combo.color = color.white;
            combo.background = color.secondary;
            combo.border = color.border.dark;
            break;
        case Object.keys(color)[2]:
            combo.color = color.white;
            combo.background = color.success;
            combo.border = color.border.light;
            break;
        case Object.keys(color)[3]:
            combo.color = color.light;
            combo.background = color.danger;
            combo.border = color.border.light;
            break;
        case Object.keys(color)[4]:
            combo.color = color.dark;
            combo.background = color.warning;
            combo.border = color.border.dark;
            break;
        case Object.keys(color)[5]:
            combo.color = color.light;
            combo.background = color.info;
            combo.border = color.border.light;
            break;
        case Object.keys(color)[6]:
            combo.color = color.white50;
            combo.background = color.muted;
            combo.border = color.border.light;
            break;
        case Object.keys(color)[7]:
            combo.color = color.dark;
            combo.background = color.light;
            combo.border = color.border.dark;
            break;
        case Object.keys(color)[8]:
            combo.color = color.light;
            combo.background = color.dark;
            combo.border = color.border.light;
            break;
        case Object.keys(color)[9]:
            combo.color = color.dark;
            combo.background = color.white;
            combo.border = color.border.dark;
            break;
        default:
            combo.color = color.light;
            combo.background = color.dark;
            combo.border = color.border.light;
            break;
    }

    console.log(
        '%c' + msg,
        'color: ' + combo.color + ';' +
        'background: ' + combo.background + ';' +
        'padding: 4px 6px;' +
        'border-radius: 5px;' +
        'border: 3px solid ' + combo.border + ';'
    );

}


/**
 * Remove Children
 *
 * @description This function will remove all child nodes
 * of the given parent element node, before any other function.
 *
 * @param {HTMLElement} htmlElement - The parent element.
 * @param {function} callback - The callback function.
 * */
export function removeChildren(htmlElement, callback) {

    while (htmlElement.hasChildNodes())
        htmlElement.firstChild.remove();

    callback();
}


/**
 * Component Loaded Message
 *
 * @description This function will output a standardized
 * message in the console indicating that a web component
 * has been loaded into the DOM.
 *
 * @param {object} component - The class name of the component.
 * */
export function componentLoadedMessage(component){
    cout(
        'Component Loaded: ' +
        component.constructor.name,
        'primary'
    );
}


/**
 * Component Removed Message
*
* @description This function will output a standardized
* message in the console indicating that a web component
* has been removed from the DOM.
*
* @param {object} component - The class name of the component.
* */
export function componentRemovedMessage(component){
    cout(
        'Component Removed: ' +
        component.constructor.name,
        'danger'
    );
}


/**
 * Event Dispatched
 * */
export function eventDispatchMessage(event) {
    cout(
        'Event «' + event.type + '» dispatched to element: ' +
        event.target.localName,
        'warning'
    );
}


/**
 * If Client Device is a Mobile
 *
 * @description This function will check if the client device is a mobile.
 *
 * @returns {boolean}
 * */
export function clientIsMobile(){
    const regex = new RegExp(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i);
    return navigator.userAgent.toString().matches(regex) || navigator.vendor.toString().matches(regex) || navigator.opera.toString().matches(regex);
}