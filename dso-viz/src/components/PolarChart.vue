<script>
import { PolarArea, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: PolarArea,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    this.addPlugin({
      beforeInit: function (chart) {
        chart.legend.afterFit = function () {
          // increase spacing between legend and chart
          this.height = this.height + 18
        }
      }
    })
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style scoped>
</style>
