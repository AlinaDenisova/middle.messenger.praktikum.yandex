export default
`<div class="chat-open">
   <div class="chat-open-interlocutor">
       <div class="chat-open-interlocutor__avatar">
            <img  src="{{avatarIcon}}" alt="Фото собеседника" />
        </div>
        <div class="chat-open-interlocutor__name">{{chatTitle}}</div>
        <div class="chat-open__user-list">
          <span>
           Пользователи в чате:
          </span>
          {{#each users}}
            <span class="chat-open__user-item">
              {{{this}}},
            </span>
          {{/each}}
        </div>
        <div class="chat-open-actions">
        {{{userActionsPopoverTrigger}}}
        
        <div class="chat-open__popover chat-open__popover--top-right hidden" data-id="user-actions-popover">
            {{{newUser}}}
            {{{removeUser}}}
        </div>
            {{{addUserModal}}}
            {{{removeUserModal}}}
        </div>
    </div>
    <div class="chat-open__container">
        <div class="chat-open__messages-container"></div>
    </div>
        <div class="chat-open-send">
            {{{ message }}}
            {{{ sendButton }}}
        </div>
    </div>
    <div class="overlay"></div>
    <div class="overlay-popover"></div>
</div>
`