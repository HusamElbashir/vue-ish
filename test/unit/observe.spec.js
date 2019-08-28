import config from '@/config'
import observe from '@/observe'
import Dep from '@/dep'

// custom matcher to check if an object is observed
expect.extend({
  toBeObserved(received) {
    const pass =
      typeof received === 'object' &&
      Object.getOwnPropertyNames(received).every(key => {
        const propertyDescriptor = Object.getOwnPropertyDescriptor(received, key)
        return (
          propertyDescriptor.configurable === true &&
          propertyDescriptor.enumerable === true &&
          typeof propertyDescriptor.get === 'function' &&
          typeof propertyDescriptor.set === 'function'
        )
      })

    if (pass) {
      return {
        message: () => `expected ${received} not to be observed`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected ${received} to be observed`,
        pass: false,
      }
    }
  },
})

// cache config settings to be restored at the end of the test
const _config = JSON.parse(JSON.stringify(config))

jest.mock('@/dep')

describe('observer', () => {
  beforeEach(() => {
    Dep.mockClear()
  })

  it('observes by converting object properties into getters/setters', () => {
    const obj = observe({ foo: 1, bar: 2, baz: 3 })

    expect(obj).toBeObserved()

    // Dep should be instantiated for each observed object property
    expect(Dep).toHaveBeenCalledTimes(3)
  })

  it('deep observes on initialization', () => {
    const obj = observe({ foo: { a: 1, b: 2, c: 3 } })

    // converts foo into a reactive property
    expect(obj).toBeObserved()

    // converts a, b and c into reactive properties
    expect(obj.foo).toBeObserved()

    // Dep should be instantiated for each observed object property
    expect(Dep).toHaveBeenCalledTimes(4)
  })

  it('deep observes when a reactive property is set to an object', () => {
    const obj = observe({ foo: '' })

    expect(obj.foo).not.toBeObserved()

    obj.foo = { a: 1, b: 2, c: 3 }

    expect(obj.foo).toBeObserved()

    // Dep should be instantiated for each observed object property
    expect(Dep).toHaveBeenCalledTimes(4)
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
      const obj = observe({ foo: 'bar' })
      const dep = Dep.mock.instances[0]

      // negative case - getter not called yet
      expect(spy).not.toHaveBeenCalled()
      expect(dep.depend).not.toHaveBeenCalled()

      // should return the value of a property
      expect(obj.foo).toBe('bar')

      // should not console.log the value (verbose is false)
      expect(spy).not.toHaveBeenCalled()

      // should call dep.depend
      expect(dep.depend).toHaveBeenCalled()

      // should console.log the value if 'verbose' is true
      config.verbose = true
      obj.foo
      expect(spy).toHaveBeenCalledWith('getting key "foo": bar')
    })

    it('setter', () => {
      const obj = observe({ foo: 'bar' })
      const dep = Dep.mock.instances[0]

      // negative case - setter not called yet
      expect(spy).not.toHaveBeenCalled()
      expect(dep.notify).not.toHaveBeenCalled()

      // should set the value of a property to a new value
      obj.foo = 'baz'
      expect(obj.foo).toBe('baz')

      // should not console.log the new value (verbose is false)
      expect(spy).not.toHaveBeenCalled()

      // should call dep.notify
      expect(dep.notify).toHaveBeenCalled()

      // should console.log the new value if 'verbose' is true
      config.verbose = true
      obj.foo = 'baz'
      expect(spy).toHaveBeenCalledWith('setting key "foo" to: baz')
    })
  })
})
