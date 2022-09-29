export default
`<div class="chat">
    <section class="chat-sidebar">
        <div class="chat-sidebar__top">
            {{{ profileLink }}}
            {{{ searchInput }}}
        </div>
        {{{newChat}}}
        {{{newChatModal}}}
        <div class="overlay hidden"></div>
        <div class="chat__list">
            {{#each chatItems}}
                {{{this}}}
            {{/each}}
        </div>
    </section>
    {{{chatView}}}
</div>`;