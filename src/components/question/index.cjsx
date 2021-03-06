React = require 'react'
_ = require 'underscore'
classnames = require 'classnames'

{AnswersTable} = require './answers-table'
ArbitraryHtmlAndMath = require '../html'
FormatsListing = require './formats-listing'

QuestionHtml = React.createClass
  displayName: 'QuestionHtml'
  propTypes:
    html: React.PropTypes.string
    type: React.PropTypes.string
    questionNumber: React.PropTypes.number
  getDefaultProps: ->
    html: ''
    type: ''
  contextTypes:
    processHtmlAndMath: React.PropTypes.func

  render: ->
    {html, type} = @props
    return null unless html.length > 0

    htmlAndMathProps = _.pick(@context, 'processHtmlAndMath')

    <ArbitraryHtmlAndMath
      {...htmlAndMathProps}
      className="question-#{type}"
      block={true}
      html={html}
      data-question-number={@props.questionNumber}
    />

Question = React.createClass
  displayName: 'Question'
  propTypes:
    model: React.PropTypes.object.isRequired
    task: React.PropTypes.object
    correct_answer_id: React.PropTypes.string
    exercise_uid: React.PropTypes.string
    displayFormats:  React.PropTypes.bool

  childContextTypes:
    processHtmlAndMath: React.PropTypes.func
  getChildContext: ->
    processHtmlAndMath: @props.processHtmlAndMath

  doesArrayHaveProperty: (arrayToCheck, property) ->
    not _.isEmpty(_.compact(_.pluck(arrayToCheck, property)))

  hasAnswerCorrectness: ->
    {correct_answer_id, model} = @props
    {answers} = model

    correct_answer_id or @doesArrayHaveProperty(answers, 'correctness')

  hasSolution: ->
    {model, correct_answer_id} = @props
    {collaborator_solutions} = model

    @hasAnswerCorrectness() and @doesArrayHaveProperty(collaborator_solutions, 'content_html')

  render: ->
    {model, correct_answer_id, exercise_uid, className, questionNumber, context, task} = @props
    {stem_html, collaborator_solutions, formats, stimulus_html} = model

    hasCorrectAnswer = !! correct_answer_id
    classes = classnames 'openstax-question', className,
      'has-correct-answer': hasCorrectAnswer and not (task?.is_deleted and task?.type is 'homework')

    htmlAndMathProps = _.pick(@context, 'processHtmlAndMath')

    exerciseUid = <div className="exercise-uid">{exercise_uid}</div> if exercise_uid?

    if @hasSolution()
      solution =
        <div className='detailed-solution'>
          <div className='header'>Detailed solution</div>
          <ArbitraryHtmlAndMath {...htmlAndMathProps} className="solution" block
            html={_.pluck(collaborator_solutions, 'content_html').join('')}
          />
        </div>

    <div className={classes} data-question-number={questionNumber}>
      <QuestionHtml type='context' html={context} />
      <QuestionHtml type='stimulus' html={stimulus_html} />
      <QuestionHtml type='stem' html={stem_html} questionNumber={questionNumber} />
      {@props.children}
      <AnswersTable {...@props} hasCorrectAnswer={hasCorrectAnswer}/>
      {<FormatsListing formats={formats} /> if @props.displayFormats}
      {solution}
      {exerciseUid}
    </div>

module.exports = Question
