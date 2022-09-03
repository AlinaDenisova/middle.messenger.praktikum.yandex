export default
`<div class="profile-password">
    {{{profileAvatar}}}
      <form class="profile-password__form" id="{{id}}">
        {{#each inputs}}
          {{{this}}}
        {{/each}}
      </div>
      {{{ button }}}
    </div>
</div>
`;