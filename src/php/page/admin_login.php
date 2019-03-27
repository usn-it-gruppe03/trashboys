<div id="app-window" class="app-window">
    <div class="app-container">

        <div class="app-page">
            <section class="bg-primary">
                <div class="container">
                    <div class="card card-white">
                        <h1>Page One</h1>
                    </div>
                </div>
            </section>
        </div>

        <div class="app-page">
            <section class="bg-warning">
                <div class="container">
                    <div class="card card-white">
                        <h1>Page One</h1>
                    </div>
                </div>
            </section>
        </div>

        <div class="app-page">
            <section class="bg-danger">
                <div class="container">
                    <div class="card card-white">
                        <h1>Page One</h1>
                    </div>
                </div>
            </section>
        </div>

    </div>
</div>
<style>
    .app-container{
        background-color: #3d4e67;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        overflow-x: scroll;
    }

    .app-page{
        width: 100vw;
        min-width: 100vw;
        height: 100vh;
        min-height: 100vh;
    }
</style>
<script>

    const appWindow = document.getElementById('app-window');
    const dimension = appWindow.getBoundingClientRect();
    console.log(dimension.toJSON());

    appWindow.ontouchmove = e => {
        console.log(e.touches[0].clientX);
    };



</script>