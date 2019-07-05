<template>
  <div class="morefunction">
    <div class="block">
      <span class="demonstration">hover 触发子菜单</span>
      <el-cascader
        v-model="selectedOptions"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
      ></el-cascader>
    </div>
    <div class="block">
      <span class="demonstration">hover 触发子菜单</span>
      <el-cascader
        v-model="optionsone"
        :options="AreaData"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChangeone"
      ></el-cascader>
    </div>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
export default {
  name: "morefunction",

  data() {
    return {
      options: regionData,
      selectedOptions: [],
      optionsone: "",
      optionsone: [
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
      AreaData: [
           {
                "children": [
                    {
                        "children": [
                            {
                                "value": 500,
                                "pid": 52,
                                "label": "东城区",
                                "type": 3
                            },
                            {
                                "value": 501,
                                "pid": 52,
                                "label": "西城区",
                                "type": 3
                            },
                            {
                                "value": 502,
                                "pid": 52,
                                "label": "海淀区",
                                "type": 3
                            },
                            {
                                "value": 503,
                                "pid": 52,
                                "label": "朝阳区",
                                "type": 3
                            },
                            {
                                "value": 504,
                                "pid": 52,
                                "label": "崇文区",
                                "type": 3
                            },
                            {
                                "value": 505,
                                "pid": 52,
                                "label": "宣武区",
                                "type": 3
                            },
                            {
                                "value": 506,
                                "pid": 52,
                                "label": "丰台区",
                                "type": 3
                            },
                            {
                                "value": 507,
                                "pid": 52,
                                "label": "石景山区",
                                "type": 3
                            },
                            {
                                "value": 508,
                                "pid": 52,
                                "label": "房山区",
                                "type": 3
                            },
                            {
                                "value": 509,
                                "pid": 52,
                                "label": "门头沟区",
                                "type": 3
                            },
                            {
                                "value": 510,
                                "pid": 52,
                                "label": "通州区",
                                "type": 3
                            },
                            {
                                "value": 511,
                                "pid": 52,
                                "label": "顺义区",
                                "type": 3
                            },
                            {
                                "value": 512,
                                "pid": 52,
                                "label": "昌平区",
                                "type": 3
                            },
                            {
                                "value": 513,
                                "pid": 52,
                                "label": "怀柔区",
                                "type": 3
                            },
                            {
                                "value": 514,
                                "pid": 52,
                                "label": "平谷区",
                                "type": 3
                            },
                            {
                                "value": 515,
                                "pid": 52,
                                "label": "大兴区",
                                "type": 3
                            },
                            {
                                "value": 516,
                                "pid": 52,
                                "label": "密云县",
                                "type": 3
                            },
                            {
                                "value": 517,
                                "pid": 52,
                                "label": "延庆县",
                                "type": 3
                            }
                        ],
                        "value": 52,
                        "pid": 2,
                        "label": "北京",
                        "type": 2
                    }
                ],
                "value": 2,
                "pid": 1,
                "label": "北京",
                "type": 1
            },
            {
                "children": [
                    {
                        "children": [
                            {
                                "value": 398,
                                "pid": 36,
                                "label": "迎江区",
                                "type": 3
                            },
                            {
                                "value": 399,
                                "pid": 36,
                                "label": "大观区",
                                "type": 3
                            },
                            {
                                "value": 400,
                                "pid": 36,
                                "label": "宜秀区",
                                "type": 3
                            },
                            {
                                "value": 401,
                                "pid": 36,
                                "label": "桐城市",
                                "type": 3
                            },
                            {
                                "value": 402,
                                "pid": 36,
                                "label": "怀宁县",
                                "type": 3
                            },
                            {
                                "value": 403,
                                "pid": 36,
                                "label": "枞阳县",
                                "type": 3
                            },
                            {
                                "value": 404,
                                "pid": 36,
                                "label": "潜山县",
                                "type": 3
                            },
                            {
                                "value": 405,
                                "pid": 36,
                                "label": "太湖县",
                                "type": 3
                            },
                            {
                                "value": 406,
                                "pid": 36,
                                "label": "宿松县",
                                "type": 3
                            },
                            {
                                "value": 407,
                                "pid": 36,
                                "label": "望江县",
                                "type": 3
                            },
                            {
                                "value": 408,
                                "pid": 36,
                                "label": "岳西县",
                                "type": 3
                            }
                        ],
                        "value": 36,
                        "pid": 3,
                        "label": "安庆",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 409,
                                "pid": 37,
                                "label": "中市区",
                                "type": 3
                            },
                            {
                                "value": 410,
                                "pid": 37,
                                "label": "东市区",
                                "type": 3
                            },
                            {
                                "value": 411,
                                "pid": 37,
                                "label": "西市区",
                                "type": 3
                            },
                            {
                                "value": 412,
                                "pid": 37,
                                "label": "郊区",
                                "type": 3
                            },
                            {
                                "value": 413,
                                "pid": 37,
                                "label": "怀远县",
                                "type": 3
                            },
                            {
                                "value": 414,
                                "pid": 37,
                                "label": "五河县",
                                "type": 3
                            },
                            {
                                "value": 415,
                                "pid": 37,
                                "label": "固镇县",
                                "type": 3
                            }
                        ],
                        "value": 37,
                        "pid": 3,
                        "label": "蚌埠",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 416,
                                "pid": 38,
                                "label": "居巢区",
                                "type": 3
                            },
                            {
                                "value": 417,
                                "pid": 38,
                                "label": "庐江县",
                                "type": 3
                            },
                            {
                                "value": 418,
                                "pid": 38,
                                "label": "无为县",
                                "type": 3
                            },
                            {
                                "value": 419,
                                "pid": 38,
                                "label": "含山县",
                                "type": 3
                            },
                            {
                                "value": 420,
                                "pid": 38,
                                "label": "和县",
                                "type": 3
                            }
                        ],
                        "value": 38,
                        "pid": 3,
                        "label": "巢湖",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 421,
                                "pid": 39,
                                "label": "贵池区",
                                "type": 3
                            },
                            {
                                "value": 422,
                                "pid": 39,
                                "label": "东至县",
                                "type": 3
                            },
                            {
                                "value": 423,
                                "pid": 39,
                                "label": "石台县",
                                "type": 3
                            },
                            {
                                "value": 424,
                                "pid": 39,
                                "label": "青阳县",
                                "type": 3
                            }
                        ],
                        "value": 39,
                        "pid": 3,
                        "label": "池州",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 425,
                                "pid": 40,
                                "label": "琅琊区",
                                "type": 3
                            },
                            {
                                "value": 426,
                                "pid": 40,
                                "label": "南谯区",
                                "type": 3
                            },
                            {
                                "value": 427,
                                "pid": 40,
                                "label": "天长市",
                                "type": 3
                            },
                            {
                                "value": 428,
                                "pid": 40,
                                "label": "明光市",
                                "type": 3
                            },
                            {
                                "value": 429,
                                "pid": 40,
                                "label": "来安县",
                                "type": 3
                            },
                            {
                                "value": 430,
                                "pid": 40,
                                "label": "全椒县",
                                "type": 3
                            },
                            {
                                "value": 431,
                                "pid": 40,
                                "label": "定远县",
                                "type": 3
                            },
                            {
                                "value": 432,
                                "pid": 40,
                                "label": "凤阳县",
                                "type": 3
                            }
                        ],
                        "value": 40,
                        "pid": 3,
                        "label": "滁州",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 433,
                                "pid": 41,
                                "label": "蚌山区",
                                "type": 3
                            },
                            {
                                "value": 434,
                                "pid": 41,
                                "label": "龙子湖区",
                                "type": 3
                            },
                            {
                                "value": 435,
                                "pid": 41,
                                "label": "禹会区",
                                "type": 3
                            },
                            {
                                "value": 436,
                                "pid": 41,
                                "label": "淮上区",
                                "type": 3
                            },
                            {
                                "value": 437,
                                "pid": 41,
                                "label": "颍州区",
                                "type": 3
                            },
                            {
                                "value": 438,
                                "pid": 41,
                                "label": "颍东区",
                                "type": 3
                            },
                            {
                                "value": 439,
                                "pid": 41,
                                "label": "颍泉区",
                                "type": 3
                            },
                            {
                                "value": 440,
                                "pid": 41,
                                "label": "界首市",
                                "type": 3
                            },
                            {
                                "value": 441,
                                "pid": 41,
                                "label": "临泉县",
                                "type": 3
                            },
                            {
                                "value": 442,
                                "pid": 41,
                                "label": "太和县",
                                "type": 3
                            },
                            {
                                "value": 443,
                                "pid": 41,
                                "label": "阜南县",
                                "type": 3
                            },
                            {
                                "value": 444,
                                "pid": 41,
                                "label": "颖上县",
                                "type": 3
                            }
                        ],
                        "value": 41,
                        "pid": 3,
                        "label": "阜阳",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 445,
                                "pid": 42,
                                "label": "相山区",
                                "type": 3
                            },
                            {
                                "value": 446,
                                "pid": 42,
                                "label": "杜集区",
                                "type": 3
                            },
                            {
                                "value": 447,
                                "pid": 42,
                                "label": "烈山区",
                                "type": 3
                            },
                            {
                                "value": 448,
                                "pid": 42,
                                "label": "濉溪县",
                                "type": 3
                            }
                        ],
                        "value": 42,
                        "pid": 3,
                        "label": "淮北",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 449,
                                "pid": 43,
                                "label": "田家庵区",
                                "type": 3
                            },
                            {
                                "value": 450,
                                "pid": 43,
                                "label": "大通区",
                                "type": 3
                            },
                            {
                                "value": 451,
                                "pid": 43,
                                "label": "谢家集区",
                                "type": 3
                            },
                            {
                                "value": 452,
                                "pid": 43,
                                "label": "八公山区",
                                "type": 3
                            },
                            {
                                "value": 453,
                                "pid": 43,
                                "label": "潘集区",
                                "type": 3
                            },
                            {
                                "value": 454,
                                "pid": 43,
                                "label": "凤台县",
                                "type": 3
                            }
                        ],
                        "value": 43,
                        "pid": 3,
                        "label": "淮南",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 455,
                                "pid": 44,
                                "label": "屯溪区",
                                "type": 3
                            },
                            {
                                "value": 456,
                                "pid": 44,
                                "label": "黄山区",
                                "type": 3
                            },
                            {
                                "value": 457,
                                "pid": 44,
                                "label": "徽州区",
                                "type": 3
                            },
                            {
                                "value": 458,
                                "pid": 44,
                                "label": "歙县",
                                "type": 3
                            },
                            {
                                "value": 459,
                                "pid": 44,
                                "label": "休宁县",
                                "type": 3
                            },
                            {
                                "value": 460,
                                "pid": 44,
                                "label": "黟县",
                                "type": 3
                            },
                            {
                                "value": 461,
                                "pid": 44,
                                "label": "祁门县",
                                "type": 3
                            }
                        ],
                        "value": 44,
                        "pid": 3,
                        "label": "黄山",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 462,
                                "pid": 45,
                                "label": "金安区",
                                "type": 3
                            },
                            {
                                "value": 463,
                                "pid": 45,
                                "label": "裕安区",
                                "type": 3
                            },
                            {
                                "value": 464,
                                "pid": 45,
                                "label": "寿县",
                                "type": 3
                            },
                            {
                                "value": 465,
                                "pid": 45,
                                "label": "霍邱县",
                                "type": 3
                            },
                            {
                                "value": 466,
                                "pid": 45,
                                "label": "舒城县",
                                "type": 3
                            },
                            {
                                "value": 467,
                                "pid": 45,
                                "label": "金寨县",
                                "type": 3
                            },
                            {
                                "value": 468,
                                "pid": 45,
                                "label": "霍山县",
                                "type": 3
                            }
                        ],
                        "value": 45,
                        "pid": 3,
                        "label": "六安",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 469,
                                "pid": 46,
                                "label": "雨山区",
                                "type": 3
                            },
                            {
                                "value": 470,
                                "pid": 46,
                                "label": "花山区",
                                "type": 3
                            },
                            {
                                "value": 471,
                                "pid": 46,
                                "label": "金家庄区",
                                "type": 3
                            },
                            {
                                "value": 472,
                                "pid": 46,
                                "label": "当涂县",
                                "type": 3
                            }
                        ],
                        "value": 46,
                        "pid": 3,
                        "label": "马鞍山",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 473,
                                "pid": 47,
                                "label": "埇桥区",
                                "type": 3
                            },
                            {
                                "value": 474,
                                "pid": 47,
                                "label": "砀山县",
                                "type": 3
                            },
                            {
                                "value": 475,
                                "pid": 47,
                                "label": "萧县",
                                "type": 3
                            },
                            {
                                "value": 476,
                                "pid": 47,
                                "label": "灵璧县",
                                "type": 3
                            },
                            {
                                "value": 477,
                                "pid": 47,
                                "label": "泗县",
                                "type": 3
                            }
                        ],
                        "value": 47,
                        "pid": 3,
                        "label": "宿州",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 478,
                                "pid": 48,
                                "label": "铜官山区",
                                "type": 3
                            },
                            {
                                "value": 479,
                                "pid": 48,
                                "label": "狮子山区",
                                "type": 3
                            },
                            {
                                "value": 480,
                                "pid": 48,
                                "label": "郊区",
                                "type": 3
                            },
                            {
                                "value": 481,
                                "pid": 48,
                                "label": "铜陵县",
                                "type": 3
                            }
                        ],
                        "value": 48,
                        "pid": 3,
                        "label": "铜陵",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 482,
                                "pid": 49,
                                "label": "镜湖区",
                                "type": 3
                            },
                            {
                                "value": 483,
                                "pid": 49,
                                "label": "弋江区",
                                "type": 3
                            },
                            {
                                "value": 484,
                                "pid": 49,
                                "label": "鸠江区",
                                "type": 3
                            },
                            {
                                "value": 485,
                                "pid": 49,
                                "label": "三山区",
                                "type": 3
                            },
                            {
                                "value": 486,
                                "pid": 49,
                                "label": "芜湖县",
                                "type": 3
                            },
                            {
                                "value": 487,
                                "pid": 49,
                                "label": "繁昌县",
                                "type": 3
                            },
                            {
                                "value": 488,
                                "pid": 49,
                                "label": "南陵县",
                                "type": 3
                            }
                        ],
                        "value": 49,
                        "pid": 3,
                        "label": "芜湖",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 489,
                                "pid": 50,
                                "label": "宣州区",
                                "type": 3
                            },
                            {
                                "value": 490,
                                "pid": 50,
                                "label": "宁国市",
                                "type": 3
                            },
                            {
                                "value": 491,
                                "pid": 50,
                                "label": "郎溪县",
                                "type": 3
                            },
                            {
                                "value": 492,
                                "pid": 50,
                                "label": "广德县",
                                "type": 3
                            },
                            {
                                "value": 493,
                                "pid": 50,
                                "label": "泾县",
                                "type": 3
                            },
                            {
                                "value": 494,
                                "pid": 50,
                                "label": "绩溪县",
                                "type": 3
                            },
                            {
                                "value": 495,
                                "pid": 50,
                                "label": "旌德县",
                                "type": 3
                            }
                        ],
                        "value": 50,
                        "pid": 3,
                        "label": "宣城",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 496,
                                "pid": 51,
                                "label": "涡阳县",
                                "type": 3
                            },
                            {
                                "value": 497,
                                "pid": 51,
                                "label": "蒙城县",
                                "type": 3
                            },
                            {
                                "value": 498,
                                "pid": 51,
                                "label": "利辛县",
                                "type": 3
                            },
                            {
                                "value": 499,
                                "pid": 51,
                                "label": "谯城区",
                                "type": 3
                            }
                        ],
                        "value": 51,
                        "pid": 3,
                        "label": "亳州",
                        "type": 2
                    },
                    {
                        "children": [
                            {
                                "value": 3402,
                                "pid": 3401,
                                "label": "庐阳区",
                                "type": 3
                            },
                            {
                                "value": 3403,
                                "pid": 3401,
                                "label": "瑶海区",
                                "type": 3
                            },
                            {
                                "value": 3404,
                                "pid": 3401,
                                "label": "蜀山区",
                                "type": 3
                            },
                            {
                                "value": 3405,
                                "pid": 3401,
                                "label": "包河区",
                                "type": 3
                            },
                            {
                                "value": 3406,
                                "pid": 3401,
                                "label": "长丰县",
                                "type": 3
                            },
                            {
                                "value": 3407,
                                "pid": 3401,
                                "label": "肥东县",
                                "type": 3
                            },
                            {
                                "value": 3408,
                                "pid": 3401,
                                "label": "肥西县",
                                "type": 3
                            }
                        ],
                        "value": 3401,
                        "pid": 3,
                        "label": "合肥",
                        "type": 2
                    }
                ],
                "value": 3,
                "pid": 1,
                "label": "安徽",
                "type": 1
            },
          
        ],
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    handleChangeone(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="stylus" scoped></style>
