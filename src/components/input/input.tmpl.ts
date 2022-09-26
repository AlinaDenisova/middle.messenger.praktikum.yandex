export default
`<div class="{{wrapperClassName}}">
    {{#if label}}
    <label class="input__label {{labelClassName}}" for="{{name}}">{{label}}</label>
    {{/if}}
    <input
    class="{{inputClassName}}"
    type="{{type}}"
    name="{{name}}"
    value="{{value}}"
    id="{{id}}"
    data-type='{{dataType}}'
    {{#if placeholder }}placeholder = "{{placeholder}}"{{/if}}
    required={{required}}>
    <div class="input__error hidden">{{errorMessage}}</div>
</div>`