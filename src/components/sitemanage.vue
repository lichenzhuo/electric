<template>
  <div class="singalwarn">
    <div class="top">
      <!-- <div>
        <sitethreeselect ref="threeselect"></sitethreeselect>
      </div> -->
      <span class="tip">站点名称</span>
      <el-cascader
        v-model="siteId"
        :options="fourData"
        :props="{ expandTrigger: 'hover' }"
        @change="SiteSelect"
      ></el-cascader>
      <div class="con">
        <span class="tip" style="margin-left: 2em;">站点编号</span>
        <el-input style="width:auto" v-model="SiteId" placeholder="请输入内容"></el-input>
      </div>
      <!-- <div class="con">
        <span class="tip">设备编号</span>
        <el-input style="width:auto" v-model="MachinaryId" placeholder="请输入内容"></el-input>
      </div> -->
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
              <!-- <el-cascader
                :options="optionone"
                v-model="InsertArea"
                filterable
                props.checkStrictly
                @change="addressChange"
              ></el-cascader> -->
              <el-cascader
                :options="threeData"
                v-model="InsertArea"
                filterable
                props.checkStrictly
                :props="{ expandTrigger: 'hover'}"
                @change="addressChange"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input style="width:217px" type="textarea" v-model="Address" placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- <el-form-item label="所有设备">
              <el-select v-model="MachinaryId" placeholder="请选择" @change="Selectchange">
                <el-option
                  v-for="item in MachinaryTYpes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <!-- <el-form-item label="相关人员">
              <el-input style="width:217px" v-model="UserName" placeholder :disabled="true"></el-input>
            </el-form-item> -->
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
       siteId: "",
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
          MachinaryId: ""
        })
        .then(res => {
          // console.log(res.data.Data);
          this.table = res.data.Data;
        });
      //单位名称
      this.$axios.post("SiteManage/GetMachinaryIdList").then(res => {
        console.log(res.data.Data, "所有设备");
        this.MachinaryIdList = res.data.Data;
        var arr1 = [];
        for (let index = 0; index < res.data.Data.length; index++) {
          arr1.push({
            value: res.data.Data[index].MachinaryId,
            label: res.data.Data[index].MachinaryId
          });
        }
        this.MachinaryTYpes = arr1;
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
    query() {
      this.$axios
        .post("SiteManage/GetSiteManagerPagerList", {
          PageSize: 10,
          PageIndex: "1",
          SiteId: this.SiteId,
          SiteName: this.siteId,
          MachinaryId: this.MachinaryId
        })
        .then(res => {
          console.log(res.data.Data, "查询");
          this.table = res.data.Data;
        });
    },
    sureForm() {
      this.$axios
        .post("SiteManage/SiteManageInsert", {
          MachinaryId: this.MachinaryId,
          SiteName: this.InsertSiteName,
          Province: this.Province,
          City: this.City,
          Area: this.Area,
          Address: this.Address
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
    insert() {
      this.dialogVisible = true;
    },
    clear() {
      // this.$refs.threeselect.cleardata();
      this.siteId = "";
      this.SiteId = "";
      this.MachinaryId = "";
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
    handleSizeChange(currentPage) {},

    rowclick(e) {
      console.log(e.id);
    },
    // addressChange(arr) {
    //   console.log(arr, "地址");
    //   console.log(
    //     CodeToText[arr[0]] + "/" + CodeToText[arr[1]] + "/" + CodeToText[arr[2]]
    //   );
    //   this.Province=CodeToText[arr[0]]
    //   this.City=CodeToText[arr[1]]
    //   this.Area=CodeToText[arr[2]]
    // },
    addressChange(arr, label) {
      console.log(arr, "地址");
      console.log(this.InsertArea)
      // console.log(label, "地址");
      // console.log(
      //   CodeToText[arr[0]] + "/" + CodeToText[arr[1]] + "/" + CodeToText[arr[2]]
      // );
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
      this.siteId = e[3];
      this.AreaId = e[2];
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