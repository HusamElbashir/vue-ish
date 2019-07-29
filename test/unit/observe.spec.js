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

  describe('getter/setter', () => {
    let spy

    // spy on console.log
    beforeAll(() => {
      spy = jest.spyOn(console, 'log')
      spy.mockImplementation(() => {})
    })

    // restore console.log behavior
    afterAll(() => {
      spy.mockRestore()
    })

    // cleanup calls and other mock info
    beforeEach(() => {
      spy.mockClear()
    })

    it('getter', () => {
      const obj = { foo: 'bar' }
      const observedObj = observe(obj)

      // should return the value of a property
      expect(observedObj.foo).toBe('bar')

      // should console.log the value
      expect(spy).toHaveBeenCalledWith('getting key "foo": bar')
    })

    it('setter', () => {
      const obj = { foo: 'bar' }
      const observedObj = observe(obj)

      // should set the value of a property to a new value
      observedObj.foo = 'baz'
      expect(observedObj.foo).toBe('baz')

      // should console.log the new value
      expect(spy).toHaveBeenCalledWith('setting key "foo" to: baz')
    })
  })
})
