<template>
  <div class="singalwarn">
    <div class="top">
      <!-- <div>
        <sitethreeselect ref="threeselect"></sitethreeselect>
      </div> -->
      <span class="tip">站点名称</span>
      <el-cascader
        v-model="SiteName"
        :options="fourData"
        :props="{ expandTrigger: 'hover',value:'label' }"
        @change="SiteSelect"
      ></el-cascader>
      <div class="con">
        <span class="tip" style="margin-left: 2em;">站点编号</span>
        <el-input style="width:auto" v-model="SiteId" placeholder="请输入内容"></el-input>
      </div>
      <el-button type="primary" round style="margin-left:20px" @click="query">查询</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="clear">清空</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="insert">添加</el-button>
      <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" center>
        <div slot="title">新增站点</div>
        <span>
          <el-form label-position="right" label-width="100px" style="padding-left:40px">
            <el-form-item label="站点名称">
              <el-input style="width:217px" v-model="InsertSiteName" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="站点所在区域">
              <el-cascader
                :options="threeData"
                v-model="InsertArea"
                filterable
                props.checkStrictly
                :props="{ expandTrigger: 'hover',value:'label'}"
                @change="addressChange"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input style="width:217px" type="textarea" v-model="Address" placeholder="请输入内容"></el-input>
            </el-form-item>
             <el-form-item label="管理人员名称">
            <el-input
              style="width:217px"
              v-model="InsertUserName"
              placeholder="请输入内容"
              @blur="UserNameInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="设备人员编号">
            <el-input
              style="width:217px"
              v-model="InsertUserId"
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
    </div>
    <el-divider></el-divider>
    <div class="table">
      <el-table
        :data="table"
        border
        style="width: 100%"
        @row-click="rowclick"
        header-cell-class-name="tablebg"
      >
        <el-table-column align="center" prop="SiteId" label="站点编号"></el-table-column>
        <el-table-column align="center" prop="SiteName" label="站点名称"></el-table-column>
        <el-table-column align="center" label="详细地址">
          <template
            slot-scope="scope"
          >{{scope.row.Province}}{{scope.row.City}}{{scope.row.Area}}{{scope.row.Address}}</template>
        </el-table-column>
        <el-table-column align="center" prop="MachinaryId" label="所有设备"></el-table-column>
        <el-table-column align="center" label="相关人员">
          <template slot-scope="scope">
            <el-tag>{{scope.row.UserName}}</el-tag>
            <!-- <span>{{scope.row.one}}</span> -->
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
  name: "sitemanage",
  components: {
    sitethreeselect
  },
  data() {
    return {
      InsertUserName:"",
      InsertUserId:"",
      InsertSiteName: "",
      SiteId: "",
      MachinaryId: "",
      MachinaryTYpes: "",
      Province: "",
      City: "",
      Area: "",
      Address: "",
      InsertArea: [],
      UserName: "" || "请选择",
      table: [],
      optionone: regionData,
      dialogVisible: false,
      total: "" || 10,
      MachinaryIdList: "",
       SiteName: "",
      fourData: [],
      threeData: [],
      AreaId: ""
    };
  },
  created() {
    // this.getTableData();
    this.getDataNumber();
    this.getTypeList();
  },
  mounted() {},
  // SiteManage/GetMachinaryIdList
  methods: {
    getTypeList() {
      //用户列表
      this.$axios
        .post("SiteManage/GetSiteManagerPagerList", {
          PageSize: 10,
          PageIndex: 1,
          SiteId: "",
          SiteName: "",
        })
        .then(res => {
          // console.log(res.data.Data);
          this.table = res.data.Data;
        });
      //4级联动
      this.$axios.post("SiteTree/GetFourLevel", {}).then(res => {
        console.log(res.data.Data.Data, "4级联动");
        this.fourData = res.data.Data.Data;
      });
      //3级联动
      this.$axios.post("SiteTree/GetThreeLevel", {}).then(res => {
        console.log(res.data.Data.Data, "3级联动");
        this.threeData = res.data.Data.Data;
      });
    },
    // 搜索
    query() {
      this.$axios
        .post("SiteManage/GetSiteManagerPagerList", {
          PageSize: 10,
          PageIndex: "1",
          SiteId: this.SiteId,
          SiteName: this.SiteName,
        })
        .then(res => {
          console.log(res.data.Data, "查询");
          this.table = res.data.Data;
        });
    },
    // 新增
    sureForm() {
      this.$axios
        .post("SiteManage/SiteManageInsert", {
          SiteName: this.InsertSiteName,
          Province: this.Province,
          City: this.City,
          Area: this.Area,
          AreaId:"",
          Address: this.Address,
          UserId:this.InsertUserId
        })
        .then(res => {
          console.log(res.data.Data, "新增");
          if (res.data.Msg == "成功") {
            this.$message({
              message: "新增站点成功",
              type: "success"
            });
            this.InsertForm = "";
            this.query();
          } else {
            this.$message.error("新增站点失败");
          }
        });
      this.dialogVisible = false;
    },
    insert() {
      this.dialogVisible = true;
    },
    clear() {
      // this.$refs.threeselect.cleardata();
      this.SiteName = "";
      this.SiteId = "";
      this.MachinaryId = "";
    },
    getDataNumber() {
      this.$axios    
        .post("SiteManage/GetSiteManagerALLCount", {
          SiteId: "",
          SiteName: "",
        })
        .then(res => {
          console.log(res.data.Data,'78978798798');
          this.total = res.data.Data;
        });
    },
    handleSizeChange(e) {
      console.log(e)
       this.$axios
        .post("SiteManage/GetSiteManagerPagerList", {
          PageSize: 10,
          PageIndex: e,
          SiteId: "",
          SiteName: "",
        })
        .then(res => {
          // console.log(res.data.Data);
          this.table = res.data.Data;
        });
    },

    rowclick(e) {
      console.log(e.id);
    },
    addressChange(arr, label) {
      console.log(arr, "地址111");
      console.log(label, "地址222222");
      console.log(this.InsertArea)
      this.Province = arr[0];
      this.City = arr[1];
      this.Area = arr[2];
    },
    Selectchange(e) {
      console.log(e, "点击");
      this.MachinaryIdList;
      for (let i = 0; i < this.MachinaryIdList.length; i++) {
        const element = this.MachinaryIdList[i];
        if (this.MachinaryIdList[i].MachinaryId == e) {
          this.UserName = this.MachinaryIdList[i].UserName;
        }
      }
      console.log(this.UserName )
    },
     SiteSelect(e) {
      console.log(e);
      this.SiteName = e[3];
      this.AreaId = e[2];
    },
    UserNameInput() {
      this.$axios
        .post("UserInfos/GetUserIdByUserName", {
          UserName: this.InsertUserName,
          UserId: ""
        })
        .then(res => {
          console.log(res.data.Data, "66666");
          this.InsertUserId = res.data.Data[0].UserId;
          console.log(res.data.Data[0].UserId);
        });
    },
    UserIdInput(e) {
      this.$axios
        .post("UserInfos/GetUserNameByUserId", {
          UserName: "",
          UserId: this.InsertUserId
        })
        .then(res => {
          console.log(res.data.Data, "77777");
          this.InsertUserName = res.data.Data.UserName;
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
}

.el-dialog__header {
  background-color: #409EFF;
  text-align: center;
  color: #ffffff;
  font-size: 22px;
}
</style>