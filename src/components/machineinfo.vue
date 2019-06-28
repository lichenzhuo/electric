<template>
  <div class="singalwarn">
    <div class="top">
      <div class="block con">
        <sitethreeselect ref="threeselect"></sitethreeselect>
      </div>
      <div class="con">
        <span class="tip">设备类型</span>
        <el-select v-model="EquipType" placeholder="请选择">
          <el-option
            v-for="item in EquipTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="block con">
        <span class="tip">设备编号</span>
        <el-select v-model="MachinaryId" placeholder="请选择" @change="MachinaryIdChange">
          <el-option
            v-for="item in MachinaryIdType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>

      <el-button type="primary" round style="margin-left:100px" @click="search">搜索</el-button>
      <el-button type="primary" round style="margin-left:40px" @click="clearData">清空</el-button>
    </div>
    <div class="header"></div>
    <el-divider></el-divider>
    <div class="machineName">
      <span class="box">
        <span class="note">设备编号：</span>
        <span class="name">{{MachinaryIdData}}</span>
      </span>
      <span class="box">
        <span class="note">类型：</span>
        <span class="name">{{EquipTypeData}}</span>
      </span>
      <span class="box">
        <span class="note">详细地址：</span>
        <span class="name">{{Address}}</span>
      </span>
      <span class="box">
        <el-button type="primary" round @click="UpdateData">参数调整</el-button>
      </span>
      <span class="box color">
        <span class="note">管理人：</span>
        <span class="name">{{ManageName}}</span>
      </span>
    </div>
    <el-divider></el-divider>
    <div class="chart">
      <div class="tianchong"></div>
      <echarts ref="charts"></echarts>
      <div class="tianchong"></div>
    </div>
    <div class="table">
      <el-table :data="table" border style="width: 100%" header-cell-class-name="tablebg">
        <el-table-column align="center" prop="Created_At" label="时间"></el-table-column>
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
          @current-change="handleCurrentChange"
          background
          :page-size="10"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="positiondialog" width="40%" :show-close="false" center top="5vh">
      <div slot="title">设备编号：{{dialogData.MachinaryId}}</div>
      <span>
        <table class="gridtable">
          <tr>
            <th>类别</th>
            <th>现值</th>
            <th>调整值</th>
            <th>类别</th>
            <th>现值</th>
            <th>调整值</th>
          </tr>
          <tr>
            <td>一段母线电压</td>
            <td>{{dialogData.One_Bus_Voltage}}</td>
            <td>
              <el-input v-model="one" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>一段正对地电压</td>
            <td>{{dialogData.One_Positive_Voltage}}</td>
            <td>
              <el-input v-model="two" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>一段负对地电压</td>
            <td>{{dialogData.One_Negative_Voltage}}</td>
            <td>
              <el-input v-model="three" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>一段正对地电阻</td>
            <td>{{dialogData.One_Positive_Resistance}}</td>
            <td>
              <el-input v-model="four" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>一段负对地电阻</td>
            <td>{{dialogData.One_Negative_Resistance}}</td>
            <td>
              <el-input v-model="five" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>一段对地交流电压</td>
            <td>{{dialogData.One_AC_Voltage}}</td>
            <td>
              <el-input v-model="six" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>二段母线电压</td>
            <td>{{dialogData.Two_Bus_Voltage}}</td>
            <td>
              <el-input v-model="seven" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>二段正对地电压</td>
            <td>{{dialogData.Two_Positive_Voltage}}</td>
            <td>
              <el-input v-model="eight" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>二段负对地电压</td>
            <td>{{dialogData.Two_Negative_Voltage}}</td>
            <td>
              <el-input v-model="nine" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>二段正对地电阻</td>
            <td>{{dialogData.Two_Positive_Resistance}}</td>
            <td>
              <el-input v-model="ten" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>二段负对地电阻</td>
            <td>{{dialogData.Two_Negative_Resistance}}</td>
            <td>
              <el-input v-model="eleven" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>二段对地交流电压</td>
            <td>{{dialogData.Two_AC_Voltage}}</td>
            <td>
              <el-input v-model="twelve" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>支路号</td>
            <td>{{dialogData.BranchNum}}</td>
            <td>
              <el-input v-model="thirteen" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>支路正绝缘</td>
            <td>{{dialogData.Positive_Insulation}}</td>
            <td>
              <el-input v-model="fourteen" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>支路负绝缘</td>
            <td>{{dialogData.Negative_Insulation}}</td>
            <td>
              <el-input v-model="fifteen" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>支路电容</td>
            <td>{{dialogData.Capacitance}}</td>
            <td>
              <el-input v-model="sixteen" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
        </table>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="positiondialog = false">取 消</el-button>
        <el-button type="primary" @click="sureUpdate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import sitethreeselect from "./sitethreeselect";
