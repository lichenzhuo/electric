<template>
  <div class="singalwarn">
    <div class="top">
      <div class="block con">
        <sitethreeselect></sitethreeselect>
      </div>
      <div class="con">
        <span class="tip">监测类型</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="block con">
        <span class="tip">单位编号</span>
        <el-input style="width:auto" placeholder="请输入内容"></el-input>
      </div>

      <el-button type="primary" round style="margin-left:100px">搜索</el-button>
      <el-button type="primary" round style="margin-left:40px">清空</el-button>
    </div>
    <div class="header"></div>
    <el-divider></el-divider>
    <div class="machineName">
      <span class="box">
        <span class="note">设备编号：</span>
        <span class="name">xj-102</span>
      </span>
      <span class="box">
        <span class="note">类型：</span>
        <span class="name">直流绝缘监测设备</span>
      </span>
      <span class="box">
        <span class="note">详细地址：</span>
        <span class="name">xx省xx市xx区xxxx路</span>
      </span>
      <span class="box">
        <el-button type="primary" round>参数调整</el-button>
      </span>
      <span class="box color">
        <span class="note">管理人：</span>
        <span class="name">张三</span>
      </span>
    </div>
    <el-divider></el-divider>
    <div class="chart"></div>
    <div class="table">
      <el-table
        :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        header-cell-class-name="tablebg"
      >
        <el-table-column align="center" prop="0" label="时间"></el-table-column>
        <el-table-column align="center" prop="one" label="母线电压"></el-table-column>
        <el-table-column align="center" prop="2" label="正极电压"></el-table-column>
        <el-table-column align="center" prop="3" label="负极电压"></el-table-column>
        <el-table-column align="center" prop="4" label="正负压差"></el-table-column>
        <el-table-column align="center" prop="5" label="交流电压"></el-table-column>
        <el-table-column align="center" prop="6" label="纹波电压"></el-table-column>
        <el-table-column align="center" prop="7" label="正极绝缘"></el-table-column>
        <el-table-column align="center" prop="8" label="负极绝缘"></el-table-column>
        <el-table-column align="center" prop="9" label="支路绝缘"></el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="table.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import sitethreeselect from "./sitethreeselect";
export default {
  name: "machineinfo",
  components: {
    sitethreeselect
  },
  created() {
    this.getRouterData();
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    getRouterData() {
      this.id = this.$route.params.id;
      // console.log(this.id,'这是新路由接收的')
    }
  },
  data() {
    return {
      total: 0,
      currentPage: 1,
      pagesize: 10,
      table: [
        {
          0: "2019-05-21",
          one: "122v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "21v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "saa2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2fg019-05-21",
          one: "22v",
          2: "122v",
          3: "-fgdf50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "12fdgdf2v",
          3: "-50v",
          4: "200",
          5: "22dfgdf0v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "2dfgdf2v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "22fdgdf9v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-5dfghdfg0v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "201fgjfjfg9-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22fhfghfgv",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22fhfghfghfgv",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "12fhfghf2v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22fghfghfghv",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "2fghfghfgh2v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "254352v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "201146169-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2045654262419-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "201456456429-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "201768976899-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "122kjhkv",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "22v",
          2: "1hjkjh22v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "23445ae2v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          0: "2019-05-21",
          one: "2a6342v",
          2: "122v",
          3: "-50v",
          4: "200",
          5: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        }
      ],

      value1: "",
      value2: "",
      options: [],
      selectedOptions: [],
      selectedOptions2: [],
      value3: "",
      value: ""
    };
  }
};
</script>

<style lang="stylus" scoped>
.singalwarn {
  width: 1600px;
  background-color: #ffffff;
  min-height: 800px;
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px;

  .top {
    padding-top: 30px;
    padding-left: 80px;
  }

  .header {
    padding-top: 30px;
    padding-left: 80px;
  }

  .con {
    display: inline-block;
    margin-right: 80px;
  }

  .tip {
    color: #333333;
    margin-right: 10px;
  }

  .machineName {
    padding: 0 78px;
    margin-bottom: 20px;
    font-size: 18px;

    .box {
      margin-right: 58px;
    }
  }

  .table {
    margin-top: 50px;
    padding: 0 78px;
  }

  .color {
    color: #3936de;
  }

  .is-leaf {
    text-align: center;
  }

  .page {
    text-align: right;
    margin-top: 20px;
    padding-bottom: 50px;
  }

  .indent {
    padding: left 2em;
  }

  .tablebg {
    background-color: #409EFF;
    color: #ffffff;
    font-size: 18px;
  }

  .chart {
    width: 100%;
    height: 300px;
  }
}
</style>
