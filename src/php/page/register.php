<section>
    <div class="container">
        <div class="card card-green">
            <h3>Lag ein brukar</h3>
            <p class="m-0">For å lage ein bruker, trenger vi følgende informasjon om deg.</p>
        </div>
    </div>
</section>

<section>
    <div class="container">
        <form action="src/php/handler/registration.php" method="post">

            <!-- First and last name: -->
            <div class="row mt-3">
                <!-- First name -->
                <div class="col">
                    <div class="form-group">
                        <label for="fname">Førenamn</label>
                        <input type="text" id="fname" name="fname" class="input input-3d" placeholder="Førenamn" autocomplete="given-name" pattern="([a-zæøåA-ZÆØÅ\-]+)" title="Namn kan berre innehalde bokstavar og bindestrekar" required>
                    </div>
                </div>
                <!-- Last name -->
                <div class="col">
                    <div class="form-group">
                        <label for="lname">Etternamn</label>
                        <input type="text" id="lname" name="lname" class="input input-3d" placeholder="Etternamn" autocomplete="family-name" pattern="([a-zæøåA-ZÆØÅ\-]+)" title="Namn kan berre innehalde bokstavar og bindestrekar" required>
                    </div>
                </div>
            </div>

            <!-- Contact information: -->
            <div class="row mt-3">
                <!-- Email -->
                <div class="col">
                    <div class="form-group">
                        <label for="email">Epost-adresse</label>
                        <input type="text" id="email" name="email" class="input input-3d" placeholder="Epost" autocomplete="email" pattern="([a-zA-Z0-9\+\.])+(\@{1})([a-zA-Z0-9])+(\.[a-zA-Z0-9]+)+" title="Enter a valid email" required>
                    </div>
                </div>
            </div>

            <!-- Password: -->
            <div class="row mt-3">
                <!-- Password: -->
                <div class="col">
                    <div class="form-group">
                        <label for="pass">Skriv inn eit passord</label>
                        <input type="password" id="pass" name="pass" class="input input-3d" placeholder="Passord" autocomplete="new-password" required>
                        <i class="bullet" id="char">Minst 8 teikn</i>
                        <i class="bullet" id="num">Minst 1 tal</i>
                        <i class="bullet" id="special">Minst 1 spesialteikn</i>
                    </div>
                </div>
                <!-- Password confirmation: -->
                <div class="col">
                    <div class="form-group">
                        <label for="pass-confirm">Bekreft passordet ditt</label>
                        <input type="password" id="pass-confirm" name="pass-confirm" class="input input-3d" placeholder="Bekreft password" autocomplete="new-password" required>
                    </div>
                </div>
            </div>

            <!-- Address: -->
            <div class="row mt-3">
                <div class="col">
                    <div class="form-group">
                        <label for="street">Gatenamn</label>
                        <input type="text" id="street" name="street" class="input input-3d" placeholder="Gatenamn" required>
                        <div id="options-street" class="options" data-visible="false"></div>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="number">Husnummeret</label>
                        <input type="text" id="number" name="number" class="input input-3d" placeholder="Husnummer" required>
                        <div id="options-number" class="options" data-visible="false"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="form-group">
                        <label for="zip">Postnummer</label>
                        <input type="text" id="zip" name="zip" class="input input-3d" placeholder="Postnummer" disabled>
                    </div>
                </div>
                <div class="col">
                    <div class="form-group">
                        <label for="area">Poststad</label>
                        <input type="text" id="area" name="area" class="input input-3d" placeholder="Poststad" disabled>
                    </div>
                </div>
            </div>

            <!-- Register button: -->
            <div class="row mt-3">
                <div class="col">
                    <div class="form-group">
                        <button type="submit" name="submit" class="btn btn-green fx-3d-green">Registrer</button>
                    </div>
                </div>
            </div>

        </form>
    </div>
</section>




<!-- JS Event listener for this page only -->
<script type="module" src="src/js/event/global/addressSearch.js"></script>
<script type="module" src="src/js/event/global/securePass.js"></script>
<script type="module" src="src/js/event/page/register.js"></script>
