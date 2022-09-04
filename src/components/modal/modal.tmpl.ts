export default
`<div class="modal" id="{{id}}">
    <h3 class="modal__title">{{titleText}}</h3>
    <div class="modal-input__wrapper">
        <label class="modal-input__label {{labelClassName}}" for="{{inputId}}">{{labelText}}</label>
        <input class="modal-input {{inputClassName}}" id="{{inputId}}" type="{{inputType}}" required="{{required}}">
        <div class="modal-input__error">{{modalError}}</div>
    </div>
    {{#if buttonText}}
    <div class="modal__actions">
        <button class="modal__btn">{{buttonText}}</button>
        <a class="modal__link" href="{{linkHref}}">{{linkText}}</a>
    </div>
    {{/if}}
</div>`
