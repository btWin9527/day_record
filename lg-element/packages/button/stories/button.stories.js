// 导入组件
import LgButton from '../index';

// 导出包配置
export default {
  title: 'Example/Button',
  component: LgButton,
  argTypes: {
    backgroundColor: {control: 'color'},
    size: {
      control: {type: 'select'},
      options: ['small', 'medium', 'large'],
    },
  },
};

// 模版函数
const Template = (args, {argTypes}) => ({
  props: Object.keys(argTypes),
  components: {LgButton},
  template: '<lg-button v-bind="$props" />',
});

export const Primary = Template.bind({});
// primary类型的按钮
Primary.args = {
  primary: true,
  label: 'Button',
};

export const Secondary = Template.bind({});
// 包含label的按钮
Secondary.args = {
  label: 'Button',
};