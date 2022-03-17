import React, { useEffect, useRef } from 'react';
import { Form, Input, Button, Space, DatePicker } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.css';

export default function index(props) {
  const DrawerFormRef = useRef(null)

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };
  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  const onChangeInput = () => {};

  const onOk = (value) => {
    console.log('onOk: ', value);
  };

  const handleDel = (remove, name) => {
    remove(name);
    console.log(name, 'name');
  };

  let list = [
    {
      id: 1,
      time: 1647004241813,
      disable: true,
      isDel: false,
      name: '节目表单1',
    },
    {
      id: 2,
      time: 1647001221813,
      disable: true,
      isDel: false,
      name: '节目表单2',
    },
    {
      id: 3,
      time: 1647002231813,
      disable: true,
      isDel: false,
      name: '节目表单3',
    },
    {
      id: 4,
      time: 1647003201813,
      disable: true,
      isDel: false,
      name: '节目表单4',
    },
  ];

  useEffect(() => {
    DrawerFormRef.current.setFieldsValue({
      users: list
    })
  });

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" ref={DrawerFormRef}>
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <div>{JSON.stringify(fields)}</div>
                <Form.Item
                  name={[name, 'time']}
                  rules={[{ required: true, message: '请填写开播时间' }]}
                >
                  <DatePicker showTime onChange={onChange} onOk={onOk} />
                </Form.Item>
                <div>结束时间：</div>
                <div>节目时长：</div>
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  rules={[{ required: true, message: '请填写节目名称' }]}
                >
                  <Input showCount maxLength={20} onChange={onChangeInput} />
                </Form.Item>
                <div>类型</div>
                <div onClick={() => handleDel(remove, name)}>删除</div>
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
