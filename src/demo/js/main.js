import '../css/style.css'

// box's state object
window.state = vueish.observe({
  translate: { x: 0, y: 0 },
  rotate: 0,
  scale: 1,
})

vueish.autoRun(() => {
  box.style.transform = `translate(${state.translate.x}px, ${state.translate.y}px) \
                        scale(${state.scale}) rotate(${state.rotate}deg)`
})

/* INSTRUCTIONS */

// wrapping things in an IIFE to avoid global vars
;(function() {
  // detect Edge and IE
  const UA = window.navigator.userAgent.toLowerCase()
  const isEdgeOrIE = /msie|trident|edge/.test(UA)

  const basicStyle =
    'font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"; line-height:1.8; font-size: 16px; '

  // helper function for styling console.log output ( IEEEEEEEEEEEEEEEE 😡 )
  function log() {
    let str
    if (isEdgeOrIE) {
      str = arguments[0].replace(/%c((?:state|spin|gimme|vueish|h1|text).*?)%c/g, "'$1'")
      str = str.replace(/%./g, '')
      console.log(str)
    } else {
      str = arguments[0]
      let args = Array.prototype.slice.call(arguments, 1)
      args = args.map(arg => {
        // if arg is a string then it is a CSS style in this basic use case
        if (typeof arg === 'string') {
          // check if the style specifies a different font size
          if (arg.indexOf('font-size') > -1) {
            const basicStyleAsArray = basicStyle.split('; ')
            arg = basicStyleAsArray[0] + '; ' + arg
          } else {
            arg = basicStyle + arg
          }
        }
        return arg
      })
      console.log.apply(null, [str].concat(args))
    }
  }

  function repeat(x, n) {
    return Array.apply(null, { length: n }).map(() => {
      return x
    })
  }

  const highlightStyle = 'background: #ffe5ee; padding: 2px; margin: 1px;'

  const str = `
    %cHey there!%c
    To interact with the box a reactive %cstate%c object ..
    %c{ translate: {x: 0, y: 0}, rotate: 0, scale: 1 }%c
    is exposed for you. You can modify any value in the %cstate%c object
    and watch the box react immediately.
    Things you can try ..
    - %cstate.translate.x = 100%c to move the box 100px to the right.
    - %cstate.scale = 2%c to double the box's size.
    - %cfunction spin() {%c
       %c   requestAnimationFrame(function() {%c
       %c       state.rotate += 1%c
       %c       spin()%c
       %c   })%c
       %c}%c
    then %cspin()%c to make the box spin clockwise.
    Have fun 🎉
    P.S. If you want to dig deeper call %cgimmeMoar()%c.
  `

  const styles = Array.prototype.concat.apply(
    ['color: #ae0000; font-size: 32px;'],
    repeat(['', highlightStyle], 13).concat('')
  )

  log.apply(null, [str].concat(styles))

  window.gimmeMoar = () => {
    // hide message and clear console before logging new instructions
    document.querySelector('.message').style.display = 'none'
    console.clear()

    const str = `%c
      You can use %cvueish.observe(obj)%c on an object to make it reactive.
      You can also use %cvueish.autoRun(cb)%c to have a callback function re-invoked
      automatically whenever a reactive property it depends on changes it's value.
      This is better illustrated with an example ..
      - Create a new %ch1%c element ..
        %cconst h1 = document.createElement('h1')%c
      - Append the element to the DOM ..
        %cdocument.body.appendChild(h1)%c
      - Create a reactive state object ..
        %cconst myStateObj = vueish.observe({ text: '' })%c
      - Bind the %ch1%c element's text content to the state object's %ctext%c property ..
        %c\rvueish.autoRun(() => {%c
        %c    h1.textContent = myStateObj.text%c
        %c})%c
      - Modify the state object's %ctext%c property and watch the %ch1%c element react! ..
        %cmyStateObj.text = 'Hello World'%c
      I'll leave the rest to your imagination. Now go and have fun 😉
    `

    const styles = Array.prototype.concat.apply([], repeat(['', highlightStyle], 14).concat(''))

    log.apply(null, [str].concat(styles))
  }
})()
