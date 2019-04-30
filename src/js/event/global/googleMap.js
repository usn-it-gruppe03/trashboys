/**
 * Coordinates
 *
 * @description This object will be subject for storing coordinates
 * accessible for all subsequent functions in this document.
 * */
const coordinates = {
    lat: null,
    lng: null
};


/**
 * Address Components
 * */
let addressComponents = null;


/**
 * Modal View
 * */
let modal = null;


/**
 * Map Loading Status Paragraph Element.
 * */
const p_mapLoadingStatus = document.createElement('p');
p_mapLoadingStatus.id = 'map-loading-status';
p_mapLoadingStatus.setAttribute('class', 'm-0');


/**
 * Set Loading Status
 * */
function setLoading(msg){
    p_mapLoadingStatus.innerText = msg;
}


/**
 * Get Coordinates
 *
 * @description This function will return the location of the device.
 *
 * @param {object} coordObj - An object containing latitude and longitude.
 * @param {function} callback - The callback function.
 * */
function getCoordinates(coordObj, callback){

    setLoading('Finner dine koordinater ...');

    window.navigator.geolocation.getCurrentPosition( function(location){
        coordObj.lat = location.coords.latitude;
        coordObj.lng = location.coords.longitude;
        callback();
    });
}


/**
 * Load Google Script
 *
 * @description TODO: Write
 * */
function loadGoogleScript(){

    setLoading('Lastar Google Maps API ...');

    const elem = document.createElement('script');
    elem.setAttribute('async','');
    elem.setAttribute('defer', '');
    elem.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC_EHwnT0KkbVII_FK5y7fxazu_WfLTJBU&callback=initMap';

    const test = document.createElement('script');
    let content = createGoogleMap.toString();

    content = content.replace(/createGoogleMap/g, 'initMap');
    content = content.replace(/\s{4,}|\n+/g, '');

    test.innerText = content;
    const head = document.getElementsByTagName('footer')[0];
    head.append(test, elem);
}


/**
 * Address to Components
 *
 * @description TODO: Write
 *
 * @param {string} rawAddress - The raw address from Google Maps' reversed geocoding.
 *
 * @returns {object}
 * */
function addressToComponents(rawAddress){

    const address = rawAddress.match(/(^.+?)(?=,{1})/g)[0];
    const component = address.split(' ');

    console.table(component);

    return {
        street: (component.length > 0) ? component[0] : '',
        number: (component.length > 1) ? component[1] : '',
        letter: (component.length > 2) ? component[2] : ''
    }

}


/**
 * Initialize Google Maps.
 * */
function createGoogleMap() {

    setLoading('Building map ...');

    console.log(
        '%cFunction invoked: %cInitiate Google Maps API',
        'font-weight: bold;',
        'font-weight: regular;'
    );

    const spawnElement = document.getElementById('map');
    spawnElement.style.width = '100%';
    spawnElement.style.height = '400px';

    const initConfig = {
        zoom: 10,
        center: coordinates
    };

    const obj = {
        gmap: null,
        geocoder: null,
        marker: null,
        infowindow: null,
    };

    obj.gmap = new google.maps.Map(spawnElement,initConfig);
    obj.geocoder = new google.maps.Geocoder;
    obj.infowindow = new google.maps.InfoWindow;

    reverseGeocoding(obj);

}


/**
 * Reverse Geocoding
 *
 * @description TODO: Write
 *
 * @param {object} obj - An object containing essential objects.
 * */
function reverseGeocoding(obj) {

    google.maps.event.addListenerOnce(obj.gmap, 'idle', () => {

        obj.geocoder.geocode({'location': coordinates}, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {

                    obj.gmap.setZoom(16);
                    obj.gmap.setCenter(coordinates);

                    const fullAddress = results[0].formatted_address;

                    createInfoWindow(obj, fullAddress, () => {
                        addressComponents = addressToComponents(fullAddress);
                    });

                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });

    });
}


/**
 * Create InfoWindow
 * */
