<?php http_response_code(404); ?>
<section class="h-100 flex-column-center-center">
    <div class="container">
        <div class="card card-white py-4">
            <h1 class="mb-2">404: Page not found.</h1>
            <p>Request: <?php echo $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'] ?></p>
        </div>
    </div>
</section>