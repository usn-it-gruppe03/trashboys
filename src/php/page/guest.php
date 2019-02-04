<section>
    <div class="container">
        <div class="card card-green">
            <h1>Boskartoteket</h1>
            <h2 class="text-lighter">Ein enkel app for dei bosinteresserte</h2>
        </div>
    </div>
</section>
<section class="py-4">
    <div class="container text-center">
        <h3 class="text-dark">Tømmedatoar</h3>
        <p>Fyll inn din adresse for å sjå<br>tømmedatoar for dei respektive<br>avfallskategoriane.</p>
    </div>
</section>
<section>
    <form action="">
        <div class="form-group">
            <div class="container">
                <input type="text" id="address" name="address" class="input" placeholder="Adresse" onclick="searchAutoComplete('address')">
                <script>
                    function searchAutoComplete(id) {
                        alert(id);
                    }
                </script>
            </div>
        </div>
        <div class="form-group">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <input type="text" id="" name="" class="input" placeholder="Postnummer">
                    </div>
                    <div class="col">
                        <input type="text" id="" name="" class="input" placeholder="Poststed">
                    </div>
                </div>
            </div>
        </div>
    </form>
</section>