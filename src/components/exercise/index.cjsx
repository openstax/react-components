React = require 'react'
_ = require 'underscore'

Exercise = require './part'
{ExFooter} = require './controls'
{CardBody} = require '../pinned-header-footer-card/sections'
ExerciseGroup = require './group'

ExerciseParts = React.createClass
  displayName: 'ExerciseParts'

  getLastPartId: ->
    {parts} = @props
    _.last(parts).id

  isSinglePart: ->
    {parts} = @props
    parts.length is 1

  isLastPart: (id) ->
    lastPartId = @getLastPartId()
    lastPartId is id

  shouldControl: (id) ->
    {canOnlyContinue} = @props

    not (@isLastPart(id) and canOnlyContinue(id))

  renderPart: (part, partProps) ->
    props = _.omit(@props, 'part', 'canOnlyContinue', 'canAllContinue', 'footer')

    <Exercise {...partProps} {...part} {...props}/>

  render: ->
    {parts, step, footer, getCurrentPanel} = @props

    if @isSinglePart()
      part = _.first(parts)

      partProps =
        footer: footer
        pinned: true
        focus: true
        includeGroup: true

      return @renderPart(part, partProps)

    exerciseParts = _.map parts, (part, index) =>
      partProps =
        pinned: false
        focus: index is 0
        includeGroup: false
        includeFooter: @shouldControl(part.id)

      @renderPart(part, partProps)

    exerciseGroup =
      <ExerciseGroup
        key='step-exercise-group'
        group={step.group}
        exercise_uid={step.content?.uid}
        related_content={step.related_content}/>

    panel = getCurrentPanel(@getLastPartId())
    footer ?= <ExFooter {...@props} panel={panel}/>

    <ExerciseStepCard
      {...cardProps}
      step={step}
      panel={currentPanel}
      waitingText={waitingText}
      helpLink={helpLink}
    />

module.exports = ExerciseParts
