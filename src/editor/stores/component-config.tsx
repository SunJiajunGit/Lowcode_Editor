import {create} from 'zustand';
import ContainerDev from '../materials/Container/dev';
import ContainerProd from '../materials/Container/prod';
import ButtonDev from '../materials/Button/dev';
import ButtonProd from '../materials/Button/prod';
import PageDev from '../materials/Page/dev';
import PageProd from '../materials/Page/prod';
import ModalProd from '../materials/Modal/prod';
import ModalDev from '../materials/Modal/dev';
import TableDev from '../materials/Table/dev';
import TableProd from '../materials/Table/prod';
import TableColumnDev from '../materials/TableColumn/dev';
import TableColumnProd from '../materials/TableColumn/prod';
import FormDev from '../materials/Form/dev';
import FormProd from '../materials/Form/prod';
import FormItemDev from '../materials/FormItem/dev';
import FormItemProd from '../materials/FormItem/prod';
import DatePickerDev from '../materials/DatePicker/dev';
import DatePickerProd from '../materials/DatePicker/prod';
import ImageDev from '../materials/Image/dev';
import ImageProd from '../materials/Image/prod';
import InputDev from '../materials/Input/dev';
import InputProd from '../materials/Input/prod';
import SelectDev from '../materials/Select/dev';
import SelectProd from '../materials/Select/prod';
import SwitchDev from '../materials/Switch/dev';
import SwitchProd from '../materials/Switch/prod';
import ProgressDev from '../materials/Progress/dev';
import ProgressProd from '../materials/Progress/prod';
import TagDev from '../materials/Tag/dev';
import TagProd from '../materials/Tag/prod';
// 新增布局容器组件导入
import CardContainerDev from '../materials/CardContainer/dev';
import CardContainerProd from '../materials/CardContainer/prod';
import GridContainerDev from '../materials/GridContainer/dev';
import GridContainerProd from '../materials/GridContainer/prod';
import CollapseContainerDev from '../materials/CollapseContainer/dev';
import CollapseContainerProd from '../materials/CollapseContainer/prod';
import TabsContainerDev from '../materials/TabsContainer/dev';
import TabsContainerProd from '../materials/TabsContainer/prod';
import SplitContainerDev from '../materials/SplitContainer/dev';
import SplitContainerProd from '../materials/SplitContainer/prod';

export interface ComponentSetter {
    name: string;
    label: string;
    type: string;
    [key: string]: any;
}

export interface ComponentEvent {
    name: string
    label: string
}

export interface ComponentMethod {
    name: string
    label: string
}

export interface ComponentConfig {
    name: string;
    defaultProps: Record<string, any>,
    desc: string;
    setter?: ComponentSetter[];
    stylesSetter?: ComponentSetter[];
    events?: ComponentEvent[];
    methods?: ComponentMethod[]
    dev: any;
    prod: any;
}

interface State {
    componentConfig: {[key: string]: ComponentConfig};
}

interface Action {
    registerComponent: (name: string, componentConfig: ComponentConfig) => void
}

