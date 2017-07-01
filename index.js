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

/*
function Flow (props) {
  const { from, to } = props
  const { id: fromId, x: fromX, y: fromY, color: fromColor } = from
  const { id: toId, x: toX, y: toY, color: toColor } = to
  const flowId = `${fromId}-${toId}`

  // TODO style the line to be a gradient
  // from source to sink

  return h('g', [
    h('defs', [
      h('linearGradient', {
        id: flowId,
        x1: '0%',
        y1: '0%',
        x2: '100%',
        y2: '0%',
      }, [
        h('stop', {
          offset: '0%',
          stopColor: fromColor
        }),
        h('stop', {
          offset: '100%',
          stopColor: toColor
        })
      ])
    ]),
    h('line', {
      x1: fromX,
      y1: fromY,
      x2: toX,
      // https://stackoverflow.com/a/34687362
      y2: (fromY !== toY) ? toY : toY + 0.0001,
      strokeWidth: 0.02,
      //stroke: `url(#${flowId})`
      stroke: `url(#flow)`
    })
  ])
}
*/

/*
function Flow (props) {
  const { from, to } = props
  const { id: fromId, x: fromX, y: fromY, color: fromColor } = from
  const { id: toId, x: toX, y: toY, color: toColor } = to
  const flowId = `${fromId}-${toId}`

  return <g>
    <defs>
      <linearGradient
        id={flowId}
        x1={'0%'}
        y1={'0%'}
        x2={'100%'}
        y2={'0%'}
      >
        <stop offset={'0%'} stopColor={fromColor} />
        <stop offset={'100%'} stopColor={toColor} />
      </linearGradient>
    </defs>
    <line
      x1={fromX}
      y1={fromY}
      x2={toX}
      // https://stackoverflow.com/a/34687362
      y2={(fromY !== toY) ? toY : toY + 0.0001}
      strokeWidth={0.02}
      stroke={`url(#${flowId})`}
    />
  </g>
}
*/

function Flow (props) {
  const { from, to } = props
  const { id: fromId, x: fromX, y: fromY, color: fromColor } = from
  const { id: toId, x: toX, y: toY, color: toColor } = to
  const flowId = `${fromId}-${toId}`

  // why can't we use react-hyperscript here?

  return React.createElement('g', {},
    React.createElement('defs', {},
      React.createElement('linearGradient', {
        id: flowId,
        x1: '0%',
        y1: '0%',
        x2: '100%',
        y2: '0%',
      },
        React.createElement('stop', {
          offset: '0%',
          stopColor: fromColor
        }),
        React.createElement('stop', {
          offset: '100%',
          stopColor: toColor
        })
      )
    ),
    React.createElement('line', {
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
