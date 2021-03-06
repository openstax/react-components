React = require 'react'
_ = require 'underscore'

{ScrollListenerMixin} = require 'react-scroll-components'
ResizeListenerMixin = require '../resize-listener-mixin'
GetPositionMixin = require '../get-position-mixin'

{PinnedHeader, CardBody, PinnableFooter} = require './sections'

module.exports = React.createClass
  displayName: 'PinnedHeaderFooterCard'
  propTypes:
    cardType: React.PropTypes.string.isRequired
    buffer: React.PropTypes.number
    scrollSpeedBuffer: React.PropTypes.number
    forceShy: React.PropTypes.bool
    containerBuffer: React.PropTypes.number

  getDefaultProps: ->
    buffer: 60
    scrollSpeedBuffer: 30
    forceShy: false
    containerBuffer: 30

  getInitialState: ->
    offset: 0
    shy: false
    pinned: false
    shouldBeShy: false
    headerHeight: 0
    containerMarginTop: '0px'

  mixins: [ScrollListenerMixin, ResizeListenerMixin, GetPositionMixin]

  componentWillMount: ->
    @previousBodyClasses = document.body.className
    cardBodyClass = @props.cardType
    document.body.className = "#{cardBodyClass}-view"
    document.body.classList.add('pinned-view')
    document.body.classList.add('pinned-force-shy') if @props.forceShy

  componentWillUnmount: ->
    document.body.className = @previousBodyClasses

  getOffset: ->
    if @props.fixedOffset?
      offset = @props.fixedOffset
    else if @refs.header?
      offset = @getTopPosition(@refs.header.getDOMNode())

    offset

  setOffset: ->
    offset = @getOffset()
    @setState(offset: offset)

  shouldPinHeader: (prevScrollTop, currentScrollTop) ->
    currentScrollTop >= @state.offset - @props.buffer

  isScrollingSlowed: (prevScrollTop, currentScrollTop) ->
    Math.abs(prevScrollTop - currentScrollTop) <= @props.scrollSpeedBuffer

  isScrollingDown: (prevScrollTop, currentScrollTop) ->
    currentScrollTop > prevScrollTop

  isScrollPassBuffer: (prevScrollTop, currentScrollTop) ->
    currentScrollTop >= @props.buffer + @state.offset

  shouldBeShy: (prevScrollTop, currentScrollTop) ->
    # should not pin regardless of scroll direction if the scroll top is above buffer
    unless @isScrollPassBuffer(prevScrollTop, currentScrollTop)
      shouldBeShy = false

    # otherwise, when scroll top is below buffer
    # and on down scroll
    else if @isScrollingDown(prevScrollTop, currentScrollTop)
      # header should pin
      shouldBeShy = true

    # or when up scrolling is slow
    else if @isScrollingSlowed(prevScrollTop, currentScrollTop)
      # leave the pinning as is
      shouldBeShy = @state.shy

    # else, the only case left is if up scrolling is fast
    else
      # unpin on fast up scroll
      shouldBeShy = false

    shouldBeShy

  unPin: ->
    @setState(pinned: false)

  updatePinState: (prevScrollTop) ->
    addOrRemove = [
      'remove' # remove class if shouldPinHeader is false
      'add' # add class if shouldPinHeader is true
    ]
    # set the pinned state
    @setState(
      # allow shouldBeShy override if needed
      shy: @state.shouldBeShy or @shouldBeShy(prevScrollTop, @state.scrollTop)
      pinned: @shouldPinHeader(prevScrollTop, @state.scrollTop)
      # reset shouldBeShy
      shouldBeShy: false
    )
    shouldPinHeader = @state.pinned * 1
    shouldBeShy = @state.shy * 1

    pinnedClassAction = addOrRemove[shouldPinHeader]
    document.body.classList[pinnedClassAction]('pinned-on')

    shyClassAction = addOrRemove[shouldBeShy]
    document.body.classList[shyClassAction]('pinned-shy')

  forceShy: ->
    window.scroll(0, @props.buffer + @state.offset)
    @setState(shouldBeShy: true)

  getHeaderHeight: ->
    header = @refs.header?.getDOMNode()
    headerHeight = header?.offsetHeight or 0

  setOriginalContainerMargin: ->
    container = @refs.container?.getDOMNode()
    return unless container

    @setState(containerMarginTop: window.getComputedStyle(container).marginTop) if window.getComputedStyle?

  setContainerMargin: ->
    headerHeight = @getHeaderHeight()
    container = @refs.container?.getDOMNode()
    return unless container

    @setState(headerHeight: headerHeight)

  _resizeListener: ->
    @setContainerMargin()

  componentDidMount: ->
    @setOffset()
    @updatePinState(0)
    @setOriginalContainerMargin()
    @setContainerMargin()

  componentDidUpdate: (prevProps, prevState) ->
    didOffsetChange = (not @state.pinned) and not (@state.offset is @getOffset())
    didShouldPinChange = not prevState.pinned is @shouldPinHeader(prevState.scrollTop, @state.scrollTop)
    didShouldBeShyChange = not prevState.shy is @shouldBeShy(prevState.scrollTop, @state.scrollTop)
    didHeaderHeightChange = not (prevState.headerHeight is @getHeaderHeight())

    @setOffset() if didOffsetChange
    @updatePinState(prevState.scrollTop) if didShouldPinChange or didShouldBeShyChange
    @setContainerMargin() if didHeaderHeightChange or didShouldPinChange

  componentWillReceiveProps: ->
    @forceShy() if @props.forceShy

  render: ->
    {className} = @props

    classes = ['pinned-container']
    classes.push(className) if className?
    classes = classes.join(' ')

    childrenProps = _.omit(@props, 'children', 'header', 'footer', 'className')

    if @state.pinned
      containerStyle =
        marginTop: (@state.headerHeight + @props.containerBuffer) + 'px'
    else
      containerStyle =
        marginTop: @state.containerMarginTop

    if @props.header?
      pinnedHeader = <PinnedHeader {...childrenProps} ref='header'>
        {@props.header}
      </PinnedHeader>

    <div className={classes} style={containerStyle} ref='container'>
      {pinnedHeader}
      {@props.children}
    </div>
