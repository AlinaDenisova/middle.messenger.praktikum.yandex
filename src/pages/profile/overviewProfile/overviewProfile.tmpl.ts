export default
`<div class="profile-overview">
    {{{profileAvatar}}}
    <h2 class="profile-overview__name">{{userName}}</h2>
    <div class="profile-overview__form" id="{{id}}">
      {{#each inputs}}
        {{{this}}}
      {{/each}}
    </div>
    <div class="profile-overview__actions">        
            {{{changeData}}}
            {{{changePassword}}}
            {{{signOutBtn}}}
    </div>
</div>`;
