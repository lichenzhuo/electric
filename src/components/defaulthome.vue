<template>
  <div class="home">
    <div id="map">
      <!-- <input type="text" v-model="text" @change="onchange"> -->
      <baidumap
        :locallist="listone"
        :listData="listtwo"
        @changemake="changemake"
        @lookwhole="lookwhole"
      ></baidumap>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%" header-cell-class-name="tablebg">
        <el-table-column align="center" label="地区">
          <template slot-scope="scope">
            <span>{{scope.row.Province}}{{scope.row.City}}{{scope.row.Area}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Created_AtStr" label="时间" width="90px"></el-table-column>
        <el-table-column align="center" prop="Address" label="具体地点"></el-table-column>
        <el-table-column align="center" prop="SiteName" label="站点"></el-table-column>
        <el-table-column align="center" prop="MachinaryId" label="机器编号"></el-table-column>
        <el-table-column align="center" label="I段母线总电压">
          <template slot-scope="scope">
            <span :class="[{'red':scope.row.I_VolState!==0,}]">{{scope.row.I_Bus_Voltage}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="I段母线正对地电压">
          <template slot-scope="scope">
            <span :class="[{'red':scope.row.I_Vol_OffsetState!==0,}]">{{scope.row.I_Position_Vol}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="I段母线负对地电压">
          <template slot-scope="scope">
            <span :class="[{'red':scope.row.I_Vol_OffsetState!==0,}]">{{scope.row.I_Negative_Vol}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="I段母线纹波">
          <template slot-scope="scope">
            <span :class="[{'red':scope.I_Bus_RippleState!==0,}]">{{scope.row.I_Bus_Ripple}}mV</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="I段母线交流电压">
          <template slot-scope="scope">
            <span :class="[{'red':scope.row.I_Bus_ACState!==0,}]">{{scope.row.I_Bus_AC_Vol}}V</span>
          </template>
        </el-table-column>
          <!-- 这里判断字段不清楚 ，接口字段文件里面有些。后续需要确定-->
        <el-table-column align="center" label="I段母线正对地绝缘">
          <template slot-scope="scope">
            <span
              :class="[{'red':scope.row.I_Bus_Ins_Abnormality!==0,}]"
            >{{scope.row.I_Positive_Ins}}K</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="I段母线负对地绝缘">
          <template slot-scope="scope">
            <span
              :class="[{'red':scope.row.I_Bus_Ins_Abnormality!==0,}]"
            >{{scope.row.I_Negative_Ins}}K</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="I段蓄电池绝缘">
          <template slot-scope="scope">
            <span :class="[{'red':scope.I_Battery_Alarm!==0,}]">{{scope.row.I_Battery_Ins}}K</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="I段蓄电接地点">
          <template slot-scope="scope">
            <span :class="[{'red':scope.row.I_Battery_Alarm!==0,}]">{{scope.row.I_Grounding_Point}}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="II段母线总电压">
          <template slot-scope="scope">
            <span :class="[{'red':scope.row.II_VolState!==0,}]">{{scope.row.II_Bus_Vol}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="II段母线正对地电压">
          <template slot-scope="scope">
            <span
              :class="[{'red':scope.row.II_Vol_OffsetState!==0,}]"
            >{{scope.row.II_Vol_OffsetState}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="II段母线负对地电压">
          <template slot-scope="scope">
            <span
              :class="[{'red':scope.row.II_Vol_OffsetState!==0,}]"
            >{{scope.row.II_Negative_Vol}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="II段母线纹波">
          <template slot-scope="scope">
            <span :class="[{'red':scope.row.II_Bus_RippleState!==0,}]">{{scope.row.II_Bus_Ripple}}mV</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="II段母线交流电压">
          <template slot-scope="scope">
            <span :class="[{'red':scope.row.II_Bus_ACState!==0,}]">{{scope.row.II_Bus_AC_Vol}}V</span>
          </template>
        </el-table-column>

      
        <el-table-column align="center" label="II段母线正对地绝缘">
          <template slot-scope="scope">
            <span
              :class="[{'red':scope.row.II_Bus_Ins_Abnormality!==0,}]"
            >{{scope.row.II_Positive_Ins}}K</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="II段母线负对地绝缘">
          <template slot-scope="scope">
            <span
              :class="[{'red':scope.row.II_Bus_Ins_Abnormality!==0,}]"
            >{{scope.row.II_Negative_Ins}}K</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="II段蓄电池绝缘">
          <template slot-scope="scope">
            <span :class="[{'red':scope.row.II_Battery_Alarm!==0,}]">{{scope.row.II_Battery_Ins}}K</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="II段蓄电接地点">
          <template slot-scope="scope">
            <span
              :class="[{'red':scope.row.II_Battery_Alarm!==0,}]"
            >{{scope.row.II_Grounding_Point}}</span>
          </template>
        </el-table-column>
        <!-- 21312323333333333333333 -->
        <el-table-column align="center" label="母联总绝缘">
          <template slot-scope="scope">
            <span :class="[{'red':scope.row.Bus_UnionStates!==0,}]">{{scope.row.Busbar_Total_Ins}}K</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支路号">
          <template slot-scope="scope">
            <span>{{scope.row.BranchNum}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支路所在母线段">
          <template slot-scope="scope">
            <span>{{scope.row.Branch_BusSection}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支路总绝缘">
          <template slot-scope="scope">
            <span>{{scope.row.Branch_Total_Ins}}K</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支路正绝缘">
          <template slot-scope="scope">
            <span>{{scope.row.Branch_Positive_Ins}}K</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支路负绝缘">
          <template slot-scope="scope">
            <span>{{scope.row.Branch_Negative_Ins}}K</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @current-change="handleSizeChange"
          background
          :page-size="5"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../http.js";
import Axios from "axios";
import baidumap from "./map";
export default {
  name: "defaulthome",
  components: {
    baidumap
  },
  data() {
    return {
      text: "",
      resdata: "",
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      listone: "",
      listtwo: "",
      arr: "", //带有id的地址数组
      total: ""
    };
  },
  beforeCreate() {},
  created() {
    this.Auther();
  },
  mounted() {
    // this.readymap();
    // this.getlocation();
  },
  methods: {
    Auther() {
      var CharacterId = localStorage.getItem("CharacterId");
      if (CharacterId) {
        this.getdata();
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    getdata() {
      // 首页数据
      this.$axios
        .post("/MachineData/GetErrorPageList", {
          ForePageSize: 5,
          PageIndex: 1
        })
        .then(res => {
          console.log(res.data.Data, "这是res");
          this.resdata = res.data.Data;
          this.tableData = res.data.Data;
          var arr = [];
          var arr1 = [];
          if (res.data.Data) {
            for (let i = 0; i < res.data.Data.length; i++) {
              arr.push(
                res.data.Data[i].Province +
                  res.data.Data[i].City +
                  res.data.Data[i].Area +
                  res.data.Data[i].Address
              );
            }
            for (let j = 0; j < res.data.Data.length; j++) {
              arr1.push({
                Id: res.data.Data[j].Id,

                local:
                  res.data.Data[j].Province +
                  res.data.Data[j].City +
                  res.data.Data[j].Area +
                  res.data.Data[j].Address
              });
            }
            this.arr = arr;
            this.listone = arr;
            this.listtwo = arr1;
            console.log(arr, "处理后的");
            console.log(arr1, "处理后的1");
          }
        });

      // 总数据数
      this.$axios.post("MachineData/GetErrorAllCount").then(res => {
        console.log(res.data.Data, "这是总数");
        this.total = res.data.Data;
      });
    },
    changemake(e) {
      console.log(e, "父");
      this.listone = this.listtwo[e].local;
      this.tableData = [this.resdata[e]];
    },
    lookwhole(e) {
      this.listone = this.arr;
      this.tableData = this.resdata;
    },
    handleSizeChange(e) {
      console.log(e, "111111");
      this.$axios
        .post("/MachineData/GetErrorPageList", {
          ForePageSize: 5,
          PageIndex: e
        })
        .then(res => {
          console.log(res.data.Data, "这是res");
          this.resdata = res.data.Data;
          this.tableData = res.data.Data;
          var arr = [];
          var arr1 = [];
          // {{scope.row.Province}}{{scope.row.City}}{{scope.row.Area}}
          if (res.data.Data) {
            for (let i = 0; i < res.data.Data.length; i++) {
              arr.push(
                res.data.Data[i].Province +
                  res.data.Data[i].City +
                  res.data.Data[i].Area +
                  res.data.Data[i].Address
              );
            }
            for (let j = 0; j < res.data.Data.length; j++) {
              arr1.push({
                Id: res.data.Data[j].Id,

                local:
                  res.data.Data[j].Province +
                  res.data.Data[j].City +
                  res.data.Data[j].Area +
                  res.data.Data[j].Address
              });
            }
            this.arr = arr;
            this.listone = arr;
            this.listtwo = arr1;
            console.log(arr, "处理后的");
            console.log(arr1, "处理后的1");
          }
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

.red {
  color: red;
}
</style>
