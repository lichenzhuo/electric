<template>
  <div class="info">
    <div class="banner">
      <div class="header">
        <span class="box" style="background-color:#C0C4CC">基本信息</span>
      </div>
      <el-divider></el-divider>
      <div class="header">
        <span class="box">用户名：{{table.UserName}}</span>
        <span v-if="table.Sex==0" class="box">性别：男</span>
        <span v-else class="box">性别：女</span>
        <span class="box">所属单位：{{table.UnitName}}</span>
        <span class="box">部门：{{table.DepartmentName}}</span>
        <span class="box">职务：{{table.PositionName}}</span>
      </div>
      <el-divider></el-divider>
      <div class="header">
        <!-- <span class="box">办公室电话：021-58885555</span> -->
        <span class="box">手机号：{{table.Phone}}</span>
        <span class="box">微信号：{{table.VX}}</span>
      </div>
      <el-divider></el-divider>
      <div class="table">
        <el-table :data="table" border style="width: 100%" header-cell-class-name="tablebg">
          <el-table-column align="center" prop="MachinaryId" label="维护设备编号"></el-table-column>
          <!-- <el-table-column align="center" prop="one" label="站点名称"></el-table-column> -->
          <el-table-column align="center" prop="1" label="详细地址">
            <template slot-scope="scope">
              <span>{{scope.row.Province}}{{scope.row.City}}{{scope.row.Area}}{{scope.row.Address}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="SiteName" label="站点编号"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "personinfo",

  created() {
    console.log("这是site");
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      this.$axios
        .post("UserInfos/GetUserInfosInfoModelByUserId", {
          UserId: JSON.parse(localStorage.getItem("LoginData")).UserId
        })
        .then(res => {
          this.table = res.data.Data;
        });
    }
  },
  data() {
    return {
      table: [],
      UserName: "",
      Sex: "",
      UnitName: "",
      DepartmentName: "",
      PositionName: "",
      Phone: "",
      Address: "",
      SiteName: ""
    };
  }
};
</script>

<style lang="stylus" scoped>
.info {
  width: 1600px;
  background-color: #ffffff;
  min-height: 800px;
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px;
}

.banner {
  padding: 30px 80px;
}

.header {
  display: flex;
  justify-content: space-between;
}

.box {
  background-color: #E4E7ED;
  padding: 12px 30px;
  border-radius: 12px;
}
</style>