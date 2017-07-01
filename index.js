const React = require('react')
const ReactDOM = require('react-dom')
const h = require('react-hyperscript')
const randomNumberInRange = require('random-number-in-range')

function Node (props) {
  const { node } = props
  const { x, y, value, color } = node
  return h('circle', {
    cx: x,
    cy: y,
    r: value,
    fill: color
  })
}

function Flow (props) {
  const { from, to } = props
  const { id: fromId, x: fromX, y: fromY, color: fromColor } = from
  const { id: toId, x: toX, y: toY, color: toColor } = to
  const flowId = `${fromId}-${toId}`

  // why can't we use react-hyperscript here?
  return React.createElement('g', {},
    h('defs', {}, [
      React.createElement('linearGradient', {
        id: flowId,
        x1: '0%',
        y1: '0%',
        x2: '100%',
        y2: '0%',
      },
        h('stop', {
          offset: '0%',
          stopColor: fromColor
        }),
        h('stop', {
          offset: '100%',
          stopColor: toColor
        })
      )
    ]),
    h('line', {
      x1: fromX,
      y1: fromY,
      x2: toX,
      // https://stackoverflow.com/a/34687362
      y2: (fromY !== toY) ? toY : toY + 0.0001,
      strokeWidth: 0.02,
      stroke: `url(#${flowId})`
    })
  )
}

function Graph (props) {
  const source = {
    id: 'source',
    x: 0.3,
    y: 0.5,
    value: 0.05,
    color: randomColor()
  }
  const sink = {
    id: 'sink',
    x: 0.7,
    y: 0.5,
    value: 0.05,
    color: randomColor()
  }
  return h('svg', {
    viewBox: '0 0 1 1',
    preserveAspectRatio: 'none'
  }, [
    h(Node, {
      node: source
    }),
    h(Flow, {
      from: source,
      to: sink
    }),
    h(Node, {
      node: sink
    })
  ])
}

ReactDOM.render(
  h(Graph),
  document.body.querySelector('.main')
)

function randomColor () {
  const hue = randomNumberInRange(0, 360)
  const saturation = '100%'
  const lightness = '50%'
  return `hsl(${hue}, ${saturation}, ${lightness})`
}
