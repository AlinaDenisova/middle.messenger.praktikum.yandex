export class Popover {
    listeners: any[];
    el: HTMLDivElement;

    constructor() {
        this.listeners = [];
            this.el = document.createElement('div');
            this.el.style.position = 'absolute';

            this.el.classList.add(this.name);
            this.el.classList.toggle(`${this.name}_active`, false);

            document.body.appendChild(this.el);

            this.onHide = this.onHide.bind(this);
        }

        get name() {
            return 'popover';
        }

        get indent() {
            return 5;
        }

        delegate(eventName: string, element: HTMLElement, cssSelector: string, callback: any) {
            const fn = (event: any) => {
                if (!event.target.matches(cssSelector)) {
                    return;
                }

                callback(event);
            };

            element.addEventListener(eventName, fn);
            this.listeners.push({ fn, element, eventName });

            return this;
        }

        onShow = (event: any) => {
            this.el.innerHTML = event.target.getAttribute('data-popover');
            this.el.classList.toggle(`${this.name}_active`, true);

            const spanRect = event.target.getBoundingClientRect();
            const elRect = this.el.getBoundingClientRect();

            let top = spanRect.bottom + this.indent;

            if (top + elRect.height > document.documentElement.clientHeight) {
                // если тултип не влезает по высоте, то поднимаем его над элементом
                top = spanRect.top - elRect.height - this.indent;
            }

            this.el.style.top = `${top}px`;
        }

        onHide() {
            this.el.classList.toggle(`${this.name}_active`, false);
        }

        attach(root: any) {
            this
                .delegate('mouseover', root, '[data-popover]', this.onShow)
                .delegate('mouseout', root, '[data-popover]', this.onHide);

        }

        detach() {

            for (let {fn, element, eventName} of this.listeners) {
                element.removeEventListener(eventName, fn);
            }

        }
    }