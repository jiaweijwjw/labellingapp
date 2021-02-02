<template>
<span class="words">
  <span v-if="label">
    <span :style="{ borderColor: color }" class="highlight bottom" @mouseover="hover = true" @mouseleave="hover = false">
      <span class="highlight__box no-margin no-padding">
        <span class="highlight__content" v-shortkey="['space']">{{ content }}</span>
        <span :data-label="label" :style="{ backgroundColor: color, color: textColor }" class="highlight__label" />
      </span>
    <span class="highlight__options no-margin" :style="{ backgroundColor: color, color: textColor }">
      <q-btn v-if="hover" class="close-btn" @click="remove" flat dense size="xs" icon="close"/>
      <q-btn v-if="hover" class="change-label" @click="openDialog(labelId, entityId)" flat dense size="xs" icon="edit"/>
        <!-- <q-expansion-item dense class="highlight__options no-margin no-padding">
          <q-list><q-item-label>test</q-item-label></q-list>
          </q-expansion-item> -->
      </span>
      </span>
      <!-- <q-btn v-if="hover" class="close-btn" round dense size="xs" icon="close" style="background: goldenrod; color: black"/> -->
  </span>
  <span v-else :class="[newline ? 'newline' : (isValidSelection ? 'green' : '')]">{{ content }}</span>
</span>
</template>

<script>

export default {
  props: {
    content: {
      type: String,
      default: '',
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#64FFDA'
    },
    labels: {
      type: Array,
      default: () => [],
      required: true
    },
    newline: {
      type: Boolean
    },
    labelId: {
      type: String,
      default: ''
    },
    isValidSelection: {
      type: Boolean
    },
    entityId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showMenu: false,
      hover: false
    }
  },
  computed: {
    textColor () {
      return this.$hf.autoChooseTextColor(this.color)
    }
  },
  methods: {
    update (label) {
      this.$emit('update', label)
      // this.showMenu = false
    },
    remove () {
      this.$emit('remove')
    },
    autoTextColor (color) {
      return this.$hf.autoChooseTextColor(color)
    },
    openDialog (labelId, entityId) {
      let highlightedChunk = {
        currentLabelId: labelId,
        entityId: entityId
      }
      this.$emit('opendialog', highlightedChunk)
    }
  }
}
</script>

<style scoped>
.highlight {
  border: 2px solid;
  margin: 1px 3px 1px 3px;
  vertical-align: baseline;
  /* vertical-align: middle; */
  box-shadow: 2px 4px 20px rgba(0,0,0,.1);
  position: relative;
  cursor: pointer;
  min-width: 26px;
  /* line-height: 22px; */
  line-height: 100%;
  display: inline-flex;
}
.highlight__box {
  display:inline-block;
}
.highlight__content {
  /* display: block; */
  display: block;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  /* padding: 2px 2px 0px 6px; */
  padding: 5px 5px 5px 5px;
}
.highlight__label {
  line-height: 100%;
  padding-top: 0px;
  margin-bottom: -2px;
  align-items: center;
  justify-content: center;
  /* display: flex; */
  display: flex;
  /* padding: 0 8px; */
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: white;
}
.highlight__label::after {
  content: attr(data-label);
  display: block;
  font-size: 0.65em;
  -webkit-font-smoothing: subpixel-antialiased;
  letter-spacing: .1em;
}
.highlight:first-child {
  margin-left: 0;
}
.highlight.bottom .highlight__content:after {
  content: "";
  padding-right: 0px;
}
.highlight.bottom {
  display: inline-flex;
  /* display: inline-block; */
  white-space: normal;
}
.highlight__options {
  display: inline-flex;
  flex-flow: column;
  justify-content: space-evenly;
  align-items: center;
}
.close-btn {
  /* position: relative;
  top: -3px;
  right: -3px; */
  padding-left: 2px;
  /* to account for border */
}
.change-label {
  padding-left: 2px;
}
.words {
  font-size: 1.2em;
}
.newline {
  width: 100%;
}
span.green::selection {
  background: rgba(226, 255, 224, 0.99);
  color:  black
}
span.green::-moz-selection {
  background: rgba(226, 255, 224, 0.99);
  color:  black
}
span.red::selection {
  background: rgba(255, 217, 217, 0.99);
  color:  black
}
span.red::-moz-selection {
  background: rgba(255, 217, 217, 0.99);
  color:  black
}
/* .highlight.blue {
  background: #edf4fa !important;
}
.highlight.bottom {
  display: block;
  white-space: normal;
}
.highlight:first-child {
  margin-left: 0;
}
.highlight {
  border: 2px solid;
  margin: 4px 6px 4px 3px;
  vertical-align: middle;
  box-shadow: 2px 4px 20px rgba(0,0,0,.1);
  position: relative;
  cursor: pointer;
  min-width: 26px;
  line-height: 22px;
  display: flex;
}
.highlight .delete {
  top:-15px;
  left:-13px;
  position:absolute;
  display: none;
}
.highlight:hover .delete {
  display: block;
}
.highlight__content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 2px 2px 0px 6px;
}
.highlight.bottom .highlight__content:after {
  content: " ";
  padding-right: 3px;
}
.highlight__label {
  line-height: 14px;
  padding-top: 1px;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 0 8px;
  text-align: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: white;
}
.highlight__label::after {
  content: attr(data-label);
  display: block;
  font-size: 14px;
  -webkit-font-smoothing: subpixel-antialiased;
  letter-spacing: .1em;
}
.newline {
  width: 100%;
} */
</style>
