<?php include_once 'src/php/class/User.php'; 
    session_start();
?>
<!-- Page: Home -->
<app-page id="page-home" data-visible="true">
    <section>
        <div class="container">
            <div class="card card-white p-0">

                <div class="p-1 w-100">
                    <profile-badge
                            badge-image="src/media/img/demo/isak.jpg"
                            badge-name="<?php echo (User::get_full_name());?>"
                            badge-address="<?php echo (User::get_full_address());?>"></profile-badge>

                    <tab-page id="tab-1" last-collection-date="2019-03-01" next-collection-date="2019-03-05" waste-category="Plastemballasje"></tab-page>
                    <tab-page id="tab-2" last-collection-date="2019-03-01" next-collection-date="2019-03-10" waste-category="Restavfall" data-visible="false"></tab-page>
                    <tab-page id="tab-3" last-collection-date="2019-03-01" next-collection-date="2019-03-31" waste-category="Våtorganisk avfall" data-visible="false"></tab-page>
                    <tab-page id="tab-4" last-collection-date="2019-03-01" next-collection-date="2019-04-05" waste-category="Papp" data-visible="false"></tab-page>
                    <tab-page id="tab-5" last-collection-date="2019-03-01" next-collection-date="2019-05-17" waste-category="Farleg avfall" data-visible="false"></tab-page>
                </div>

                <tab-container data-tab-names="Plast;Rest;Mat;Papp;Farleg" data-tab-targets="tab-1;tab-2;tab-3;tab-4;tab-5"></tab-container>
            </div>
        </div>
    </section>
    <section>
        <div class="container">
            <div class="card card-white">
                <h3 class="mb-2 mt-0">Treng du ekstra posar?</h3>
                <button class="btn btn-green fx-3d-green">Bestill posar</button>
            </div>
        </div>
    </section>
</app-page>




<!-- Page: Shop -->
<app-page id="page-shop" data-visible="false">
    <section>
        <div class="container">
            <div class="card card-green mb-2">
                <h1>Bestill posar</h1>
                <h2 class="text-lighter">Her kan du bestille posar og diverse bos-artiklar</h2>
            </div>
            <div class="card card-white">
                <h2>Tilgjengelege artiklar</h2>
                <div class="row">

                    <div class="col text-center flex-column-center-center mt-2">
                        <product-box product-id="1" data-name="Pose Organisk 5L 40stk" data-img="src/media/img/demo/pose_bio.jpg" data-price="249.99" data-category="1"></product-box>
                    </div>

                    <div class="col text-center flex-column-center-center mt-2">
                        <product-box product-id="2" data-name="Boks med hjul" data-img="src/media/img/demo/bin.jpg" data-price="599.99" data-category="2"></product-box>
                    </div>

                    <div class="col text-center flex-column-center-center mt-2">
                        <product-box product-id="3" data-name="Pose 10L 60stk" data-img="src/media/img/demo/pose_bio.jpg" data-price="349.99" data-category="3"></product-box>
                    </div>

                    <div class="col text-center flex-column-center-center mt-2">
                        <product-box product-id="4" data-name="Pose 90L 40stk" data-img="src/media/img/demo/pose_bio.jpg" data-price="349.99" data-category="4"></product-box>
                    </div>

                    <div class="col text-center flex-column-center-center mt-2">
                        <product-box product-id="5" data-name="Spesialboks 10L" data-img="src/media/img/demo/boks_farlig.png" data-price="699.99" data-category="5"></product-box>
                    </div>

                </div>
            </div>
            <div class="card card-white mt-2">
                <h2 class="text-center mb-2">Handlekurv</h2>
                <shopping-cart id="shopping-cart"></shopping-cart>
            </div>
        </div>
    </section>
</app-page>




