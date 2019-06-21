<template>
  <div class="singalwarn">
    <div class="top">
      <!-- <div class="block con">
         <sitethreeselect></sitethreeselect>
      </div>-->
      <div class="rowOne">
        <div class="con">
          <span class="tip">用户编号</span>
          <el-input style="width:auto" v-model="UserIdQuery" placeholder="请输入内容"></el-input>
        </div>
        <div class="con">
          <span class="tip">用户名称</span>
          <el-input style="width:auto" v-model="UserNameQuery" placeholder="请输入内容"></el-input>
        </div>
        <div class="con">
          <span class="tip">手机号</span>
          <el-input style="width:auto" v-model="PhoneQuery" placeholder="请输入内容"></el-input>
        </div>
        <div class="block con" style="margin-right:0">
          <span class="tip">性别</span>
          <el-select v-model="SexQuery" placeholder="请选择">
            <el-option v-for="item in Sextype" :key="item.id" :label="item.sex" :value="item.id"></el-option>
          </el-select>
        </div>
        <el-button type="primary" round style="margin-left:20px" @click="query">查询</el-button>
      </div>

      <div class="con">
        <span class="tip">单位名称</span>
        <el-select v-model="UnitNameQuery" placeholder="请选择">
          <el-option
            v-for="item in UnitNametype"
            :key="item.UnitNumber"
            :label="item.UnitName"
            :value="item.UnitName"
          ></el-option>
        </el-select>
      </div>
      <div class="block con">
        <span class="tip">部门</span>
        <el-select v-model="DepartmentNameQuery" placeholder="请选择">
          <el-option
            v-for="item in DepartmentNametype"
            :key="item.Id"
            :label="item.DepartmentName"
            :value="item.DepartmentName"
          ></el-option>
        </el-select>
      </div>
      <div class="con">
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
    <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" center>
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
          <el-form-item label="单位名称">
            <el-select v-model="InsertForm.UnitName" placeholder="请选择">
              <el-option
                v-for="item in UnitNametype"
                :key="item.UnitNumber"
                :label="item.UnitName"
                :value="item.UnitNumber"
              ></el-option>
            </el-select>
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
              <el-checkbox label="1">预警日志查看</el-checkbox>
              <el-checkbox label="报警日志查看"></el-checkbox>
              <el-checkbox label="报警解除"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="区域管理">
            <el-cascader
              :options="AreaList"
              v-model="InsertForm.Area"
              filterable
              props.checkStrictly
              @change="addressChange"
            ></el-cascader>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="positiondialog" width="25%" :show-close="false" center>
      <div slot="title">权限设置</div>
      <span>
        <el-checkbox-group v-model="quanxiantype" style="margin-bottom: 20px;">
          <el-checkbox label="预警日志查看"></el-checkbox>
          <el-checkbox label="报警日志查看"></el-checkbox>
          <el-checkbox label="报警解除"></el-checkbox>
        </el-checkbox-group>

        <span class="tip" style="margin-left: 40px;">区域管理</span>
        <el-cascader
          :options="AreaList"
          v-model="quanxianArea"
          filterable
          props.checkStrictly
          @change="addressChange"
        ></el-cascader>
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
          <template scope="scope">
            <el-button type="primary" size="mini" round @click="positionEdit(scope.row)">操作</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="10"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import sitethreeselect from "./sitethreeselect";
import { regionData, CodeToText } from "element-china-area-data";
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
      Sextype: [{ id: 0, sex: "男" }, { id: 1, sex: "女" }],
      UnitNameQuery: "",
      UnitNametype: "",
      DepartmentNameQuery: "",
      DepartmentNametype: "",
      PositionNameQuery: "",
      PositionNametype: "",
      CharacterNameQuery: "",
      CharacterNametype: "",
      quanxiantype: [],
      quanxianArea: "",
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
        quanxiantype: []
      },
      table: []
    };
  },
  created() {
    // this.getRouterData();
    this.getTypeList();
  },
  methods: {
    getTypeList() {
      //用户列表
      this.$axios
        .post("UserInfos/GetUserInfosList", {
          PageSize: 10,
          PageIndex: "1",
          Sex: "2"
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
    },
    query() {
      // this.$message({
      //   message: "点击查询成功",
      //   type: "success"
      // });
      // console.log(this.UserIdQuery)
      this.$axios
        .post("UserInfos/GetUserInfosList", {
          PageSize: 10,
          PageIndex: "1",
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
    insert() {
      this.$message({
        message: "点击添加成功",
        type: "success"
      });
    },
    sureForm() {
      this.dialogVisible = false;
      console.log(this.InsertForm,'新加表格');
      
      // this.$axios
      //   .post("UserInfos/GetUserInfosList", {
      //     UserId: this.InsertForm.UserId,
      //     UserName: this.InsertForm.UserName,
      //     Phone: this.InsertForm.Phone,
      //     Sex: this.InsertForm.Sex,
      //     UnitNumber: this.InsertForm.UnitName,
      //     DepartmentId: this.InsertForm.DepartmentName,
      //     PositionId: this.InsertForm.PositionName,
      //     CharacterId: this.InsertForm.CharacterName,
      //     AlertLogId:this.InsertForm.CharacterName,
      //     AlarmLogId:this.InsertForm.CharacterName,
      //     ReAlarmId:this.InsertForm.CharacterName,
      //     Province:this.InsertForm.CharacterName,
      //     City:this.InsertForm.CharacterName,
      //     Area:this.InsertForm.CharacterName,
      //   })
      //   .then(res => {
      //     console.log(res.data.Data, "查询");
      //     this.table = res.data.Data;
      //   });
    },
    surePosition() {
      this.positiondialog = false;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    getRouterData() {
      this.id = this.$route.params.id;
      // console.log(this.id, "这是新路由接收的");
    },

    rowclick(e) {
      //   console.log(e.id);
    },
    addressChange(arr) {
      console.log(arr, "地址");
      console.log(
        CodeToText[arr[0]] + "/" + CodeToText[arr[1]] + "/" + CodeToText[arr[2]]
      );
    },
    positionEdit(row) {
      console.log(row.id);
      this.positiondialog = true;
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