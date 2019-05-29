<template>
  <el-row class="tac">
    <el-col :span="12" class="aaa">
      <el-menu
        :default-active="this.$router.path"
        router
        class="el-menu-vertical-demo"
        @open="theselect"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/warnlog">
          <i class="el-icon-message-solid"></i>
          <span slot="title">预警日志</span>
        </el-menu-item>
        <el-menu-item index="/warninglog">
          <i class="el-icon-warning"></i>
          <span slot="title">报警日志</span>
        </el-menu-item>
        <el-submenu index="/machinemanage" @open="theselectone">
          <template slot="title">
            <i @click="gotomachinemanage" class="el-icon-s-tools"></i>
            <span @click="gotomachinemanage">设备管理</span>
          </template>
          <el-submenu index="/sitemanage" @open="theselecttwo">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>站点管理</span>
            </template>
            <el-menu-item index="1-4-1">
              <template slot="title">
                <i class="el-icon-info"></i>
                <span>单位信息</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="/singalwarn">
            <template slot="title">
              <i class="el-icon-monitor"></i>
              <span>设备查看</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-s-comment"></i>
          <span slot="title">消息反馈</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-s-grid"></i>
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
    },
    gotomachinemanage() {
      this.$router.push({ path: "machinemanage" });
      console.log("777");
    },
    theselect(index) {
      console.log(index);
      if (index === "/machinemanage") {
        this.$router.push({ path: "machinemanage" });
      }else if(index === "/sitemanage") {
        this.$router.push({ path: "sitemanage" });
      }
    },
    theselectone(index) {
      console.log(index,'0000');
      if (index === "/sitemanage") {
        this.$router.push({ path: "sitemanage" });
      }
    },
    theselecttwo(index, indexPath) {
      console.log(index);
      console.log(indexPath);
    }
  }
};
</script>

<style lang="stylus" scoped>
.tac {
  height: 100%;
  background-color: #4f52ba;
}

.aaa {
  height: 100%;
}

.el-col-12 {
  width: 100%;
}

.el-menu-vertical-demo {
  height: 100%;
}

.el-submenu .el-menu-item {
  min-width: 0;
}
</style>