<!-- Page: Settings -->
<app-page id="page-settings" data-visible="false">
    <section>
        <div class="container">
            <div class="card card-green mb-2">
                <h1>Innstillingar</h1>
            </div>
            <div class="card card-white mb-2">
                <h2>Påmeldingar</h2>
                <div class="row">
                    <div class="col">
                        <label for="toggle-notification">Aktiver påminningar</label>
                        <toggle-switch id="toggle-notification" data-toggle="on"></toggle-switch>
                    </div>
                    <div class="col">
                        <label for="toggle-newsletter">Aktiver nyheitsbrev</label>
                        <toggle-switch id="toggle-newsletter"></toggle-switch>
                    </div>
                </div>
            </div>
            <div class="card card-white">
                <h2>Brukardetaljar</h2>
                <form action="#" method="post" class="w-100">
                    <!-- First and last name: -->
                    <div class="row mt-3">
                        <!-- First name -->
                        <div class="col">
                            <div class="form-group">
                                <label for="fname">Førenamn</label>
                                <input type="text" id="fname" name="fname" class="input input-flat" placeholder="Førenamn" autocomplete="given-name" pattern="([a-zæøåA-ZÆØÅ\-]+)" title="Namn kan berre innehalde bokstavar og bindestrekar" required>
                            </div>
                        </div>
                        <!-- Last name -->
                        <div class="col">
                            <div class="form-group">
                                <label for="lname">Etternamn</label>
                                <input type="text" id="lname" name="lname" class="input input-flat" placeholder="Etternamn" autocomplete="family-name" pattern="([a-zæøåA-ZÆØÅ\-]+)" title="Namn kan berre innehalde bokstavar og bindestrekar" required>
                            </div>
                        </div>
                    </div>

                    <!-- Contact information: -->
                    <div class="row mt-3">
                        <!-- Email -->
                        <div class="col">
                            <div class="form-group">
                                <label for="email">Epost-adresse</label>
                                <input type="text" id="email" name="email" class="input input-flat" placeholder="Epost" autocomplete="email" pattern="([a-zA-Z0-9\+\.])+(\@{1})([a-zA-Z0-9])+(\.[a-zA-Z0-9]+)+" title="Enter a valid email" required>
                            </div>
                        </div>
                        <!-- Phone number -->
                        <div class="col">
                            <div class="form-group">
                                <label for="phone">Ditt mobilnummer</label>
                                <input type="tel" id="phone" name="phone" class="input input-flat" placeholder="Mobilnummer"  autocomplete="tel-local" pattern="\d{8}" title="Enter a valid phone number" required>
                            </div>
                        </div>
                    </div>

                    <!-- Password: -->
                    <div class="row mt-3">
                        <!-- Initial password: -->
                        <div class="col">
                            <div class="form-group">
                                <label for="pass">Skriv inn eit passord</label>
                                <input type="password" id="pass" name="pass" class="input input-flat" placeholder="Passord" autocomplete="new-password" required>
                                <i class="bullet" id="char">Minst 8 teikn</i>
                                <i class="bullet" id="num">Minst 1 tal</i>
                                <i class="bullet" id="special">Minst 1 spesialteikn</i>
                            </div>
                        </div>
                        <!-- Confirmation password: -->
                        <div class="col">
                            <div class="form-group">
                                <label for="pass-confirm">Bekreft passordet ditt</label>
                                <input type="password" id="pass-confirm" name="pass-confirm" class="input input-flat" placeholder="Bekreft password" autocomplete="new-password" required>
                            </div>
                        </div>
                    </div>

                    <!-- Address: -->
                    <div class="row mt-3">
                        <div class="col">
                            <div class="form-group">
                                <label for="street">Gatenamn</label>
                                <input type="text" id="street" name="street" class="input input-flat" placeholder="Gatenamn" required>
                                <div id="options-street" class="options" data-visible="false"></div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="number">Husnummeret</label>
                                <input type="text" id="number" name="number" class="input input-flat" placeholder="Husnummer" required>
                                <div id="options-number" class="options" data-visible="false"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="zip">Postnummer</label>
                                <input type="text" id="zip" name="zip" class="input input-flat" placeholder="Postnummer" disabled>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="area">Poststad</label>
                                <input type="text" id="area" name="area" class="input input-flat" placeholder="Poststad" disabled>
                            </div>
                        </div>
                    </div>

                    <!-- Register button: -->
                    <div class="row mt-3">
                        <div class="col">
                            <div class="form-group">
                                <button type="submit" class="btn btn-clay fx-3d-clay">Oppdater innstillinger</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</app-page>




<!-- Menu: -->
<section class="pos-fixed-bottom p-0">
    <div class="container">
        <menu-bar></menu-bar>
    </div>
</section>




<!-- JS Event listener for this page only -->
<script type="module" src="src/js/event/page/main.js"></script>
<script type="module" src="src/js/event/global/addressSearch.js"></script>
<script type="module" src="src/js/event/global/securePass.js"></script>
<script type="module" src="src/js/event/page/register.js"></script>