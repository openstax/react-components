React = require 'react'
_ = require 'underscore'

classnames = require 'classnames'
keymaster = require 'keymaster'

ExerciseGroup = require './group'
{CardBody} = require '../pinned-header-footer-card/sections'

{ExContinueButton, ExReviewControls} = require './controls'

{ExMode} = require './mode'

{propTypes, props} = require './props'

CONTROLS =
  'free-response': ExContinueButton
  'multiple-choice': ExContinueButton
  'review': ExReviewControls
  'teacher-read-only': ExContinueButton

CONTROLS_TEXT =
  'free-response': 'Answer'
  'multiple-choice': 'Submit'
  'review': 'Next Question'
  'teacher-read-only': 'Next Question'

CONTINUE_CHECKS =
  'free-response': 'freeResponse'
  'multiple-choice': 'answerId'
  'review': null
  'teacher-read-only': null

ON_CHANGE =
  'free-response': 'onFreeResponseChange'
  'multiple-choice': 'onAnswerChanged'
  'review': 'onChangeAnswerAttempt'
  'teacher-read-only': 'onChangeAnswerAttempt'

ExerciseDefaultFooter = React.createClass
  displayName: 'ExerciseDefaultFooter'
  render: ->
    <div>{@props.controlButtons}</div>

ExerciseStepCard = React.createClass
  displayName: 'ExerciseStepCard'
  propTypes:
    propTypes.ExerciseStepCard
  getDefaultProps: ->
    disabled: false
    isContinueEnabled: true
    footer: <ExerciseDefaultFooter/>
    allowKeyNext: false

  getInitialState: ->
    stepState = @getStepState(@props)

  shouldComponentUpdate: (nextProps, nextState) ->
    not (_.isEqual(@props, nextProps) and
      @props.isContinueEnabled is @isContinueEnabled(@props, @state) and
      @isContinueEnabled(@props, @state) is @isContinueEnabled(nextProps, nextState))

  componentWillReceiveProps: (nextProps) ->
    unless _.isEqual(@getStepState(@props), @getStepState(nextProps))
      nextStepState = @getStepState(nextProps)
      @setState(nextStepState)

    if @props.allowKeyNext isnt nextProps.allowKeyNext
      @updateKeyBind(nextProps.allowKeyNext)

  updateKeyBind: (allowKeyNext) ->
    if allowKeyNext then @startKeys() else @clearKeys()

  startKeys: ->
    keymaster('enter', 'multiple-choice', @onContinue)
    keymaster.setScope('multiple-choice')

  clearKeys: ->
    keymaster.unbind('enter', 'multiple-choice')
    keymaster.deleteScope('multiple-choice')

  getStepState: (props) ->
    {step} = props
    freeResponse: step.free_response or ''
    answerId: step.answer_id or ''

  isContinueEnabled: (props, state) ->
    {panel} = props
    toCheck = CONTINUE_CHECKS[panel]
    return true unless toCheck?
    state[toCheck]?.trim().length > 0

  onAnswerChanged: (answer) ->
    @setState {answerId: answer.id}
    @props.onAnswerChanged?(answer)

  onFreeResponseChange: (freeResponse) ->
    @setState {freeResponse}
    @props.onFreeResponseChange?(freeResponse)

  onChangeAnswerAttempt: (answer) ->
    console.log('You cannot change an answer on a problem you\'ve reviewed.', 'TODO: show warning in ui.')
    @props.onChangeAnswerAttempt?(answer)

  onContinue: ->
    {panel, canReview, onNextStep, onStepCompleted, onContinue, isContinueEnabled} = @props

    return unless isContinueEnabled and @isContinueEnabled(@props, @state)

    if onContinue?
      onContinue(@state)
      return

    if panel is 'multiple-choice'
      onStepCompleted()
      onNextStep() unless canReview

  render: ->
    {step, panel, pinned, isContinueEnabled, waitingText, controlButtons, controlText, className, footer} = @props
    {group, related_content} = step

    ControlButtons = CONTROLS[panel]
    onInputChange = ON_CHANGE[panel]
    controlText ?= CONTROLS_TEXT[panel]

    controlProps = _.pick(@props, props.ExReviewControls)
    controlProps.isContinueEnabled = isContinueEnabled and @isContinueEnabled(@props, @state)
    controlProps.onContinue = @onContinue
    controlProps.children = controlText

    panelProps = _.omit(@props, props.notPanel)
    panelProps.choicesEnabled = not waitingText and panel is 'multiple-choice'
    panelProps[onInputChange] = @[onInputChange]

    footerProps = _.pick(@props, props.StepFooter)
    footerProps.controlButtons = controlButtons or <ControlButtons {...controlProps}/>
    footer = React.cloneElement(footer, footerProps)

    cardClasses = classnames 'task-step', 'openstax-exercise-card', className

    <CardBody className={cardClasses} footer={footer} pinned={pinned}>
      <div className="exercise-#{panel}">
        <ExMode
          {...step}
          {...panelProps}
          mode={panel}/>
        <ExerciseGroup
          key='step-exercise-group'
          group={group}
          exercise_uid={step.content?.uid}
          related_content={related_content}/>
      </div>
    </CardBody>

module.exports = ExerciseStepCard
