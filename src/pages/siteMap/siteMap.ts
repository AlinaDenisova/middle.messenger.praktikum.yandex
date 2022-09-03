import * as Handlebars from "handlebars";
import siteMapTemplate from "./siteMap.tmpl";


export function siteMap(siteMap: any) {
    const template = Handlebars.compile(siteMapTemplate);

    const context = {
    };

    return template(context);
}
