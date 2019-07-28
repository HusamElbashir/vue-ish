import observe from '~/observe'

describe('observer', () => {
  it('converts object properties into getters/setters', () => {
    const obj = { foo: 1, bar: 2, baz: 3 }
    const observedObj = observe(obj)
    Object.keys(observedObj).forEach(key => {
      const propertyDescriptor = Object.getOwnPropertyDescriptor(observedObj, key)
      expect(propertyDescriptor.configurable).toBe(true)
      expect(propertyDescriptor.enumerable).toBe(true)
      expect(typeof propertyDescriptor.get).toBe('function')
      expect(typeof propertyDescriptor.set).toBe('function')
    })
  })

  it('getter', () => {
    const obj = { foo: 'bar' }
    const observedObj = observe(obj)
    const _log = console.log
    console.log = jest.fn()

    // should return the value of a property
    expect(observedObj.foo).toBe('bar')

    // should console.log the value
    expect(console.log).toHaveBeenCalledWith('getting key "foo": bar')

    // restore console.log behavior
    console.log = _log
  })

  it('setter', () => {
    const obj = { foo: 'bar' }
    const observedObj = observe(obj)
    const _log = console.log
    console.log = jest.fn()

    // should set the value of a property to a new value
    observedObj.foo = 'baz'
    expect(observedObj.foo).toBe('baz')

    // should console.log the new value
    expect(console.log).toHaveBeenCalledWith('setting key "foo" to: baz')

    // restore console.log behavior
    console.log = _log
  })
})
