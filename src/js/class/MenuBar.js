export class MenuBar extends HTMLElement {

    constructor(){
        super();
        this.populate();
    }

    static icons(){
        return {
            home: 'src/media/img/icon/outline-home-24px.svg',
            shop: 'src/media/img/icon/outline-shopping_cart-24px.svg',
            settings: 'src/media/img/icon/outline-settings-24px.svg',
        }
    }

    static links(){
        return {
            home: '',
            shop: '',
            settings: '',
        }
    }

    static naming(){
        return {
            id: {
                home: 'menu-home',
                shop: 'menu-shop',
                settings: 'menu-settings',
            },
            class: 'menu-btn',
        }
    }

    populate(){

        let home = document.createElement('div');
        let shop = document.createElement('div');
        let settings = document.createElement('div');

        let img_home = document.createElement('img');
        let img_shop = document.createElement('img');
        let img_settings = document.createElement('img');

        img_home.src = MenuBar.icons().home;
        img_shop.src = MenuBar.icons().shop;
        img_settings.src = MenuBar.icons().settings;

        home.setAttribute('id', MenuBar.naming().id.home);
        shop.setAttribute('id', MenuBar.naming().id.shop);
        settings.setAttribute('id', MenuBar.naming().id.settings);

        home.setAttribute('class', MenuBar.naming().class);
        shop.setAttribute('class', MenuBar.naming().class);
        settings.setAttribute('class', MenuBar.naming().class);

        home.addEventListener('click', this.onClick);
        shop.addEventListener('click', this.onClick);
        settings.addEventListener('click', this.onClick);

        home.appendChild(img_home);
        shop.appendChild(img_shop);
        settings.appendChild(img_settings);

        this.append(home,shop,settings);

    }

    onClick(){

        let id = this.getAttribute('id');

        switch (id) {

            case MenuBar.naming().home:
                break;
            case MenuBar.naming().shop:
                break;
            case MenuBar.naming().settings:
                break;

        }

    }

}