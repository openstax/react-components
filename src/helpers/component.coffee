NAMESPACE = 'openstax'
DEFAULT_SUFFIX = 'wrapper'

getNamespacedClass = (componentClass = DEFAULT_SUFFIX) ->
  "#{NAMESPACE}-#{componentClass}"

module.exports = {getNamespacedClass}
