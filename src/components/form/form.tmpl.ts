export default
`<form class="form" id="{{id}}">

    {{#if this.inputs}}
    {{#each inputs}}
        {{{this}}}
    {{/each}}
    {{/if}}
    
   
    {{#if this.input}}
    {{{input}}}
    {{/if}}
    
    {{{btn}}}
</form>`;
