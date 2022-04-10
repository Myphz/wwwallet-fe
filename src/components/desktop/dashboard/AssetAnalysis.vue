<template>
  <tr class="h4 bg-base transition" @click="open = !open">
    <td class="align-center">
      <Icon icon="bitcoin" class="icon" />
      <span class="title">Bitcoin</span>
      <span class="ticker">BTC</span>
    </td>
    <td>+20.32%</td>
    <td>+$30,231.42</td>
    <td id="chart">
      <div :style="'width: 50%; height: ' + chartHeight">
        <LineChart />
      </div>
    </td>
    <td>
      <span :class="'arrow ' + (open ? 'open' : '')"></span>
    </td>
  </tr>
  <tr :class="'transactions-row ' + (open ? 'row-open' : '')">
    <td colspan="5">
      <TransactionsAnalysis />
    </td>
  </tr>
</template>

<script setup>
import Icon from "U#/Icon.vue";
import LineChart from "D#/charts/LineChart.vue";
import { onMounted, ref } from "vue";
const open = ref(false);
// Initial height of the cell. It needs to be modified to make the echarts library work by setting an explicit amount in pixels
const chartHeight = ref("100%");

// Hook to convert the chart cell height to pixels (to make echarts library work, as the height needs to be explicit)
onMounted(() => {
  // Get the cell element
  const element = document.getElementById("chart");
  // Get the style element
  const style = getComputedStyle(element);
  // Calculate the height by subtracting the element height to the padding top and bottom
  chartHeight.value = (element.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)) + "px";
});

</script>

<style lang="sass" scoped>
  img
    width: 48px
    height: 48px
    margin-right: 1em

  tr
    border-bottom: 1px solid $primary

  td
    padding: 1em
    &:last-child
      text-align: right

  .transactions-row
    background-color: darken($bg-base, 2%)
    display: none

  .row-open
    display: table-row
      
</style>