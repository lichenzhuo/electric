<template>
  <ve-line :data="chartData" :settings="chartSettings"></ve-line>
  <!-- :mark-line="markLine" -->
</template>

<script>
// export default {
//   name: 'HelloWorld',
//   props: {
//     msg: String
//   },
// }
export default {
  name: "echarts",
  data() {
    //标线
    // this.markLine = {
    //   data: [
    //     {
    //       name: "母线电压警戒线",
    //       yAxis: 220
    //     },
    //     {
    //       name: "正极电压警戒线",
    //       yAxis: 20
    //     }
    //   ]
    // };
    this.chartSettings = {
      axisSite: {
        right: [
          "I段母线正对地绝缘",
          "I段母线负对地绝缘",
          "I段蓄电池绝缘",
          "I段蓄电接地点"
        ]
      },
      yAxisType: ["normal"],
      yAxisName: ["电压", "电阻"]
    };
    return {
      chartData: {},
      demoList: {
        columns: [
          "日期",
          "I段母线总电压",
          "I段母线正对地电压",
          "I段母线负对地电压",
          "I段母线纹波",
          "I段母线交流电压",
          "I段母线正对地绝缘",
          "I段母线负对地绝缘",
          "I段蓄电池绝缘",
          "I段蓄电接地点"
        ],
        rows: [
          {
            日期: "7-18",
            I段母线总电压: "0",
            I段母线正对地电压: "0",
            I段母线负对地电压: "0",
            I段母线纹波: "0",
            I段母线交流电压: "0",
            I段母线正对地绝缘: "0",
            I段母线负对地绝缘: "0",
            I段蓄电池绝缘: "0",
            I段蓄电接地点: "0"
          }
         
        ]
      }
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    DataInit() {
      console.log("022222222");
      console.log(this.$store.state.EchartsData, "111");
      console.log(this.chartData, "222");
      this.chartData = this.$store.state.EchartsData;
    },
    init() {
      this.chartData = this.demoList;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
