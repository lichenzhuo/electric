<template>
  <el-container style="height:100%">
    <el-header style="padding:0;border-bottom 1px slid #f8f8f8">
      <headnav />
    </el-header>
    <el-container>
      <el-aside style="width:190px">
        <leftnav />
      </el-aside>
      <el-main style="background-color:#f8f8f8;">
        <!-- <div id="crumbs">
          <div class="name">首页</div>
        </div> -->
        <Breadcrumb></Breadcrumb>
        <router-view></router-view>
        <!-- <defaulthome/> -->
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import headnav from "../components/headnav";
import leftnav from "../components/leftnav";
import defaulthome from "../components/defaulthome";
import Breadcrumb from "../components/Breadcrumb";
export default {
  name: "Index",
  components: {
    headnav,
    leftnav,
    defaulthome,
    Breadcrumb
  }
};
</script>
<style lang="stylus">
.tablebg {
  background-color: #409EFF !important;
  color: #ffffff;
  font-size: 18px;
}
</style>

