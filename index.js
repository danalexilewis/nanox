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

function Link (props) {
  const { from, to } = props
  const { id: fromId, x: fromX, y: fromY, color: fromColor } = from
  const { id: toId, x: toX, y: toY, color: toColor } = to
  const linkId = `${fromId}-${toId}`

  // why can't we use react-hyperscript here?
  return React.createElement('g', {},
    h('defs', {}, [
      React.createElement('linearGradient', {
        id: linkId,
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
      stroke: `url(#${linkId})`
    })
  )
}

function Graph (props) {
  const { graph } = props

  const nodes = Object.keys(graph.nodes).reduce((sofar, id) => {
    var node = graph.nodes[id]
    Object.assign(node, { id })
    return [...sofar, node]
  }, [])
  const links = Object.keys(graph.links).reduce((sofar, id) => {
    var link = graph.links[id]
    const from = graph.nodes[link.from]
    const to = graph.nodes[link.to]
    Object.assign(link, { id, from, to })
    return [...sofar, link]
  }, [])

  return h('svg', {
    viewBox: '0 0 1 1',
    preserveAspectRatio: 'none'
  }, [
    ...nodes.map(node => h(Node, { node })),
    ...links.map(link => h(Link, link))
  ])
}

const graph = {
  nodes: {
    a: {
      x: 0.3,
      y: 0.5,
      value: 0.05,
      color: randomColor()
    },
    b: {
      x: 0.7,
      y: 0.5,
      value: 0.05,
      color: randomColor()
    },
    c: {
      x: 0.5,
      y: 0.25,
      value: 0.05,
      color: randomColor()
    },
    d: {
      x: 0.5,
      y: 0.75,
      value: 0.05,
      color: randomColor()
    }
  },
  links: [
    {
      from: 'a',
      to: 'b'
    },
    {
      from: 'a',
      to: 'c'
    },
    {
      from: 'a',
      to: 'd'
    }
  ]
}

ReactDOM.render(
  h(Graph, { graph }),
  document.body.querySelector('.main')
)

function randomColor () {
  const hue = randomNumberInRange(0, 360)
  const saturation = '100%'
  const lightness = '50%'
  return `hsl(${hue}, ${saturation}, ${lightness})`
}
