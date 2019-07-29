class Dep {
  constructor() {
    this.deps = new Set()
  }

  // collect the current activeComputation -
  // meaning that it depends on this dependency.
  depend() {
    if (Dep.activeComputation) {
      this.deps.add(Dep.activeComputation)
    }
  }

  // invoke all computations that depend on
  // this dependency.
  notify() {
    this.deps.forEach(dep => dep())
  }
}

// activeComputation is globally unique.
// It is set as the current function being
// invoked inside 'autoRun'.
Dep.activeComputation = null

export default Dep
