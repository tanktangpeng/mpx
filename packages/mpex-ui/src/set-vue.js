const mpexTags = [
  'view'
]

function isMpexTag (tag) {
  return mpexTags.includes(tag)
}

export default function setVue (Vue) {
  var oldIsReservedTag = Vue.config.isReservedTag

  Vue.config.isReservedTag = function (tag) {
    if (isMpexTag(tag)) {
      return false
    } else {
      return oldIsReservedTag(tag)
    }
  }

  var oldGetTagNamespace = Vue.config.getTagNamespace

  Vue.config.getTagNamespace = function (tag) {
    if (!isMpexTag(tag)) {
      return oldGetTagNamespace(tag)
    }
  }
}
