<section>
    <div class="container">
        <div class="card card-white p-0">

            <div class="p-1 w-100">
                <profile-badge
                        badge-image="src/media/img/demo/isak.jpg"
                        badge-name="Isak Hauge"
                        badge-address="Stasjonsvegen 21 B"></profile-badge>

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
            <button class="btn btn-green w-100">Bestill posar</button>
        </div>
    </div>
</section>
<section class="pos-fixed-bottom p-0">
    <div class="container">
        <menu-bar></menu-bar>
    </div>
</section>

<!-- JS Event listener for this page only -->
<script type="module" src="src/js/event/page/main.js"></script>