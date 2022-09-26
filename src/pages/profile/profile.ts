import * as Handlebars from "handlebars";
import profileTemplate from "./profile.tmpl";
import { OverviewProfile } from "./overviewProfile";
import { EditProfile } from "./editProfile";
import { routes } from "../../utils";
import router from '../../router';
import "./profile.scss";
import { Block } from "../../utils"
import { Btn } from "../../components/btn"
import arrowIcon from "../../assets/icons/arrow-back.svg";
import uploadPhoto from "../../assets/icons/upload-photo.svg";
import { EditProfilePassword } from "./editProfilePassword";
import { UserController, LoginController } from '../../controllers';

const loginController = new LoginController();

export type TProfilePage = {
    profileType?: string;
    content?: string;
};

export const getName = () => {
    const item = localStorage.getItem('user');
    let user;
    if (item) {
        user = JSON.parse(item);
    }

    return user?.display_name || user?.first_name || '';
};

export const getAvatar = () => {
    const avatar = localStorage.getItem('avatarIcon');
    console.log(localStorage)

    return avatar || uploadPhoto;
};

const getTemplate = (profileType?: string) => {
    const template = Handlebars.compile(profileTemplate);

    const returnButton = new Btn (
        {
            btnType: 'button',
            isLink: true,
            btnClassName: 'profile-sidebar__link',
            linkIconClassName: 'profile-sidebar__img',
            linkIconWrapperClassName: 'profile-sidebar__img-wrapper',
            linkAltText: 'Вернуться назад',
            icon: arrowIcon,
        },
        {
            click: async () => {
                router.back();
            },
        }
    );

    const content = profileType === 'overviewProfile' ? new OverviewProfile().transformToString() :
        profileType === 'editProfile' ? new EditProfile().transformToString() :
        new EditProfilePassword().transformToString()

    const context = {
        returnButton: returnButton.transformToString(),
        content,
    };

    return template(context);
};


export class Profile extends Block {
    constructor(context: TProfilePage, events = {}) {
        super('div', {
            context: {
                ...context,
            },
            template: getTemplate(context.profileType),
            events,
        });
    }
    componentDidMount() {
        loginController.getUser();
    }
}
