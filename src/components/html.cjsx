React = require 'react'
ReactDom = require 'react-dom'
_ = require 'underscore'
classnames = require 'classnames'

{typesetMath} = require '../helpers/mathjax'

module.exports = React.createClass
  displayName: 'ArbitraryHtmlAndMath'
  propTypes:
    className: React.PropTypes.string
    html: React.PropTypes.string
    block: React.PropTypes.bool.isRequired
    processHtmlAndMath: React.PropTypes.func
  getDefaultProps: ->
    block: false

  render: ->
    {className, block} = @props

    classes = classnames 'openstax-has-html', className

    otherProps = _.omit(@props, 'className', 'block', 'html')

    if block
      <div
        {...otherProps}
        className={classes}
        dangerouslySetInnerHTML={@getHTMLFromProp()} />
    else
      <span
        {...otherProps}
        className={classes}
        dangerouslySetInnerHTML={@getHTMLFromProp()} />

  getHTMLFromProp: ->
    {html} = @props
    if html
      __html: html

  # rendering uses dangerouslySetInnerHTML and then runs MathJax,
  # Both of which React can't optimize like it's normal render operations
  # Accordingly, only update if any of our props have actually changed
  shouldComponentUpdate: (nextProps, nextState) ->
    for propName, value of nextProps
      return true if @props[propName] isnt value
    return false

  componentDidMount:  -> @updateDOMNode()
  componentDidUpdate: -> @updateDOMNode()

  # Perform manipulation on HTML contained inside the components node.
  updateDOMNode: ->
    # External links should open in a new window
    root = ReactDom.findDOMNode(@)
    links = root.querySelectorAll('a')
    _.each links, (link) ->
      link.setAttribute('target', '_blank') unless link.getAttribute('href')?[0] is '#'
    @props.processHtmlAndMath?(root) or typesetMath(root)
