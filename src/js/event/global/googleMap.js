/**
 * Launch.
 * */
function launch(){
    getCoordinates(coordinates, () => {
        loadGoogleScript();
    });
}


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
 * Asynchronous Replace
 *
 * @description This function will conduct string replacement with
 * the help of regular expressions. It will also ensure perfect
 * invocation timing thanks to callback functions.
 * */
function asyncReplace(string, searchValue, replaceValue, callback){
    string = string.replace(searchValue, replaceValue);
    callback(string);
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
    const elem = document.createElement('script');
    elem.setAttribute('async','');
    elem.setAttribute('defer', '');
    elem.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyC_EHwnT0KkbVII_FK5y7fxazu_WfLTJBU&callback=initMap';

    const test = document.createElement('script');
    let content = createGoogleMap.toString();

    asyncReplace(content, /createGoogleMap/g, 'initMap', (string_newName) => {
        asyncReplace(string_newName, /\s{4,}|\n+/g, '', (string_noBreaks) => {
            test.innerText = string_noBreaks;
            const head = document.getElementsByTagName('footer')[0];
            head.append(test, elem);
        });
    });

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

    console.log(
        '%cFunction invoked: %cInitiate Google Maps API',
        'font-weight: bold;',
        'font-weight: regular;'
    );

    const spawnElement = document.getElementById('map');
    spawnElement.style.width = '100%';
    spawnElement.style.height = '300px';

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
                        const address = addressToComponents(fullAddress);
                        initSearch(address.street, address.number);
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


function createInfoWindow(obj, fullAddress, callback){

    // Create Marker.
    obj.marker = new google.maps.Marker({
        position: coordinates,
        map: obj.gmap
    });

    const content = document.createElement('div');


    obj.infowindow.setContent(fullAddress);
    obj.infowindow.open(obj.gmap,obj.marker);

    callback();

}


/**
 * Initialize Search
 * */
function initSearch(streetName, houseNumber){

    const input_street = document.getElementById('street');
    const input_number = document.getElementById('number');

    input_street.click();
    input_street.value = streetName;

    input_number.click();
    input_number.value = houseNumber;

}


// * Launch everything!
launch();