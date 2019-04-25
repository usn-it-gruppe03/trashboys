<section>
    <div class="container">
        <div class="card card-green">
            <h3>Tømmedatoar</h3>
            <p>Fyll inn din adresse for å sjå<br>tømmedatoar for dei respektive<br>avfallskategoriane.</p>
        </div>
    </div>
</section>
<section>
    <div class="container">
        <form action="">
            <div class="row">
                <div class="col">
                    <div id="map" class="card card-white" data-visible="true"></div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <input type="text" id="street" name="street" class="input input-3d" placeholder="Gatenavn">
                        <div id="options-street" class="options" data-visible="false"></div>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <input type="text" id="number" name="number" class="input input-3d" placeholder="Husnummer">
                        <div id="options-number" class="options" data-visible="false"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <input type="text" id="zip" name="zip" class="input input-3d" placeholder="Postnummer" disabled>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <input type="text" id="area" name="area" class="input input-3d" placeholder="Poststed" disabled>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button class="btn btn-clay">Sjå tømmedatoar</button>
                </div>
            </div>
        </form>
    </div>
</section>


<!-- JS Event listener for this page only -->
<script type="module" src="src/js/event/global/addressSearch.js"></script>
<script type="module" src="src/js/event/page/guest.js"></script>


<style>
    #map{
        width: 100%;
        height: 300px;
    }
</style>
<script>


    /*function initMap(){

        console.log('Init maps function invoked');

        const spawnElement = document.getElementById('map');

        const object = {
            map: new google.maps.Map(spawnElement, initialConfig),
            geocoder: new google.maps.Geocoder,
            infowindow: new google.maps.InfoWindow,
            coordinate: {lat: null, lng: null},
            address: {street: '', number: '', letter: ''},
        };

        createGoogleMap(spawnElement, object, () => {
            onReady(object, () => {
                getCoordinates(object, () => {
                    geocodeCoordinates(object, () => {
                        createInfoWindow(object, () => {});
                    });
                });
            });
        });

    }

    function createGoogleMap(spawnElement, object, callback){

        // Init. map config. object.
        const initialConfig = {
            zoom: 16,
            center: {lat: 59.411844, lng: 9.069492},
        };

        // Invoke the callback function.
        callback(object);

    }

    function onReady(object, callback) {
        google.maps.event.addListenerOnce(map, 'idle', () => {
            callback(object);
        });
    }

    function getCoordinates(object, callback){
        window.navigator.geolocation.getCurrentPosition( function(location){
            object.coordinate.lat = location.coords.latitude;
            object.coordinate.lng = location.coords.longitude;
            callback(object);
        });
    }

    function geocodeCoordinates(object, callback) {

        object.map.setCenter(coordinate);

        object.geocoder.geocode({'location', object.coordinate}, function (result, status) {
            if (status === 'OK') {
                if (result[0]){

                    const addressComponents = addressToComponents(result[0].formatted_address);

                    callback(object);

                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }

    function createInfoWindow(object){

        const marker = new google.maps.Marker({
            position: object.coordinate,
            map: object.map
        });

        object.infowindow.setContent('<h1>Hello</h1>');

    }

    function addressToComponents(rawAddress){

        const regex = new RegExp('(^.+?)(?=\,{1})');
        const address = rawAddress.match(regex)[0];
        const component = address.split(' ');

        return {
            street: (component.length > 0) ? component[0] : '',
            number: (component.length > 1) ? component[1] : '',
            letter: (component.length > 2) ? component[2] : ''
        }

    }*/


    function initMap() {

        // * Init. Google Map.
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 1,
            center: {lat: 59.411844, lng: 9.069492}
        });

        // * Init. Geo Coder.
        const geocoder = new google.maps.Geocoder;

        // * Init. Info Window.
        const infowindow = new google.maps.InfoWindow;

        // * Add event listener.
        google.maps.event.addListenerOnce(map, 'idle', function(){
            geocodeLatLng(geocoder, map, infowindow);
        });

    }

    function geocodeLatLng(geocoder, map, infowindow) {

        var latlng = {lat: 59.411844, lng: 9.069492};
        map.setCenter(latlng);

        geocoder.geocode({'location': latlng}, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    map.setZoom(16);

                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map
                    });

                    console.log(results[0].formatted_address);

                    let fullAddress = results[0].formatted_address;
                    fullAddress = fullAddress.replace(new RegExp('\,'), '');
                    let addressArray = fullAddress.split(' ');
                    initSearch(addressArray[0],addressArray[1]);

                    infowindow.setContent(results[0].formatted_address);

                    infowindow.open(map, marker);

                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    }

    function initSearch(streetName, houseNumber){

        const input_street = document.getElementById('street');
        const input_number = document.getElementById('number');

        input_street.click();
        input_street.value = streetName;

        input_number.click();
        input_number.value = houseNumber;

    }
</script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_EHwnT0KkbVII_FK5y7fxazu_WfLTJBU&callback=initMap"></script>
