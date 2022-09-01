import * as Handlebars from 'handlebars';
import overviewProfileTemplate from './overviewProfile.tmpl';
import './profile.scss';

export function overviewProfile() {
    const template = Handlebars.compile(overviewProfileTemplate);
    // const content = route === routes.overviewProfile ? overviewProfile : editProfile(route);


    const context = {
    }

    return template(context);
}
