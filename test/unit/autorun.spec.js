import autoRun from '@/js/autorun'
import Dep from '@/js/dep'

describe('autoRun', () => {
  const queue = []
  const spyCb = jest.fn(() => queue.push(spyCb))
  const setter = val => queue.push(val)
  const propertyDescriptor = Object.getOwnPropertyDescriptor(Dep, 'activeComputation')

  beforeAll(() => {
    Object.defineProperty(Dep, 'activeComputation', {
      configurable: true,
      enumerable: true,
      set: setter,
    })
  })

  afterAll(() => {
    Object.defineProperty(Dep, 'activeComputation', propertyDescriptor)
  })

  it('sets activeComputation, calls cb then clears activeComputation', () => {
    const wrappedCb = autoRun(spyCb)
    expect(queue).toStrictEqual([wrappedCb, spyCb, null])
  })

  // makes sure wrappedCb and cb are equivalent (wrappedCb calls cb).
  // This is because deps actually collect wrappedCb as a subscriber
  // and then invoke it when they're mutated.
  it('wrappedCb invokes cb when called', () => {
    const wrappedCb = autoRun(spyCb)
    spyCb.mockClear()

    expect(spyCb).not.toHaveBeenCalled()
    wrappedCb()
    expect(spyCb).toHaveBeenCalled()
  })
})
