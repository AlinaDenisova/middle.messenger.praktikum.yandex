export default
`<div class="chat-item" id="{{id}}">
    <div class="chat-item__avatar">
        <img src="{{avatar}}" alt="Фото собеседника."/>
    </div>
    <div class="chat-item__text">
        <p class="chat-item__name">{{title}}</p>
        <p class="chat-item__message">{{lastMessage}}</p>
    </div>
    <time class="chat-item__time">{{time}}</time>
    {{#if unreadCount}}
      <p class="conversation-card__counter">
        {{unreadCount}}
      </p>
    {{/if}}
</div>`
