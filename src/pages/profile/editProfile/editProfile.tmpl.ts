export default
`<div class="profile-edit">
    <div class="profile-edit__avatar">
        <div class="profile-edit__avatar-overlay">
        <div class="profile-edit__avatar-overlay-label"}>Поменять аватар</div>
    </div>
    
    {{{ profileAvatar }}}
    </div>
    
    {{{ modal }}}
    
  <h2 class="profile-edit__name">{{userName}}</h2>
    
  <form class="profile-edit__form" id="{{id}}">
    {{#each inputs}}
      {{{this}}}
    {{/each}}
  </form>
  {{{ button }}}
</div>
`;