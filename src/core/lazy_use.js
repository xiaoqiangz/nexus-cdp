import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '@/config/defaultSettings'
// import Viser from 'viser-vue'
import echarts from 'echarts'
import moment from 'moment'

import {
  ConfigProvider,
  Layout,
  Input,
  InputNumber,
  Button,
  Switch,
  Radio,
  Checkbox,
  Select,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Tabs,
  Icon,
  Badge,
  Popover,
  Dropdown,
  List,
  Avatar,
  Breadcrumb,
  Steps,
  Spin,
  Menu,
  Drawer,
  Tooltip,
  Alert,
  Tag,
  Divider,
  DatePicker,
  TimePicker,
  Upload,
  Progress,
  Skeleton,
  Popconfirm,
  message,
  notification,
  pagination,
  tree,
  FormModel,
  TreeSelect
} from 'ant-design-vue'

// ext library
// import VueClipboard from 'vue-clipboard2'
// import VueCropper from 'vue-cropper'
import PageLoading from '@/components/PageLoading'
import PermissionHelper from '@/utils/helper/permission'
import './directives/action'

// VueClipboard.config.autoSetContainer = true

Vue.use(ConfigProvider)
Vue.use(Layout)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Badge)
Vue.use(Popover)
Vue.use(Dropdown)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Steps)
Vue.use(Spin)
Vue.use(Menu)
Vue.use(Drawer)
Vue.use(Tooltip)
Vue.use(Alert)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(DatePicker)
Vue.use(TimePicker)
Vue.use(Upload)
Vue.use(Progress)
Vue.use(Skeleton)
Vue.use(Popconfirm)
Vue.use(notification)
// Vue.use(Viser)
Vue.use(PageLoading)
Vue.use(pagination)
Vue.use(tree)
Vue.use(FormModel)
Vue.use(TreeSelect)
Vue.use(VueStorage, config.storageOptions)
Vue.use(PermissionHelper)

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment

// process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] NOTICE: Antd use lazy-load.')
