export default
`<button class="{{btnClassName}}" id="{{id}}">
  {{#if icon}}
    <div class="{{linkIconWrapperClassName}}">
      <img
        class="{{linkIconClassName}}"
        src="{{icon}}"
        alt="{{linkAltText}}"
      />
    </div>
    {{#if linkText}}
      <p class="link__text">{{{linkText}}}</p>
    {{/if}}
  {{else}}
    {{{linkText}}}
  {{/if}}
</button>`;
