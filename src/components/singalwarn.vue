<template>
  <div class="singalwarn">
    <div class="top">
      <!-- <sitethreeselect ref="threeselect"></sitethreeselect> -->
      <span class="tip">站点名称</span>
      <el-cascader
        v-model="SiteName"
        :options="fourData"
        :props="{ expandTrigger: 'hover' ,emitPath:true,value:'label' }"
        @change="SiteSelect"
      ></el-cascader>
      <div class="con">
        <span class="tip" style="margin-left: 2em;">设备编号</span>
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
      <div class="con" style="margin-top:30px">
        <span class="tip">预警类型</span>
        <el-select v-model="jcvalue" placeholder="请选择" @change="selchange">
          <el-option
            v-for="item in options"
            :key="item.Id"
            :label="item.AlertType"
            :value="item.Id"
          ></el-option>
        </el-select>
      </div>
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
    <div class="table" style="padding:0">
      <el-table :data="tableData" border style="width: 100%" header-cell-class-name="tablebg">
       <el-table-column align="center" prop="Created_AtStr" label="时间" width="90px"></el-table-column>
        <el-table-column align="center" label="地区">
          <template slot-scope="scope">
            <span>{{scope.row.Province}}{{scope.row.City}}{{scope.row.Area}}</span>
          </template>
        </el-table-column>
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
            >{{scope.row.II_Positive_Vol}}V</span>
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
  name: "singalwarn",
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
      tableData: [],
      selectId: "",
      selectType: "",
      selectAddress: "",
      selectName: "",
      SiteName: "",
      fourData: [],
      AreaId: "",
      options: ""
    };
  },
  created() {},
  mounted() {
    this.GetType();
  },
  methods: {
    GetType() {
      this.$axios.get("Types/GetYJType").then(res => {
        console.log(res.data.Data, "预警类型");
        this.options = res.data.Data;
      });
      // this.$axios.post("SiteManage/GetMachinaryIdList").then(res => {
      //   this.machineNumberList = res.data.Data;
      // });
      this.$axios.post("SiteTree/GetFourLevel", {}).then(res => {
        console.log(res.data.Data.Data, "4级联动");
        this.fourData = res.data.Data.Data;
      });

      this.$axios.post("EquipmentInfo/GetMachinaryIdList").then(res => {
        console.log(res.data.Data, "所有设备");
        this.machineNumberList = res.data.Data;
      });
    },
    selchange(e) {
      console.log(e);
    },
    machineNumberchange(e) {
      console.log(e, "111111"); //MachinaryId
    },
    clearData(e) {
      // this.$refs.threeselect.cleardata()
      this.timevalue = "";
      this.jcvalue = "";
      this.SiteName = "";
      this.machineNumber = "";
      this.warmType = "";
    },
    search() {
      console.log(this.SiteName, "111");
      console.log(this.jcvalue, "222");
      console.log(this.timevalue[0], "333");
      console.log(this.timevalue[1], "444");
      console.log(this.machineNumber, "5555");

      this.$axios
        .post("MachineData/GetAlertLogByMachineId", {
          PageSize: 10,
          PageIndex: 1,
          SiteName: this.SiteName,
          MachinaryId: this.machineNumber,
          YJType: this.jcvalue,
          StartTime: this.timevalue[0],
          EndTime: this.timevalue[1]
        })
        .then(res => {
          console.log(res.data.Data);
          this.tableData = res.data.Data;
          this.selectId = res.data.Data[0].MachinaryId;
          this.selectType = res.data.Data[0].EquipType;
          this.selectAddress =
            res.data.Data[0].Province +
            res.data.Data[0].City +
            res.data.Data[0].Area +
            res.data.Data[0].Address;
          this.selectName = res.data.Data[0].UserName;
        });
      this.$axios
        .post("MachineData/GetAlertLogByMachineIdAllCount", {
          SiteName: this.SiteName,
          MachinaryId: this.machineNumber,
          YJType: this.jcvalue,
          StartTime: this.timevalue[0],
          EndTime: this.timevalue[1]
        })
        .then(res => {
          this.total = res.data.Data;
        });
    },

    handleSizeChange(e) {
      console.log(e);
      this.$axios
        .post("MachineData/GetAlertLogByMachineId", {
          PageSize: 10,
          PageIndex: e,
          SiteName: this.SiteName,
          MachinaryId: this.machineNumber,
          YJType: this.jcvalue,
          StartTime: this.timevalue[0],
          EndTime: this.timevalue[1]
        })
        .then(res => {
          console.log(res.data.Data);
          this.tableData = res.data.Data;
        });
    },
    SiteSelect(e) {
      console.log(e);
      this.SiteName = e[3];
      this.AreaId = e[2];
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

.table {
  margin-top: 50px;
}
</style>
