<template>
  <div class="home">
    <div class="map">
      <img src="../assets/map.jpeg" alt srcset>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="0" label="地区" width="60"></el-table-column>
        <el-table-column prop="1" label="具体地点"></el-table-column>
        <el-table-column prop="2" label="站点" width="70"></el-table-column>
        <el-table-column prop="3" label="机器编号" width="80"></el-table-column>
        <el-table-column prop="4" label="母线电压" width="80"></el-table-column>
        <el-table-column prop="5" label="正极电压" width="80"></el-table-column>
        <el-table-column prop="6" label="负极电压" width="80"></el-table-column>
        <el-table-column prop="7" label="正负压值" width="80"></el-table-column>
        <el-table-column prop="8" label="交流电压" width="80"></el-table-column>
        <el-table-column prop="9" label="纹波电压" width="80"></el-table-column>
        <el-table-column prop="10" label="正极绝缘" width="80"></el-table-column>
        <el-table-column prop="11" label="负极绝缘" width="80"></el-table-column>
        <el-table-column prop="12" label="母联绝缘" width="80"></el-table-column>
        <el-table-column prop="13" label="预警消息"></el-table-column>
        <el-table-column prop="14" label="报警消息"></el-table-column>
        <el-table-column prop="15" label="支路绝缘" width="80"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "defaulthome",
  methods: {},
  data() {
    return {
      tableData: [
        {
          0: "杭州",
          1: "杭州上城区太和广场1102室阿斯顿撒多",
          2: "1号",
          3: "xj-1203",
          4: "215v",
          5: "19v",
          6: "-24v",
          7: "100v",
          8: "220v",
          9: "10m",
          10: "50v",
          11: "2k",
          12: "35k",
          13: "2019-05-21 17:16:30",
          14: "正极电压过高",
          15: "15号/30k"
        },
        {
          0: "杭州",
          1: "杭州上城区太和广场1102室阿斯顿撒多",
          2: "1号",
          3: "xj-1203",
          4: "215v",
          5: "19v",
          6: "-24v",
          7: "100v",
          8: "220v",
          9: "10m",
          10: "50v",
          11: "2k",
          12: "35k",
          13: "2019-05-21 17:16:30",
          14: "正极电压过高",
          15: "15号/30k"
        },
        {
          0: "杭州",
          1: "杭州上城区太和广场1102室阿斯顿撒多",
          2: "1号",
          3: "xj-1203",
          4: "215v",
          5: "19v",
          6: "-24v",
          7: "100v",
          8: "220v",
          9: "10m",
          10: "50v",
          11: "2k",
          12: "35k",
          13: "2019-05-21 17:16:30",
          14: "正极电压过高",
          15: "15号/30k"
        },
        {
          0: "杭州",
          1: "杭州上城区太和广场1102室",
          2: "1号",
          3: "xj-1203",
          4: "215v",
          5: "19v",
          6: "-24v",
          7: "100v",
          8: "220v",
          9: "10m",
          10: "50v",
          11: "2k",
          12: "35k",
          13: "2019-05-21 17:16:30",
          14: "正极电压过高",
          15: "15号/30k"
        },
        {
          0: "杭州",
          1: "杭州上城区",
          2: "1号",
          3: "xj-1203",
          4: "215v",
          5: "19v",
          6: "-24v",
          7: "100v",
          8: "220v",
          9: "10m",
          10: "50v",
          11: "2k",
          12: "35k",
          13: "2019-05-21 17:16:30",
          14: "正极电压过高",
          15: "15号/30k"
        }
      ]
    };
  }
};
</script>

<style lang="stylus" scoped>
.home {
  width: 95%;
  padding: 20px;

  .map {
    width: 99%;
    padding 10px
    background-color #ffffff
    img {
      width: 100%;
      height: 500px;
    }
  }

  .table {
    text-align: center;
    margin-top 30px
    padding 10px
    background-color #ffffff
  }
}
</style>
