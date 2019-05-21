<template>
  <el-container style="height:100%">
    <el-header style="padding:0;border-bottom 1px slid #f8f8f8">
      <headnav/>
    </el-header>
    <el-container>
      <el-aside style="width:190px">
        <leftnav/>
      </el-aside>
      <el-main style="background-color:#f8f8f8">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
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
export default {
  name: "Index",
  components: {
    headnav,
    leftnav,
    defaulthome
  }
};
</script>
<style lang="stylus"></style>

