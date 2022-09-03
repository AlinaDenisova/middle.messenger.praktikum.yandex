export default
`<div class="profile-edit">
    <div class="profile-edit__avatar-overlay">
        <div class="profile-edit__avatar-overlay-label" for={{this.inputAvatarId}}>Поменять аватар</div>
        <input
                id={{inputAvatarId}}
                class="profile-avatar__overlay-input"
                type="file"/>
    </div>
    
    
    <div class="modal">
        <h3 class="modal__title">Загрузите файл</h3>
        <label class="modal__upload-label" for="upload-photo">Выбрать файл на устройстве</label>
        <input class="modal__upload-input" type="file" id="upload-photo"/>
        <div class="modal__upload-error">Ошибка, попробуйте еще раз</div>
    </div>
    
    {{{ profileAvatar }}}
    
  <form class="profile-edit__form" id="{{id}}">
    {{#each inputs}}
      {{{this}}}
    {{/each}}
  </div>
  {{{ button }}}
</div>
`;