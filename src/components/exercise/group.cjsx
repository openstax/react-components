React = require 'react'
_ = require 'underscore'
BS = require 'react-bootstrap'
camelCase = require 'camelcase'

ChapterSectionMixin = require '../chapter-section-mixin'
ExerciseIdentifierLink = require '../exercise-identifier-link'

DEFAULT_GROUP =
  show: false
REVIEW_GROUP =
  show: true
  label: 'Spaced Practice'
  tooltip:
    'concept-coach':
      '''Did you know? Research shows you can strengthen your memory —
      and spend less time studying — if you revisit material over multiple study sessions.
      OpenStax Concept Coach will include review questions from prior sections to give your
      learning a boost.'''
    'tutor':
      '''Did you know? Research shows you can strengthen your memory —
      and spend less time studying — if you revisit material over multiple study sessions.
      OpenStax Tutor will include review questions from prior sections to give your
      learning a boost.'''

RULES =
  default: DEFAULT_GROUP
  core: DEFAULT_GROUP
  recovery: DEFAULT_GROUP
  personalized:
    show: true
    label: 'Personalized'
  #  TODO deprecate spaced practice when BE is updated
  'spaced practice': REVIEW_GROUP
  spaced_practice: REVIEW_GROUP

ExerciseGroup = React.createClass
  displayName: 'ExerciseGroup'

  propTypes:
    group: React.PropTypes.oneOf(_.keys(RULES)).isRequired
    project: React.PropTypes.oneOf(['tutor', 'concept-coach']).isRequired

  getDefaultProps: ->
    group: 'default'
    related_content: []

  getPossibleGroups: ->
    _.keys(RULES)

  getGroupLabel: (group, related_content) ->

    if RULES[group].label?
      labels = RULES[group].label

    labels

  render: ->
    {group, related_content, exercise_uid, project} = @props
    groupDOM = []

    if RULES[group].show
      className = group.replace(' ', '_')
      labels = @getGroupLabel(group, related_content)
      isSpacedPractice = className is 'spaced_practice'
      icon = <i className="icon-sm icon-#{className}" key='group-icon'></i>

      spacedPracticeHeading = <p><b>What is spaced practice?</b></p>

      groupDOM = [
        icon
        <span className='openstax-step-group-label' key='group-label'>{labels}</span>
      ]

    if RULES[group].show and RULES[group].tooltip
      popover = <BS.Popover id="instructions" ref="popover" className="openstax instructions">
        {spacedPracticeHeading if isSpacedPractice}
        {RULES[group].tooltip[project]}
      </BS.Popover>
      groupDOM.push  <BS.OverlayTrigger placement="bottom" overlay={popover}>
        <i className="fa fa-info-circle" />
      </BS.OverlayTrigger>

    <div className='openstax-step-group'>
      {groupDOM}
    </div>

module.exports = ExerciseGroup
