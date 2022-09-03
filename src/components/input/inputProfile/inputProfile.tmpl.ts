export default
`<div class="{{wrapperClassName}}">
  <label for="{{name}}" class="input-profile__label">
    {{label}}
  </label>
  <input
    class="{{inputClassName}}"
    type="{{type}}"
    name="{{name}}"
    value="{{value}}"
    required={{required}}
    id="{{id}}"
    {{#if disabledInput }}disabled{{/if}}
  />
  <div class="input-profile__error hidden">
    {{errorMessage}}
  </div>
</div>`;
