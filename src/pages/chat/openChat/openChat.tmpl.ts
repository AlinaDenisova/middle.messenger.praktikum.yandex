export default
`<div class="chat-open">
   <div class="chat-open-interlocutor">
       <div class="chat-open-interlocutor__avatar">
            {{#if this.userAvatar}}
                <img src={{userAvatar}} alt="Фото собеседника" />
            {{/if}}
        </div>
        <div class="chat-open-interlocutor__name">{{userName}}</div>
        <div class="chat-open-actions">
            {{{popoverHandler1}}}
            {{{popover1}}}
        </div>
    </div>
    <div class="chat-open__container">
        <time class="chat-open__date">{{date}}</time>
        {{#each messages}}
            {{{this}}}
        {{/each}}

        <div class="chat-open-send">
            {{{popoverHandler2}}}
            {{{popover2}}}
            {{{messageInput}}}
            <button class="chat-open-send__btn">
                <img class="chat-open-send__btn-img" src="{{arrowIcon}}" alt="Отправить сообщение"/>
            </button>
        </div>
    </div>
    {{#each modals}}
       {{{this}}}
    {{/each}}
    <div class="overlay"></div>
    <div class="overlay-popover"></div>
</div>
`