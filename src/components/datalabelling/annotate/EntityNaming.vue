<template>
  <div
    v-if='entities'
    class="highlight-container highlight-container--bottom-labels"
  >
    <entityitem
      v-for="(chunk, i) in chunks"
      :key="i"
      :content="chunk.text"
      :newline="chunk.newline"
      :label="chunk.label"
      :color="chunk.color"
      :labels="labels"
      @remove="deleteAnnotation(chunk.id)"
      @update="updateEntity($event.id, chunk.id)"
    />
    <!-- <q-menu
      v-model="showMenu"
    >
      <q-list
        dense
        min-width="150"
        max-height="400"
        class="overflow-y-auto"
      >
        <q-item
          class="row"
          v-close-popup
          clickable
          v-for="(label, i) in labels"
          :key="i"
          v-shortkey="[label.shortcutkey]"
          @shortkey="assignLabel(label.id)"
          @click="assignLabel(label.id)"
        >
          <q-item-section class="col-10">
            <q-item-label v-text="label.name" />
          </q-item-section>
          <q-item-section class="col-2">
            <q-item-label v-text="label.shortcutkey" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu> -->
  </div>
<div v-else>{{text}}</div>
</template>

<script>

export default {
  components: {
    entityitem: require('components/datalabelling/annotate/EntityItem.vue').default
  },
  props: {
    text: {
      type: String,
      default: '',
      required: true
    },
    labels: {
      type: Array,
      default: () => ([]),
      required: true
    },
    entities: { // annotations
      type: Array,
      default: () => ([]),
      required: true
    },
    deleteAnnotation: {
      type: Function,
      default: () => ([]),
      required: true
    },
    updateEntity: {
      type: Function,
      default: () => ([]),
      required: true
    },
    addEntity: {
      type: Function,
      default: () => ([]),
      required: true
    }
  },
  data () {
    return {
      showMenu: false,
      x: 0,
      y: 0,
      start: 0,
      end: 0
    }
  },
  computed: {
    sortedEntities () { // sort the entities by which come first in the paragraph
      return this.entities.slice().sort((a, b) => a.start_offset - b.start_offset)
    },

    chunks () {
      let chunks = []
      const entities = this.sortedEntities
      let startOffset = 0
      for (const entity of entities) {
        // add non-entities to chunks.
        chunks = chunks.concat(this.makeChunks(this.text.slice(startOffset, entity.start_offset)))
        startOffset = entity.end_offset

        // add entities to chunks.
        const label = this.labelObject[entity.label] // find the matching label that entity is having in the labelobject
        chunks.push({
          id: entity.id,
          label: label.name,
          color: label.color,
          text: this.text.slice(entity.start_offset, entity.end_offset)
        })
      }
      // add the rest of text.
      chunks = chunks.concat(this.makeChunks(this.text.slice(startOffset, this.text.length)))
      return chunks
    },

    labelObject () { // making array of labels into an object of objects format. property name is label.id
      const obj = {}
      for (const label of this.labels) {
        obj[label.id] = label // objectName.propertyName same as objectName["propertyName"]
      }
      return obj
    }
  },
  methods: {
    makeChunks (text) {
      const chunks = []
      const snippets = text.split('\n')
      for (const snippet of snippets.slice(0, -1)) {
        chunks.push({
          label: null,
          color: null,
          text: snippet + '\n',
          newline: false
        })
        chunks.push({
          label: null,
          color: null,
          text: '',
          newline: true
        })
      }
      chunks.push({
        label: null,
        color: null,
        text: snippets.slice(-1)[0],
        newline: false
      })
      return chunks
    },
    show (e) {
      e.preventDefault()
      console.log('entered show()')
      this.showMenu = false
      // this.x = e.clientX || e.changedTouches[0].clientX
      // this.y = e.clientY || e.changedTouches[0].clientY
      // this.$nextTick(() => {
      //   this.showMenu = true
      // })
    },
    setSpanInfo () {
      let selection
      // Modern browsers.
      if (window.getSelection) {
        selection = window.getSelection()
      } else if (document.selection) {
        selection = document.selection // IE < 9
      }
      // If nothing is selected.
      if (selection.rangeCount <= 0) { // once clicked, count will be 1
        return
      }
      const range = selection.getRangeAt(0)
      const preSelectionRange = range.cloneRange()
      preSelectionRange.selectNodeContents(this.$el)
      preSelectionRange.setEnd(range.startContainer, range.startOffset)
      this.start = [...preSelectionRange.toString()].length
      this.end = this.start + [...range.toString()].length
      console.log('start: ' + this.start + ' end: ' + this.end)
    },
    validateSpan () {
      if ((typeof this.start === 'undefined') || (typeof this.end === 'undefined')) {
        return false
      }
      if (this.start === this.end) {
        return false
      }
      for (const entity of this.entities) {
        if ((entity.start_offset <= this.start) && (this.start < entity.end_offset)) {
          return false
        }
        if ((entity.start_offset < this.end) && (this.end <= entity.end_offset)) {
          return false
        }
        if ((this.start < entity.start_offset) && (entity.end_offset < this.end)) {
          return false
        }
      }
      return true
    },
    open (e) {
      console.log('clicked')
      this.setSpanInfo()
      if (this.validateSpan()) {
        console.log('is valid span')
        this.show(e)
      }
    },
    assignLabel (labelId) {
      if (this.validateSpan()) {
        this.addEntity(this.start, this.end, labelId)
        this.showMenu = false
        this.start = 0
        this.end = 0
      }
    }
  }
}
</script>

<style scoped>
.highlight-container.highlight-container--bottom-labels {
  align-items: flex-start;
}
.highlight-container {
  line-height: 42px !important;
  display: flex;
  flex-wrap: wrap;
  white-space: pre-wrap;
  cursor: default;
}
.highlight-container.highlight-container--bottom-labels .highlight.bottom {
  margin-top: 6px;
}
</style>