export const useComponentConfigStore = create<State & Action>((set) => ({
    componentConfig: {
        Container: {
            name: 'Container',
            defaultProps: {},
            desc: '容器',
            dev: ContainerDev,
            prod: ContainerProd
        },
        Button: {
            name: 'Button',
            defaultProps: {
                type: 'primary',
                text: '按钮'
            },
            setter: [
                {
                  name: 'type',
                  label: '按钮类型',
                  type: 'select',
                  options: [
                    {label: '主按钮', value: 'primary'},
                    {label: '次按钮', value: 'default'},
                  ],
                },
                {
                  name: 'text',
                  label: '文本',
                  type: 'input',
                },
            ],
            stylesSetter: [
                {
                    name: 'width',
                    label: '宽度',
                    type: 'inputNumber',
                },
                {
                    name: 'height',
                    label: '高度',
                    type: 'inputNumber',
                }
            ],
            events: [
                {
                    name: 'onClick',
                    label: '点击事件',
                },
                {
                    name: 'onDoubleClick',
                    label: '双击事件'
                },
            ],
            desc: '按钮',
            dev: ButtonDev,
            prod: ButtonProd
        },
        Modal: {
            name: 'Modal',
            defaultProps: {
                title: '弹窗'
            },
            setter: [
                {
                  name: 'title',
                  label: '标题',
                  type: 'input'
                }
            ],
            stylesSetter: [],
            events: [
                {
                    name: 'onOk',
                    label: '确认事件',
                },
                {
                    name: 'onCancel',
                    label: '取消事件'
                },
            ],
            methods: [
                {
                    name: 'open',
                    label: '打开弹窗',
                },
                {
                    name: 'close',
                    label: '关闭弹窗'
                }
            ],
            desc: '弹窗',
            dev: ModalDev,
            prod: ModalProd
        },
        Page: {
            name: 'Page',
            defaultProps: {},
            desc: '页面',
            dev: PageDev,
            prod: PageProd
        },
        Table: {
            name: 'Table',
            defaultProps: {},
            desc: '表格',
            setter: [
                {
                  name: 'url',
                  label: 'url',
                  type: 'input',
                },
            ],
            dev: TableDev,
            prod: TableProd
        },
        TableColumn: {
            name: 'TableColumn',
            desc: '表格列',
            defaultProps: {
                dataIndex:`col_${new Date().getTime()}`,
                title: '列名'
            },
            setter: [
                {
                  name: 'type',
                  label: '类型',
                  type: 'select',
                  options: [
                    {
                      label: '文本',
value: 'text',
                    },
                    {
                      label: '日期',
                      value: 'date',
                    },
                  ],
                },
                {
                  name: 'title',
                  label: '标题',
                  type: 'input',
                },
                {
                  name: 'dataIndex',
                  label: '字段',
                  type: 'input',
                },
              ],
            dev: TableColumnDev,
            prod: TableColumnProd,
        },
        Form: {
            name: 'Form',
            defaultProps: {},
            desc: '表单',
            setter: [
                {
                    name: 'title',
                    label: '标题',
                    type: 'input',
                },
            ],
            events: [
                {
                    name: 'onFinish',
                    label: '提交事件',
                }
            ],
            methods: [
                {
                    name: 'submit',
                    label: '提交',
                }
            ],
            dev: FormDev,
            prod: FormProd
        },
        FormItem: {
            name: 'FormItem',
            desc: '表单项',
            defaultProps: {
                name: new Date().getTime(),
                label: '姓名'
            },
            dev: FormItemDev,
            prod: FormItemProd,
            setter: [
              {
                name: 'type',
                label: '类型',
                type: 'select',
                options: [
                  {
                    label: '文本',
                    value: 'input',
                  },
                  {
                    label: '日期',
                    value: 'date',
                  },
                ],
              },
              {
                name: 'label',
                label: '标题',
                type: 'input',
              },
              {
                name: 'name',
                label: '字段',
                type: 'input',
              },
              {
                name: 'rules',
                label: '校验',
                type: 'select',
                options: [
                  {
                    label: '必填',
                    value: 'required',
                  },
                ],
              }
            ]
        },
        DatePicker: {
            name: 'DatePicker',
            defaultProps: {
                placeholder: '请选择日期',
                format: 'YYYY-MM-DD'
            },
            setter: [
                {
                  name: 'placeholder',
                  label: '占位文本',
                  type: 'input',
                },
                {
                  name: 'format',
                  label: '日期格式',
                  type: 'select',
                  options: [
                    {label: '年-月-日', value: 'YYYY-MM-DD'},
                    {label: '年/月/日', value: 'YYYY/MM/DD'},
                    {label: '月-日-年', value: 'MM-DD-YYYY'},
                    {label: '月/日/年', value: 'MM/DD/YYYY'},
                  ],
                },
            ],
            stylesSetter: [
                {
                    name: 'width',
                    label: '宽度',
                    type: 'inputNumber',
                },
                {
                    name: 'height',
                    label: '高度',
                    type: 'inputNumber',
                }
            ],
            events: [
                {
                    name: 'onChange',
                    label: '日期改变事件',
                },
            ],
            desc: '日期选择器',
            dev: DatePickerDev,
            prod: DatePickerProd
        },
        Image: {
            name: 'Image',
            defaultProps: {
                src: '/school.png',
                alt: '图片',
                width: 200,
                height: 150,
                preview: true
            },
            setter: [
                {
                  name: 'src',
                  label: '图片地址',
                  type: 'input',
                },
                {
                  name: 'alt',
                  label: '替代文本',
                  type: 'input',
                },
                {
                  name: 'width',
                  label: '宽度',
                  type: 'inputNumber',
                },
                {
                  name: 'height',
                  label: '高度',
                  type: 'inputNumber',
                },
                {
                  name: 'preview',
                  label: '预览功能',
                  type: 'select',
                  options: [
                    {label: '开启', value: true},
                    {label: '关闭', value: false},
                  ],
                },
            ],
            stylesSetter: [
                {
                    name: 'borderRadius',
                    label: '圆角',
                    type: 'inputNumber',
                },
                {
                    name: 'border',
                    label: '边框',
                    type: 'input',
                },
            ],
            events: [
                {
name: 'onClick',
                    label: '点击事件',
                },
                {
                    name: 'onLoad',
                    label: '加载完成事件',
                },
            ],
            desc: '图片展示',
            dev: ImageDev,
            prod: ImageProd
        },
       Input: {
            name: 'Input',
            defaultProps: {
                placeholder: '请输入内容',
                size: 'middle',
                prefix: '',
                suffix: ''
            },
            setter: [
                {
                  name: 'placeholder',
                  label: '占位文本',
                  type: 'input',
                },
                {
                  name: 'size',
                  label: '尺寸',
                  type: 'select',
                  options: [
                    {label: '小', value: 'small'},
                    {label: '中', value: 'middle'},
                    {label: '大', value: 'large'},
                  ],
                },
                {
                  name: 'prefix',
                  label: '前缀',
                  type: 'input',
                },
                {
                  name: 'suffix',
                  label: '后缀',
                  type: 'input',
                },
            ],
            stylesSetter: [
                {
                    name: 'width',
                    label: '宽度',
                    type: 'inputNumber',
                },
                {
                    name: 'height',
                    label: '高度',
                    type: 'inputNumber',
                },
            ],
            events: [
                {
                    name: 'onChange',
                    label: '输入改变事件',
                },
                {
                    name: 'onPressEnter',
                    label: '回车事件',
                },
            ],
            desc: '输入框',
            dev: InputDev,
            prod: InputProd
        },
        Select: {
            name: 'Select',
            defaultProps: {
                placeholder: '请选择',
                mode: 'default',
                options: [
                    {label: '选项1', value: '1'},
                    {label: '选项2', value: '2'},
                    {label: '选项3', value: '3'}
                ]
            },
            setter: [
                {
                  name: 'placeholder',
                  label: '占位文本',
                  type: 'input',
                },
                {
                  name: 'mode',
                  label: '模式',
                  type: 'select',
                  options: [
                    {label: '单选', value: 'default'},
                    {label: '多选', value: 'multiple'},
                    {label: '标签', value: 'tags'},
                  ],
                },
            ],
            stylesSetter: [
                {
                    name: 'width',
                    label: '宽度',
                    type: 'inputNumber',
                },
            ],
            events: [
                {
                    name: 'onChange',
                    label: '选择改变事件',
                },
            ],
            desc: '选择器',
            dev: SelectDev,
            prod: SelectProd
        },
        Switch: {
            name: 'Switch',
            defaultProps: {
                checked: false,
                size: 'default',
                checkedChildren: '',
                unCheckedChildren: ''
            },
            setter: [
                {
                  name: 'checked',
                  label: '默认状态',
                  type: 'select',
                  options: [
                    {label: '开启', value: true},
                    {label: '关闭', value: false},
                  ],
                },
                {
                  name: 'size',
                  label: '尺寸',
                  type: 'select',
                  options: [
                    {label: '默认', value: 'default'},
                    {label: '小', value: 'small'},
                  ],
                },
                {
                  name: 'checkedChildren',
                  label: '开启时文本',
                  type: 'input',
                },
                {
                  name: 'unCheckedChildren',
                  label: '关闭时文本',
                  type: 'input',
                },
            ],
            stylesSetter: [],
            events: [
                {
                    name: 'onChange',
                    label: '状态改变事件',
                },
            ],
            desc: '开关',
            dev: SwitchDev,
            prod: SwitchProd
        },
        Progress: {
            name: 'Progress',
            defaultProps: {
                percent: 30,
                type: 'line',
                status: 'active',
                strokeColor: '#1890ff'
            },
            setter: [
                {
                  name: 'percent',
                  label: '百分比',
                  type: 'inputNumber',
                  min: 0,
                  max: 100,
                },
                {
                  name: 'type',
                  label: '类型',
                  type: 'select',
                  options: [
                    {label: '线性', value: 'line'},
                    {label: '环形', value: 'circle'},
                    {label: '仪表盘', value: 'dashboard'},
                  ],
                },
                {
                  name: 'status',
                  label: '状态',
                  type: 'select',
                  options: [
                    {label: '进行中', value: 'active'},
                    {label: '成功', value: 'success'},
                    {label: '异常', value: 'exception'},
                    {label: '正常', value: 'normal'},
                  ],
                },
            ],
            stylesSetter: [
                {
                    name: 'width',
                    label: '宽度',
                    type: 'inputNumber',
                },
            ],
            events: [],
            desc: '进度条',
            dev: ProgressDev,
            prod: ProgressProd
        },
        Tag: {
            name: 'Tag',
            defaultProps: {
                color: 'blue',
                closable: false,
                children: '标签'
            },
            setter: [
                {
                  name: 'color',
                  label: '颜色',
                  type: 'select',
                  options: [
                    {label: '蓝色', value: 'blue'},
                    {label: '红色', value: 'red'},
                    {label: '绿色', value: 'green'},
                    {label: '橙色', value: 'orange'},
                    {label: '紫色', value: 'purple'},
                  ],
                },
                {
                  name: 'closable',
                  label: '可关闭',
                  type: 'select',
                  options: [
                    {label: '是', value: true},
                    {label: '否', value: false},
                  ],
                },
                {
                  name: 'children',
                  label: '标签内容',
                  type: 'input',
                },
            ],
            stylesSetter: [],
            events: [
                {
                    name: 'onClose',
                    label: '关闭事件',
                },
            ],
            desc: '标签',
            dev: TagDev,
            prod: TagProd
        },
        // 新增富文本编辑组件配置
        RichTextEditor: {
            name: 'RichTextEditor',
            defaultProps: {
                value: '',
                placeholder: '请输入富文本内容',
                language: 'html'
            },
            setter: [
                {
                  name: 'placeholder',
                  label: '占位文本',
                  type: 'input',
                },
                {
                  name: 'language',
                  label: '语言模式',
                  type: 'select',
                  options: [
                    {label: 'HTML', value: 'html'},
                    {label: 'Markdown', value: 'markdown'},
                    {label: '纯文本', value: 'plaintext'},
                  ],
                },
            ],
            stylesSetter: [
                {
                    name: 'width',
                    label: '宽度',
                    type: 'inputNumber',
                },
                {
                    name: 'height',
                    label: '高度',
                    type: 'inputNumber',
                },
                {
                    name: 'fontSize',
                    label: '字体大小',
                    type: 'inputNumber',
                },
            ],
            events: [
                {
                    name: 'onChange',
                    label: '内容改变事件',
                },
                {
                    name: 'onFocus',
                    label: '聚焦事件',
                },
                {
                    name: 'onBlur',
                    label: '失焦事件',
                },
            ],
            methods: [
                {
                    name: 'getValue',
                    label: '获取内容',
                },
                {
                    name: 'setValue',
                    label: '设置内容',
                },
            ],
            desc: '富文本编辑器',
            dev: RichTextEditorDev,
            prod: RichTextEditorProd
        },
        // 新增位置选择组件配置
        LocationPicker: {
            name: 'LocationPicker',
            defaultProps: {
                value: '',
                placeholder: '请选择位置',
                apiKey: 'your-baidu-map-api-key'
            },
            setter: [
                {
                  name: 'placeholder',
                  label: '占位文本',
                  type: 'input',
                },
                {
                  name: 'apiKey',
                  label: '百度地图API Key',
                  type: 'input',
                  placeholder: '请输入您的百度地图API Key'
                },
            ],
            stylesSetter: [
                {
                    name: 'width',
                    label: '宽度',
                    type: 'inputNumber',
                },
                {
                    name: 'height',
                    label: '高度',
                    type: 'inputNumber',
                },
            ],
            events: [
                {
                    name: 'onChange',
                    label: '位置改变事件',
                },
                {
                    name: 'onSelect',
                    label: '位置选择事件',
                },
            ],
            methods: [
                {
                    name: 'getLocation',
                    label: '获取当前位置',
                },
                {
                    name: 'setLocation',
                    label: '设置位置',
                },
            ],
            desc: '位置选择器',
            dev: LocationPickerDev,
            prod: LocationPickerProd
        },  
    },
    registerComponent: (name, componentConfig) => set((state) => {
        return {
            ...state,
            componentConfig: {
                ...state.componentConfig,
                [name]: componentConfig
            }
        }
    })
}));