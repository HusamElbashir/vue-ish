import observe from '@/js/observe'
import autoRun from '@/js/autoRun'

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
