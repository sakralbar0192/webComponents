import { defineIcebergButton } from "shared/ui/IcebergButton";
import { defineIcebergInput } from "shared/ui/IcebergInput";

defineIcebergInput()
defineIcebergButton()

export class PureCounter extends HTMLElement {
    static observedAttributes = ['count']
    defaultCount = '0'
    decrementButton = document.createElement('iceberg-button')
    incrementButton = document.createElement('iceberg-button')
    counterInput = document.createElement('iceberg-input')

    constructor() {
        super();
    }

    connectedCallback() {
        console.log("Custom element added to page.");
        
        this.setAttribute('count', this.getAttribute('count')?? this.defaultCount)
        
        const slot = document.createElement('slot')
        this.decrementButton.text = '-'
        this.decrementButton.onclick = this.decrement.bind(this)
        this.incrementButton.text = '+'
        this.incrementButton.onclick = this.increment.bind(this)

        this.counterInput.value = this.getAttribute('count') ?? this.defaultCount

        // Create a shadow root
        const shadow = this.attachShadow({ mode: "open" });

        const wrapper = document.createElement("div");
        wrapper.classList.add('wrapper')

        // Create some CSS to apply to the shadow dom
        const style = document.createElement("style");

        style.textContent = `
            .wrapper {
                display: flex;
                width: 300px;
                align-items: center;
                justify-content: space-between;
                padding: 30px;
            }

            iceberg-button {
                margin: 0 10px
            }

            iceberg-input input{
                text-align: center;
            }
        `;
        
        shadow.appendChild(style);
        shadow.append(wrapper, slot);
        wrapper.append(this.decrementButton, this.counterInput, this.incrementButton)
    }

    increment() {
        this.setAttribute('count', `${Number(this.getAttribute('count')) + 1}`)
    }

    decrement() {
        this.setAttribute('count', `${Number(this.getAttribute('count')) - 1}`)
    }

    disconnectedCallback() {
        console.log("Custom element removed from page.");
    }

    adoptedCallback() {
        console.log("Custom element moved to new page.");
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        console.log(`Attribute ${name} has changed.`);
        if (name === 'count') this.counterInput.value = newValue
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'pure-counter': PureCounter;
    }
}