export const showPopover = (data: {
    event?: Event | null;
    el?: HTMLElement;
}) => {
    console.log(data.event?.target)
    const el = (data.event?.target as HTMLElement) || data.el;

    const parentDiv = el.parentNode || el.parentElement;
    const parent = parentDiv.parentNode || el.parentElement;
    const popover = parent.querySelector(".popover");
    popover.classList.add("show");
    const overlay = document.querySelector('.overlay-popover');
    overlay.classList.add("show");

    overlay.addEventListener('click', function() {
        popover.classList.remove("show");
        overlay.classList.remove("show");
    });
}