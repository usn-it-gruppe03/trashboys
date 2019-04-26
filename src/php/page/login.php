<?php 
    $user = new User();

    echo $user -> check_user();
    if ($user -> is_checked_in()) {
        header('location: index.php?p=main');
    }    
?>
<section>
    <div class="container">
        <div class="card card-green">
            <h1>Boskartoteket</h1>
            <h2 class="text-lighter">Ein enkel app for dei bosinteresserte</h2>
        </div>
    </div>
</section>
<section class="py-3">
    <div class="container">
        <form action="src/php/handler/login.php" method="post" name="login">
            <div class="form-group">
                <input id="email" name="email" class="input input-3d" type="email" placeholder="Email address">
            </div>
            <div class="form-group">
                <input id="password" name="password" class="input input-3d" type="password" placeholder="Password">
            </div>
            <div class="form-group">
                <button type="submit" name="submit" class="btn btn-green fx-3d-shadow-green w-100">Login</button>
            </div>
        </form>
    </div>
</section>
<section>
    <div class="container">
        <h3 class="text-center mb-1">Har du ikkje ein brukar?</h3>
        <button class="btn btn-clay fx-3d-shadow-clay w-100" onclick="window.location.href='?p=register'">Lag ein brukar</button>
    </div>
</section>