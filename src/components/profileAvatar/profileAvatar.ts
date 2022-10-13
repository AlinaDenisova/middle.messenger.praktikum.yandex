import profileAvatarTemplate from "./profileAvatar.tmpl";
import { Block } from "../../utils/block";
import "./profile-avatar.scss";

export type TAvatar = {
    uploadAvatarImage: string,
    isClickableAvatar: boolean,
};

export class ProfileAvatar extends Block {
    constructor(context: TAvatar, events?: { click: (event: Event) => void }) {
        super("div", {
            context: {
                ...context,
            },
            template: profileAvatarTemplate,
            events,
        });
    }
}
