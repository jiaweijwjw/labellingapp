<template>
  <div>
<q-table
      :data="[...labels,...customLabels]"
      :columns="columns"
      row-key="name"
      dark
      color="amber"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      columns: [
        {
          name: 'labelname',
          required: true,
          label: 'Label Name',
          align: 'left',
          field: labels => labels.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'shortcutkey',
          align: 'left',
          label: 'Short Cut Key',
          field: 'shortcutkey',
          sortable: true
        },
        {
          name: 'color',
          align: 'left',
          label: 'Color',
          field: 'color',
          sortable: true
        }
        // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
      ],
      data: [
        {
          name: 'Person',
          shortcutkey: 'p',
          color: 159
        },
        {
          name: 'Location',
          shortcutkey: 'l',
          color: 237
        },
        {
          name: 'Organization',
          shortcutkey: 'o',
          color: 262
        }
      ]
    }
  },
  computed: {
    ...mapGetters('labels', ['labels', 'customLabels'])
  }
}
</script>

<style lang="sass" scoped>
</style>
