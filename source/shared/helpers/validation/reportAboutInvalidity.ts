export function reportAboutInvalidity(element: HTMLInputElement, message: string): void {
    element.setCustomValidity(message)
    element.reportValidity()
    setTimeout(() => {
        element.setCustomValidity('')
    }, 1500)
}
