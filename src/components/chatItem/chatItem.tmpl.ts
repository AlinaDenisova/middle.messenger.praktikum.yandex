export default
`<a class="chat-item">
    <div class="chat-item__avatar">
        {{#if this.avatar}}
            <img src={{avatar}} alt="Фото собеседника."/>
        {{/if}}
    </div>
    <div class="chat-item__text">
        <p class="chat-item__name">{{name}}</p>
        <p class="chat-item__message">{{message}}</p>
    </div>
    <time class="chat-item__time">{{time}}</time>
</a>`