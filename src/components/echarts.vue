<template>
  <ve-line :data="chartData"></ve-line>
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

    return {
      chartData: "",
      demoList: {
        columns: [
          "日期",
          "一段母线电压",
          "一段正对地电压",
          "一段负对地电压",
          "一段正对地电阻",
          "一段负对地电阻",
          "一段对地交流电压",
          "二段母线电压",
          "二段正对地电压",
          "二段负对地电压",
          "二段正对地电阻",
          "二段负对地电阻",
          "二段对地交流电压",
          "支路号",
          "支路正绝缘",
          "支路负绝缘",
          "支路电容"
        ],
        rows: [
          {
            日期: "2019-06-27",
            一段母线电压: "0",
            一段正对地电压: "0",
            一段负对地电压: "0",
            一段正对地电阻: "0",
            一段负对地电阻: "0",
            一段对地交流电压: "0",
            二段母线电压: "0",
            二段正对地电压: "0",
            二段负对地电压: "0",
            二段正对地电阻: "00",
            二段负对地电阻: "0",
            二段对地交流电压: "0",
            支路号: "0",
            支路正绝缘: "0",
            支路负绝缘: "0",
            支路电容: "0"
          }
        ]
      }
    };
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    DataInit() {
      console.log("022222222");
      console.log(this.$store.state.EchartsData, "111");
      console.log(this.chartData, "222");
      this.chartData = this.$store.state.EchartsData;
    },
    init(){
      this.chartData=this.demoList
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
