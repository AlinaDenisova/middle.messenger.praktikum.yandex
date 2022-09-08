import uploadAvatarTemplate from "./uploadAvatar.tmpl";
import {Block, Dictionary} from "../../utils/block";
import "./profile-upload.scss";

export type TUploadAvatar = {
    profileAvatar: Dictionary;
    id: string,
    dataModal: string;
};

export class UploadAvatar extends Block {
    constructor(context: { dataModal: string; profileAvatar: string; id: string }, events = {}) {
        super("div", {
            context: {
                ...context,
            },
            template: uploadAvatarTemplate,
            events,
        });
    }
}