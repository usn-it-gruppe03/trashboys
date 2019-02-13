export class TabPage extends HTMLElement {

    constructor(){
        super();
        this.dataCheck();
        this.populate();
    }


    static elementText(){
        return {
            header: 'Neste tømmedag',
            category: 'Avfallskategori:',
        };
    }


    static attr(){
        return {
            date: 'collection-date',
            progress: 'data-percent',
            category: 'waste-category',
        };
    }


    static fallback(){
        return {
            date: 'Fredag 13. Oktober',
            progress: 0.6,
            category: 'Partert lik',
        };
    }


    dataCheck(){

        if (this.attrDefined(TabPage.attr().date))
            this.date = this.getAttribute(TabPage.attr().date);
        else this.date = TabPage.fallback().date;

        if (this.attrDefined(TabPage.attr().progress).toString())
            this.progress = this.getAttribute(TabPage.attr().progress);
        else this.progress = TabPage.fallback().progress;

        if (this.attrDefined(TabPage.attr().category))
            this.category = this.getAttribute(TabPage.attr().category);
        else this.category = TabPage.fallback().category;
    }


    populate(){

        let head = document.createElement('h2');
        head.innerText = TabPage.elementText().header;
        head.setAttribute('id', 'tab-title');

        let date = document.createElement('p');
        date.innerText = this.date;
        date.setAttribute('id', 'tab-date');

        let progress = document.createElement('progress-bar');
        progress.setAttribute('data-percent', this.progress);

        let category = document.createElement('p');
        category.innerText = TabPage.elementText().category + ' ' + this.category;
        category.setAttribute('id', 'tab-category');

        this.append(head, date, progress, category);

    }


    attrDefined(attr){
        if (this.hasAttribute(attr))
            return this.getAttribute(attr).length > 0;
        else return false;
    }

}