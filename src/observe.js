// walks over an object's properties and converts them into
// getters and setters
export default function observe(obj) {
    Object.keys(obj).forEach(key=>{
        let value = obj[key]
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                console.log(`getting key "${key}": ${value}`)
                return value
            },
            set(newValue) {
                console.log(`setting key "${key}" to: ${newValue}`)
                value = newValue
            }
        })
    })
    return obj
}
