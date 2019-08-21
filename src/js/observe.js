import config from './config'
import Dep from './dep'

// walks over an object's properties and converts them into
// getters and setters
export default function observe(obj) {
  Object.keys(obj).forEach(key => {
    const dep = new Dep()
    let value = obj[key]

    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get() {
        config.verbose && console.log(`getting key "${key}": ${value}`)
        dep.depend()
        return value
      },
      set(newValue) {
        config.verbose && console.log(`setting key "${key}" to: ${newValue}`)
        value = newValue
        dep.notify()
        return newValue
      },
    })

    // deep observe
    if (typeof value === 'object') observe(value)
  })
  return obj
}
