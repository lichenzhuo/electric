<template>
  <div class="home">
    <div class="map">
      <img src="../assets/map.jpeg" alt srcset>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" prop="0" label="地区" width="60"></el-table-column>
        <el-table-column align="center" prop="1" label="具体地点"></el-table-column>
        <el-table-column align="center" prop="2" label="站点" width="70"></el-table-column>
        <el-table-column align="center" prop="3" label="机器编号" width="80"></el-table-column>
        <el-table-column align="center" prop="4" label="母线电压" width="80"></el-table-column>
        <el-table-column align="center" prop="5" label="正极电压" width="80"></el-table-column>
        <el-table-column align="center" prop="6" label="负极电压" width="80"></el-table-column>
        <el-table-column align="center" prop="7" label="正负压值" width="80"></el-table-column>
        <el-table-column align="center" prop="8" label="交流电压" width="80"></el-table-column>
        <el-table-column align="center" prop="9" label="纹波电压" width="80"></el-table-column>
        <el-table-column align="center" prop="10" label="正极绝缘" width="80"></el-table-column>
        <el-table-column align="center" prop="11" label="负极绝缘" width="80"></el-table-column>
        <el-table-column align="center" prop="12" label="母联绝缘" width="80"></el-table-column>
        <el-table-column align="center" prop="13" label="预警消息"></el-table-column>
        <el-table-column align="center" prop="14" label="报警消息"></el-table-column>
        <el-table-column align="center" prop="15" label="支路绝缘" width="80"></el-table-column>
        <el-table-column align="center" prop="16" label="查看详情" width="100">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" round @click="gotowarn(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import https from "../http.js";
export default {
  name: "defaulthome",
  data() {
    return {
      tableData: [
        // {
        //   id: "0",
        //   0: "杭州",
        //   1: "杭州上城区太和广场1102室阿斯顿撒多",
        //   2: "1",
        //   3: "xj-1203",
        //   4: "215",
        //   5: "19",
        //   6: "-24",
        //   7: "100",
        //   8: "220",
        //   9: "10",
        //   10: "50",
        //   11: "2",
        //   12: "35",
        //   13: "2019-05-21 17:16:30",
        //   14: "正极电压过高",
        //   15: "15/30"
        // },
        // {
        //   id: 1,
        //   0: "杭州",
        //   1: "杭州上城区太和广场1102室阿斯顿撒多",
        //   2: "1号",
        //   3: "xj-1203",
        //   4: "215v",
        //   5: "19v",
        //   6: "-24v",
        //   7: "100v",
        //   8: "220v",
        //   9: "10m",
        //   10: "50v",
        //   11: "2k",
        //   12: "35k",
        //   13: "2019-05-21 17:16:30",
        //   14: "正极电压过高",
        //   15: "15号/30k"
        // },
        // {
        //   id: 2,
        //   0: "杭州",
        //   1: "杭州上城区太和广场1102室阿斯顿撒多",
        //   2: "1号",
        //   3: "xj-1203",
        //   4: "215v",
        //   5: "19v",
        //   6: "-24v",
        //   7: "100v",
        //   8: "220v",
        //   9: "10m",
        //   10: "50v",
        //   11: "2k",
        //   12: "35k",
        //   13: "2019-05-21 17:16:30",
        //   14: "正极电压过高",
        //   15: "15号/30k"
        // },
        // {
        //   id: 3,
        //   0: "杭州",
        //   1: "杭州上城区太和广场1102室",
        //   2: "1号",
        //   3: "xj-1203",
        //   4: "215v",
        //   5: "19v",
        //   6: "-24v",
        //   7: "100v",
        //   8: "220v",
        //   9: "10m",
        //   10: "50v",
        //   11: "2k",
        //   12: "35k",
        //   13: "2019-05-21 17:16:30",
        //   14: "正极电压过高",
        //   15: "15号/30k"
        // },
        // {
        //   id: 4,
        //   0: "杭州",
        //   1: "杭州上城区",
        //   2: "1号",
        //   3: "xj-1203",
        //   4: "215v",
        //   5: "19v",
        //   6: "-24v",
        //   7: "100v",
        //   8: "220v",
        //   9: "10m",
        //   10: "50v",
        //   11: "2k",
        //   12: "35k",
        //   13: "2019-05-21 17:16:30",
        //   14: "正极电压过高",
        //   15: "15号/30k"
        // }
      ]
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    gotowarn(row) {
      // console.log(index)
      console.log(row.id);
      // console.log(id)
      this.$router.push({
        name: "singalwarn",
        params: {
          id: row.id
        }
      });
    },
    getdata() {
      https.Get("/warnlist").then(res => {
        console.log(res.data.Data.tableData, "这是res");
        this.tableData = res.data.Data.tableData
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.home {
  width: 95%;
  padding: 20px;

  .map {
    width: 99%;
    padding: 10px;
    background-color: #ffffff;

    img {
      width: 100%;
      height: 500px;
    }
  }

  .table {
    text-align: center;
    margin-top: 30px;
    padding: 10px;
    background-color: #ffffff;
  }
}
</style>
