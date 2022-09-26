import uploadAvatarTemplate from "./uploadAvatar.tmpl";
import {Block, Dictionary} from "../../utils";
import "./profile-upload.scss";

export type TUploadAvatar = {
    profileAvatar: Dictionary;
    dataModal: string;
};

export class UploadAvatar extends Block {
    constructor(context: { dataModal: string; profileAvatar: string; id: string }, events?: { click: (event: Event) => void }) {
        super("div", {
            context: {
                ...context,
            },
            template: uploadAvatarTemplate,
            events,
        });
    }
}