<template>
  <el-row class="tac">
    <el-col :span="12" class="aaa">
      <el-menu
        :default-active="this.$router.path"
        router
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        @select="theselect"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>首页</span>
          </template>
          <!-- <el-menu-item index="/defaulthome">默认</el-menu-item> -->
          <el-menu-item index="/singalwarn">单个预警</el-menu-item>
          <el-menu-item index="/singalwarning">单个报警</el-menu-item>
          <el-menu-item index="/singalsite">单个站点</el-menu-item>
          <el-menu-item index="/personinfo">相关人员资料</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">数据图表</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">预警日志</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">报警日志</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">职位管理</span>
        </el-menu-item>
        <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>设备管理</span>
          </template>
          <el-submenu index="1-4">
            <template slot="title">站点管理</template>
            <el-menu-item index="1-4-1">单位信息</el-menu-item>
          </el-submenu>
          <el-menu-item index="/singalwarn">设备查看</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">消息反馈</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">高级功能</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "leftnav",
  methods: {
    theselect(index, indexPath) {
      console.log(index);
      console.log(indexPath);
    }
  }
};
</script>

<style lang="stylus" scoped>
.tac {
  height: 100%;
  background-color #4f52ba
}
.aaa{
  height 100%
}
.el-col-12{
  width 100%
}

.el-menu-vertical-demo {
  height: 100%;
}
.el-submenu .el-menu-item{
  min-width: 0; 
}
</style>
