<app-page id="page-address">
    <section>
        <div class="container">
            <div class="card card-green">
                <h3>Tømmedatoar</h3>
                <p>Fyll inn din adresse for å sjå<br>tømmedatoar for dei respektive<br>avfallskategoriane.</p>
            </div>
        </div>
    </section>

    <section id="section-google-map">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div id="map" class="card card-white"></div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container">
            <address-search></address-search>
        </div>
    </section>
</app-page>


<app-page id="page-collection-details" data-visible="true">
    <section>
        <div class="container">
            <collection-grid></collection-grid>
        </div>
    </section>
</app-page>


<!-- JS Event listener for this page only -->
<!--<script type="module" src="src/js/event/global/addressSearch.js"></script>-->
<script type="module" src="src/js/event/page/guest.js"></script>
<script src="src/js/event/global/googleMap.js"></script>