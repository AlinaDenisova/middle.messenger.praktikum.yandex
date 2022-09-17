export const openModal = (data: {
        event?: Event | null;
        el?: HTMLElement;
    }) => {
        const el = (data.event?.target as HTMLElement) || data.el;

        const modalID = el.dataset.modal;
        const modal = document.getElementById( modalID );
        const overlay = document.querySelector('.overlay');
        overlay.classList.add("show");
        document.body.classList.add( 'no-scroll' );
        modal.classList.add( 'show' );
        const popover = document.querySelector(".popover");
        if (popover.classList.contains("show")) {
            popover.classList.remove("show");
        }

        const btn = modal.querySelector(".modal__link")
        btn.addEventListener( 'click', function() {
            if (modal.classList.contains('show')) {
                modal.classList.remove('show');
                document.querySelector('.overlay').classList.remove('show')
                document.body.classList.remove( 'no-scroll' );
            }
    });
}