import echarts from "./echarts";
export default {
  name: "machineinfo",
  components: {
    sitethreeselect,
    echarts
  },
  data() {
    return {
      dialogData: "",
      dialogDataId:"",
      input: "",
      positiondialog: false,
      total: "" || 10,
      table: [],
      value1: "",
      value2: "",
      options: [],
      selectedOptions: [],
      selectedOptions2: [],
      value3: "",
      value: "",
      EquipType: "",
      EquipTypeList: [],
      MachinaryId: "",
      MachinaryIdType: [],
      MachinaryIdTypeData: "",
      MachinaryIdData: "",
      EquipTypeData: "",
      Address: "",
      ManageName: "",
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
      six: "",
      seven: "",
      eight: "",
      nine: "",
      ten: "",
      eleven: "",
      twelve: "",
      thirteen: "",
      fourteen: "",
      fifteen: "",
      sixteen: ""
    };
  },
  created() {
    this.getType();
  },
  methods: {
    getChartData() {
      this.$axios
        .post("MachineData/GetMachinaryIdListBySiteName", {
          SiteName: this.$store.state.sitename
        })
        .then(res => {
          console.log(res.data.Data);
          this.MachinaryIdTypeData = res.data.Data;
          for (let i = 0; i < res.data.Data.length; i++) {
            this.MachinaryIdType.push({
              value: res.data.Data[i].MachinaryId,
              label: res.data.Data[i].MachinaryId
            });
          }
        });
    },
    clearData(e) {
      this.$refs.threeselect.cleardata();
      this.EquipType = "";
      this.MachinaryId = "";
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
        .post("MachineData/GetEquipPageList", {
          PageSize: 10,
          PageIndex: 1,
          MachinaryId: this.MachinaryId,
          EquipType: this.EquipType
        })
        .then(res => {
          console.log(res.data.Data);
          this.dialogData = res.data.Data[0];
          this.dialogDataId=res.data.Data[0].Id;
          this.table = res.data.Data;
          this.MachinaryIdData = res.data.Data[0].MachinaryId;
          this.EquipTypeData = res.data.Data[0].EquipType;
          this.Address =
            res.data.Data[0].Province +
            res.data.Data[0].City +
            res.data.Data[0].Area +
            res.data.Data[0].Address;
          this.ManageName = res.data.Data[0].UserName;
          //下面是制作图表用的数据
          var arr = [];
          for (let j = 0; j < res.data.Data.length; j++) {
            const element = res.data.Data[j];
            arr.push({
              日期: res.data.Data[j].Created_At,
              一段母线电压: res.data.Data[j].One_Bus_Voltage,
              一段正对地电压: res.data.Data[j].One_Positive_Voltage,
              一段负对地电压: res.data.Data[j].One_Negative_Voltage,
              一段正对地电阻: res.data.Data[j].One_Positive_Resistance,
              一段负对地电阻: res.data.Data[j].One_Negative_Resistance,
              一段对地交流电压: res.data.Data[j].One_AC_Voltage,
              二段母线电压: res.data.Data[j].Two_Bus_Voltage,
              二段正对地电压: res.data.Data[j].Two_Positive_Voltage,
              二段负对地电压: res.data.Data[j].Two_Negative_Voltage,
              二段正对地电阻: res.data.Data[j].Two_Positive_Resistance,
              二段负对地电阻: res.data.Data[j].Two_Negative_Resistance,
              二段对地交流电压: res.data.Data[j].Two_AC_Voltage,
              支路号: res.data.Data[j].BranchNum,
              支路正绝缘: res.data.Data[j].Positive_Insulation,
              支路负绝缘: res.data.Data[j].Negative_Insulation,
              支路电容: res.data.Data[j].Capacitance
            });
            this.$store.state.EchartsData = {
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
                "二段负对地电压",
                "二段对地交流电压",
                "支路号",
                "支路正绝缘",
                "支路负绝缘",
                "支路电容"
              ],
              rows: arr
            };
          }
          this.$refs.charts.DataInit();
        });

      this.$axios
        .post("MachineData/GetAllCount", {
          MachinaryId: this.MachinaryId,
          EquipType: this.EquipType
        })
        .then(res => {
          console.log(res.data.Data);
          this.total = res.data.Data;
        });
    },
    MachinaryIdChange(e) {
      console.log(e);
      // for (let j = 0; j < this.MachinaryIdTypeData.length; j++) {
      //   if (this.MachinaryIdTypeData[j].MachinaryId == e) {
      //     this.MachinaryIdData = this.MachinaryIdTypeData[j].MachinaryId;
      //     this.EquipTypeData = this.MachinaryIdTypeData[j].EquipType;
      //     this.Address =
      //       this.MachinaryIdTypeData[j].Province +
      //       this.MachinaryIdTypeData[j].City +
      //       this.MachinaryIdTypeData[j].Area+
      //       this.MachinaryIdTypeData[j].Address;
      //     this.ManageName = this.MachinaryIdTypeData[j].UserName;
      //   }
      // }
    },
    handleCurrentChange(e) {
      console.log(e);
      this.$axios
        .post("MachineData/GetEquipPageList", {
          PageSize: 10,
          PageIndex: e,
          MachinaryId: this.MachinaryId,
          EquipType: this.EquipType
        })
        .then(res => {
          console.log(res.data.Data);
          this.table = res.data.Data;
          this.MachinaryIdData = res.data.Data[0].MachinaryId;
          this.EquipTypeData = res.data.Data[0].EquipType;
          this.Address =
            res.data.Data[0].Province +
            res.data.Data[0].City +
            res.data.Data[0].Area +
            res.data.Data[0].Address;
          this.ManageName = res.data.Data[0].UserName;
          //下面是制作图表用的数据
          var arr = [];
          for (let j = 0; j < res.data.Data.length; j++) {
            const element = res.data.Data[j];
            arr.push({
              日期: res.data.Data[j].Created_At,
              一段母线电压: res.data.Data[j].One_Bus_Voltage,
              一段正对地电压: res.data.Data[j].One_Positive_Voltage,
              一段负对地电压: res.data.Data[j].One_Negative_Voltage,
              一段正对地电阻: res.data.Data[j].One_Positive_Resistance,
              一段负对地电阻: res.data.Data[j].One_Negative_Resistance,
              一段对地交流电压: res.data.Data[j].One_AC_Voltage,
              二段母线电压: res.data.Data[j].Two_Bus_Voltage,
              二段正对地电压: res.data.Data[j].Two_Positive_Voltage,
              二段负对地电压: res.data.Data[j].Two_Negative_Voltage,
              二段正对地电阻: res.data.Data[j].Two_Positive_Resistance,
              二段负对地电阻: res.data.Data[j].Two_Negative_Resistance,
              二段对地交流电压: res.data.Data[j].Two_AC_Voltage,
              支路号: res.data.Data[j].BranchNum,
              支路正绝缘: res.data.Data[j].Positive_Insulation,
              支路负绝缘: res.data.Data[j].Negative_Insulation,
              支路电容: res.data.Data[j].Capacitance
            });
            this.$store.state.EchartsData = {
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
                "二段负对地电压",
                "二段对地交流电压",
                "支路号",
                "支路正绝缘",
                "支路负绝缘",
                "支路电容"
              ],
              rows: arr
            };
          }
          this.$refs.charts.DataInit();
        });
    },
    getType() {
      this.$axios.get("Types/GetEquipType").then(res => {
        console.log(res.data.Data);
        for (let i = 0; i < res.data.Data.length; i++) {
          this.EquipTypeList.push({
            value: res.data.Data[i].EquipType,
            label: res.data.Data[i].EquipType
          });
        }
      });
    },
    UpdateData() {
      this.positiondialog = true;
    },
    sureUpdate() {
      this.$confirm("此操作将改变设备数值, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("MachineData/UpdateData", {
              Id:this.dialogDataId,
              One_Bus_Voltage: this.one,
              One_Positive_Voltage: this.two,
              One_Negative_Voltage: this.three,
              One_Positive_Resistance: this.four,
              One_Negative_Resistance: this.five,
              One_AC_Voltage: this.six,
              Two_Bus_Voltage: this.seven,
              Two_Positive_Voltage: this.eight,
              Two_Negative_Voltage: this.nine,
              Two_Positive_Resistance: this.ten,
              Two_Negative_Resistance: this.eleven,
              Two_AC_Voltage: this.twelve,
              BranchNum: this.thirteen,
              Positive_Insulation: this.fourteen,
              Negative_Insulation: this.fifteen,
              Capacitance: this.sixteen
            })
            .then(res => {
              console.log(res.data.Data);
              // this.total = res.data.Data;
              this.$message({
                type: "success",
                message: "更改成功!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
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

  .chart {
    width: 100%;
  }

  .tianchong {
    width: 100%;
    height: 20px;
    background-color: rgb(248, 248, 248);
  }

  table.gridtable {
    font-family: verdana, arial, sans-serif;
    font-size: 11px;
    color: #333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
  }

  table.gridtable th {
    width: 100px;
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: rgb(179, 216, 255);
    text-align: center;
  }

  table.gridtable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
    text-align: center;
  }
}
</style>
