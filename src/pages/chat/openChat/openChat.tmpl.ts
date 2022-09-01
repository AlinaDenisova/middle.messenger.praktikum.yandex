export default
`<div class="chat-open">
   <div class="chat-open-interlocutor">
       <div class="chat-open-interlocutor__avatar">
            {{#if this.userAvatar}}
                <img src={{userAvatar}} alt="Фото собеседника" />
            {{/if}}
        </div>
        <div class="chat-open-interlocutor__name">{{userName}}</div>
        <div class="chat-open-actions popover-container">
            <button class="chat-open-actions__btn popover-btn">
                <span class="chat-open-actions__dot"></span>
            </button>
            <div class="popover {{popoverClassName}}">
                {{#each popoverItems1}}
                    {{{this}}}
                {{/each}}
            </div>
        </div>
    </div>
    <div class="chat-open__container">
        <time class="chat-open__date">{{date}}</time>
        {{#each messages}}
            {{{this}}}
        {{/each}}

        <div class="chat-open-send popover-container">
            <button class="chat-open-send__attachment popover-btn">
                <img class="chat-open-send__attachment-img" src="{{addIcon}}" alt="Прикрепить вложение"
                />
            </button>
            <div class="popover {{popoverClassName}}">
                {{#each popoverItems2}}
                    {{{this}}}
                {{/each}}
            </div>
            <input class="chat-open-send__field" id="chat-open" placeholder="Сообщение">
            <button class="chat-open-send__btn">
                <img class="chat-open-send__btn-img" src="{{arrowIcon}}" alt="Отправить сообщение"/>
            </button>
        </div>
    </div>
</section>
`