export default
`<div class="profile-overview">
    <h2 class="profile-overview__name">{{userName}}</h2>
    <div class="profile-overview__form">
      {{#each inputs}}
        {{{this}}}
      {{/each}}
    </div>
    <div class="profile-overview__actions">
        <a class="profile-actions__link" href="/editProfile">
            <span>{{changeData}}</span>
        </a>
        <a class="profile-actions__link" href="/editProfilePassword">
          <span>
            {{changePassword}}
          </span>
        </a>
        <a class="profile-actions__link profile-actions__link--highlight" href="/login">
          <span>
            {{back}}
          </span>
        </a>
    </div>
</div>`;