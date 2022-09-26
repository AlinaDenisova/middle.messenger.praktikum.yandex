export default
`<div class="modal hidden" data-id="{{dataId}}">
    <h3 class="modal__title">{{titleText}}</h3>
    <div class="modal-input__wrapper">
     {{#if this.form}}
        {{{form}}}
        {{else}}
        {{{input}}}
     {{/if}}
     
       
        
<!--        <label class="modal-input__label {{labelClassName}}" for="{{inputId}}">{{labelText}}</label>-->
<!--        <input class="modal-input {{inputClassName}}" id="{{inputId}}" type="{{inputType}}" required="{{required}}">-->
<!--        <div class="modal-input__error">{{modalError}}</div>-->
    </div>
    {{#if btnText}}
<!--        <button class="modal__btn">{{buttonText}}</button>-->

        {{{btn}}}
    {{/if}}
<!--    <a class="modal__link" href="{{linkHref}}">{{linkText}}</a>-->

{{{backLink}}}
</div>`
