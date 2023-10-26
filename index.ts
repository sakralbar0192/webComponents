import './index.scss';
import { definePureCounter } from "shared/ui/PureCounter";
import { defineIcebergButton } from "shared/ui/IcebergButton";

definePureCounter()
defineIcebergButton()

document.addEventListener('DOMContentLoaded', () => {
    const DEFAULT_TEXT = 'Кликни меня,чтобы увидеть каунтер'
    const ALTERNATIVE_TEXT = 'Ты сам попросил! Может удалить?'
    const body = document.body
    const button = document.createElement('iceberg-button');
    button.text = DEFAULT_TEXT
    let isCounterVisible = false

    const externalButton = document.createElement('iceberg-button');
    externalButton.text = 'Я тоже могу влиять, например, вывести сколько в каунтере и установить ему 100'
    externalButton.onclick = () => {
        alert(body.querySelector('pure-counter')?.getAttribute('count'))
        body.querySelector('pure-counter')?.setAttribute('count', '100')
    }

    body.append(button)

    button.onclick = () => {
        button.text = isCounterVisible 
            ? ALTERNATIVE_TEXT
            : DEFAULT_TEXT
        
        if (isCounterVisible) {
            button.text = DEFAULT_TEXT
            body.querySelector('pure-counter')?.remove()
        } else {
            button.text = ALTERNATIVE_TEXT
            const counter = document.createElement('pure-counter')
            counter.append(externalButton)
            body.append(counter)
        }

        isCounterVisible = !isCounterVisible
    }
})
