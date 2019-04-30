<?php

    include 'src/php/function/global/functions.php';
    /*echof($_SESSION);*/

    $user = new User();

    $first_name     = User::get_first_name();
    $last_name      = User::get_last_name();
    $email          = User::get_email();
    $street_name    = User::get_street_name();
    $street_number  = User::get_street_number();
    $house_letter   = User::get_house_letter();
    $zip_code       = User::get_zip_code();
    $postal_location= User::get_postal_location();
    $slider_value   = User::get_slider_value();
    $user->check_user();

?>
<!-- Page: Home -->
<app-page id="page-home" data-visible="true">
    <section>
        <div class="container">
            <div class="card card-white p-0">

                <div class="p-1 w-100">
                    <profile-badge
                            badge-image="src/media/img/demo/stock_profile_img.png"
                            badge-id="<?php echo $_SESSION['id'] ?>"
                            badge-name="<?php echo $_SESSION['full_name'] ?>"
                            badge-address="<?php echo $_SESSION['full_address'] ?>"></profile-badge>

                    <tab-page id="tab-1" waste-category="Våtorganisk avfall"></tab-page>
                    <tab-page id="tab-2" waste-category="Papp" data-visible="false"></tab-page>
                    <tab-page id="tab-3" waste-category="Restavfall" data-visible="false"></tab-page>
                    <tab-page id="tab-4" waste-category="Plastemballasje" data-visible="false"></tab-page>
                    <tab-page id="tab-5" waste-category="Farleg avfall" data-visible="false"></tab-page>
                </div>

                <tab-container
                        data-tab-names="Mat;Papp;Rest;Plast;Farleg"
                        data-tab-targets="tab-1;tab-2;tab-3;tab-4;tab-5"></tab-container>
            </div>
        </div>
    </section>
    <section>
        <div class="container">
            <div class="card card-white">
                <h3 class="mb-2 mt-0">Treng du ekstra posar?</h3>
                <button id="order-bags" class="btn btn-green fx-3d-green">Bestill posar</button>
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
                <product-box-container></product-box-container>
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
                <h1>Kontrollpanel</h1>
            </div>
            <div class="card card-white mb-2">
                <h2>Innstillingar</h2>
                <div class="row">
                    <div class="col">
                        <label for="toggle-notification">Aktiver påminningar</label>
                        <toggle-switch id="toggle-notification" data-toggle="<?php echo $slider_value ?>"></toggle-switch>
                    </div>
                    <div class="col">
                        <label for="toggle-newsletter">Logg ut</label><br>
                        <a href="src/php/handler/logout.php"><button class="btn btn-clay fx-3d-clay">Logout</button></a>
                    </div>
                </div>
            </div>
            <div class="card card-white">
                <h2>Brukardetaljar</h2>
                <form action="src/php/handler/update.php" method="post" class="w-100">
                    <!-- First and last name: -->
                    <div class="row mt-3">
                        <!-- First name -->
                        <div class="col">
                            <div class="form-group">
                                <label for="fname">Førenamn</label>
                                <input type="text" id="fname" name="fname" class="input input-flat" value="<?php echo($first_name)?>" autocomplete="given-name" pattern="([a-zæøåA-ZÆØÅ\-]+)" title="Namn kan berre innehalde bokstavar og bindestrekar" required>
                            </div>
                        </div>
                        <!-- Last name -->
                        <div class="col">
                            <div class="form-group">
                                <label for="lname">Etternamn</label>
                                <input type="text" id="lname" name="lname" class="input input-flat" value="<?php echo($last_name)?>" autocomplete="family-name" pattern="([a-zæøåA-ZÆØÅ\-]+)" title="Namn kan berre innehalde bokstavar og bindestrekar" required>
                            </div>
                        </div>
                    </div>

                    <!-- Contact information: -->
                    <div class="row mt-3">
                        <!-- Email -->
                        <div class="col">
                            <div class="form-group">
                                <label for="email">Epost-adresse</label>
                                <input type="text" id="email" name="email" class="input input-flat" value="<?php echo($email)?>" autocomplete="email" pattern="([a-zA-Z0-9\+\.])+(\@{1})([a-zA-Z0-9])+(\.[a-zA-Z0-9]+)+" title="Enter a valid email" required>
                            </div>
                        </div>
                    </div>

                    <!-- Password: -->
                    <div class="row mt-3">
                        <!-- Initial password: -->
                        <div class="col">
                            <div class="form-group">
                                <label for="pass">Skriv inn eit passord</label>
                                <input type="password" id="pass" name="pass" class="input input-flat" placeholder="Passord" autocomplete="new-password">
                                <i class="bullet" id="char">Minst 8 teikn</i>
                                <i class="bullet" id="num">Minst 1 tal</i>
                                <i class="bullet" id="special">Minst 1 spesialteikn</i>
                            </div>
                        </div>
                        <!-- Confirmation password: -->
                        <div class="col">
                            <div class="form-group">
                                <label for="pass-confirm">Bekreft passordet ditt</label>
                                <input type="password" id="pass-confirm" name="pass-confirm" class="input input-flat" placeholder="Bekreft password" autocomplete="new-password">
                            </div>
                        </div>
                    </div>

                    <!-- Address: -->
                    <div class="row mt-3">
                        <div class="col">
                            <div class="form-group">
                                <label for="street">Gatenamn</label>
                                <input type="text" id="street" name="street" class="input input-flat" value="<?php echo($street_name)?>" required>
                                <div id="options-street" class="options" data-visible="false"></div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="number">Husnummeret</label>
                                <input type="text" id="number" name="number" class="input input-flat" value="<?php echo($street_number . ' ' . $house_letter)?>" required>
                                <div id="options-number" class="options" data-visible="false"></div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="zip">Postnummer</label>
                                <input type="text" id="zip" name="zip" class="input input-flat" value="<?php echo($zip_code)?>" disabled>
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="area">Poststad</label>
                                <input type="text" id="area" name="area" class="input input-flat" value="<?php echo($postal_location)?>" disabled>
                            </div>
                        </div>
                    </div>

                    <!-- Register button: -->
                    <div class="row mt-3">
                        <div class="col">
                            <div class="form-group">
                                <button type="submit" name="submit" class="btn btn-clay fx-3d-clay">Oppdater innstillinger</button>
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
        <menu-bar
            data-target-home="page-home"
            data-target-shop="page-shop"
            data-target-settings="page-settings"></menu-bar>
    </div>
</section>




<!-- JS Event listener for this page only -->
<script type="module" src="src/js/event/page/main.js"></script>
<script type="module" src="src/js/event/global/addressSearch.js"></script>
<script type="module" src="src/js/event/global/securePass.js"></script>
<script type="module" src="src/js/event/page/register.js"></script>