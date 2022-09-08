import { nanoid } from "nanoid";
import inputTemplate from "./input.tmpl";
import inputProfileTemplate from "./inputProfile/inputProfile.tmpl";
import { isClassDefined, classIfElse } from "../../utils";
import { Block } from "../../utils/block";
import "./input.scss";
import "./inputProfile/inputProfile.scss";

export type TInput = {
    type: string;
    errorMessage?: string;
    label?: string;
    name: string;
    required?: boolean;
    value?: string | number;
    disabled?: boolean;
    placeholder?: string;
    isProfileInput?: boolean;
    wrapperClassName?: string;
    inputClassName?: string;
};

export class Input extends Block {
    constructor(context: TInput, events: object = {}) {
        super("div", {
            context: {
                ...context,
                disabledInput: context.disabled,
                wrapperClassName: `${classIfElse(
                    context.isProfileInput,
                    "input-profile__wrapper",
                    "input__wrapper"
                )}
          ${isClassDefined(context.wrapperClassName)}`,
                inputClassName: `${classIfElse(
                    context.isProfileInput,
                    "input-profile__input",
                    "input"
                )} ${isClassDefined(context.inputClassName)}`,
                id: nanoid(6),
            },
                template: context.isProfileInput ? inputProfileTemplate : inputTemplate,
                events,
        });
    }
}
