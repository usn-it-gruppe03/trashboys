export class ProgressBar extends HTMLElement {

    constructor(){
        super();
        this.check();
        this.populate();
    }

    static attr(){
        return {
            percent: 'data-percent',
        };
    }

    check(){
        if (this.attrDefined(ProgressBar.attr().percent))
            this.percent = this.getAttribute(ProgressBar.attr().percent);
        else
            this.precent = 0;
    }

    populate(){
        let bar = document.createElement('div');
        bar.style.width = (this.percent * 100) + '%';
        this.append(bar);
    }

    attrDefined(attr){
        if (this.hasAttribute(attr))
            return this.getAttribute(attr).length > 0;
        else return false;
    }

}