<template>
  <div class="singalwarn">
    <div class="top">
      <!-- <div class="block con">
         <sitethreeselect></sitethreeselect>
      </div>-->
      <div class="rowOne">
        <div class="conone">
          <span class="tip">用户编号</span>
          <el-input style="width:auto" v-model="UserIdQuery" placeholder="请输入内容"></el-input>
        </div>
        <div class="block conone">
          <span class="tip">用户名称</span>
          <el-input style="width:auto" v-model="UserNameQuery" placeholder="请输入内容"></el-input>
        </div>
        <div class="block conone">
          <span class="tip">手机号</span>
          <el-input style="width:auto" v-model="PhoneQuery" placeholder="请输入内容"></el-input>
        </div>
        <div class="block conone" style="margin-right:0">
          <span class="tip">性别</span>
          <el-select v-model="SexQuery" placeholder="请选择">
            <el-option v-for="item in Sextype" :key="item.id" :label="item.sex" :value="item.id"></el-option>
          </el-select>
        </div>
        <el-button type="primary" round style="margin-left:20px" @click="query">查询</el-button>
        <el-button type="primary" round style="margin-left:20px" @click="clear">清空</el-button>
      </div>
      <div class="conone">
        <span class="tip">单位名称</span>
        <el-input style="width:auto" v-model="UnitNameQuery" placeholder="请输入内容"></el-input>
        <!-- <el-select v-model="UnitNameQuery" placeholder="请选择">
          <el-option
            v-for="item in UnitNametype"
            :key="item.UnitNumber"
            :label="item.UnitName"
            :value="item.UnitName"
          ></el-option>
        </el-select>-->
      </div>
      <div class="block conone">
        <span class="tip" style="margin-left:1em">部门</span>
        <el-select v-model="DepartmentNameQuery" placeholder="请选择">
          <el-option
            v-for="item in DepartmentNametype"
            :key="item.Id"
            :label="item.DepartmentName"
            :value="item.DepartmentName"
          ></el-option>
        </el-select>
      </div>
      <div class="block conone">
        <span class="tip">职务</span>
        <el-select v-model="PositionNameQuery" placeholder="请选择">
          <el-option
            v-for="item in PositionNametype"
            :key="item.PositionId"
            :label="item.PositionName"
            :value="item.PositionName"
          ></el-option>
        </el-select>
      </div>
      <div class="block con" style="margin-right:0">
        <span class="tip">角色</span>
        <el-select v-model="CharacterNameQuery" placeholder="请选择">
          <el-option
            v-for="item in CharacterNametype"
            :key="item.Id"
            :label="item.CharacterName"
            :value="item.CharacterName"
          ></el-option>
        </el-select>
      </div>

      <el-button type="primary" round style="margin-left:20px" @click="dialogVisible = true">新增用户</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" center top="3vh">
      <div slot="title">新增用户</div>
      <span>
        <el-form
          label-position="right"
          label-width="100px"
          :model="InsertForm"
          style="padding-left:40px"
        >
          <el-form-item label="用户编号">
            <el-input style="width:217px" v-model="InsertForm.UserId" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="用户名称">
            <el-input style="width:217px" v-model="InsertForm.UserName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <!-- <el-form-item label="单位名称">
            <el-select v-model="InsertForm.UnitName" placeholder="请选择">
              <el-option
                v-for="item in UnitNametype"
                :key="item.UnitNumber"
                :label="item.UnitName"
                :value="item.UnitNumber"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="单位名称">
            <el-input style="width:217px" v-model="InsertForm.UnitName" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="InsertForm.CharacterName" placeholder="请选择">
              <el-option
                v-for="item in CharacterNametype"
                :key="item.Id"
                :label="item.CharacterName"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-select v-model="InsertForm.Sex" placeholder="请选择">
              <el-option v-for="item in Sextype" :key="item.id" :label="item.sex" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input style="width:217px" v-model="InsertForm.Phone" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-select v-model="InsertForm.DepartmentName" placeholder="请选择">
              <el-option
                v-for="item in DepartmentNametype"
                :key="item.Id"
                :label="item.DepartmentName"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="职务">
            <el-select v-model="InsertForm.PositionName" placeholder="请选择">
              <el-option
                v-for="item in PositionNametype"
                :key="item.PositionId"
                :label="item.PositionName"
                :value="item.PositionId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="权限设置">
            <el-checkbox-group v-model="InsertForm.quanxiantype">
              <el-checkbox label="预警日志查看"></el-checkbox>
              <el-checkbox label="报警日志查看"></el-checkbox>
              <el-checkbox label="报警解除"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="区域管理">
            <el-cascader
              v-model="InsertForm.Area"
              :options="threeData"
              :props="{ expandTrigger: 'hover' ,value:'label'}"
              @change="addressChangeInsert"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input style="width:217px" v-model="InsertForm.Address" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="positiondialog" width="20%" :show-close="false" center>
      <div slot="title">权限设置</div>
      <span>
        <span class="tip" style>用户权限</span>
        <el-checkbox-group
          v-model="editquanxiantype"
          style="margin-bottom: 20px;margin-left:50px;margin-top:10px"
        >
          <el-checkbox label="预警日志查看"></el-checkbox>
          <el-checkbox label="报警日志查看"></el-checkbox>
          <el-checkbox label="报警解除"></el-checkbox>
        </el-checkbox-group>

        <span class="tip" style>区域管理</span>
        <el-cascader
          v-model="editquanxianArea"
          :options="threeData"
          :props="{ expandTrigger: 'hover',value:'label' }"
          @change="addressChangeEdit"
          style="margin-left:50px;margin-top:10px;display:block"
        ></el-cascader>
        <span class="tip" style>详细地址</span>
        <el-input
          style="margin-left:50px;margin-top:10px;display:block;width:280px"
          v-model="editquanxianAddress"
          placeholder="请输入内容"
        ></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="positiondialog = false">取 消</el-button>
        <el-button type="primary" @click="surePosition">确 定</el-button>
      </span>
    </el-dialog>
    <el-divider></el-divider>
    <div class="table">
      <el-table
        :data="table"
        border
        style="width: 100%"
        @row-click="rowclick"
        header-cell-class-name="tablebg"
      >
        <el-table-column align="center" prop="UserId" label="用户编号" width="160"></el-table-column>
        <el-table-column align="center" prop="UserName" label="用户名称"></el-table-column>
        <el-table-column align="center" prop="CharacterName" label="角色"></el-table-column>
        <el-table-column align="center" prop="3" label="权限设置">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" round @click="positionEdit(scope.row)">操作</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <!-- <el-pagination
          @current-change="handleCurrentChange"
          background
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="10"
        ></el-pagination>-->
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
// import sitethreeselect from "./sitethreeselect";
import { regionData, CodeToText } from "element-china-area-data";
import mapdata from "../mapdata";
export default {
  name: "usermanage",
  //    components:{
  //     sitethreeselect
  //   },
  data() {
    return {
      UserIdQuery: "",
      UserNameQuery: "",
      PhoneQuery: "",
      SexQuery: "",
      Sextype: [{ id: 1, sex: "男" }, { id: 2, sex: "女" }],
      UnitNameQuery: "",
      UnitNametype: "",
      DepartmentNameQuery: "",
      DepartmentNametype: "",
      PositionNameQuery: "",
      PositionNametype: "",
      CharacterNameQuery: "",
      CharacterNametype: "",
      quanxiantype: [],
      editquanxiantype: [],
      editquanxianArea: "",
      editquanxianAddress: "",
      AreaList: regionData,
      dialogVisible: false,
      positiondialog: false,
      InsertForm: {
        UserId: "",
        UserName: "",
        Phone: "",
        Sex: "",
        UnitName: "",
        DepartmentName: "",
        PositionName: "",
        CharacterName: "",
        Area: "",
        Address: "",
        quanxiantype: []
      },
      AlertLogIdInsert: "",
      AlarmLogIdInsert: "",
      ReAlarmIdInsert: "",
      EditAlertLogIdInsert: "",
      EditAlarmLogIdInsert: "",
      EditReAlarmIdInsert: "",
      table: [],
      total: "" || 10,
      placeholder: "",
      EditId: "",
      threeData: []
    };
  },
  created() {
    // this.getRouterData();
    this.getTypeList();
    this.getAllCount();
  },
  methods: {
    getTypeList() {
      //用户列表
      this.$axios
        .post("UserInfos/GetUserInfosList", {
          PageSize: 10,
          PageIndex: "1",
          Sex: "0"
        })
        .then(res => {
          // console.log(res.data.Data);
          this.table = res.data.Data;
        });
      //单位名称
      this.$axios.get("UserInfos/GetUnitNameList").then(res => {
        // console.log(res.data.Data,'单位');
        this.UnitNametype = res.data.Data;
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
      //3级联动
      this.$axios.post("SiteTree/GetThreeLevel", {}).then(res => {
        console.log(res.data.Data.Data, "3级联动");
        this.threeData = res.data.Data.Data;
      });
    },
    //条件查询
    query() {
      console.log(this.UserIdQuery);
      console.log(this.UserNameQuery);
      console.log(this.PhoneQuery);
      console.log(this.SexQuery);
      console.log(this.UnitNameQuery);
      console.log(this.DepartmentNameQuery);
      console.log(this.PositionNameQuery);
      console.log(this.CharacterNameQuery);
      this.$axios
        .post("UserInfos/GetUserInfosList", {
          PageSize: 10,
          PageIndex: "1",
          UserId: this.UserIdQuery,
          UserName: this.UserNameQuery,
          Phone: this.PhoneQuery,
          Sex: this.SexQuery || 0,
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
    //清空
    clear() {
      this.UserIdQuery = "";
      this.UserNameQuery = "";
      this.PhoneQuery = "";
      this.SexQuery = "";
      this.UnitNameQuery = "";
      this.DepartmentNameQuery = "";
      this.PositionNameQuery = "";
      this.CharacterNameQuery = "";
    },
    //新增用户表单确认
    sureForm() {
      console.log(this.InsertForm, "新加表格");
      if (
        this.InsertForm.UserId == "" ||
        this.InsertForm.UserName == "" ||
        this.InsertForm.UnitName == "" ||
        this.InsertForm.CharacterName == "" ||
        this.InsertForm.Sex == "" ||
        this.InsertForm.Phone == "" ||
        this.InsertForm.DepartmentName == "" ||
        this.InsertForm.PositionName == "" ||
        this.InsertForm.quanxiantype == "" ||
        this.InsertForm.Area == "" ||
        this.InsertForm.Address == ""
      ) {
        this.$message.error("信息填写不完整");
      } else {
        var oldarr = this.InsertForm.quanxiantype;
        for (let i = 0; i < oldarr.length; i++) {
          if (oldarr[i] == "预警日志查看") {
            this.AlertLogIdInsert = "1";
          } else if (oldarr[i] == "报警日志查看") {
            this.AlarmLogIdInsert = "1";
          } else if (oldarr[i] == "报警解除") {
            this.ReAlarmIdInsert = "1";
          } else {
          }
        }
        if (this.AlertLogIdInsert && this.AlertLogIdInsert == "1") {
        } else {
          this.AlertLogIdInsert = "0";
        }
        if (this.AlarmLogIdInsert && this.AlarmLogIdInsert == "1") {
        } else {
          this.AlarmLogIdInsert = "0";
        }
        if (this.ReAlarmIdInsert && this.ReAlarmIdInsert == "1") {
        } else {
          this.ReAlarmIdInsert = "0";
        }
        console.log(this.AlertLogIdInsert, "预警日志");
        console.log(this.AlarmLogIdInsert, "报警日志");
        console.log(this.ReAlarmIdInsert, "报警解除");
        this.$axios
          .post("UserInfos/UserInfosInsert", {
            UserId: this.InsertForm.UserId,
            UserName: this.InsertForm.UserName,
            UnitName: this.InsertForm.UnitName,
            CharacterId: this.InsertForm.CharacterName,
            Sex: this.InsertForm.Sex,
            Phone: this.InsertForm.Phone,
            DepartmentId: this.InsertForm.DepartmentName,
            PositionId: this.InsertForm.PositionName,
            AlertLogId: this.AlertLogIdInsert,
            AlarmLogId: this.AlarmLogIdInsert,
            ReAlarmId: this.ReAlarmIdInsert,
            Province: this.InsertForm.Area[0],
            City: this.InsertForm.Area[1],
            Area: this.InsertForm.Area[2],
            Address: this.InsertForm.Address
          })
          .then(res => {
            console.log(res.data.Msg, "新增");
            if (res.data.Msg == "成功") {
              this.$message({
                message: "新增用户成功",
                type: "success"
              });
              this.InsertForm = "";
              this.query();
              this.dialogVisible = false;
            } else {
              this.$message.error(res.data.Msg);
            }
          });
      }
    },
    //总条数
    getAllCount() {
      this.$axios
        .post("UserInfos/GetUserInfosALLCount", {
          UserId: "",
          UserName: "",
          UnitNumber: "",
          CharacterId: "",
          Sex: 0,
          Phone: "",
          DepartmentId: "",
          PositionId: "",
          AlertLogId: "",
          AlarmLogId: "",
          ReAlarmId: "",
          Province: "",
          City: "",
          Area: ""
        })
        .then(res => {
          console.log(typeof res.data.Data, "总条数");
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
    getRouterData() {
      this.id = this.$route.params.id;
      // console.log(this.id, "这是新路由接收的");
    },

    rowclick(e) {
      //   console.log(e.id);
    },

    positionEdit(row) {
      console.log(row);
      this.EditId = row.Id;
      console.log(row.Province + "/" + row.City + "/" + row.Area);
      // row.Id AlarmLogId AlertLogId ReAlarmId Province City Area
      var checkArr = [];
      if (row.AlertLogId == 1) {
        checkArr.push("预警日志查看");
      }
      if (row.AlarmLogId == 1) {
        checkArr.push("报警日志查看");
      }
      if (row.ReAlarmId == 1) {
        checkArr.push("报警解除");
      }
      this.editquanxiantype = checkArr;
      this.positiondialog = true;
      this.placeholder = row.Province + "/" + row.City + "/" + row.Area;
      console.log(this.placeholder);
    },
    surePosition() {
      // console.log(this.editquanxiantype);
      // console.log(this.editquanxianArea);
      if (
        this.editquanxiantype == "" ||
        this.editquanxianArea == "" ||
        this.editquanxianAddress == ""
      ) {
        this.$message.error("信息填写不完整");
      } else {
        console.log(this.editquanxiantype);
        console.log(this.editquanxianArea);
        console.log(this.editquanxianAddress);
        var thisarr = this.editquanxiantype;
        for (let i = 0; i < thisarr.length; i++) {
          if (thisarr[i] == "预警日志查看") {
            this.EditAlertLogIdInsert = "1";
          } else if (thisarr[i] == "报警日志查看") {
            this.EditAlarmLogIdInsert = "1";
          } else if (thisarr[i] == "报警解除") {
            this.EditReAlarmIdInsert = "1";
          } else {
          }
        }
        if (this.EditAlertLogIdInsert && this.EditAlertLogIdInsert == "1") {
        } else {
          this.EditAlertLogIdInsert = "0";
        }
        if (this.EditAlarmLogIdInsert && this.EditAlarmLogIdInsert == "1") {
        } else {
          this.EditAlarmLogIdInsert = "0";
        }
        if (this.EditReAlarmIdInsert && this.EditReAlarmIdInsert == "1") {
        } else {
          this.EditReAlarmIdInsert = "0";
        }
        console.log(this.EditAlertLogIdInsert, "预警日志");
        console.log(this.EditAlarmLogIdInsert, "报警日志");
        console.log(this.EditReAlarmIdInsert, "报警解除");
        console.log(this.editquanxianArea);
        this.$axios
          .post("UserInfos/Jurisdiction", {
            Id: this.EditId,
            AlertLogId: this.EditAlertLogIdInsert,
            AlarmLogId: this.EditAlarmLogIdInsert,
            ReAlarmId: this.EditReAlarmIdInsert,
            Province: this.editquanxianArea[0],
            City: this.editquanxianArea[1],
            Area: this.editquanxianArea[2],
            Address: this.editquanxianAddress
          })
          .then(res => {
            console.log(res.data.Msg, "更改");
            if (res.data.Msg == "成功") {
              this.$message({
                message: "用户权限更改成功",
                type: "success"
              });
              this.query();
              this.positiondialog = false;
              this.editquanxianArea = "";
              this.editquanxianAddress = "";
            } else {
              this.$message.error(res.data.Msg);
              this.editquanxianArea = "";
              this.editquanxianAddress = "";
            }
          });
      }
    },
    addressChangeInsert(e) {
      console.log(e);
      this.Area = e;
    },
    addressChangeEdit(e) {
      console.log(e);
      this.editquanxianArea = e;
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
    padding-left: 80px;
  }

  .header {
    padding-top: 30px;
    padding-left: 80px;
  }

  .conone {
    display: inline-block;
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
    padding-bottom: 20px;
  }

  .indent {
    padding: left 2em;
  }

  .tablebg {
    background-color: #409EFF;
    color: #ffffff;
    font-size: 18px;
  }

  .rowOne {
    margin-bottom: 30px;
  }
}

.el-dialog__header {
  background-color: #409EFF;
  text-align: center;
  color: #ffffff;
  font-size: 22px;
}
</style>