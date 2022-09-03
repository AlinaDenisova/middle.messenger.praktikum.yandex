export default
`<div class="chat">
    <section class="chat-sidebar">
        <div class="chat-sidebar__top">
        <a class="chat-sidebar__link" href="./profile-overview.hbs">Профиль ></a>
            {{{ searchInput }}}
        </div>
        <div class="chat__list">
            {{#each chatItems}}
                {{{this}}}
            {{/each}}
        </div>
    </section>
    {{{chatView}}}
</div>`;