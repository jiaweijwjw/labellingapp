// import Vue from 'vue'

const helperFunctions = {
  // Name validation
  unavailableNames (labels) {
    const usedNames = labels.map(item => item.name)
    return usedNames
  },
  unavailableColors (labels) {
    const usedColors = labels.map(item => item.color)
    return usedColors
  },
  checkAvailability (usedField, inputField) {
    for (var i = 0; i < usedField.length; i++) {
      if (this.toTitleCase(inputField).includes(usedField[i])) {
        return false
      }
    }
    return true
  },
  isHex (str) {
    let regexp = /^#[0-9A-F]{6}$/i
    if (regexp.test(str)) {
      return true
    } else {
      return false
    }
  },
  toTitleCase (str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      }
    )
  }
}

export default ({ Vue }) => {
  Vue.prototype.$hf = helperFunctions
}
