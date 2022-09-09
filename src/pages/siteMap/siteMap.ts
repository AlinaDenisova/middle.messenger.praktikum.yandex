import * as Handlebars from "handlebars";
import siteMapTemplate from "./siteMap.tmpl";


export function siteMap() {
    const template = Handlebars.compile(siteMapTemplate);

    const context = {
    };

    return template(context);
}
