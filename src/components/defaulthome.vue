<template>
  <div class="home">
    <div id="map">
      <baidumap></baidumap>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%" header-cell-class-name="tablebg">
        <el-table-column align="center" prop="0" label="地区" width="60"></el-table-column>
        <el-table-column align="center" prop="1" label="具体地点" width="160"></el-table-column>
        <el-table-column align="center" prop="2" label="站点"></el-table-column>
        <el-table-column align="center" prop="3" label="机器编号"></el-table-column>
        <el-table-column align="center" prop="4" label="母线电压"></el-table-column>
        <el-table-column align="center" prop="5" label="正极电压"></el-table-column>
        <el-table-column align="center" prop="6" label="负极电压"></el-table-column>
        <el-table-column align="center" prop="7" label="正负压值"></el-table-column>
        <el-table-column align="center" prop="8" label="交流电压"></el-table-column>
        <el-table-column align="center" prop="9" label="纹波电压"></el-table-column>
        <el-table-column align="center" prop="10" label="正极绝缘"></el-table-column>
        <el-table-column align="center" prop="11" label="负极绝缘"></el-table-column>
        <el-table-column align="center" prop="12" label="母联绝缘"></el-table-column>
        <el-table-column align="center" prop="13" label="预警时间" width="160"></el-table-column>
        <el-table-column align="center" prop="14" label="报警信息" width="160"></el-table-column>
        <el-table-column align="center" prop="15" label="支路绝缘"></el-table-column>
        <el-table-column align="center" prop="16" label="查看详情" width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" round @click="gotowarn(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import https from "../http.js";
import Axios from "axios";
import baidumap from "./map";
export default {
  name: "defaulthome",
  components:{
    baidumap
  },
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
      ],
      currentPage: 1,
      pagesize: 10
    };
  },
  mounted() {
    // this.getdata();
    // this.readymap();
    // this.getlocation();
  },
  methods: {
    readymap() {
      var map = new BMap.Map("map");
      map.centerAndZoom("阜阳", 8);
      map.enableScrollWheelZoom(true);
      var point = new BMap.Point(115.62861546970402, 33.16595985009563);

      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker); // 将标注添加到地图中
      // marker.setAnimation(BMAP_ANIMATION_BOUNCE);
    },
    gotowarn(row) {
      console.log(row.id);
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
        this.tableData = res.data.Data.tableData;
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    getlocation() {
      Axios
        .get(
          "http://api.map.baidu.com/geocoder/v2/?address=太和县&output=json&ak=z7TojHQEi0GxfxXkhKtTUzjlKYXrOdbP&callback=showLocation"
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.home {
  width: 100%;
  margin-top: 20px;

  #map {
    width: 99%;
    padding: 10px;
    background-color: #ffffff;
    height: 500px;

    img {
      width: 100%;
      height: 500px;
    }
  }

  .table {
    text-align: center;
    padding: 20px;
    background-color: #ffffff;
  }
}

.tablebg {
  background-color: #409EFF;
  color: #ffffff;
  font-size: 18px;
}

.page {
  text-align: right;
  margin-top: 20px;
  padding-bottom: 50px;
}
</style>
