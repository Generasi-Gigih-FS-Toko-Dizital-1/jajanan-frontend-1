import { Button, Checkbox, Col, Form, Input, Row, Typography } from "antd";

const LoginForm = () => {
  const { Title } = Typography;

  return (
    <div>
      <Title style={{ textAlign: "center" }} level={2}>
        Login Admin
      </Title>
      <Form onFinish={(e) => console.log(e)}>
        <Form.Item
          name="email"
          rules={[
            { type: "email", message: "Harap masukan email yang valid!" },
            { required: true, message: "Masukkan email!" },
          ]}
        >
          <Input placeholder="example@gmail.com" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Row>
          <Col>
            <Form.Item>
              <Checkbox name="rememberme">Remember me</Checkbox>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item>
              <Button style={{ color: "#343434" }} type="link">
                Forgot your password?
              </Button>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" size="large" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
