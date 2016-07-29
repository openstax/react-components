_ = require 'underscore'
React = require 'react'
Exercise = require '../model/exercise'
ChapterSectionMixin = require './chapter-section-mixin'

ExerciseIdentifierLink = React.createClass

  mixins: [ChapterSectionMixin]

  propTypes:
    bookUUID: React.PropTypes.string
    exerciseId: React.PropTypes.string.isRequired
    project: React.PropTypes.oneOf(['concept-coach', 'tutor'])

  renderSection: ->
    section = _.first(@props.related_content)
    if (@props.project isnt 'concept-coach' or not section) then return

    <span className="related-section">
      From Section {@sectionFormat(section.chapter_section)} - {section.title}
    </span>

  render: ->
    url = Exercise.troubleUrl(@props)
    <div>
      <span className='exercise-identifier-link'>
        {@renderSection()}
        ID# {@props.exerciseId} | <a target="_blank" href={url}>Report an error</a>
      </span>
    </div>
module.exports = ExerciseIdentifierLink
