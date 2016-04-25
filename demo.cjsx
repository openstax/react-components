React = require 'react'
ReactDOM = require 'react-dom'
Demo = require './src/components/demo'
{startMathJax} = require './src/helpers/mathjax'

loadApp = ->
  unless document.readyState is 'interactive'
    return false

  startMathJax()
  mainDiv = document.createElement('div')
  mainDiv.id = 'react-root-container'
  document.body.appendChild(mainDiv)
  ReactDOM.render(<Demo/>, mainDiv)
  true

loadApp() or document.addEventListener('readystatechange', loadApp)
