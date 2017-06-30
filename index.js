const SRD = require('storm-react-diagrams')
const React = require('react')
const ReactDOM = require('react-dom')

class BodyWidget extends React.Component {
  render () {
    return (
                      React.DOM.div({className: 'body'},
                              React.DOM.div({className: 'header'},
                                      React.DOM.div({className: 'title'}, 'Storm React Diagrams - Demo 5')
                              ),
                              React.DOM.div({className: 'content'},
                                      TrayWidgetFactory(),
                                      React.createElement(SRD.DiagramWidget, {diagramEngine: this.props.app.getDiagramEngine()})
                              )
                      )
    )
  }
}

var BodyWidgetFactory = React.createFactory(BodyWidget)

class TrayWidget extends React.Component {
  render () {
    return (
                      React.DOM.div({className: 'tray'},
                              this.props.children
                      )
    )
  }
}

var TrayWidgetFactory = React.createFactory(TrayWidget)

class Application {
  constructor () {
    this.diagramEngine = new SRD.DiagramEngine()

    this.diagramEngine.registerNodeFactory(new SRD.DefaultNodeFactory())
    this.diagramEngine.registerLinkFactory(new SRD.DefaultLinkFactory())

    this.newModel()
  }

  newModel () {
    this.activeModel = new SRD.DiagramModel()
    this.diagramEngine.setDiagramModel(this.activeModel)

    var node1 = new SRD.DefaultNodeModel('Node 1', 'rgb(0,192,255)')
    var port1 = node1.addPort(new SRD.DefaultPortModel(false, 'out-1', 'Out'))
    node1.x = 100
    node1.y = 100

    var node2 = new SRD.DefaultNodeModel('Node 2', 'rgb(192,255,0)')
    var port2 = node2.addPort(new SRD.DefaultPortModel(true, 'in-1', 'IN'))
    node2.x = 400
    node2.y = 100

    var link1 = new SRD.LinkModel()
    link1.setSourcePort(port1)
    link1.setTargetPort(port2)

    this.activeModel.addNode(node1)
    this.activeModel.addNode(node2)
    this.activeModel.addLink(link1)
  }

  getActiveDiagram () {
    return this.activeModel
  }

  getDiagramEngine () {
    return this.diagramEngine
  }
}

var app = new Application()

ReactDOM.render(BodyWidgetFactory({app: app}), document.body.querySelector('main'))
