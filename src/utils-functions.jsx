export function onTyping(setter) {
    const r = (event) => {
        setter(event.target.value)
    }
    return r;
}