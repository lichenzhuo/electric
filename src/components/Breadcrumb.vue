<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: breadList.path }">{{breadList.title}}</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: breadList.path }">{{breadList.title}}</el-breadcrumb-item>
    <!-- <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path: '/edit' }">编辑</el-breadcrumb-item> -->
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  created() {
    // this.getBreadcrumb()
  },
  data() {
    return {
      breadList: []
    };
  },
  watch: {
    $route() {
      // this.getBreadcrumb()
      let arr = [];
      console.log("666");
      console.log(this.$route.meta.title);
      console.log(this.$route.path);
      arr.push({
        title: this.$route.meta.title,
        path: this.$route.path
      });
      console.log(arr, "666666666666666666");
      console.log(arr[arr.length - 1], "99999999999");
      this.breadList = arr[arr.length - 1];
    }
  },
  methods: {
    // getBreadcrumb () {
    //     let matched = this.$route.matched.filter(item => item.name)
    //     console.log(matched,'45646546')
    //     this.breadList = matched
    // }
  }
};
</script>