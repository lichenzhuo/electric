<template>
  <div class="singalwarn">
    <div class="top">
      <!-- <div class="block con">
        <sitethreeselect ref="threeselect"></sitethreeselect>
      </div>-->
      <span class="tip">站点名称</span>
      <el-cascader
        v-model="siteName"
        :options="fourData"
        :props="{ expandTrigger: 'hover',value:'label' }"
        @change="SiteSelect"
      ></el-cascader>
      <div class="block con">
        <span class="tip">设备类型</span>
        <el-select v-model="machinetype" placeholder="请选择" @change="machinetypechange">
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
            <el-select
              v-model="InsertForm.InsertEquipTypeId"
              placeholder="请选择"
              @change="insertmachinetypechange"
            >
              <el-option
                v-for="item in machinetypes"
                :key="item.Id"
                :label="item.EquipType"
                :value="item.Id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="站点名称">
            <el-select
              v-model="InsertForm.SiteName"
              placeholder="请选择"
              @change="insertaddressChange"
            >
              <el-option
                v-for="item in AllSiteName"
                :key="item.index"
                :label="item.SiteName"
                :value="item.SiteName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input
              style="width:217px"
              type="textarea"
              v-model="InsertForm.address"
              placeholder="请输入内容"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="管理人员名称">
            <el-input
              style="width:217px"
              v-model="InsertForm.UserName"
              placeholder="请输入内容"
              @blur="UserNameInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备人员编号">
            <el-input
              style="width:217px"
              v-model="InsertForm.UserId"
              placeholder="请输入内容"
              @blur="UserIdInput"
            ></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureForm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="editVisible" width="25%" :show-close="false" center>
      <div slot="title">编辑设备</div>
      <span>
        <el-form label-position="right" label-width="100px" style="padding-left:40px">
          <el-form-item label="设备编号">
            <el-input style="width:217px" v-model="EditMachinaryId" disabled></el-input>
          </el-form-item>
          <el-form-item label="设备类型">
            <el-input style="width:217px" v-model="EditEquipType" disabled></el-input>
          </el-form-item>
          <el-form-item label="站点名称">
            <el-select v-model="EditSiteId" placeholder="请选择" @change="EditinsertaddressChange">
              <el-option
                v-for="item in AllSiteName"
                :key="item.index"
                :label="item.SiteName"
                :value="item.SiteId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input style="width:217px" type="textarea" v-model="EditAddressDetail" disabled></el-input>
          </el-form-item>
          <el-form-item label="管理人员名称">
            <el-input style="width:217px" disabled v-model="EditUserName"></el-input>
          </el-form-item>
          <el-form-item label="设备人员编号">
            <el-input style="width:217px" disabled v-model="EditUserId"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-divider></el-divider>
    <div class="table">
      <el-table :data="table" border style="width: 100%" header-cell-class-name="tablebg">
        <el-table-column align="center" prop="EquipType" label="设备类型" width="160"></el-table-column>
        <el-table-column align="center" prop="MachinaryId" label="设备编号"></el-table-column>
        <el-table-column align="center" prop="SiteName" label="站点名称"></el-table-column>
        <el-table-column align="center" label="详细地址">
          <template
            slot-scope="scope"
          >{{scope.row.Province}}{{scope.row.City}}{{scope.row.Area}}{{scope.row.Address}}</template>
        </el-table-column>
        <el-table-column align="center" prop="UserId" label="管理人员编号"></el-table-column>
        <el-table-column align="center" label="管理人员名称">
          <template scope="scope">
            <el-tag>{{scope.row.UserName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template scope="scope">
            <el-link type="primary" @click="edit(scope.row)">编辑</el-link>
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
      editVisible: false,
      InsertForm: {
        InsertMachinaryId: "",
        InsertEquipTypeId: "",
        SelectSite: "" || "000",
        address: "",
        UserId: "",
        UserName: "",
        SiteId: ""
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
      SiteList: "", //所有站点详细信息列表
      siteName: "",
      fourData: [],
      AreaId: "",
      AllSiteName: "",
      EditRow: [],
      EditMachinaryId: "",
      EditEquipType: "",
      EditAddressDetail: "",
      EditUserName: "",
      EditUserId: "",
      EditSiteId: "",
      EditId: ""
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
      //设备列表
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
      //设备列表数量
      this.$axios
        .post("EquipmentInfo/GetEquipmentALLCount", {
          SiteName: "",
          EquipTypeId: "0",
          MachinaryId: ""
        })
        .then(res => {
          console.log(res.data.Data);
          this.total = res.data.Data;
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
      //4级联动
      this.$axios.post("SiteTree/GetFourLevel", {}).then(res => {
        console.log(res.data.Data.Data, "4级联动");
        this.fourData = res.data.Data.Data;
      });
      //所有站点名称
      this.$axios.post("SiteManage/GetAllSiteName").then(res => {
        console.log(res.data.Data, "所有站点名称");
        this.AllSiteName = res.data.Data;
      });
    },
    //条件查询
    query() {
      console.log(this.siteName, "站点");
      console.log(this.machinetype, "设备类型");
      console.log(this.machinenumber, "设备编号");
      if (this.machinetype) {
        console.log("123123");
      } else {
        this.machinetype = "0";
        console.log(this.machinetype, "321321");
      }
      this.$axios
        .post("EquipmentInfo/GetEquipmentPagerList", {
          PageSize: 10,
          PageIndex: 1,
          SiteId: this.siteName,
          EquipTypeId: this.machinetype,
          MachinaryId: this.machinenumber
        })
        .then(res => {
          console.log(res.data.Data);
          this.table = res.data.Data;
        });
      this.clear();
    },
    //清空
    clear() {
      this.machinetype = "";
      this.machinenumber = "";
      this.siteName = "";
      // this.$refs.threeselect.cleardata();
    },
    //新增用户表单确认
    sureForm() {
      console.log(this.InsertForm, "新加表格");
      this.$axios
        .post("EquipmentInfo/EquipmentInsert", {
          MachinaryId: this.InsertForm.InsertMachinaryId,
          EquipTypeId: this.InsertForm.InsertEquipTypeId,
          UserId: this.InsertForm.UserId,
          SiteId: this.InsertForm.SiteId
        })
        .then(res => {
          console.log(res.data.Data, "新增");
          if (res.data.Msg == "成功") {
            this.$message({
              message: "新增设备成功",
              type: "success"
            });
            this.InsertForm = "";
            this.query();
            this.dialogVisible = false;
          } else {
            this.$message.error("新增用户失败");
          }
        });
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
    // 编辑

    edit(e) {
      console.log(e);
      this.EditMachinaryId = e.MachinaryId;
      this.EditEquipType = e.EquipType;
      this.EditAddressDetail = e.Province + e.City + e.Area + e.Address;
      this.EditUserName = e.UserName;
      this.EditUserId = e.UserId;
      this.editVisible = true;
      this.EditId = e.Id;
    },
    // 确定编辑
    sureEdit() {
      console.log(this.EditSiteId, "5555");
      console.log(this.EditId, "55554444");
      if (this.EditSiteId) {
        this.$axios
          .post("EquipmentInfo/UpdateSiteId", {
            PageSize: 10,
            Id: this.EditId,
            SiteId: this.EditSiteId
          })
          .then(res => {
            console.log(res.data.Data, "确定修改");
          });
      }
      this.editVisible = false;
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
    SiteSelect(e) {
      console.log(e);
      this.siteName = e[3];
      this.AreaId = e[2];
      console.log(this.siteName, "00000");
    },
    machinetypechange(e) {
      console.log(e, "99999");
    },
    insertmachinetypechange(e) {
      console.log(e, "99999");
    },
    insertaddressChange(e) {
      console.log(e, "88888");
      for (let i = 0; i < this.AllSiteName.length; i++) {
        this.AllSiteName[i].SiteName;
        if (e == this.AllSiteName[i].SiteName) {
          this.InsertForm.SiteId = this.AllSiteName[i].SiteId;
        }
      }
      console.log(this.InsertForm.SiteId, "99999999999");
      this.$axios
        .post("SiteManage/GetAddressBySiteName", { SiteName: e })
        .then(res => {
          console.log(res.data.Data, "得到的e");
          this.InsertForm.address =
            res.data.Data.Province +
            res.data.Data.City +
            res.data.Data.Area +
            res.data.Data.Address;
        });
    },
    EditinsertaddressChange(e) {
      console.log(e, "88888");
      for (let i = 0; i < this.AllSiteName.length; i++) {
        this.AllSiteName[i].SiteName;
        if (e == this.AllSiteName[i].SiteName) {
          this.InsertForm.SiteId = this.AllSiteName[i].SiteId;
        }
      }
      console.log(this.InsertForm.SiteId, "99999999999");
    },
    UserNameInput() {
      this.$axios
        .post("UserInfos/GetUserIdByUserName", {
          UserName: this.InsertForm.UserName,
          UserId: ""
        })
        .then(res => {
          console.log(res.data.Data, "66666");
          this.InsertForm.UserId = res.data.Data[0].UserId;
          console.log(res.data.Data[0].UserId);
        });
    },
    UserIdInput(e) {
      this.$axios
        .post("UserInfos/GetUserNameByUserId", {
          UserName: "",
          UserId: this.InsertForm.UserId
        })
        .then(res => {
          console.log(res.data.Data, "77777");
          this.InsertForm.UserName = res.data.Data.UserName;
          console.log(res.data.Data.UserName);
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