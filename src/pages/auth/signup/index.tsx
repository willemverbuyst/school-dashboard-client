import { Button, Col, Form, Input, Layout, Radio, Row, Select } from "antd";
import { useEffect, useState } from "react";

import {
  SignupInput,
  useGetSchools,
  useGetTeachers,
  useLoggedInGuard,
  useSignup,
} from "../../../hooks";

const { Content } = Layout;
const { Option } = Select;

export function Signup(): JSX.Element {
  const [form] = Form.useForm();
  const schools = useGetSchools();
  const { signup } = useSignup();
  const teachers = useGetTeachers();
  const { loggedInGuard } = useLoggedInGuard();
  const [showTeachers, setShowTeachers] = useState<boolean>(false);

  useEffect(() => loggedInGuard());

  const handleSubmit = (input: SignupInput) => {
    signup(input);
    form.resetFields();
  };

  const showDropdownWithTeachers = (value: string): void => {
    value === "student" ? setShowTeachers(true) : setShowTeachers(false);
  };

  const renderDropdownWithTeachers = (): JSX.Element => (
    <Form.Item
      name="teacher"
      rules={[{ required: true, message: "Please select your teacher!" }]}
    >
      <Select placeholder="Select your teacher" style={{ width: 350 }}>
        {teachers.map(({ user: { userName }, id }, i) => (
          <Option key={i} value={id}>
            {userName}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  return (
    <Content className="site-layout-content" style={{ padding: 90 }}>
      <Row justify="center" style={{ padding: "24px" }}>
        SIGNUP
      </Row>

      <Row justify="center">
        <Col style={{ width: 350 }}>
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="role"
              rules={[{ required: true, message: "Please select your role!" }]}
            >
              <Radio.Group
                onChange={(e) => showDropdownWithTeachers(e.target.value)}
              >
                <Radio value="student">Student</Radio>
                <Radio value="teacher">Teacher</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="school"
              rules={[{ required: true, message: "Please select a school!" }]}
            >
              <Select placeholder="Select a school" style={{ width: 350 }}>
                {schools.map(({ name, id }) => (
                  <Option key={id} value={id}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {showTeachers ? renderDropdownWithTeachers() : null}

            <Form.Item
              name="userName"
              rules={[
                { required: true, message: "Please enter your username!" },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email!" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="bsn"
              rules={[{ required: true, message: "Please enter your bsn!" }]}
            >
              <Input placeholder="BSN" />
            </Form.Item>

            <Form.Item
              name="bio"
              rules={[{ required: true, message: "Please enter your bio!" }]}
            >
              <Input.TextArea placeholder="Bio" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#B81D9D", border: "none" }}
              >
                Signup
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Content>
  );
}