function createInfoWindow(obj, fullAddress, callback){

    // * Prettify address.
    const adrArr = fullAddress.split(', ');
    const prettyAddress = adrArr[0] + ',<br>' + adrArr[1] + ' ' + adrArr[2];

    // * Create Marker.
    obj.marker = new google.maps.Marker({
        position: coordinates,
        map: obj.gmap
    });

    // * Create essential elements:
    const content = document.createElement('div');
    const h3_question = document.createElement('h4');
    const p_address = document.createElement('p');
    const div_buttonContainer = document.createElement('div');
    const button_yes = document.createElement('button');
    button_yes.type = 'button';
    const button_no = document.createElement('button');
    button_no.type = 'button';

    // * Assign elements with classes:
    h3_question.setAttribute('class', 'text-dark');
    p_address.setAttribute('class', 'm-0');
    div_buttonContainer.setAttribute('class','text-center');
    button_yes.setAttribute('class', 'btn btn-green fx-3d-green mx-1 mt-1');
    button_no.setAttribute('class', 'btn btn-clay fx-3d-clay mx-1 my-1');

    // * Add event listeners:
    button_yes.addEventListener(
        ev().button.yes.click().type,
        ev().button.yes.click().listener
    );

    button_no.addEventListener(
        ev().button.no.click().type,
        ev().button.no.click().listener
    );

    // * Add content:
    h3_question.innerText = 'Er dette din adresse?';
    p_address.innerHTML = prettyAddress;
    button_yes.innerText = 'Ja';
    button_no.innerText = 'Nei';

    // * Append content:
    div_buttonContainer.append(button_yes,button_no);
    content.append(h3_question,p_address,div_buttonContainer);

    // * Finalize InfoWindow:
    obj.infowindow.setContent(content);
    obj.infowindow.open(obj.gmap,obj.marker);

    // * Callback.
    callback();

}


/**
 * Initialize Search
 * */
function initSearch(street, number, letter){

    const googleMapSection = document.getElementById('section-google-map');
    const addressSearchElement = document.querySelector('address-search');
    const collectionGrid = document.querySelector('collection-grid');

    searchAddress(street, number, letter, (jsonObject) => {
        
        console.log('Test start');
        console.log('Length: ' + jsonObject.length);
        console.table(jsonObject);
        console.log('Test end');

        // ? If only one address was retrieved.
        if (jsonObject.length === 1){
            deleteElement(googleMapSection);
            collectionGrid.scrollIntoView();
        }

        // ? If two or more addresses was retrieved.
        else if (jsonObject.length > 1) {

            // * Init. empty array.
            let labelArray = [];

            // Iterate through each JSON object.
            for (let i=0; i<jsonObject.length; i++){

                console.table(jsonObject);

                // * Extract essential data:
                const id = jsonObject[i]['ID'];
                let text = ' ' + jsonObject[i]['name'];
                text += (jsonObject[i]['house_number'].toString().length > 0) ? ' ' + jsonObject[i]['house_number'] : '';
                text += (jsonObject[i]['letter'].length > 0) ? ' ' + jsonObject[i]['letter'] : '';

                // * Create elements:
                const label = document.createElement('label');
                const textNode = document.createTextNode(text);
                const checkBox = document.createElement('input');

                // * Add data:
                checkBox.setAttribute('data-value', id);
                checkBox.type = 'radio';
                checkBox.name = 'address';

                // * Append nodes:
                label.append(checkBox,textNode);

                // * Push label to array
                labelArray.push(label);

            }


            /*
            * Create Modal Window.
            * */

            // * Create button elements:
            const btn_choose = document.createElement('button');
            const btn_close = document.createElement('button');

            // * Add CSS class to buttons:
            btn_choose.setAttribute('class', 'btn btn-green fx-3d-green');
            btn_close.setAttribute('class', 'btn btn-clay fx-3d-clay');

            // * Add text to buttons:
            btn_choose.innerText = 'Velg adresse';
            btn_close.innerText = 'Lukk';

            // * Create event listeners for buttons:
            const ev_btn_choose = labelArray => { return {type: 'click', listener: event => {

                const self = event.target;
                const modalBox = self.parentElement;
                const modalWindow = modalBox.parentElement;

                // * Fetch the collection grid element.
                let addressID = '';

                // * Iterate through each label.
                for (let i=0; i<labelArray.length; i++){
                    const checkbox = labelArray[i].firstElementChild;
                    const id = checkbox.getAttribute('data-value');
                    if (checkbox.checked)
                        addressID = id;
                }

                // ? If address ID has data.
                if (addressID.length > 0){
                    collectionGrid.setAttribute('address-id', addressID);
                }

                // * Delete entire modal window.
                deleteElement(modalWindow);
                deleteElement(googleMapSection);

            }}};

            const ev_btn_close = () => { return {type: 'click', listener: event => {

                const self = event.target;
                const modalBox = self.parentElement;
                const modalWindow = modalBox.parentElement;

                // * Delete entire modal window.
                deleteElement(modalWindow);

            }}};

            btn_choose.addEventListener(
                ev_btn_choose(labelArray).type,
                ev_btn_choose(labelArray).listener
            );

            btn_close.addEventListener(
                ev_btn_close().type,
                ev_btn_close().listener
            );

            const mtitle = 'Vi fant ikkje adressa di i systemet.';
            const mtext = document.createElement('h4');
            mtext.innerText = 'Her er noen alternativer:';
            let contentArray = [mtext];
            for (let i=0; i<labelArray.length; i++)
                contentArray.push(labelArray[i]);

            modal = modalWindow(
                mtitle,
                contentArray,
                [btn_choose, btn_close]
            );

            const footer = document.querySelector('footer');
            footer.append(modal);

        }

    });

}


