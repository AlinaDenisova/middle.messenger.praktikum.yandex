export default
`<div class="input__wrapper">
    <label class="input__label" for='{{name}}'>{{label}}</label>
    <input
    class="input__field"
    type='{{type}}'
    name='{{name}}'
    value='{{value}}'
    id='{{id}}'
    required={{required}}/>
    <div class="input__error">{{errorMessage}}</div>
</div>`