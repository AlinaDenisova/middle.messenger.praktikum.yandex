export default
`<button class='{{btnClassName}}' id='{{id}}'>
  {{#if icon}}
    <div class='link__content'>
      <img
        class='link__icon'
        src='{{icon}}'
        alt='{{linkText}}.'
      />
      <p class='link__text'>{{{linkText}}}</p>
    </div>
  {{else}}
    {{{linkText}}}
  {{/if}}
</button>`;
