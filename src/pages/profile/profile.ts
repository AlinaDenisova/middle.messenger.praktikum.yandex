import * as Handlebars from "handlebars";
import profileTemplate from "./profile.tmpl";
import { overviewProfile } from "./overviewProfile";
import { editProfile } from "./editProfile";
import { routes } from "../../utils";
import "./profile.scss";
import arrowIcon from "../../assets/icons/arrow-back.svg";
import {editProfilePassword} from "./editProfilePassword";

export function profile(route: string) {
    const template = Handlebars.compile(profileTemplate);
    const content = route === routes.overviewProfile ? overviewProfile :
        route === routes.editProfilePassword ? editProfilePassword : editProfile;

    const context = {
        arrowIcon,
        content,
    };

    return template(context);
}
