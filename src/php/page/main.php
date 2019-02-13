<section>
    <div class="container">
        <div class="card card-white p-0">
            <div class="p-2 w-100 flex-column-center-center">

                <profile-badge
                        badge-image="src/media/img/demo/isak.jpg"
                        badge-name="Isak Hauge"
                        badge-address="Stasjonsvegen 21 B"></profile-badge>

                <tab-page id="tab-1" collection-date="Mandag 1. Januar" data-percent="0.2" waste-category="Plastemballasje"></tab-page>
                <tab-page id="tab-2" collection-date="Tirsdag 2. Februar" data-percent="0.4" waste-category="Restavfall" data-visible="false"></tab-page>
                <tab-page id="tab-3" collection-date="Onsdag 3. Mars" data-percent="0.6" waste-category="Våtorganisk avfall" data-visible="false"></tab-page>
                <tab-page id="tab-4" collection-date="Torsdag 4. April" data-percent="0.8" waste-category="Papp / papir / drikkekartong" data-visible="false"></tab-page>
                <tab-page id="tab-5" collection-date="Fredag 5. Mai" data-percent="1" waste-category="Farleg avfall og småelektronikk" data-visible="false"></tab-page>

            </div>
            <tab-container data-tab-names="Plast;Rest;Mat;Papp;Farleg" data-tab-targets="tab-1;tab-2;tab-3;tab-4;tab-5"></tab-container>

        </div>
    </div>
</section>

<!-- JS Event listener for this page only -->
<script type="module" src="src/js/event/page/main.js"></script>