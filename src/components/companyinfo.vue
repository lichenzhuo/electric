<template>
  <div class="singalwarn">
    <div class="top">
      <!-- <span class="tip">站点名称</span>
      <el-cascader
        v-model="Sitename"
        :options="fourData"
        :props="{ expandTrigger: 'hover',value:'label' }"
        @change="SiteSelect"
      ></el-cascader> -->
      <div class="con">
        <span class="tip" style="margin-left: 2em;">单位编号</span>
        <el-input style="width:auto" v-model="UnitNumber" placeholder="请输入内容"></el-input>
      </div>
      <el-button type="primary" round style="margin-left:20px" @click="query">查询</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="clear">清空</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="insert">添加</el-button>
      <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" center>
        <div slot="title">新增单位</div>
        <span>
          <el-form label-position="right" label-width="100px" style="padding-left:40px">
            <el-form-item label="单位编号">
              <el-input style="width:217px" v-model="InsertUnitNumber" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="单位类别">
              <el-select v-model="UnitTypeId" placeholder="请选择" @change="Unitchange">
                <el-option
                  v-for="item in UnitTypeIdList"
                  :key="item.Id"
                  :label="item.UnitTypeName"
                  :value="item.Id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位名称">
              <el-input style="width:217px" v-model="UnitName" placeholder="请输入内容"></el-input>
              <!-- <el-select v-model="UnitName" placeholder="请选择" @change="UnitNamechange">
                <el-option
                  v-for="item in UnitNameList"
                  :key="item.UnitNumber"
                  :label="item.UnitName"
                  :value="item.UnitName"
                ></el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item label="单位电话">
              <el-input style="width:217px" v-model="InsertUnitPhone" placeholder="请输入内容"></el-input>
            </el-form-item>
            <!-- <el-form-item label="手机号码">
              <el-input style="width:217px" v-model="InsertPhone" placeholder="请输入内容"></el-input>
            </el-form-item>
             <el-form-item label="微信">
              <el-input style="width:217px" v-model="InsertVX" placeholder="请输入内容"></el-input>
            </el-form-item> -->
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
            <!-- <el-form-item label="联系人">
              <el-input style="width:217px" v-model="UserName" placeholder="请输入内容"></el-input>
            </el-form-item>-->
            <!-- <el-form-item label="部门">
              <el-select v-model="DepartmentId" placeholder="请选择" @change="Departmentchange">
                <el-option
                  v-for="item in DepartmentNameList"
                  :key="item.Id"
                  :label="item.DepartmentName"
                  :value="item.Id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职位">
              <el-select v-model="PositionId" placeholder="请选择" @change="Positionchange">
                <el-option
                  v-for="item in PositionNameList"
                  :key="item.PositionId"
                  :label="item.PositionName"
                  :value="item.PositionId"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="相关站点">
              <el-select v-model="SiteId" placeholder="请选择" @change="Selectchange">
                <el-option
                  v-for="item in SiteIdList"
                  :key="item.SiteId"
                  :label="item.SiteName"
                  :value="item.SiteId"
                ></el-option>
              </el-select>
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
        <el-table-column align="center" prop="UnitNumber" label="单位编号"></el-table-column>
        <el-table-column align="center" prop="UnitName" label="单位名称"></el-table-column>
        <el-table-column align="center" label="地址">
          <template
            slot-scope="scope"
          >{{scope.row.Province}}{{scope.row.City}}{{scope.row.Area}}{{scope.row.Address}}</template>
        </el-table-column>
        <el-table-column align="center" prop="UnitTypeName" label="类别"></el-table-column>
        <el-table-column align="center" prop="UnitPhone" label="单位电话"></el-table-column>
        <!-- <el-table-column align="center" label="联系人">
          <template slot-scope="scope">
            <el-tag>{{scope.row.UserName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="DepartmentName" label="部门"></el-table-column>
        <el-table-column align="center" prop="PositionName" label="职位"></el-table-column>
        <el-table-column align="center" prop="Phone" label="联系电话"></el-table-column>
        <el-table-column align="center" prop="VX" label="微信"></el-table-column>
        <el-table-column align="center" prop="SiteName" label="相关站点"></el-table-column> -->
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
export default {
  name: "sitemanage",
  data() {
    return {
      InsertUnitPhone:"",
      InsertVX:"",
      InsertPhone:"",
      UnitNumber: "",
      InsertUnitNumber: "",
      MachinaryTYpes: "",
      Province: "",
      City: "",
      Area: "",
      Address: "",
      InsertArea: [],
      UserName: "",
      table: [],
      dialogVisible: false,
      total: "" || 10,
      SiteId: "",
      SiteIdList: [],
      UnitTypeId: "",
      UnitTypeIdList: [],
      UnitName: "",
      UnitNameList: [],
      Sitename: "",
      fourData: [],
      threeData: [],
      AreaId: "",
      DepartmentId: "",
      PositionId: "",
      DepartmentNameList: "",
      PositionNameList: ""
    };
  },
  created() {
    // this.getTableData();
    this.getDataNumber();
    this.getTypeList();
  },
  mounted() {},

  methods: {
    getTypeList() {
      //用户列表
      this.$axios
        .post("UnitInfo/GetUnitInfoPageList", {
          PageSize: 10,
          PageIndex: 1,
          SiteName: "",
          UnitNumber: ""
        })
        .then(res => {
          console.log(res.data.Data.Data, "1111");
          this.table = res.data.Data.Data;
        });
      this.$axios.post("SiteManage/GetAllSiteName").then(res => {
        console.log(res.data.Data, "222");
        this.SiteIdList = res.data.Data;
      });

      this.$axios.get("Types/GetUnitTypeNameList").then(res => {
        console.log(res.data.Data, "33333");
        this.UnitTypeIdList = res.data.Data;
      });
      this.$axios.get("UserInfos/GetUnitNameList").then(res => {
        console.log(res.data.Data, "444");
        this.UnitNameList = res.data.Data;
      });

      this.$axios.get("Types/GetDepartmentType").then(res => {
        console.log(res.data.Data, "5555");
        this.DepartmentNameList = res.data.Data;
      });

      this.$axios.get("PositionManager/GetPositionNameList").then(res => {
        console.log(res.data.Data, "666");
        this.PositionNameList = res.data.Data;
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
        .post("UnitInfo/GetUnitInfoPageList", {
          PageSize: 5,
          PageIndex: 1,
          // SiteName: this.Sitename,
          UnitNumber: this.UnitNumber
        })
        .then(res => {
          console.log(res, "1111");
          this.table = res.data.Data.Data;
        });
    },
    sureForm() {
      this.$axios
        .post("UnitInfo/UnitInfoInsert", {
          UnitNumber: this.InsertUnitNumber,
          UnitTypeId: this.UnitTypeId,
          UnitName: this.UnitName,
          Province: this.Province,
          City: this.City,
          Area: this.Area,
          Address: this.Address,
          UnitPhone:this.InsertUnitPhone,
          // Contact: "",
          // DepartmentId: this.DepartmentId,
          // PositionId: this.PositionId,
          // Phone: this.InsertPhone,
          // WX: this.InsertVX,
          SiteId: this.SiteId
        })
        .then(res => {
          console.log(res.data.Data, "新增11111");
          if (res.data.Msg == '成功') {
            this.$message({
              message: "新增单位成功",
              type: "success"
            });
            this.InsertUnitNumber = "";
            this.UnitTypeId = "";
            this.UnitName = "";
            this.Province = "";
            this.City = "";
            this.Area = "";
            this.Address = "";
            this.SiteId = "";
            InsertArea = "";
            (this.DepartmentId = ""), (this.PositionId = ""), this.query();
            this.clear();
          } else {
            this.$message.error("新增单位失败");
          }
        });
      this.dialogVisible = false;
    },
    insert() {
      this.dialogVisible = true;
    },
    clear() {
      // this.$refs.threeselect.cleardata();
      this.Sitename = "";
      this.UnitNumber = "";
    },
    getDataNumber() {
      this.$axios
        .post("UnitInfo/GetUnitInfoALLCount", {
          SiteName: "",
          UnitNumber: ""
        })
        .then(res => {
          console.log(res.data.Data, "总条数");
          // this.total = res.data.Data;
        });
    },
    handleSizeChange(currentPage) {},

    rowclick(e) {
      console.log(e.id);
    },
    addressChange(arr) {
      console.log(arr, "地址");
      this.Province = arr[0];
      this.City = arr[1];
      this.Area = arr[2];
    },
    Selectchange(e) {
      console.log(e, "点击");
    },
    Unitchange(e) {
      console.log(e, "点击");
    },
    UnitNamechange(e) {
      console.log(e, "点击");
    },
    Departmentchange(e) {
      console.log(e, "点击");
    },
    Positionchange(e) {
      console.log(e, "点击");
    },
    Selectchangeone(e) {
      console.log(e, "点击");
    },
    Selectchangetwo(e) {
      console.log(e, "点击");
    },
    SiteSelect(e) {
      console.log(e);
      this.Sitename = e[3];
      this.AreaId = e[2];
    }
  }
};
</script>

<style lang="stylus">