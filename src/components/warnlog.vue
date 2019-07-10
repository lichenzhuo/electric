<template>
  <div class="singalwarn">
    <div class="top">
      <!-- <sitethreeselect ref="threeselect"></sitethreeselect> -->
      <span class="tip">站点名称</span>
      <el-cascader
        v-model="siteId"
        :options="fourData"
        :props="{ expandTrigger: 'hover' }"
        @change="SiteSelect"
      ></el-cascader>
      <div class="con">
        <span class="tip" style="padding-left:2em">时间</span>
        <el-date-picker
          v-model="timevalue"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
      <div class="con">
        <span class="tip">监测类型</span>
        <el-select v-model="jcvalue" placeholder="请选择" @change="selchange">
          <el-option
            v-for="item in options"
            :key="item.JCTypeName"
            :label="item.JCTypeName"
            :value="item.Id"
          ></el-option>
        </el-select>
      </div>
      <el-button type="primary" round style="margin-left:20px" @click="clearData">清空</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="search">搜索</el-button>
    </div>
    <el-divider></el-divider>
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
            <span>{{scope.row.One_Negative_Voltage}}V</span>
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
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="5"
          @current-change="handleSizeChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import sitethreeselect from "./sitethreeselect";
// import axios from "../http.js";
export default {
  name: "warnlog",
  components: {
    sitethreeselect
  },
  created() {
    this.getTableData();
    this.getDataNumber();
  },
  mounted() {
    this.GetJCType();
  },
  methods: {
    GetJCType() {
      this.$axios.get("Types/GetJCType").then(res => {
        this.$store.state.jclist = res.data.Data;
        console.log(this.$store.state.jclist, "111");
        this.options = this.$store.state.jclist;
      });
      this.$axios.post("SiteTree/GetFourLevel", {}).then(res => {
        console.log(res.data.Data.Data, "4级联动");
        this.fourData = res.data.Data.Data;
      });
    },
    selchange(e) {
      console.log(e);
    },
    clearData(e) {
      // this.$refs.threeselect.cleardata();
      this.siteId="";
      this.timevalue = "";
      this.jcvalue = "";
    },
    search() {
      console.log(this.siteId,this.AreaId);
      console.log(this.timevalue, "时间");
      console.log(this.jcvalue, "监测类型");
      this.$axios
        .post("MachineData/GetAlertLogPageList", {
          PageSize: 10,
          PageIndex: 1,
          SiteId: this.siteId,
          StartTime: this.timevalue[0],
          EndTime: this.timevalue[1]
        })
        .then(res => {
          console.log(res.data.Data);
          this.tableData = res.data.Data;
        });
    },

    getTableData() {
      this.$axios
        .post("MachineData/GetAlertLogPageList", { PageSize: 10, PageIndex: 1 })
        .then(res => {
          // console.log(res.data.Data);
          this.tableData = res.data.Data;
        });
      // this.id = this.$route.params.id;
    },
    getDataNumber() {
      this.$axios
        .post("MachineData/GetAlertLogAllCount", {
          SiteId: "",
          StartTime: "",
          EndTime: ""
        })
        .then(res => {
          console.log(res.data.Data);
          this.total = res.data.Data;
        });
    },
    handleSizeChange(e) {
      console.log(e);
      this.$axios
        .post("MachineData/GetAlertLogPageList", {
          PageSize: 5,
          PageIndex: e,
          SiteName: "",
          StartTime: "",
          EndTime: ""
        })
        .then(res => {
          // console.log(res.data.Data);
          this.table = res.data.Data;
        });
    },
    SiteSelect(e) {
      console.log(e);
      this.siteId = e[3];
      this.AreaId = e[2];
    }
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      pagesize: 10,
      tableData: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      timevalue: "",
      options: [],
      selectedOptions2: [],
      jcvalue: "",
      total: "" || 5,
      siteId: "",
      fourData: [],
      AreaId: ""
    };
  }
};
</script>

<style lang="stylus" scoped>
.singalwarn {
  width: 1600px;
  background-color: #ffffff;
  min-height: 800px;
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px;

  .top {
    padding-top: 30px;
    padding-left: 80px;
  }

  .header {
    padding-top: 30px;
    padding-left: 80px;
  }

  .con {
    display: inline-block;
    margin-right: 80px;
  }

  .tip {
    color: #333333;
    margin-right: 10px;
  }

  .table {
    margin-top: 50px;
    text-align: center;
    padding: 0;
    width: 1601px;
  }

  .color {
    color: #3936de;
  }

  .is-leaf {
    text-align: center;
  }

  .page {
    text-align: right;
    margin-top: 20px;
    padding-bottom: 50px;
  }

  .indent {
    padding: left 2em;
  }

  .tablebg {
    background-color: #409EFF;
    color: #ffffff;
    font-size: 18px;
  }
}
</style>
