import React,{useContext} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css'; 
import {LOGIN_URL} from "./Const";
import myContext from "../context/my-context"

const NormalLoginForm= (props)=> {
  const _context = useContext(myContext)
  function handleSubmit (e)  {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let headers = {
          'Content-Type': 'application/json',
        };
        let body = JSON.stringify(values);
        fetch(LOGIN_URL, {headers, method: "POST",body})
            .then(res => res.json())
            .then(obj =>  _context.updateToken(obj.token))
            .catch((error) => { // error is a Promise
                console.log("Error",error)
            });
      }
    });
  };

    const { getFieldDecorator } = props.form;
    return (
      <div className="Loguin">
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>

        </Form.Item>
      </Form>
      </div>
    );
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);

