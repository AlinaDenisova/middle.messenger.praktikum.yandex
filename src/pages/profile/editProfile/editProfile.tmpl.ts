export default
`<div class="profile-edit">
  <div class="profile-edit__form">
    {{#each inputs}}
      {{{this}}}
    {{/each}}
  </div>
  {{{ button }}}
</div>
`;