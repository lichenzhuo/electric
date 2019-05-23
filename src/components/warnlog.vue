<template>
  <div class="singalwarn">
    <div class="top">
      <div class="block con">
        <span class="tip">站点名称</span>
        <el-cascader expand-trigger="hover" :options="options" v-model="selectedOptions2"></el-cascader>
      </div>
      <div class="block con">
        <span class="tip" style="padding-left:2em">时间</span>
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        ></el-date-picker>
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
      <el-button type="primary" round style="margin-left:70px">搜索</el-button>
    </div>
    
    <el-divider></el-divider>
    <!-- <div class="machineName">
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
      <span class="box color">
        <span class="note">管理人：</span>
        <span class="name">张三</span>
      </span>
    </div>
    <el-divider></el-divider> -->
    <div class="table">
      <el-table
        :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="0" label="预警时间" width="160"></el-table-column>
        <el-table-column align="center" prop="one" label="母线电压">
          <template scope="scope">
            <span v-if="scope.row.one=='22v'">{{scope.row.one}}+{{scope.$index}}</span>
            <span v-else style="color: red">{{scope.row.one}}+{{scope.$index}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="2" label="正极电压"></el-table-column>
        <el-table-column align="center" prop="3" label="负极电压"></el-table-column>
        <el-table-column align="center" prop="4" label="正负压差"></el-table-column>
        <el-table-column align="center" prop="5" label="交流电压"></el-table-column>
        <el-table-column align="center" prop="6" label="纹波电压"></el-table-column>
        <el-table-column align="center" prop="7" label="正极绝缘"></el-table-column>
        <el-table-column align="center" prop="8" label="负极绝缘"></el-table-column>
        <el-table-column align="center" prop="9" label="母联绝缘"></el-table-column>
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
export default {
  name: "warnlog",
  created(){
   this.getRouterData()
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    getRouterData(){
      this.id=this.$route.params.id
      console.log(this.id,'这是新路由接收的')
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
          0: "20456542fgdf1",
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
          0: "20145asasdasdsa",
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
          0: "20176897fdgdf",
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
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      value2: "",
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      selectedOptions2: [],
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
  .indent{
    padding left 2em
  }
}
</style>
