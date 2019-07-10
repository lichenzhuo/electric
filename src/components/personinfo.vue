<template>
  <div class="info">
    <div class="banner">
      <div class="header">
        <span class="box" style="background-color:#C0C4CC">基本信息</span>
      </div>
      <el-divider></el-divider>
      <div class="header">
        <span class="box">用户名：{{UserName}}</span>
        <span v-if="table.Sex==0" class="box">性别：男</span>
        <span v-else class="box">性别：女</span>
        <span class="box">所属单位：{{UnitName}}</span>
        <span class="box">部门：{{DepartmentName}}</span>
        <span class="box">职务：{{PositionName}}</span>
      </div>
      <el-divider></el-divider>
      <div class="header">
        <!-- <span class="box">办公室电话：021-58885555</span> -->
        <span class="box">手机号：{{Phone}}</span>
        <span class="box">微信号：{{vx}}</span>
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
          this.UserName=res.data.Data[0].UserName,
          this.Sex=res.data.Data[0].Sex,
          this.UnitName=res.data.Data[0].UnitName,
          this.DepartmentName=res.data.Data[0].DepartmentName,
          this.PositionName=res.data.Data[0].PositionName,
          this.Phone=res.data.Data[0].Phone,
          this.Address=res.data.Data[0].Address,
          this.SiteName=res.data.Data[0].SiteName,
          this.vx=res.data.Data[0].VX
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
      SiteName: "",
      vx:""
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