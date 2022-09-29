import * as Handlebars from "handlebars";
import { Btn } from "../../components/btn";
import { Block } from "../../utils";
import router from "../../router";

import errorPageTemplate from "./error.tmpl";
import "./error.scss";

export type TScheme = {
    errorCode: string;
    errorText: string;
    linkText: string;
};

export type TErrorPage = {
    scheme?: TScheme;
};

const getTemplate = (scheme?: TScheme) => {
    const template = Handlebars.compile(errorPageTemplate);

    const link = new Btn (
        {
            isLink: true,
            linkText: "Назад к чатам",
            btnClassName: "error__link",
            btnType: "button",
        },
        {
            click: async () => {
                router.go("/");
            },
        }
    );

    const context = {
        errorCode: scheme?.errorCode,
        errorText: scheme?.errorText,
        link: link.transformToString(),
    };

    return template(context);
};

export class ErrorPage extends Block {
    constructor(context: TErrorPage, events: Record<string, () => void>) {
        super("div", {
            context: {
                ...context,
            },
            template: getTemplate(context.scheme),
            events,
        });
    }
}
