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
</template>

<script setup>
import Icon from "U#/Icon.vue";
import LineChart from "D#/charts/LineChart.vue";
import { computed, onMounted, ref } from "vue";
const open = ref(false);
const chartHeight = ref("100%");

onMounted(() => {
  const element = document.getElementById("chart");
  const style = getComputedStyle(element);
  chartHeight.value = (element.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)) + "px";
});

</script>

<style lang="sass" scoped>
  img
    width: 48px
    height: 48px
    margin-right: 1em

  .title
    font-weight: 600
    margin-right: 1em

  tr
    border-bottom: 1px solid $text-secondary

  td
    padding: 1em
    &:last-child
      text-align: right
      
</style>