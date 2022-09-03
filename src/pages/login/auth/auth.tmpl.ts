export default
`<form id="{{id}}">
    {{#each inputs}}
        {{{this}}}
    {{/each}}

    <div class="login__btns">
        {{{ btn }}}
        {{{ link }}}
    </div>
  </form>
`;
