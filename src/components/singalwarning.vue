<template>
  <div class="singalwarn">
    <div class="top">
      <sitethreeselect ref="threeselect"></sitethreeselect>
      <div class="con">
        <span class="tip">设备编号</span>
        <el-select v-model="machineNumber" placeholder="请选择" @change="machineNumberchange">
          <el-option
            v-for="item in machineNumberList"
            :key="item.MachinaryId"
            :label="item.MachinaryId"
            :value="item.MachinaryId"
          ></el-option>
        </el-select>
      </div>
      <div class="con">
        <span class="tip">起止时间</span>
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
      <!-- <div class="con">
        <span class="tip">监测类型</span>
        <el-select v-model="jcvalue" placeholder="请选择" @change="selchange">
          <el-option
            v-for="item in jcvalueList"
            :key="item.JCTypeName"
            :label="item.JCTypeName"
            :value="item.Id"
          ></el-option>
        </el-select>
      </div>
      <div class="con">
        <span class="tip">预警类型</span>
        <el-select v-model="warmType" placeholder="请选择">
          <el-option
            v-for="item in warmTypeList"
            :key="item.Id"
            :label="item.AlertType"
            :value="item.Id"
          ></el-option>
        </el-select>
      </div> -->
      <el-button type="primary" round style="margin-left:30px" @click="search">搜索</el-button>
      <el-button type="primary" round style="margin-left:30px" @click="clearData">清空</el-button>
    </div>
    <el-divider></el-divider>
    <div class="machineName">
      <span class="box">
        <span class="note">设备编号：</span>
        <span class="name">{{selectId}}</span>
      </span>
      <span class="box">
        <span class="note">类型：</span>
        <span class="name">{{selectType}}</span>
      </span>
      <span class="box">
        <span class="note">详细地址：</span>
        <span class="name">{{selectAddress}}</span>
      </span>
      <span class="box color">
        <span class="note">管理人：</span>
        <span class="name">{{selectName}}</span>
      </span>
    </div>
    <el-divider></el-divider>
    <div class="table">
      <el-table :data="table" border style="width: 100%" header-cell-class-name="tablebg">
        <el-table-column align="center" prop="Created_At" label="预警时间" width="200"></el-table-column>
        <el-table-column align="center" label="母线电压">
          <template scope="scope">
            <span>{{scope.row.One_Bus_Voltage}}V</span>
            <!-- <span v-if="scope.row.one=='22v'">{{scope.row.one}}+{{scope.$index}}</span>
            <span v-else style="color: red">{{scope.row.one}}+{{scope.$index}}</span> -->
          </template>
        </el-table-column>
        <el-table-column align="center" prop="One_Positive_Voltage" label="正极电压"></el-table-column>
        <el-table-column align="center" prop="One_Negative_Voltage" label="负极电压"></el-table-column>
        <el-table-column align="center" prop="4" label="正负压差"></el-table-column>
        <el-table-column align="center" prop="One_AC_Voltage" label="交流电压"></el-table-column>
        <el-table-column align="center" prop="6" label="纹波电压"></el-table-column>
        <el-table-column align="center" prop="Positive_Insulation" label="正极绝缘"></el-table-column>
        <el-table-column align="center" prop="Negative_Insulation" label="负极绝缘"></el-table-column>
        <el-table-column align="center" prop="9" label="母联绝缘"></el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @current-change="handleSizeChange"
          background
          :page-size="10"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import sitethreeselect from "./sitethreeselect";
export default {
  name: "singalwarning",
  components: {
    sitethreeselect
  },
  data() {
    return {
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
      machineNumber: "",
      machineNumberList: [],
      timevalue: "",
      jcvalueList: [],
      jcvalue: "",
      warmTypeList: [],
      warmType: "",
      total: "" || 10,
      table: [],
      selectId:"",
      selectType:"",
      selectAddress:"",
      selectName:""
    };
  },
  created() {
  
  },
  mounted() {
    this.GetType();
  },
  methods: {
    GetType() {
      this.$axios.get("Types/GetJCType").then(res => {
        this.jcvalueList = res.data.Data;
      });
      this.$axios.get("Types/GetYJType").then(res => {
        this.warmTypeList = res.data.Data;
      });
      this.$axios.post("SiteManage/GetMachinaryIdList").then(res => {
        this.machineNumberList = res.data.Data;
      });
      this.$axios
        .post("MachineData/GetAlarmLogByMachineIdAllCount", {
          MachinaryId: "",
          PageSize: "10",
          PageIndex: "1"
        })
        .then(res => {
          this.total = res.data.Data;
        });
      this.$axios
        .post("MachineData/GetAlarmLogByMachineId", {
          PageSize: "10",
          PageIndex: "1",
          MachinaryId: "",
          StartTime: "",
          EndTime: ""
        })
        .then(res => {
          this.table = res.data.Data;
        });
    },
    selchange(e) {
      console.log(e);
    },
    machineNumberchange(e){
      console.log(e)   //MachinaryId  
      // selectId:"",
      // selectType:"",
      // selectAddress:"",
      // selectName:""
      this.machineNumberList
      for (let i = 0; i < this.machineNumberList.length; i++) {
        const element = this.machineNumberList[i];
        if (this.machineNumberList[i].MachinaryId==e) {
          this.selectId=e
          this.selectType=this.machineNumberList[i].EquipType,
          this.selectAddress=this.machineNumberList[i].Province+this.machineNumberList[i].City+this.machineNumberList[i].Area,
          this.selectName=this.machineNumberList[i].UserName
        }
        
      }
    },
    clearData(e) {
      this.$refs.threeselect.cleardata()
      this.timevalue = ""
      this.jcvalue = ""
      this.machineNumber=""
      this.warmType=""
    },
    search() {
      console.log(
        this.$store.state.sheng +
          "+" +
          this.$store.state.shi +
          "+" +
          this.$store.state.qu +
          "+" +
          this.$store.state.sitename
      );
      console.log(this.timevalue, "时间");
      console.log(this.jcvalue, "监测类型");
      this.$axios
        .post("MachineData/GetAlarmLogByMachineId", {
          PageSize: 10,
          PageIndex: 1,
          MachinaryId: this.machineNumber,
          StartTime: this.timevalue[0],
          EndTime: this.timevalue[1]
        })
        .then(res => {
          console.log(res.data.Data);
          this.table=res.data.Data
        });
    },

   
    handleSizeChange(e) {
      console.log(e);
      this.$axios
        .post("MachineData/GetAlarmLogByMachineId", {
          PageSize: 5,
          PageIndex: e,
          MachinaryId: "",
          StartTime: "",
          EndTime: ""
        })
        .then(res => {
          // console.log(res.data.Data);
          this.table = res.data.Data;
        });
    }
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

  .con {
    display: inline-block;
    margin-right: 80px;
  }

  .tip {
    color: #333333;
    margin-right: 10px;
  }

  .machineName {
    padding: 0 78px;
    margin-bottom: 20px;
    font-size: 18px;

    .box {
      margin-right: 58px;
    }
  }

  .table {
    margin-top: 50px;
    padding: 0 78px;
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
