<template>
  <div class="head">
    <div class="title">
      <router-link to="index">监测管理后台</router-link>
    </div>
    <div class="user">
      <el-dropdown>
        <span class="el-dropdown-link">
          欢迎你：测试账号
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="item">个人信息</el-dropdown-item>
          <el-dropdown-item class="item">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "headnav",
  methods: {}
};
</script>

<style lang="stylus" scoped>


.head {
  
  height: 60px;
  

  .title {
    float: left;
    margin-left: 30px;
    font-size: 26px;
    padding-top: 14px;
  }

  .user {
    float: right;
    margin-right: 100px;
    padding-top: 20px;

    .item {
      color: #606266;
    }
  }
}

.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
  color black 
}
</style>
