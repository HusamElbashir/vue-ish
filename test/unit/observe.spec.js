import config from '@/config'
import observe from '@/observe'
import Dep from '@/dep'

// cache config settings to be restored at the end of the test
const _config = JSON.parse(JSON.stringify(config))

jest.mock('@/dep')

describe('observer', () => {
  it('converts object properties into getters/setters', () => {
    const obj = { foo: 1, bar: 2, baz: 3 }
    const observedObj = observe(obj)

    Object.keys(observedObj).forEach(key => {
      const propertyDescriptor = Object.getOwnPropertyDescriptor(observedObj, key)

      expect(propertyDescriptor).toEqual(
        expect.objectContaining({
          configurable: true,
          enumerable: true,
          get: expect.any(Function),
          set: expect.any(Function),
        })
      )
    })

    // Dep should be instantiated for each observed object property
    expect(Dep).toHaveBeenCalledTimes(3)
  })

  describe('getter/setter', () => {
    let spy

    // spy on console.log
    beforeAll(() => {
      spy = jest.spyOn(console, 'log')
      spy.mockImplementation(() => {})
    })

    // restore console.log behavior and config settings
    afterAll(() => {
      spy.mockRestore()
      config = _config
    })

    // cleanup calls and other mock info + switch off verbose
    beforeEach(() => {
      Dep.mockClear()
      spy.mockClear()
      config.verbose = false
    })

    it('getter', () => {
      const obj = { foo: 'bar' }
      const observedObj = observe(obj)
      const dep = Dep.mock.instances[0]

      // negative case - getter not called yet
      expect(spy).not.toHaveBeenCalled()
      expect(dep.depend).not.toHaveBeenCalled()

      // should return the value of a property
      expect(observedObj.foo).toBe('bar')

      // should not console.log the value (verbose is false)
      expect(spy).not.toHaveBeenCalled()

      // should call dep.depend
      expect(dep.depend).toHaveBeenCalled()

      // should console.log the value if 'verbose' is true
      config.verbose = true
      observedObj.foo
      expect(spy).toHaveBeenCalledWith('getting key "foo": bar')
    })

    it('setter', () => {
      const obj = { foo: 'bar' }
      const observedObj = observe(obj)
      const dep = Dep.mock.instances[0]

      // negative case - setter not called yet
      expect(spy).not.toHaveBeenCalled()
      expect(dep.notify).not.toHaveBeenCalled()

      // should set the value of a property to a new value
      observedObj.foo = 'baz'
      expect(observedObj.foo).toBe('baz')

      // should not console.log the new value (verbose is false)
      expect(spy).not.toHaveBeenCalled()

      // should call dep.notify
      expect(dep.notify).toHaveBeenCalled()

      // should console.log the new value if 'verbose' is true
      config.verbose = true
      observedObj.foo = 'baz'
      expect(spy).toHaveBeenCalledWith('setting key "foo" to: baz')
    })
  })
})
