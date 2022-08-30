export default
`<div class="message-item {{#if this.myMessage}}message-item--my-message{{/if}}">
    {{#if this.image}}
        <img class="message-item__image"
             src={{image}}
             alt="Изображение, приложенное к сообщению"
             class="message-item__image"/>
    {{/if}}
    {{#if this.text}}
    <p class="message-item__text">{{text}}</p>
    {{/if}}
    <time class="message-item__time">
        {{#if this.read}}
            <img src="@/assets/icons/read.svg" alt="Сообщение прочитано"/>
        {{/if}}
        {{time}}
    </time>
</div>`
