// import Vue from 'vue'
// import { colors } from 'quasar'
import { Loading } from 'quasar'
import { store } from '../store/index'
import { router } from '../router/index'

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
  },
  // autoChooseTextColor (hexColor) {
  //   if (colors.luminosity(hexColor) < 0.5) {
  //     return 'white'
  //   } else {
  //     return 'black'
  //   }
  // }
  autoChooseTextColor (hexColor) { // string type hexColor
    // https://www.w3.org/TR/AERT/#color-contrast
    const r = parseInt(hexColor.substr(1, 2), 16)
    const g = parseInt(hexColor.substr(3, 2), 16)
    const b = parseInt(hexColor.substr(5, 2), 16)
    return ((((r * 299) + (g * 587) + (b * 114)) / 1000) < 128) ? '#ffffff' : '#000000'
  },
  showLoadingForTime (time) {
    Loading.show()

    this.timer = setTimeout(() => {
      Loading.hide()
      this.timer = void 0
    }, time)
  },
  async resetStore () {
    store.dispatch('documents/resetState')
    store.dispatch('general/resetState')
    store.dispatch('labels/resetState')
    store.dispatch('projects/resetState')
    store.dispatch('classify/resetState')
    store.dispatch('settings/resetState')
  },
  logout () {
    this.resetStore().then(router.push({ name: 'AuthPage' }))
  }
}

export default ({ Vue }) => {
  Vue.prototype.$hf = helperFunctions
}

export { helperFunctions }
