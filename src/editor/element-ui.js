import Vue from 'vue';
import {
  Container,
  Header,
  Aside,
  Main,
  Button,
  Input,
  RadioGroup,
  RadioButton,
  Switch,
} from 'element-ui';

Vue.prototype.$ELEMENT = { size: 'small' };

Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Button);
Vue.use(Input);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Switch);
