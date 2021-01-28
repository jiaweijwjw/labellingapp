<template>
<div>
  <div ref="target" v-if="label">
    <span :style="{ borderColor: color }" class="highlight bottom">
        <span class="highlight__content" @click="remove" v-shortkey="['space']" @shortkey="openDialog(labelId)">{{ content }}</span><span :data-label="label" :style="{ backgroundColor: color, color: textColor }" class="highlight__label" />
      </span>
  </div>
  <span v-else :class="[newline ? 'newline' : '']">{{ content }}</span>
</div>
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
    }
  },
  data () {
    return {
      showMenu: false
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
    openDialog (labelId) {
      console.log('openDialog' + labelId)
      this.$emit('opendialog', labelId)
    }
  }
}
</script>

<style scoped>
.highlight.blue {
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
  cursor: default;
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
  font-size: 12px;
  -webkit-font-smoothing: subpixel-antialiased;
  letter-spacing: .1em;
}
.newline {
  width: 100%;
}
</style>
