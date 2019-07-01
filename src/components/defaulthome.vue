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
        <el-table-column align="center" prop="Area" label="地区"></el-table-column>
        <el-table-column align="center" prop="Address" label="具体地点"></el-table-column>
        <el-table-column align="center" prop="SiteName" label="站点"></el-table-column>
        <el-table-column align="center" prop="MachinaryId" label="机器编号"></el-table-column>
        <el-table-column align="center" prop="One_Bus_Voltage" label="一段母线电压">
          <template scope="scope">
            <span>{{scope.row.One_Bus_Voltage}}V</span>
            <!-- <span v-if="scope.row.One_Bus_Voltage=='220'">{{scope.row.One_Bus_Voltage}}V</span>
            <span v-else style="color: red">{{scope.row.One_Bus_Voltage}}V</span>-->
          </template>
        </el-table-column>
        <el-table-column align="center" prop="One_Positive_Voltage" label="一段正对地电压">
          <template scope="scope">
            <span>{{scope.row.One_Positive_Voltage}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="One_Negative_Voltage" label="一段负对地电压">
          <template scope="scope">
            <span>{{scope.row.One_Positive_Voltage}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="One_Positive_Resistance" label="一段正对地电阻">
          <template scope="scope">
            <span>{{scope.row.One_Positive_Resistance}}kΩ</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="One_Negative_Resistance" label="一段负对地电阻">
          <template scope="scope">
            <span>{{scope.row.One_Negative_Resistance}}kΩ</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="One_AC_Voltage" label="一段对地交流电压">
          <template scope="scope">
            <span>{{scope.row.One_AC_Voltage}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Two_Bus_Voltage" label="二段母线电压">
          <template scope="scope">
            <span>{{scope.row.Two_Bus_Voltage}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Two_Positive_Voltage" label="二段正对地电压">
          <template scope="scope">
            <span>{{scope.row.Two_Positive_Voltage}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Two_Negative_Voltage" label="二段负对地电压">
          <template scope="scope">
            <span>{{scope.row.Two_Negative_Voltage}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Two_Positive_Resistance" label="二段正对地电阻">
          <template scope="scope">
            <span>{{scope.row.Two_Positive_Resistance}}kΩ</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Two_Negative_Resistance" label="二段负对地电阻">
          <template scope="scope">
            <span>{{scope.row.Two_Negative_Resistance}}kΩ</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Two_AC_Voltage" label="二段对地交流电压">
          <template scope="scope">
            <span>{{scope.row.Two_AC_Voltage}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="BranchNum" label="支路号">
          <template scope="scope">
            <span>{{scope.row.BranchNum}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Positive_Insulation" label="支路正绝缘">
          <template scope="scope">
            <span>{{scope.row.Positive_Insulation}}kΩ</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Negative_Insulation" label="支路负绝缘">
          <template scope="scope">
            <span>{{scope.row.Negative_Insulation}}kΩ</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="Capacitance" label="支路电容">
          <template scope="scope">
            <span>{{scope.row.Capacitance}}uF</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="10"
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
      arr: "" //带有id的地址数组
    };
  },
  beforeCreate() {
   
  },
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
      }else{
        this.$router.push({ path: "/login" });
      }
    },
    getdata() {
      this.$axios
        .post("/MachineData/GetErrorPageList", {
          ForePageSize: 6,
          PageIndex: 1
        })
        .then(res => {
          console.log(res.data.Data, "这是res");
          this.resdata = res.data.Data;
          this.tableData = res.data.Data;
          var arr = [];
          var arr1 = [];
          for (let i = 0; i < res.data.Data.length; i++) {
            arr.push(res.data.Data[i].Area + res.data.Data[i].Address);
          }
          for (let j = 0; j < res.data.Data.length; j++) {
            arr1.push({
              Id: res.data.Data[j].Id,
              local: res.data.Data[j].Area + res.data.Data[j].Address
            });
          }
          this.arr = arr;
          this.listone = arr;
          this.listtwo = arr1;
          console.log(arr, "处理后的");
          console.log(arr1, "处理后的1");
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
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    }
    // getlocation() {
    //   Axios
    //     .get(
    //       "http://api.map.baidu.com/geocoder/v2/?address=太和县&output=json&ak=z7TojHQEi0GxfxXkhKtTUzjlKYXrOdbP&callback=showLocation"
    //     )
    //     .then(function(response) {
    //       console.log(response);
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // }
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
