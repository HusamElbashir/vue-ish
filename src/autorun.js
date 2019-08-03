import Dep from './dep'
import observe from './observe'

// wraps a function call and sets itself
// as the activeComputation to be collected
// as a subscriber by any reactive dependencies
// accessed by the function call.
export default function autoRun(cb) {
  function wrappedCb() {
    Dep.activeComputation = wrappedCb
    cb()
    Dep.activeComputation = null
  }

  wrappedCb()

  // necessary for testing
  return wrappedCb
}
