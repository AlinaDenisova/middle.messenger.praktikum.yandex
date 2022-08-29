import * as Handlebars from 'handlebars';
import errorPageTemplate from './error.tmpl';
import './error.scss';

export function errorPage(scheme: {
    errorCode: string;
    errorText: string;
    linkText: string;
}) {
    const template = Handlebars.compile(errorPageTemplate);
    const context = {
        errorCode: scheme.errorCode,
        errorText: scheme.errorText,
        linkText: scheme.linkText,
    };

    return template(context);
}