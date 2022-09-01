import * as Handlebars from 'handlebars';
import editProfileTemplate from './editProfile.tmpl';
import './profile.scss';

export function editProfile() {
    const template = Handlebars.compile(editProfileTemplate);


    const context = {

    }

    return template(context);
}
