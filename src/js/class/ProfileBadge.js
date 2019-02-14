export class ProfileBadge extends HTMLElement {

    constructor() {

        super();
        this.dataCheck();
        this.populate();

    }

    // Element attribute naming.
    static attr(){
        return {image:'badge-image', name:'badge-name', address:'badge-address'};
    }

    // Default data.
    static fallback(){
        return {name:'Ola Nordmann', address:'Stasjonsvegen 21 B'};
    }


    dataCheck(){

        const attrImage = ProfileBadge.attr().image;
        const attrName = ProfileBadge.attr().name;
        const attrAddress = ProfileBadge.attr().address;

        const fallbackName = ProfileBadge.fallback().name;
        const fallbackAddress = ProfileBadge.fallback().address;

        // ? If image is defines.
        if (this.attrDefined(attrImage))
            this.image = this.getAttribute(attrImage);

        // ? If name is defined.
        if (this.attrDefined(attrName))
            this.name = this.getAttribute(attrName);
        else
            this.name = fallbackName;

        // ? If address is defined.
        if (this.attrDefined(attrAddress))
            this.address = this.getAttribute(attrAddress);
        else
            this.address = fallbackAddress;

    };


    populate(){

        // ** Create image node **

        let badgeImage = document.createElement('div');
        badgeImage.setAttribute('id', 'badge-image');

        let img = '';

        if (this.attrDefined(ProfileBadge.attr().image)){
            img += 'background-image: url("' + this.image + '");';
        }

        badgeImage.setAttribute('style', img);


        // ** Create name node **
        let badgeName = document.createElement('h1');
        badgeName.setAttribute('id', 'badge-name');
        badgeName.innerText = this.name;


        // ** Create address node **
        let badgeAddress = document.createElement('h2');
        badgeAddress.setAttribute('id', 'badge-address');
        badgeAddress.innerText = this.address;


        // ** Append nodes to this node **
        this.append(badgeImage, badgeName, badgeAddress);

    }


    attrDefined(attrName){
        if (this.hasAttribute(attrName)){
            return this.getAttribute(attrName).length > 0;
        } else
            return false;
    }



}