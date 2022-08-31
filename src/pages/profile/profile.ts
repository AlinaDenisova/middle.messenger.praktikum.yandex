import * as Handlebars from 'handlebars';
import profileTemplate from './profile.tmpl';
import { routes } from '../../utils';
import './chat.scss';

export function profile(route: string) {
    const template = Handlebars.compile(profileTemplate);
    const content = route === routes.overviewProfile ? overviewProfile : editProfile(route);


    const context = {

    }

    return template(context);
}