/**
 * Delete element
 * */
function deleteElement(node){
    const newNode = node.cloneNode(true);
    node.parentElement.replaceChild(newNode,node);
    newNode.remove();
}


/**
 * Generate Modal Window
 *
 * @param {string} title - The window title.
 * @param {array} contents - An array of elements.
 * @param {array} buttons - An array of button elements.
 * */
function modalWindow(title, contents, buttons){

    console.log('Function invoked!');

    const mwindow = document.createElement('modal-window');
    const mbox = document.createElement('div');
    const mtitle = document.createElement('div');
    const mcontent = document.createElement('div');

    mbox.classList.add('modal-box');
    mtitle.classList.add('modal-title');
    mcontent.classList.add('modal-content');

    mtitle.innerText = title;

    mbox.append(mtitle,mcontent);

    for (let j=0; j<contents.length; j++){
        mcontent.append(contents[j]);
    }

    for (let i=0; i<buttons.length; i++){
        mbox.append(buttons[i]);
    }

    mwindow.append(mbox);

    return mwindow;

}


/**
 * EventListener: Receive Address.
 * */
function ev(){
    return {
        sendAddress: (street, number) => {
            return {
                typeArg: 'sendAddress',
                eventInitDict: {
                    detail: {
                        street: street,
                        number: number
                    }
                },
            }
        },
        button: {
            yes: {
                click: () => {
                    return {
                        type: 'click',
                        listener: event => {
                            initSearch(addressComponents.street, addressComponents.number, addressComponents.letter);
                        }
                    }
                }
            },
            no: {
                click: () => {
                    return {
                        type: 'click',
                        listener: event => {
                            if (modal !== null)
                                deleteElement(modal);

                            deleteElement(document.getElementById('section-google-map'));
                        }
                    }
                }
            }
        }
    }
}


/**
 * AJAX - Search Address
 * */
function searchAddress(street, number, letter, callback){

    const file = 'src/php/ajax/search_address_gmap.php';
    const query = (name, number, letter = null) => {
        let q = '?name=' + name + '&number=' + number;
        if (letter.length > 0)
            q += '&letter=' + letter;
        return q;
    };

    console.log(file + query(street,number,letter));

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200){
            const rawData = this.responseText;
            if (isJSON(rawData)){
                callback(JSON.parse(rawData));
            }
        }
    };

    xhr.open('POST', file + query(street,number,letter), true);
    xhr.send();
}


/**
 * Is JSON.
 * */
function isJSON(data){
    try {
        JSON.parse(data);
        return true;
    } catch (e) {
        return false;
    }
}


/**
 * Launch.
 * */
function launch(){

    // * Append loading status element.
    document.getElementById('map').append(p_mapLoadingStatus);

    getCoordinates(coordinates, () => {
        loadGoogleScript();
    });
}


// * Launch everything!
launch();