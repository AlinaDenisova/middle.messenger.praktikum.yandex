export default
`<div class="{{wrapperClassName}}">
    {{#if label}}
    <label class="input__label" for="{{name}}">{{label}}</label>
    {{/if}}
    <input
    class="{{inputClassName}}"
    type="{{type}}"
    name="{{name}}"
    value="{{value}}"
    id="{{id}}"
    {{#if placeholder }}placeholder = "{{placeholder}}"{{/if}}
    required={{required}}>
    <div class="input__error hidden">{{errorMessage}}</div>
</div>`