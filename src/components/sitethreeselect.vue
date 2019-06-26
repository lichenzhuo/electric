<template>
  <div class="sitethreeselect">
    <span class="name">站点名称</span>
    <el-select class="sel" v-model="sheng" @change="choseProvince" placeholder="省级地区">
      <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id"></el-option>
    </el-select>
    <el-select class="sel" v-model="shi" @change="choseCity" placeholder="市级地区">
      <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id"></el-option>
    </el-select>
    <el-select class="sel" v-model="qu" @change="choseBlock" placeholder="区级地区">
      <el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.id"></el-option>
    </el-select>
    <el-select class="sel" v-model="sitename" @change="choseSite" placeholder="站点名称">
      <el-option v-for="item in sitelist" :key="item.SiteId" :label="item.SiteName" :value="item.SiteId"></el-option>
    </el-select>
  </div>
</template>

<script>
import mapdata from "../mapdata";
export default {
  name: "sitethreeselect",
  methods: {
    //清空所有数据
    cleardata(){
      this.sheng=''
      this.$store.state.sheng=''
      this.shi=''
      this.$store.state.shi=''
      this.qu=''
      this.$store.state.qu=''
      this.sitename=''
      this.$store.state.sitename=''
    },
    // 加载china地点数据，三级
    getCityData: function() {
      var that = this;
      // console.log(mapdata, "数据");
      var data = mapdata;
      that.province = [];
      that.city = [];
      that.block = [];
      // 省市区数据分类
      for (var item in data) {
        if (item.match(/0000$/)) {
          //省
          that.province.push({
            id: item,
            value: data[item],
            children: []
          });
        } else if (item.match(/00$/)) {
          //市
          that.city.push({ id: item, value: data[item], children: [] });
        } else {
          //区
          that.block.push({ id: item, value: data[item] });
        }
      }
      // 分类市级
      for (var index in that.province) {
        for (var index1 in that.city) {
          if (
            that.province[index].id.slice(0, 2) ===
            that.city[index1].id.slice(0, 2)
          ) {
            that.province[index].children.push(that.city[index1]);
          }
        }
      }
      // 分类区级
      for (var item1 in that.city) {
        for (var item2 in that.block) {
          if (
            that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)
          ) {
            that.city[item1].children.push(that.block[item2]);
          }
        }
      }
      //   console.log(that.province,'省')
      //   console.log(that.city,'市')
    },
    // 选省
    choseProvince: function(e) {
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          //   console.log(this.province[index2].id); //你选择的省级编码
          //   console.log(this.province[index2].value); //省级编码 对应的汉字
          // console.log(this.sheng)
          console.log(mapdata[this.sheng]);
          this.$store.state.sheng=mapdata[this.sheng]
          this.shi1 = this.province[index2].children;
          //   this.shi = this.province[index2].children[0].value;
          //   this.qu1 = this.province[index2].children[0].children;
          //   this.qu = this.province[index2].children[0].children[0].value;
          //   this.E = this.qu1[0].id;
        }
      }
    },
    // 选市
    choseCity: function(e) {
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          //   console.log(this.city[index3].id);
          //   console.log(this.city[index3].value);
          console.log(this.shi);
          console.log(mapdata[this.shi]);
          this.$store.state.shi=mapdata[this.shi]
          this.qu1 = this.city[index3].children;
          //   this.qu = this.city[index3].children[0].value;
          //   this.E = this.qu1[0].id;
          //   console.log(this.E)
        }
      }
    },
    // 选区
    choseBlock: function(e) {
      //   this.E = e;
      //   console.log(e);
      // console.log(this.qu);
      console.log(mapdata[this.qu]);
      this.$store.state.qu=mapdata[this.qu]
      this.$axios
        .post("SiteManage/GetSiteName", { Area: mapdata[this.qu] })
        .then(res => {
          console.log(res.data.Data, "这是地址联动");
          this.sitelist = res.data.Data;
        });
    },
    choseSite: function(e) {
      console.log(e);
      console.log(this.sitename,'sitename');
      this.$store.state.siteid=this.sitename
      for (let i = 0; i < this.sitelist.length; i++) {
        if (this.sitelist[i].SiteId==e) {
          this.$store.state.sitename=this.sitelist[i].SiteName 
          this.$store.state.UserName=this.sitelist[i].UserName 
        }
        
        
      }
    }
  },
  created: function() {
    this.getCityData();
  },
  data() {
    return {
      mapJson: "../mapdata.json",
      province: "",
      sheng: "",
      shi: "",
      shi1: [],
      qu: "",
      qu1: [],
      city: "",
      block: "",
      sitename: "",
      sitelist: []
      // namelist:[{id:0,value:'德邦'},{id:1,value:'盖伦'},]
    };
  }
};
</script>
<style lang="stylus" scoped>
.sitethreeselect {
  margin-bottom: 30px;
  display: inline-block;
  margin-right: 80px;
}

.name {
  margin-right: 10px;
}

.sel {
  margin-right: 20px;
}
</style>

