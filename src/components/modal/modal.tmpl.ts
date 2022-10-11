export default
`<div class="modal hidden" data-id="{{dataId}}">
    <h3 class="modal__title">{{titleText}}</h3>
    <div class="modal-input__wrapper">
     {{#if this.form}}
        {{{form}}}
        {{else}}
        {{{input}}}
     {{/if}}
    </div>
    {{#if btnText}}
        {{{btn}}}
    {{/if}}
    {{{backLink}}}
    {{#if this.errorMessage}}
       <div class="modal__error-message hidden">{{errorMessage}}</div>
    {{/if}}
</div>`
