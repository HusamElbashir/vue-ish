import '../css/style.css'

// show message only if JavaScript is enabled
document.querySelector('.message').style.display = 'block'

const link = document.querySelector('a')
const popup = document.querySelector('#popup')
const box = document.querySelector('.box')

function showPopup() {
  const linkBoundingRect = document.querySelector('a').getBoundingClientRect()
  const popupLeftBoundary = Math.max(0, linkBoundingRect.left - linkBoundingRect.width / 2)

  popup.style.left = popupLeftBoundary + 'px'
  popup.style.width =
    (popupLeftBoundary + linkBoundingRect.width * 2 < window.innerWidth
      ? linkBoundingRect.width * 2
      : window.innerWidth - popupLeftBoundary) + 'px'
  popup.style.top = linkBoundingRect.top + 25 + 'px'
  popup.style.transform = 'scale(1)'
  popup.style.opacity = '1'
  popup.textContent = 'You may need to refresh the page after opening the developer console'
}

function hidePopup() {
  popup.style.transform = 'scale(0)'
  popup.style.opacity = '0'
}

// attach event listeners to show and hide popup
link.onmouseover = showPopup
link.onmouseout = hidePopup

link.onfocus = showPopup
link.onblur = hidePopup

// box's state object
const state = vueish.observe({
  translate: { x: 0, y: 0 },
  rotate: 0,
  scale: 1,
})

vueish.autoRun(() => {
  box.style.transform =
    'translate(' +
    state.translate.x +
    'px, ' +
    state.translate.y +
    'px) ' +
    'scale(' +
    state.scale +
    ') ' +
    'rotate(' +
    state.rotate +
    'deg)'
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

  const str =
    '%cHey there!\n' +
    '%cTo interact with the box a reactive %cstate%c object ..\n' +
    '%c{ translate: {x: 0, y: 0}, rotate: 0, scale: 1 }%c\n' +
    'is exposed for you. You can modify any value in the %cstate%c object ' +
    'and watch the box react immediately.\n' +
    'Things you can try ..\n' +
    '- %cstate.translate.x = 100%c to move the box 100px to the right.\n' +
    "- %cstate.scale = 2%c to double the box's size.\n" +
    '- %cfunction spin() {%c\n' +
    '   %c   requestAnimationFrame(function() {%c\n' +
    '   %c       state.rotate += 1%c\n' +
    '   %c       spin()%c\n' +
    '   %c   })%c\n' +
    '   %c}%c\n' +
    'then %cspin()%c to make the box spin clockwise.\n' +
    'Have fun 🎉\n' +
    'P.S. If you want to dig deeper call %cgimmeMoar()%c.'

  const styles = Array.prototype.concat.apply(
    ['color: #ae0000; font-size: 32px;'],
    repeat(['', highlightStyle], 13).concat('')
  )

  log.apply(null, [str].concat(styles))

  window.gimmeMoar = () => {
    // hide message and clear console before logging new instructions
    document.querySelector('.message').style.display = 'none'
    console.clear()

    const str =
      '%cYou can use %cvueish.observe(obj)%c on an object to make it reactive. ' +
      'You can also use %cvueish.autoRun(cb)%c to have a callback function re-invoked ' +
      "automatically whenever a reactive property it depends on changes it's value.\n" +
      'This is better illustrated with an example ..\n' +
      '- Create a new %ch1%c element ..\n' +
      "  %cconst h1 = document.createElement('h1')%c\n" +
      '- Append the element to the DOM ..\n' +
      '  %cdocument.body.appendChild(h1)%c\n' +
      '- Create a reactive state object ..\n' +
      "  %cconst myStateObj = vueish.observe({ text: '' })%c\n" +
      "- Bind the %ch1%c element's text content to the state object's %ctext%c property ..\n" +
      '  %c\rvueish.autoRun(() => {%c\n' +
      '  %c    h1.textContent = myStateObj.text%c\n' +
      '  %c})%c\n' +
      "- Modify the state object's %ctext%c property and watch the %ch1%c element react! ..\n" +
      "  %cmyStateObj.text = 'Hello World'%c\n" +
      "I'll leave the rest to your imagination. Now go and have fun 😉"

    const styles = Array.prototype.concat.apply([], repeat(['', highlightStyle], 14).concat(''))

    log.apply(null, [str].concat(styles))
  }
})()
