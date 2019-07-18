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
  name: "echartstwo",
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
          "II段母线正对地绝缘",
          "II段母线负对地绝缘",
          "II段蓄电池绝缘",
          "II段蓄电接地点"
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
          "II段母线总电压",
          "II段母线正对地电压",
          "II段母线负对地电压",
          "II段母线纹波",
          "II段母线交流电压",
          "II段母线正对地绝缘",
          "II段母线负对地绝缘",
          "II段蓄电池绝缘",
          "II段蓄电接地点"
        ],
        rows: [
          {
            日期: "7-18",
            II段母线总电压: "0",
            II段母线正对地电压: "0",
            II段母线负对地电压: "0",
            II段母线纹波: "0",
            II段母线交流电压: "0",
            II段母线正对地绝缘: "0",
            II段母线负对地绝缘: "0",
            II段蓄电池绝缘: "0",
            II段蓄电接地点: "0"
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
      this.chartData = this.$store.state.EchartsDatatwo;
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
