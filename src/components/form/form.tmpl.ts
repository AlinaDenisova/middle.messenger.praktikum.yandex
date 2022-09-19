export default
`<form class='form' id='{{id}}' novalidate>
    {{#each inputs}}
        {{{this}}}
    {{/each}}
    
    {{{btn}}}
</form>`;
