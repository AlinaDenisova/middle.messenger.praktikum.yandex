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
        <a class="profile-overview__actions-link" href="/editProfile">
            <span>{{changeData}}</span>
        </a>
        <a class="profile-overview__actions-link" href="/editProfilePassword">
          <span>
            {{changePassword}}
          </span>
        </a>
        <a class="profile-overview__actions-link profile-overview__actions-link--highlight" href="/login">
          <span>
            {{back}}
          </span>
        </a>
    </div>
</div>`;