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
</div>`
