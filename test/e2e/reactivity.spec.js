import observe from '@/observe'
import autoRun from '@/autorun'

describe('basic reactivity', () => {
  it('reacts', () => {
    const el = document.createElement('span')

    expect(el.textContent).toBe('')

    const state = observe({ message: '' })

    autoRun(() => {
      el.textContent = state.message
    })

    expect(el.textContent).toBe('')

    state.message = 'foo'

    expect(el.textContent).toBe('foo')
  })
})
