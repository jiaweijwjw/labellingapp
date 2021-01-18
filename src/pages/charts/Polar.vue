<template>
  <q-page class="flex flex-center">
    <PolarChart
      :chart-data="polarChartData"
      :options="polarChartOptions"
      :width="500"
      :height="500"
    />
  </q-page>
</template>

<script>
import PolarChart from '../../components/PolarChart'
export default {
  name: 'Polar',
  components: { PolarChart },
  data: function () {
    return {
      polarChartData: {
        labels: ['Running', 'Swimming', 'Eating', 'Cycling'],
        datasets: [
          {
            backgroundColor: [
              'rgba(53,163,166,0.5)',
              'rgb(92,201,148,0.5)',
              'rgba(185,229,115,0.5)',
              'rgba(208,233,110,0.5)'
            ],
            borderColor: 'rgba(46,46,46,0.2)',
            data: [5.2, 4.4, 3.4, 4.1]
          },
          {
            backgroundColor: [
              'rgba(60,183,161,0.5)',
              'rgba(135,217,131,0.5)',
              'rgba(151,221,128,0.5)',
              'rgba(239,238,104,0.5)'
            ],
            borderColor: 'rgba(46,46,46,0.2)',
            data: [4.7, 5.3, 3.1, 2.9]
          }
        ]
      },
      polarChartOptions: {
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
