export default
`<div class="{{wrapperClassName}}">
    <label class="input__label" for="{{name}}">{{label}}</label>
    <input
    placeholder="{{placeholder}}"
    class="{{inputClassName}}"
    type="{{type}}"
    name="{{name}}"
    value="{{value}}"
    id="{{id}}"
    required={{required}}>
    <div class="input__error hidden">{{errorMessage}}</div>
</div>`