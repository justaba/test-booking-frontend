import React, { FC } from "react";
import { Form, Input, Button, DatePicker, Space, Typography, Select } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";

interface IProps {
  id: string
}

const Reservation: FC<IProps> = ({ id }) => {

  const [form] = Form.useForm();

  const { RangePicker } = DatePicker;
  const { Title } = Typography;
  const { Option } = Select;

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="7">+7</Option>
        <Option value="495">+495</Option>
      </Select>
    </Form.Item>
  );

  const rangeConfig = {
    rules: [{ type: 'array' as const, required: true, message: 'Введите даты проживания!' }],
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/bookings`, {
      _room: '6191cc73ee551e470ca79a9f',
      name: values.nickname,
      phone: values.phone,
      email: values.email,
      startDate: values['range-picker'][0].format('YYYY-MM-DD'),
      endDate: values['range-picker'][1].format('YYYY-MM-DD')
    })
    .then(res => {
      console.log(res)
      form.resetFields()
    })
    .catch(err => console.log(err))
  };
  console.log(id)
  return (
    <Space direction="vertical">
      <Title level={3}>Забронировать номер</Title>
      <Form
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          name="_room"
          hidden={true}
        >
          <Input
            defaultValue={id}
          />
        </Form.Item>
        <Form.Item
          name="nickname"
          rules={[{ required: true, message: 'Введите пожалуйста свое ФИО!', whitespace: true }]}
        >
          <Input
            placeholder="ФИО"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[{ required: true, message: 'Введите пожалуйста свой телефон!' }]}
        >
          <Input
            addonBefore={prefixSelector}
            placeholder="Телефон"
            prefix={<PhoneOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: 'Неверно введен E-mail!',
            },
            {
              required: true,
              message: 'Пожалуйста введите E-mail!',
            },
          ]}
        >
          <Input
            placeholder="E-mail"
            prefix={<MailOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
         name="range-picker"
         {...rangeConfig} 
        >
          <RangePicker />
        </Form.Item>
        <Button htmlType="submit" type="primary">Забронировать</Button>
      </Form>
    </Space>
  );
};

export default Reservation;
