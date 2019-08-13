import Dep from '@/js/dep'

describe('Dep', () => {
  const dep = new Dep()
  const subs = dep.subs
  const spy = jest.fn()

  it('instantiates with empty set', () => {
    expect(subs instanceof Set).toBe(true)
    expect(subs.size).toBe(0)
  })

  it('does not collect activeComputation as a dependent if not set', () => {
    dep.depend()
    expect(subs.size).toBe(0)
  })

  it('collects activeComputation as a dependent if set', () => {
    Dep.activeComputation = spy
    dep.depend()
    expect(subs.size).toBe(1)
    expect(subs.has(spy)).toBe(true)
  })

  it('invokes/notifies dependent computations', () => {
    dep.notify()
    expect(spy).toHaveBeenCalled()
  })
})
