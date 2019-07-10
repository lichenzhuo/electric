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
        <span class="tip" style="margin-left: 2em;">单位编号</span>
        <el-input style="width:auto" v-model="UnitNumber" placeholder="请输入内容"></el-input>
      </div>
      <el-button type="primary" round style="margin-left:20px" @click="query">查询</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="clear">清空</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="insert">添加</el-button>
      <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" center>
        <div slot="title">新增站点</div>
        <span>
          <el-form label-position="right" label-width="100px" style="padding-left:40px">
            <el-form-item label="单位编号">
              <el-input style="width:217px" v-model="InsertUnitNumber" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="单位类别">
              <el-select v-model="UnitTypeId" placeholder="请选择" @change="Selectchange">
                <el-option
                  v-for="item in UnitTypeIdList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位名称">
              <el-select v-model="UnitName" placeholder="请选择" @change="Selectchangetwo">
                <el-option
                  v-for="item in UnitNameList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
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

            <el-form-item label="相关站点">
              <el-select v-model="SiteId" placeholder="请选择" @change="Selectchange">
                <el-option
                  v-for="item in SiteIdList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
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
        <el-table-column align="center" label="联系人">
          <template slot-scope="scope">
            <el-tag>{{scope.row.UserName}}</el-tag>
            <!-- <span>{{scope.row.one}}</span> -->
          </template>
        </el-table-column>
        <el-table-column align="center" prop="DepartmentName" label="部门"></el-table-column>
        <el-table-column align="center" prop="PositionName" label="职位"></el-table-column>
        <el-table-column align="center" prop="Phone" label="联系电话"></el-table-column>
        <el-table-column align="center" prop="VX" label="微信"></el-table-column>
        <el-table-column align="center" prop="SiteName" label="相关站点"></el-table-column>
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
      UnitNumber: "",
      InsertUnitNumber: "",
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
      SiteId: "",
      SiteIdList: [],
      UnitTypeId:"",
      UnitTypeIdList:[],
      UnitName:"",
      UnitNameList:[],
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

  methods: {
    getTypeList() {
      //用户列表
      this.$axios
        .post("UnitInfo/GetUnitInfoPageList", {
          PageSize: 5,
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
        // this.table = res.data.Data.Data;
        for (let i = 0; i < res.data.Data.length; i++) {
          this.SiteIdList.push({
            value: res.data.Data[i].SiteId,
            label: res.data.Data[i].SiteName
          });
        }
      });
      
      this.$axios.get("Types/GetUnitTypeNameList").then(res => {
        console.log(res.data.Data, "33333");
        // this.table = res.data.Data.Data;
        for (let i = 0; i < res.data.Data.length; i++) {
          this.UnitTypeIdList.push({
            value: res.data.Data[i].Id,
            label: res.data.Data[i].UnitTypeName
          });
        }
      });
      this.$axios.get("UserInfos/GetUnitNameList").then(res => {
        console.log(res.data.Data, "444");
        // this.table = res.data.Data.Data;
        for (let i = 0; i < res.data.Data.length; i++) {
          this.UnitNameList.push({
            value: res.data.Data[i].UnitNumber,
            label: res.data.Data[i].UnitName
          });
        }
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
          SiteName: this.siteId,
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
          SiteId: this.SiteId
        })
        .then(res => {
          console.log(res.data.Data, "新增11111");
          if (res.data.Data == true) {
            this.$message({
              message: "新增用户成功",
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
            InsertArea="";
            this.query();
            this.clear();
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
      this.siteId="";
      this.UnitNumber = "";
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
    addressChange(arr) {
      console.log(arr, "地址");
      console.log(
        CodeToText[arr[0]] + "/" + CodeToText[arr[1]] + "/" + CodeToText[arr[2]]
      );
      this.Province = CodeToText[arr[0]];
      this.City = CodeToText[arr[1]];
      this.Area = CodeToText[arr[2]];
    },
    Selectchange(e) {
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
      this.siteId = e[3];
      this.AreaId = e[2];
    }
  }
};
</script>

<style lang="stylus">