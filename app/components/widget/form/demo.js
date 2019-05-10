import React, { Component } from 'react';
import { View, TextInput, Button, Slider, Switch } from 'react-native';
import { Form, FormItem } from './index';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: {
        name: [
          {
            required: true,
            message: '请输入姓名'
          }
        ],
        agenda: [
          {
            required: true,
            message: '请输入姓别'
          }
        ]
      },
      model: {
        name: 'cl',
        agenda: '男生',
        age: '24',
        price: 30,
        company: '个推',
        married: false
      }
    };
  }

  componentDidMount() {}

  _onSubmit = () => {
    this.Form.validate((valid, values) => {
      if (valid) {
        console.log(values);
        alert(JSON.stringify(values));
      }
    });
  };

  /**
   *
   *
   * @returns
   * @memberof Demo
   */
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff'
        }}
      >
        <Form
          model={this.state.model}
          rules={this.state.rules}
          labelSuffix=':'
          ref={_ref => (this.Form = _ref)}
        >
          <FormItem label='您的姓名' prop='name'>
            <TextInput placeholder='请输入姓名' />
          </FormItem>
          <FormItem label='您的性别' prop='agenda'>
            <TextInput placeholder='请输入性别' />
          </FormItem>
          <FormItem label='您的年龄' prop='age'>
            <TextInput placeholder='请输入年龄' />
          </FormItem>
          <FormItem label='价格' prop='price'>
            <Slider style={{ width: 260, height: 6 }} maximumValue={100} />
          </FormItem>
          <FormItem label='所在公司' prop='company'>
            <TextInput
              placeholder='请输入所在公司'
              multiline={true}
              numberOfLines={4}
              style={{ height: 60, marginVertical: 10 }}
            />
          </FormItem>
          <FormItem label='未婚吗？' prop='married'>
            <Switch />
          </FormItem>
        </Form>
        <Button
          title='提交'
          onPress={this._onSubmit}
          style={{ marginTop: -10 }}
        />
      </View>
    );
  }
}

export default Demo;
