<template>
  <div class="singalwarn">
    <div class="top">
      <div class="block con">
        <sitethreeselect ref="threeselect"></sitethreeselect>
      </div>
      <div class="block con">
        <span class="tip">设备类型</span>
        <el-select v-model="machinetype" placeholder="请选择">
          <el-option
            v-for="item in machinetypes"
            :key="item.Id"
            :label="item.EquipType"
            :value="item.Id"
          ></el-option>
        </el-select>
      </div>
      <div class="con">
        <span class="tip">设备编号</span>
        <el-input style="width:auto" v-model="machinenumber" placeholder="请输入内容"></el-input>
      </div>
      <el-button type="primary" round style="margin-left:20px" @click="query">查询</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="clear">清空</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="dialogVisible = true">新增设备</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" center>
      <div slot="title">新增设备</div>
      <span>
        <el-form
          label-position="right"
          label-width="100px"
          :model="InsertForm"
          style="padding-left:40px"
        >
          <el-form-item label="设备编号">
            <el-input
              style="width:217px"
              v-model="InsertForm.InsertMachinaryId"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-select v-model="InsertForm.InsertEquipTypeId" placeholder="请选择">
              <el-option
                v-for="item in machinetypes"
                :key="item.Id"
                :label="item.EquipType"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="站点所在区域">
            <el-cascader
              placeholder="选择地址"
              :options="optionone"
              v-model="InsertForm.Area"
              @change="addressChangeone"
            ></el-cascader>
            <el-cascader
              placeholder="选择或输入站点"
              :options="SiteNameList"
              v-model="InsertForm.SelectSite"
              filterable
              @change="addressChangetwo"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input
              style="width:217px"
              type="textarea"
              v-model="InsertForm.address"
              placeholder="请输入内容"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备人员编号">
            <el-input
              style="width:217px"
              v-model="InsertForm.UserId"
              placeholder="请输入内容"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="管理人员名称">
            <el-input
              style="width:217px"
              v-model="InsertForm.UserName"
              placeholder="请输入内容"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-divider></el-divider>
    <div class="table">
      <el-table :data="table" border style="width: 100%" header-cell-class-name="tablebg">
        <el-table-column align="center" prop="EquipType" label="设备类型" width="160"></el-table-column>
        <el-table-column align="center" prop="MachinaryId" label="设备编号"></el-table-column>
        <el-table-column align="center" prop="SiteName" label="站点名称"></el-table-column>
        <el-table-column align="center" label="详细地址">
          <template slot-scope="scope">{{scope.row.Province}}{{scope.row.City}}{{scope.row.Area}}</template>
        </el-table-column>
        <el-table-column align="center" prop="UserId" label="管理人员编号"></el-table-column>
        <el-table-column align="center" label="管理人员名称">
          <template scope="scope">
            <el-tag>{{scope.row.UserName}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="10"
          @current-change="handleSizeChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import sitethreeselect from "./sitethreeselect";
import { regionData, CodeToText } from "element-china-area-data";
export default {
  data() {
    return {
      optionone: regionData,
      selectedOptions: [],
      dialogVisible: false,
      InsertForm: {
        InsertMachinaryId: "",
        InsertEquipTypeId: "",
        SelectSite:""||'000',
        address: ""||'未知',
        UserId: ""||'000',
        UserName: ""||'张三'
      },
      total: "" || 10,
      currentPage: 1,
      pagesize: 5,
      table: [],
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
      value2: "",
      options: [],
      value: "",
      machinetype: "",
      machinetypes: "",
      machinenumber: "",
      SiteNameList: [], //处理后的站点选择框用的数据
      SiteList: "" //所有站点详细信息列表
    };
  },
  name: "machinemanage",
  components: {
    sitethreeselect
  },
  created() {
    this.getTypeList();
    this.getAllCount();
  },
  methods: {
    getTypeList() {
      //用户列表
      this.$axios
        .post("EquipmentInfo/GetEquipmentPagerList", {
          PageSize: 10,
          PageIndex: 1,
          SiteId: "",
          EquipTypeId: "",
          MachinaryId: ""
        })
        .then(res => {
          console.log(res.data.Data);
          this.table = res.data.Data;
        });
      //设备类型
      this.$axios.get("Types/GetEquipType").then(res => {
        // console.log(res.data.Data,'单位');
        this.machinetypes = res.data.Data;
      });
      //部门
      this.$axios.get("Types/GetDepartmentType").then(res => {
        // console.log(res.data.Data,'部门');
        this.DepartmentNametype = res.data.Data;
      });
      //职务
      this.$axios.get("PositionManager/GetPositionNameList").then(res => {
        // console.log(res.data.Data,'职务');
        this.PositionNametype = res.data.Data;
      });
      //角色
      this.$axios.get("UserInfos/GetCharacterList").then(res => {
        console.log(res.data.Data, "角色");
        this.CharacterNametype = res.data.Data;
      });
    },
    //条件查询
    query() {
      console.log(
        this.$store.state.sheng +
          "+" +
          this.$store.state.shi +
          "+" +
          this.$store.state.qu +
          "+" +
          this.$store.state.sitename
      );
      console.log(this.machinetype, "设备类型");
      console.log(this.machinenumber, "设备编号");
      this.$axios
        .post("EquipmentInfo/GetEquipmentPagerList", {
          PageSize: 10,
          PageIndex: 1,
          SiteId: this.$store.state.sitename,
          EquipTypeId: this.machinetype,
          MachinaryId: this.machinenumber
        })
        .then(res => {
          console.log(res.data.Data);
          this.table = res.data.Data;
        });
    },
    //清空
    clear() {
      this.machinetype = "";
      this.machinenumber = "";
      this.$refs.threeselect.cleardata();
    },
    //新增用户表单确认
    sureForm() {
      console.log(this.InsertForm, "新加表格");
      this.$axios
        .post("EquipmentInfo/PositionInsert", {
          MachinaryId: this.InsertForm.InsertMachinaryId,
          EquipTypeId: this.InsertForm.InsertEquipTypeId,
          UserId: this.InsertForm.UserId
        })
        .then(res => {
          console.log(res.data.Data, "新增");
          if (res.data.Msg == "成功") {
            this.$message({
              message: "新增用户成功",
              type: "success"
            });
            this.InsertForm = "";
            this.query();
          } else {
            this.$message.error("新增用户失败");
          }
        });
      this.dialogVisible = false;
    },
    //总条数
    getAllCount() {
      this.$axios
        .post("EquipmentInfo/GetEquipmentALLCount", {
          SiteId: "",
          EquipTypeId: "",
          MachinaryId: ""
        })
        .then(res => {
          console.log(res.data.Data, "总条数");
          this.total = res.data.Data;
          console.log(this.total);
        });
    },

    handleSizeChange(e) {
      console.log(e);
      this.$axios
        .post("UserInfos/GetUserInfosList", {
          PageSize: 10,
          PageIndex: e,
          UserId: this.UserIdQuery,
          UserName: this.UserNameQuery,
          Phone: this.PhoneQuery,
          Sex: this.SexQuery || 2,
          UnitName: this.UnitNameQuery,
          DepartmentName: this.DepartmentNameQuery,
          PositionName: this.PositionNameQuery,
          CharacterName: this.CharacterNameQuery
        })
        .then(res => {
          console.log(res.data.Data, "查询");
          this.table = res.data.Data;
        });
    },
    addressChangeone(arr) {
      console.log(arr, "地址");
      console.log(
        CodeToText[arr[0]] + "/" + CodeToText[arr[1]] + "/" + CodeToText[arr[2]]
      );
      this.$axios
        .post("SiteManage/GetSiteName", { Area: CodeToText[arr[2]] })
        .then(res => {
          console.log(res.data.Data, "这是站点列表");
          var arr1 = res.data.Data; //选中的站点
          var arr2 = [];
          for (let i = 0; i < arr1.length; i++) {
            arr2.push({ value: arr1[i].SiteName, label: arr1[i].SiteName });
          }
          this.SiteNameList = arr2; //处理后的站点选择框
          this.SiteList = arr1; //所有站点详细信息列表
        });
    },
    addressChangetwo(arr) {
      console.log(arr[0], "地址");
      for (let j = 0; j < this.SiteList.length; j++) {
        if (this.SiteList[j].SiteName == arr[0]) {
          this.InsertForm.address =
            this.SiteList[j].Province +
            this.SiteList[j].City +
            this.SiteList[j].Area +
            this.SiteList[j].Address;
        }
      }

      this.$axios
        .post("SiteManage/GetUserId", { SiteName: arr[0] })
        .then(res => {
          console.log(res.data.Data, "得到的"); //获取到userId
          this.InsertForm.UserId = res.data.Data.UserId;
          this.InsertForm.UserName = res.data.Data.UserName;
        });
    }
  }
};
</script>

<style lang="stylus">
.singalwarn {
  width: 1600px;
  background-color: #ffffff;
  min-height: 800px;
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px;

  .top {
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
}

.el-dialog__header {
  background-color: #409EFF;
  text-align: center;
  color: #ffffff;
  font-size: 22px;
}
</style>