import Dep from '@/dep'

describe('Dep', () => {
  const dep = new Dep()
  const deps = dep.deps
  const spy = jest.fn()

  it('instantiates with empty set', () => {
    expect(deps instanceof Set).toBe(true)
    expect(deps.size).toBe(0)
  })

  it('does not collect activeComputation as a dependent if not set', () => {
    dep.depend()
    expect(deps.size).toBe(0)
  })

  it('collects activeComputation as a dependent if set', () => {
    Dep.activeComputation = spy
    dep.depend()
    expect(deps.size).toBe(1)
    expect(deps.has(spy)).toBe(true)
  })

  it('invokes/notifies dependent computations', () => {
    dep.notify()
    expect(spy).toHaveBeenCalled()
  })
})
