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
            <div class="popover popover--top-right">
                <ul class="popover__list">
                    <li class="popover__item">
                        <a class="popover__link" href="#">
                            <img class="popover__link-img" src="../assets/icons/add-user.svg" alt="Добавить пользователя"/>
                            <p class="popover__link-text">Добавить пользователя</p>
                        </a>
                    </li>
                    <li class="popover__item">
                        <a class="popover__link" href="#">
                            <img class="popover__link-img" src="../assets/icons/delete-user.svg" alt="Удалить пользователя"/>
                            <p class="popover__link-text">Удалить пользователя</p>
                        </a>
                    </li>
                </ul>
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
                <img class="chat-open-send__attachment-img" src="../assets/icons/add.svg" alt="Прикрепить вложение"
                />
            </button>
            <div class="popover popover--bottom-left">
                <ul class="popover__list">
                    <li class="popover__item">
                        <a class="popover__link" href="#">
                            <img class="popover__link-img" src="../assets/icons/add-photo.svg" alt="Прикрепить фото или видео"/>
                            <p class="popover__link-text">Фото или Видео</p>
                        </a>
                    </li>
                    <li class="popover__item">
                        <a class="popover__link" href="#">
                            <img class="popover__link-img" src="../assets/icons/add-file.svg" alt="Прикрепить файл"/>
                            <p class="popover__link-text">Файл</p>
                        </a>
                    </li>
                    <li class="popover__item">
                        <a class="popover__link" href="#">
                            <img class="popover__link-img" src="../assets/icons/add-location.svg" alt="Прикрепить локацию"/>
                            <p class="popover__link-text">Локация</p>
                        </a>
                    </li>
                </ul>
            </div>
            <input class="chat-open-send__field" id="chat-open" placeholder="Сообщение">
            <button class="chat-open-send__btn">
                <img class="chat-open-send__btn-img" src="../assets/icons/arrow-back.svg" alt="Отправить сообщение"/>
            </button>
        </div>
    </div>
</section>
`