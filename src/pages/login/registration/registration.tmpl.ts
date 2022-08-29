export default
`<form>
    {{#each inputs}}
        {{{this}}}
    {{/each}}

    <div class="login__btns">
        {{{ btn }}}
        {{{ link }}}
    </div>
  </form>
`;
