export default
`<div class="profile">
    <div class="profile-sidebar">
          <a class="profile-sidebar__link" href="./openChat">
            <div class="profile-sidebar__img-wrapper">
              <img
                class="profile-sidebar__img"
                src="{{arrowIcon}}"
                alt="Вернуться к чатам"
              />
            </div>
          </a>
        </div>
        <div class="profile-info">
            {{{content}}}
        </div>
    </div>
</div>`;