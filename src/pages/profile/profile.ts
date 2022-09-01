import * as Handlebars from 'handlebars';
import profileTemplate from './profile.tmpl';
import { overviewProfile } from './overviewProfile';
import { editProfile } from './editProfile';
import { routes } from '../../utils';
import './profile.scss';
import { Btn } from '../../components/btn'
import arrowIcon from '../../assets/icons/arrow-back.svg';

export function profile(route: string) {
    const template = Handlebars.compile(profileTemplate);
    const content = route === routes.overviewProfile ? overviewProfile : editProfile(route);

    const btn = new Btn({
        btnText: 'Поменять',
    });

    const context = {
        header: 'Иван',
        button: btn.transformToString(),
        isViewMode: route === routes.overviewProfile,
        arrowIcon,
        content,
    };

    return template(context);
}
