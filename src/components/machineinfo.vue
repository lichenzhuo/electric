<template>
  <div class="singalwarn">
    <div class="top">
      <!-- <div class="con">
        <sitethreeselect ref="threeselect"></sitethreeselect>
      </div>-->
      <span class="tip">站点名称</span>
      <el-cascader
        v-model="SiteName"
        :options="fourData"
        :props="{ expandTrigger: 'hover',value:'label' }"
        @change="SiteSelect"
      ></el-cascader>
      <div class="con">
        <span class="tip" style="margin-left: 2em;">设备类型</span>
        <el-select v-model="EquipType" placeholder="请选择" @change="EquipTypeChange">
          <el-option
            v-for="item in EquipTypeList"
            :key="item.index"
            :label="item.EquipType"
            :value="item.EquipType"
          ></el-option>
        </el-select>
      </div>
      <div class="con">
        <span class="tip">设备编号</span>
        <el-select v-model="MachinaryId" placeholder="请选择" @change="MachinaryIdChange">
          <el-option
            v-for="item in MachinaryIdType"
            :key="item.index"
            :label="item.MachinaryId"
            :value="item.MachinaryId"
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
      <span class="box" style="background-color:#ffffff">
        <el-button v-if="CanClick" type="primary" round @click="UpdateData">参数调整</el-button>
        <el-button v-else type="primary" disabled round @click="UpdateData">参数调整</el-button>
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
    <div class="chart">
      <div class="tianchong"></div>
      <echartstwo ref="chartstwo"></echartstwo>
      <div class="tianchong"></div>
    </div>
    <div class="table">
      <el-table :data="table" border style="width: 100%" header-cell-class-name="tablebg">
        <!-- <el-table-column align="center" label="时间">
          <template slot-scope="scope">
            <span>{{scope.row.Created_At}}</span>
          </template>
        </el-table-column>-->
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
            <span :class="[{'red':scope.row.II_Bus_RippleState!==0,}]">{{scope.row.II_Bus_Ripple}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="II段母线交流电压">
          <template slot-scope="scope">
            <span :class="[{'red':scope.row.II_Bus_ACState!==0,}]">{{scope.row.II_Bus_AC_Vol}}V</span>
          </template>
        </el-table-column>

        <!-- 这里判断字段不清楚 ，接口字段文件里面有些。后续需要确定-->
        <el-table-column align="center" label="I段母线正对地绝缘">
          <template slot-scope="scope">
            <span
              :class="[{'red':scope.row.I_Bus_Ins_Abnormality!==0,}]"
            >{{scope.row.I_Positive_Ins}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="I段母线负对地绝缘">
          <template slot-scope="scope">
            <span
              :class="[{'red':scope.row.I_Bus_Ins_Abnormality!==0,}]"
            >{{scope.row.I_Negative_Ins}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="I段蓄电池绝缘">
          <template slot-scope="scope">
            <span :class="[{'red':scope.I_Battery_Alarm!==0,}]">{{scope.row.I_Battery_Ins}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="I段蓄电接地点">
          <template slot-scope="scope">
            <span :class="[{'red':scope.row.I_Battery_Alarm!==0,}]">{{scope.row.I_Grounding_Point}}V</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="II段母线正对地绝缘">
          <template slot-scope="scope">
            <span
              :class="[{'red':scope.row.II_Bus_Ins_Abnormality!==0,}]"
            >{{scope.row.II_Positive_Ins}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="II段母线负对地绝缘">
          <template slot-scope="scope">
            <span
              :class="[{'red':scope.row.II_Bus_Ins_Abnormality!==0,}]"
            >{{scope.row.II_Negative_Ins}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="II段蓄电池绝缘">
          <template slot-scope="scope">
            <span :class="[{'red':scope.row.II_Battery_Alarm!==0,}]">{{scope.row.II_Battery_Ins}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="II段蓄电接地点">
          <template slot-scope="scope">
            <span
              :class="[{'red':scope.row.II_Battery_Alarm!==0,}]"
            >{{scope.row.II_Grounding_Point}}V</span>
          </template>
        </el-table-column>
        <!-- 21312323333333333333333 -->
        <el-table-column align="center" label="母联总绝缘">
          <template slot-scope="scope">
            <span :class="[{'red':scope.row.Bus_UnionStates!==0,}]">{{scope.row.Busbar_Total_Ins}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支路号">
          <template slot-scope="scope">
            <span>{{scope.row.BranchNum}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支路所在母线段">
          <template slot-scope="scope">
            <span>{{scope.row.Branch_BusSection}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支路总绝缘">
          <template slot-scope="scope">
            <span>{{scope.row.Branch_Total_Ins}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支路正绝缘">
          <template slot-scope="scope">
            <span>{{scope.row.Branch_Positive_Ins}}V</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="支路负绝缘">
          <template slot-scope="scope">
            <span>{{scope.row.Branch_Negative_Ins}}V</span>
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
            <td>I段母线总电压</td>
            <td>{{dialogData.I_Bus_Voltage}}</td>
            <td>
              <el-input v-model="one" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>I段母线正对地电压</td>
            <td>{{dialogData.I_Position_Vol}}</td>
            <td>
              <el-input v-model="two" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>I段母线负对地电压</td>
            <td>{{dialogData.I_Negative_Vol}}</td>
            <td>
              <el-input v-model="three" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>I段母线纹波</td>
            <td>{{dialogData.I_Bus_Ripple}}</td>
            <td>
              <el-input v-model="four" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>I段母线交流电压</td>
            <td>{{dialogData.I_Bus_AC_Vol}}</td>
            <td>
              <el-input v-model="five" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>II段母线总电压</td>
            <td>{{dialogData.II_Bus_Vol}}</td>
            <td>
              <el-input v-model="six" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>II段母线正对地电压</td>
            <td>{{dialogData.II_Positive_Vol}}</td>
            <td>
              <el-input v-model="seven" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>II段母线负对地电压</td>
            <td>{{dialogData.II_Negative_Vol}}</td>
            <td>
              <el-input v-model="eight" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>II段母线纹波</td>
            <td>{{dialogData.II_Bus_Ripple}}</td>
            <td>
              <el-input v-model="nine" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>II段母线交流电压</td>
            <td>{{dialogData.II_Bus_AC_Vol}}</td>
            <td>
              <el-input v-model="ten" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>I段母线正对地绝缘</td>
            <td>{{dialogData.I_Positive_Ins}}</td>
            <td>
              <el-input v-model="eleven" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>I段母线负对地绝缘</td>
            <td>{{dialogData.I_Negative_Ins}}</td>
            <td>
              <el-input v-model="twelve" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>I段蓄电池绝缘</td>
            <td>{{dialogData.I_Battery_Ins}}</td>
            <td>
              <el-input v-model="thirteen" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>I段蓄电接地点</td>
            <td>{{dialogData.I_Grounding_Point}}</td>
            <td>
              <el-input v-model="fourteen" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>II段母线正对地绝缘</td>
            <td>{{dialogData.II_Positive_Ins}}</td>
            <td>
              <el-input v-model="fifteen" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>II段母线负对地绝缘</td>
            <td>{{dialogData.II_Negative_Ins}}</td>
            <td>
              <el-input v-model="sixteen" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>II段蓄电池绝缘</td>
            <td>{{dialogData.II_Battery_Ins}}</td>
            <td>
              <el-input v-model="seventeen" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
            <td>II段蓄电接地点</td>
            <td>{{dialogData.II_Grounding_Point}}</td>
            <td>
              <el-input v-model="eighteen" placeholder="请输入内容" style="width:100px"></el-input>
            </td>
          </tr>
          <tr>
            <td>母联总绝缘</td>
            <td>{{dialogData.Busbar_Total_Ins}}</td>
            <td>
              <el-input v-model="nineteen" placeholder="请输入内容" style="width:100px"></el-input>
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
import echartstwo from "./echartstwo";
export default {
  name: "machineinfo",
  components: {
    sitethreeselect,
    echarts,
    echartstwo
  },
  data() {
    return {
      dialogData: "",
      dialogDataId: "",
      input: "",
      positiondialog: false,
      CanClick: false,
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
      sixteen: "",
      seventeen: "",
      eighteen: "",
      nineteen: "",
      SiteName: "",
      fourData: [],
      threeData: [],
      AreaId: "",
      EquipTypeId: ""
    };
  },
  created() {
    this.getType();
    // this.getChartData()
  },
  methods: {
    getChartData() {},
    clearData(e) {
      // this.$refs.threeselect.cleardata();
      this.SiteName = "";
      this.EquipType = "";
      this.MachinaryId = "";
    },
    search() {
      // if (this.EquipType) {
      //   this.EquipTypeId=this.EquipType
      // }else{
      //   this.EquipTypeId='0'
      // }
      this.$axios
        .post("MachineData/GetEquipPageList", {
          PageSize: 10,
          PageIndex: 1,
          MachinaryId: this.MachinaryId,
          EquipType: this.EquipType,
          SiteName: this.SiteName
        })
        .then(res => {
          console.log(res.data.Data, "1111111");
          this.dialogData = res.data.Data[0];
          if (this.dialogData) {
            this.CanClick = true;
            console.log("3333333333333");
          }
          console.log(this.dialogData, "22222222");
          this.dialogDataId = res.data.Data[0].Id;
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
          var arrtwo = [];
          for (let j = 0; j < res.data.Data.length; j++) {
            const element = res.data.Data[j];
            arr.push({
              日期: res.data.Data[j].Created_AtStr,
              I段母线总电压: res.data.Data[j].I_Bus_Voltage,
              I段母线正对地电压: res.data.Data[j].I_Position_Vol,
              I段母线负对地电压: res.data.Data[j].I_Negative_Vol,
              I段母线纹波: res.data.Data[j].I_Bus_Ripple,
              I段母线交流电压: res.data.Data[j].I_Bus_AC_Vol,
              I段母线正对地绝缘: res.data.Data[j].I_Positive_Ins,
              I段母线负对地绝缘: res.data.Data[j].I_Negative_Ins,
              I段蓄电池绝缘: res.data.Data[j].I_Battery_Ins,
              I段蓄电接地点: res.data.Data[j].I_Grounding_Point
            });
            this.$store.state.EchartsData = {
              columns: [
                "日期",
                "I段母线总电压",
                "I段母线正对地电压",
                "I段母线负对地电压",
                "I段母线纹波",
                "I段母线交流电压",
                "I段母线正对地绝缘",
                "I段母线负对地绝缘",
                "I段蓄电池绝缘",
                "I段蓄电接地点"
              ],
              rows: arr
            };
          }
          this.$refs.charts.DataInit();
          for (let k = 0; k < res.data.Data.length; k++) {
            // const element = res.data.Data[k];
            arrtwo.push({
              日期: res.data.Data[k].Created_AtStr,
              II段母线总电压: res.data.Data[k].II_Bus_Vol,
              II段母线正对地电压: res.data.Data[k].II_Positive_Vol,
              II段母线负对地电压: res.data.Data[k].II_Negative_Vol,
              II段母线纹波: res.data.Data[k].II_Bus_Ripple,
              II段母线交流电压: res.data.Data[k].II_Bus_AC_Vol,
              II段母线正对地绝缘: res.data.Data[k].II_Positive_Ins,
              II段母线负对地绝缘: res.data.Data[k].II_Negative_Ins,
              II段蓄电池绝缘: res.data.Data[k].II_Battery_Ins,
              II段蓄电接地点: res.data.Data[k].II_Grounding_Point
            });
            this.$store.state.EchartsDatatwo = {
              columns: [
                "日期",
                "II段母线总电压",
                "II段母线正对地电压",
                "II段母线负对地电压",
                "II段母线纹波",
                "II段母线交流电压",
                "II段母线正对地绝缘",
                "II段母线负对地绝缘",
                "II段蓄电池绝缘",
                "II段蓄电接地点"
              ],
              rows: arrtwo
            };
          }
          this.$refs.chartstwo.DataInit();
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
      console.log(e, "MachinaryId");
      console.log(this.MachinaryId, "MachinaryId");
    },
    EquipTypeChange(e) {
      console.log(e, "EquipType");
      console.log(this.EquipType, "EquipType");
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

        this.EquipTypeList = res.data.Data;
      });
      this.$axios.post("EquipmentInfo/GetMachinaryIdList").then(res => {
        console.log(res.data.Data, "888888");
        this.MachinaryIdType = res.data.Data;
      });

      //4级联动
      this.$axios.post("SiteTree/GetFourLevel", {}).then(res => {
        console.log(res.data.Data.Data, "4级联动");
        this.fourData = res.data.Data.Data;
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
              Id: this.dialogDataId,
              I_Bus_Voltage: this.one,
              I_Position_Vol: this.two,
              I_Negative_Vol: this.three,
              I_Bus_Ripple: this.four,
              I_Bus_AC_Vol: this.five,
              II_Bus_Vol: this.six,
              II_Positive_Vol: this.seven,
              II_Negative_Vol: this.eight,
              II_Bus_Ripple: this.nine,
              II_Bus_AC_Vol: this.ten,
              I_Positive_Ins: this.eleven,
              I_Negative_Ins: this.twelve,
              I_Battery_Ins: this.thirteen,
              I_Grounding_Point: this.fourteen,
              II_Positive_Ins: this.fifteen,
              II_Negative_Ins: this.sixteen,
              II_Battery_Ins: this.seventeen,
              II_Grounding_Point: this.eighteen,
              Busbar_Total_Ins: this.nineteen
            })
            .then(res => {
              console.log(res.data.Msg);
              // this.total = res.data.Data;
              if (res.data.Msg == "成功") {
                this.$message({
                  type: "success",
                  message: "更改成功!"
                });
                this.positiondialog = false;
              } else {
                console.log("出现错误");
                this.positiondialog = false;
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    SiteSelect(e) {
      console.log(e);
      this.SiteName = e[3];
      console.log(this.SiteName);
      // this.AreaId = e[2];
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
