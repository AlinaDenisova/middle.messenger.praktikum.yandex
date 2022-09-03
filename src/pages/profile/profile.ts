import * as Handlebars from "handlebars";
import profileTemplate from "./profile.tmpl";
import { overviewProfile } from "./overviewProfile";
import { editProfile } from "./editProfile";
import { routes } from "../../utils";
import "./profile.scss";
import arrowIcon from "../../assets/icons/arrow-back.svg";

export function profile(route: string) {
    const template = Handlebars.compile(profileTemplate);
    const content = route === routes.overviewProfile ? overviewProfile : editProfile(route);


    const context = {
        isViewMode: route === routes.overviewProfile,
        arrowIcon,
        content,
    };

    return template(context);
}
