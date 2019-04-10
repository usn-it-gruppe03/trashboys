<?php

    if (isset($_GET['sub'])){

        switch ($_GET['sub']){

            case 'orders':
                require_once 'admin_header.php';
                require_once 'admin_orders.php';
                break;
            case 'customers':
                require_once 'admin_header.php';
                require_once 'admin_customers.php';
                break;
            case 'routes':
                require_once 'admin_header.php';
                require_once 'admin_routes.php';
                break;
            default:
                require_once '404.php';
                break;
        }

    } else {

        require_once 'admin_header.php';
?>
<!-- ** DASHBOARD HTML: START ** -->

<section>
    <div class="container">
        <h1 class="text-center my-3">Statistikk</h1>
        <div class="row">
            <div class="col">
                <div class="card card-white">
                    <h3>Antall bestillinger</h3>
                    <canvas id="chart_orders" height="400" class="w-100"></canvas>
                </div>
            </div>
            <div class="col">
                <div class="card card-white">
                    <h3>Totale innskudd</h3>
                    <canvas id="chart_income" height="400" class="w-100"></canvas>
                </div>
            </div>
            <div class="col">
                <div class="card card-white">
                    <h3>Produkter</h3>
                    <canvas id="chart_products" height="400" class="w-100"></canvas>
                </div>
            </div>
        </div>
    </div>
</section>
<script src="src/js/vendor/Chart.min.js"></script>
<script type="module">
    import * as chartOrders from './src/js/function/page/admin_chart_orders.js';
    import * as chartIncome from './src/js/function/page/admin_chart_income.js';
    import * as chartProducts from './src/js/function/page/admin_chart_products.js';
    window.onload = e => {

        // * Chart: Orders
        // Get the canvas element.
        const CHART_ELEMENT_ORDER = document.getElementById('chart_orders').getContext('2d');
        // Instantiate Chart object.
        window.chartOrder = new Chart(CHART_ELEMENT_ORDER, chartOrders.buildConfig());


        // * Chart: Income
        // Get the canvas element.
        const CHART_ELEMENT_INCOME = document.getElementById('chart_income').getContext('2d');
        // Instantiate Chart object.
        window.chartIncome = new Chart(CHART_ELEMENT_INCOME, chartIncome.buildConfig());


        // * Chart: Products
        // Get the canvas element.
        const CHART_ELEMENT_PRODUCT = document.getElementById('chart_products').getContext('2d');
        // Instantiate Chart object.
        window.chartProduct = new Chart(CHART_ELEMENT_PRODUCT, chartProducts.buildConfig());

    };
</script>
<script type="module" src="src/js/event/page/admin_dashboard.js"></script>

<!-- ** DASHBOARD HTML: END ** -->
<?php

    }

?>