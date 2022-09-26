export default
`<button class="{{btnClassName}}" id="{{id}}">
  {{#if icon}}
    <div class="{{linkIconWrapperClassName}}">
      <img
        class='{{linkIconClassName}}'
        src="{{icon}}"
        alt="{{linkAltText}}"
      />
      <p class="link__text">{{{linkText}}}></p>
    </div>
  {{else}}
    {{{linkText}}}
  {{/if}}
</button>`;
