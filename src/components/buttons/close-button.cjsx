React = require 'react'
classnames = require 'classnames'

module.exports = React.createClass
  render: ->
    classNames = classnames 'openstax-close-x', 'close', @props.className
    <button {...@props} className={classNames} aria-role='close'></button>
