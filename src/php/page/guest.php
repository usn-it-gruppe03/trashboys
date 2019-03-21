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
                        <input type="text" id="street" name="street" class="input" placeholder="Gatenavn">
                        <div id="options-street" class="options" data-visible="false"></div>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <input type="text" id="number" name="number" class="input" placeholder="Husnummer">
                        <div id="options-number" class="options" data-visible="false"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <input type="text" id="zip" name="zip" class="input" placeholder="Postnummer" disabled>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <input type="text" id="area" name="area" class="input" placeholder="Poststed" disabled>
                    </div>
                </div>
            </div>
        </form>
    </div>
</section>




<!-- JS Event listener for this page only -->
<script type="module" src="src/js/event/global/addressSearch.js"></script>