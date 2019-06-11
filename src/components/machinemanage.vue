<template>
  <div class="singalwarn">
    <div class="top">
      <div class="block con">
         <sitethreeselect></sitethreeselect>
      </div>
      <div class="block con">
        <span class="tip">设备类型</span>
        <el-select v-model="machinetype" placeholder="请选择">
          <el-option
            v-for="item in machinetypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="con">
        <span class="tip">设备编号</span>
        <el-input style="width:auto" v-model="machinenumber" placeholder="请输入内容"></el-input>
      </div>
      <el-button type="primary" round style="margin-left:20px" @click="query">查询</el-button>
      <el-button type="primary" round style="margin-left:20px" @click="dialogVisible = true">添加</el-button>
    </div>
      <el-dialog :visible.sync="dialogVisible" width="25%" :show-close="false" center>
        <div slot="title">新增设备</div>
        <span>
          <el-form label-position="right" label-width="100px" :model="formLabelAlign" style="padding-left:40px">
            <el-form-item label="设备编号">
              <el-input style="width:217px" v-model="formLabelAlign.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="设备类型">
              <el-select v-model="formLabelAlign.region" placeholder="请选择">
                <el-option
                  v-for="item in machinetypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="站点所在区域">
              <el-cascader
                :options="optionone"
                v-model="selectedOptions"
                filterable
                change-on-select
                @change="addressChange"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址">
              <el-input style="width:217px" type="textarea" v-model="formLabelAlign.address" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="设备人员编号">
              <el-input style="width:217px" v-model="formLabelAlign.name" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="管理人员名称">
              <el-input style="width:217px" v-model="formLabelAlign.name" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    <el-divider></el-divider>
    <div class="table">
      <el-table
        :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%"
        @row-click="rowclick"
        header-cell-class-name='tablebg'
      >
        <el-table-column align="center" prop="0" label="设备类型" width="160"></el-table-column>
        <el-table-column align="center" prop="one" label="设备编号"></el-table-column>
        <el-table-column align="center" prop="2" label="站点名称"></el-table-column>
        <el-table-column align="center" prop="3" label="详细地址"></el-table-column>
        <el-table-column align="center" prop="4" label="管理人员编号"></el-table-column>
        <el-table-column align="center" prop="5" label="管理人员名称">
           <template scope="scope">
           <el-tag>{{scope.row.five}}</el-tag>
            <!-- <span>{{scope.row.one}}</span> -->
          </template>
        </el-table-column>
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
import { regionData, CodeToText } from "element-china-area-data";
export default {
  name: "machinemanage",
   components:{
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
      // console.log(this.id, "这是新路由接收的");
    },
    query() {
      this.$message({
        message: "点击查询成功",
        type: "success"
      });
    },
    insert() {
      this.$message({
        message: "点击添加成功",
        type: "success"
      });
    },
    rowclick(e) {
      console.log(e.id);
    },
    addressChange(arr) {
      console.log(arr, "地址");
      console.log(
        CodeToText[arr[0]] + "/" + CodeToText[arr[1]] + "/" + CodeToText[arr[2]]
      );
    }
  },
  data() {
    return {
      optionone: regionData,
      selectedOptions: [],
      dialogVisible: false,
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      total: 0,
      currentPage: 1,
      pagesize: 5,
      table: [
        {
          id: "0",
          0: "2019-05-21",
          one: "122v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "1",
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "李四",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "2",
          0: "2019-05-21",
          one: "21v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "3",
          0: "saa2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "4",
          0: "2fg019-05-21",
          one: "22v",
          2: "122v",
          3: "-fg50v",
          4: "200",
          five: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "5",
          0: "2019-05-21",
          one: "22v",
          2: "12df2v",
          3: "-50v",
          4: "200",
          five: "22dfgdf0v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "2dfgdf2v"
        },
        {
          id: "6",
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "220v",
          6: "dgdf9v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "7",
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "8",
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "hdfg0v",
          4: "200",
          five: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "9",
          0: "201f-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "220v",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "10",
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22fhfgv",
          8: "22v",
          9: "22v"
        },
        {
          id: "11",
          0: "2019-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "12",
          0: "2019-05-21",
          one: "22fgv",
          2: "122v",
          3: "-50v",
          4: "200",
         five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "13",
          0: "2019-05-21",
          one: "22v",
          2: "hfghf2v",
          3: "-50v",
          4: "200",
         five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "14",
          0: "2019-05-21",
          one: "22gv",
          2: "122v",
          3: "-50v",
          4: "200",
         five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "15",
          0: "2019-05-21",
          one: "hfgh2v",
          2: "122v",
          3: "-50v",
          4: "200",
         five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "16",
          0: "2019-05-21",
          one: "25432v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "17",
          0: "2069-05-21",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
         five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "18",
          0: "20456542fgdf1",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
         five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "19",
          0: "20145dasdsa",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
        five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "20",
          0: "20176dgdf",
          one: "22v",
          2: "122v",
          3: "-50v",
          4: "200",
         five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "21",
          0: "2019-05-21",
          one: "22v",
          2: "122kv",
          3: "-50v",
          4: "200",
         five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "22",
          0: "2019-05-21",
          one: "22v",
          2: "1hj22v",
          3: "-50v",
          4: "200",
         five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "23",
          0: "2019-05-21",
          one: "23442v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
          6: "229v",
          7: "22v",
          8: "22v",
          9: "22v"
        },
        {
          id: "24",
          0: "2019-05-21",
          one: "2a642v",
          2: "122v",
          3: "-50v",
          4: "200",
          five: "张三",
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
      value: "",
      machinetype: "",
      machinetypes: [
        {
          value: "typeone",
          label: "直流绝缘监测"
        },
        {
          value: "typetwo",
          label: "交流绝缘监测"
        }
      ],
      machinenumber: ""
    };
  }
};
</script>

<style lang="stylus">
.singalwarn {
  width: 1600px;
  background-color: #ffffff;
  min-height: 800px;
  margin-top: 20px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px;

  .top {
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
  .tablebg{
    background-color #409EFF
    color #ffffff
    font-size 18px
  }
 
}

.el-dialog__header {
  background-color:#409EFF
  text-align center
  color #ffffff
  font-size 22px
}
</style>