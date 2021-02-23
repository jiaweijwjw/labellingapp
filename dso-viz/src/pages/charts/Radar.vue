<template>
  <q-page class="flex flex-center">
    <RadarChart
      :chart-data="radarChartData"
      :options="radarChartOptions"
      :width="500" :height="500"
    />
  </q-page>
</template>

<script>
import RadarChart from '../../components/RadarChart'
export default {
  name: 'Radar',
  components: { RadarChart },
  data: function () {
    return {
      radarChartData: {
        labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
        datasets: [{
          label: 'Intensity',
          backgroundColor: ['rgba(38,166,154,0.5)'],
          borderColor: ['rgba(46,46,46,0.2)'],
          data: [5.2, 4.4, 3.4, 4.1]
        },
        {
          label: 'Performance',
          backgroundColor: ['rgba(92,201,148,0.5)'],
          borderColor: ['rgba(46,46,46,0.2)'],
          data: [4.7, 5.3, 3.1, 2.9]
        }]
      },
      radarChartOptions: {
        legend: {
          display: true,
          labels: {
            boxWidth: 12
          }
        },
        scale: {
          ticks: {
            fontColor: 'white',
            min: 0,
            max: 6,
            backdropColor: 'transparent'
          },
          gridLines: {
            color: 'rgb(46,46,46)',
            lineWidth: 2,
            zeroLineColor: 'rgb(46,46,46)',
            zeroLineWidth: 2
          }
        },
        layout: {
          padding: {
            bottom: 2 // so that the chart doesn't get cut off
          }
        }
      }
    }
  }
}
</script>
