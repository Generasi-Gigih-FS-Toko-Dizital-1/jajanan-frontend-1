import { Form, Typography, Col, Row, Input, Select, Button } from "antd";

const Add = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Typography.Title style={{ padding: "10px 20px" }}>
        Add Admin
      </Typography.Title>
      <Form style={{ padding: "10px 10px" }} layout="vertical">
        <Row>
          <Col style={{ padding: "0 10px" }} span={12}>
            <Form.Item
              name={"fullname"}
              label="Fullname"
              required
              rules={[
                { required: true, message: "Please input your fullname!" },
              ]}
            >
              <Input placeholder="Example" />
            </Form.Item>
          </Col>
          <Col style={{ padding: "0 10px" }} span={12}>
            <Form.Item
              name={"email"}
              label="Email"
              required
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Harap masukan email yang valid!" },
              ]}
            >
              <Input placeholder="Example" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col style={{ padding: "0 10px" }} span={12}>
            <Form.Item>
              <Select
                defaultValue="male"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "notsay", label: "Prefer not say" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col style={{ padding: "0 10px" }} span={12}>
            <Form.Item
              name={"password"}
              label="New Password"
              required
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </Col>
          <Col style={{ padding: "0 10px" }} span={12}>
            <Form.Item
              label="Confirm Password"
              name="password2"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col style={{ padding: "0 10px" }} span={24}>
            <Button type="primary">Save</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Add;
