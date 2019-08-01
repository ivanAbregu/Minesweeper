import React,{useContext} from 'react';
import {
    Form,
    Input,
    Icon,
    Button,
  } from 'antd';
  

  class RegistrationForm extends React.Component {
    state = {
      confirmDirty: false,
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };
  
    handleConfirmBlur = e => {
      const { value } = e.target;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
  
    compareToFirstPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    };
  
    validateToNextPassword = (rule, value, callback) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
   
  
      return (
        <div className="Loguin">
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
            <Form.Item label="Password" hasFeedback>
                {getFieldDecorator('password', {
                rules: [
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                    {
                    validator: this.validateToNextPassword,
                    },
                ],
                })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
                {getFieldDecorator('confirm', {
                rules: [
                    {
                    required: true,
                    message: 'Please confirm your password!',
                    },
                    {
                    validator: this.compareToFirstPassword,
                    },
                ],
                })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                Register
                </Button>
            </Form.Item>
            </Form>
            </div>
      );
    }
  }
  
  export default Form.create({ name: 'register' })(RegistrationForm);