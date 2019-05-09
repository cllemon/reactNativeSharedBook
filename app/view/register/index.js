import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { Form, FormItem } from '../../components/widget/form/index';
import { common } from '../../styles';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: {
        name: 'chenglong',
        age: '24',
        agenda: '男'
      },
      rules: {
        name: {
          required: true,
          message: '请输入姓名'
        },
        agenda: {
          required: true,
          message: '请输入姓别'
        }
      }
    };
  }

  componentDidMount() {}
  /**
   *
   *
   * @returns
   * @memberof Register
   */
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10
        }}
      >
        <Form model={this.state.model} rules={this.state.rules}>
          <FormItem label='姓名姓名' prop='name'>
            <TextInput
              placeholder='请输入姓名'
              onChangeText={() => console.log('我是外部函数')}
            />
          </FormItem>
          <FormItem label='性别性别' prop='agenda'>
            <TextInput placeholder='请输入性别' />
          </FormItem>
        </Form>
      </View>
    );
  }
}

export default Register;

/**
 *
 *
           <FormItem label='年龄年龄' prop='age'>
            <TextInput />
          </FormItem>
          <FormItem label='性别性别' prop='agenda'>
            <TextInput />
          </FormItem>
 */
