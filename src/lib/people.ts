import { People} from "./generated/people";

const Author = {
    "@type": "Person",
    "name": "Adrian Donnelly",
    "url": "https://adriandonnelly.me/",
    "sameAs": People.AdrianDonnelly.links
};

const Publisher = {
    "@type": "Organization",
    "name": "Adrian Donnelly",
    "url": "https://adriandonnelly.me/",
    "logo": {
        "@type": "ImageObject",
        "url": "https://adriandonnelly.me/favicon.png",
        "width": 60,
        "height": 60
    }
};

export {
    People,
    Publisher,
    Author
}