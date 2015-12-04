React = require 'react'
classnames = require 'classnames'

{getNamespacedClass} = require '../../helpers/component'

module.exports = React.createClass
  render: ->
    classNames = classnames getNamespacedClass('close-x'), 'close', @props.className
    <button {...@props} className={classNames} aria-role='close'></button>
