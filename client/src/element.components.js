import Vue from "vue";
import rus from "element-ui/lib/locale/lang/ru-RU";
import locale from "element-ui/lib/locale";
import {
  Button,
  Select,
  Header,
  Footer,
  Main,
  Container,
  Aside,
  Table,
  TableColumn,
  Input,
  InputNumber,
  Switch,
  Tabs,
  TabPane,
  Form,
  DatePicker,
  Collapse,
  CollapseItem,
  Upload,
  Notification,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Loading,
  Dialog,
  Message,
  MessageBox,
} from "element-ui";

locale.use(rus);

Vue.use(Button);
Vue.use(Select);
Vue.use(Header);
Vue.use(Footer);
Vue.use(Main);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Form);
Vue.use(Select);
Vue.use(DatePicker, { locale });
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Upload);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Loading);
Vue.use(Dialog);
Vue.use(Switch);

Vue.prototype.$notify = Notification;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
