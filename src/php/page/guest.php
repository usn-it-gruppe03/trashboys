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
        <div id="map" class="card card-white"></div>
    </div>
</section>
<section>
    <div class="container">
        <form action="">
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

    var inLat;
    var inLng;
    var inLatLng;
    var map;


    navigator.geolocation.getCurrentPosition(function(location) {
        inLat = location.coords.latitude;
        inLng = location.coords.longitude;
    });

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: {lat: 59.411844, lng: 9.069492}
        });
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;

        window.addEventListener('load', function() {
            geocodeLatLng(geocoder, map, infowindow);
        });
    }

    function geocodeLatLng(geocoder, map, infowindow) {

        var latlng = {lat: inLat, lng: inLng};
        map.setCenter(new google.maps.LatLng(inLat, inLng));

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


<script async defer
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_EHwnT0KkbVII_FK5y7fxazu_WfLTJBU&callback=initMap">
</script>
