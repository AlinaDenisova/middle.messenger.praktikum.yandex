export default
`<div class="chat-item" id="{{id}}">
    <div class="chat-item__avatar">
        <img src="{{avatar}}" alt="Фото собеседника."/>
    </div>
    <div class="chat-item__text">
        <p class="chat-item__name">{{title}}</p>
        <p class="chat-item__message">{{last_message}}</p>
    </div>
    <time class="chat-item__time">{{time}}</time>
    {{#if unread_count}}
      <p class="conversation-card__counter">
        {{unread_count}}
      </p>
    {{/if}}
</div>`