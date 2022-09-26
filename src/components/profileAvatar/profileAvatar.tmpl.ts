export default
`<div>
    {{#if this.isClickableAvatar}}
        <div class="profile-avatar-upload">
             <div class="profile-avatar-upload__overlay" id="{{id}}" data-modal="{{dataModal}}">
                Поменять аватар
            </div>
            
            <div class="profile-avatar">
                   <div class="profile-avatar__photo-wrapper" id='avatar'>
                        <img class="profile-avatar__photo" src="{{uploadAvatarImage}}" />
                   </div>
            </div>
        </div>
    {{else}}
    <div class="profile-avatar">
           <div class="profile-avatar__photo-wrapper">
                <img src="{{uploadAvatarImage}}" />
           </div>
    </div>
    {{/if}}
</div>



`