class Dep {
  constructor() {
    this.subs = new Set()
  }

  // collect the current activeComputation as a
  // subscriber - meaning that it depends on this dependency.
  depend() {
    if (Dep.activeComputation) {
      this.subs.add(Dep.activeComputation)
    }
  }

  // invoke all computations that depend on
  // this dependency.
  notify() {
    this.subs.forEach(dep => dep())
  }
}

// activeComputation is globally unique.
// It is set as the current function being
// invoked inside 'autoRun'.
Dep.activeComputation = null

export default Dep
