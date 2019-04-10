<?php $current_get = $_GET['p'] ?>
<section class="bg-green p-0">
    <div class="container">
        <nav-bar class="nav-bar">
            <i class="brand">Boskartoteket</i>
            <ul class="nav-menu" data-visible="true">
                <li><a href="?p=<?php echo $current_get ?>">Kontrollpanel</a></li>
                <li><a href="?p=<?php echo $current_get ?>&sub=orders">Bestillinger</a></li>
                <li><a href="?p=<?php echo $current_get ?>&sub=customers">Kunder</a></li>
                <li><a href="?p=<?php echo $current_get ?>&sub=routes">Ruter</a></li>
            </ul>
            <app-hamburger data-visible="false">Menu</app-hamburger>
        </nav-bar>
    </div>
</section>