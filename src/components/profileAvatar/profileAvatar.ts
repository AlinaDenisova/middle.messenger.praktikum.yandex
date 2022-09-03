import profileAvatarTemplate from "./profileAvatar.tmpl";
import { Block } from "../../utils/block";
import "./profile-avatar.scss";

export type TAvatar = {
    uploadAvatarImage: string
};

export class ProfileAvatar extends Block {
    constructor(context: TAvatar, events = {}) {
        super("div", {
            context: {
                ...context,
            },
            template: profileAvatarTemplate,
            events,
        });
    }
}