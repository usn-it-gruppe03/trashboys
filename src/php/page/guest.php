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