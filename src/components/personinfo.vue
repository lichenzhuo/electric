<template>
  <div class="info">
    <div class="banner">
      <div class="header">
        <span class="box" style="background-color:#C0C4CC">基本信息</span>
      </div>
      <el-divider></el-divider>
      <div class="header">
        <span class="box">用户名：张三</span>
        <span class="box">性别：男</span>
        <span class="box">所属单位：浙江星炬电力科技有限公司</span>
        <span class="box">部门：运行维护</span>
        <span class="box">职务：一线维护</span>
      </div>
      <el-divider></el-divider>
      <div class="header">
        <span class="box">办公室电话：021-58885555</span>
        <span class="box">手机号：13955558888</span>
        <span class="box">微信号：13955558888</span>
      </div>
      <el-divider></el-divider>
      <div class="table">
        <el-table :data="table" border style="width: 100%" header-cell-class-name="tablebg">
          <el-table-column align="center" prop="0" label="维护设备编号"></el-table-column>
          <!-- <el-table-column align="center" prop="one" label="站点名称"></el-table-column> -->
          <el-table-column align="center" prop="1" label="详细地址"></el-table-column>
          <el-table-column align="center" prop="2" label="站点编号"></el-table-column>
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
  },
  methods: {},
  data() {
    return {
      table: [
        {
          id: "0",
          0: "xj-45613",
          1: "浙江省温州市苍南县某个镇",
          2: "cn-002",
         
        },
        {
        id: "1",
          0: "xj-45623",
          1: "浙江省杭州市上城区太和广场",
          2: "hz-0587",
        }
      ]
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