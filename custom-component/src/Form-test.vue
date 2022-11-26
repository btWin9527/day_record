<template>
  <lg-form class="form" ref="form" :model="user" :rules="rules">
    <lg-form-item label="用户名" prop="username">
      <lg-input :value="user.username" @input="(value)=>user.username=value" placeholder="请输入信息"/>
    </lg-form-item>
    <lg-form-item label="密码" prop="password">
      <lg-input type="password" v-model="user.password"/>
    </lg-form-item>
    <lg-form-item>
      <lg-button type="primary" @click="login">登 录</lg-button>
    </lg-form-item>
  </lg-form>
</template>

<script>

import LgForm from './form/Form'
import LgFormItem from './form/FormItem'
import LgInput from './form/Input'
import LgButton from './form/Button'

export default {
  components: {
    LgForm,
    LgFormItem,
    LgInput,
    LgButton
  },
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码'
          },
          {
            min: 6,
            max: 12,
            message: '请输入6-12位密码'
          }
        ]
      }
    }
  },
  methods: {
    login() {
      console.log('button')
      return false
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //     alert('验证成功')
      //   } else {
      //     alert('验证失败')
      //     return false
      //   }
      // })
    }
  }
}
</script>

<style>
.form {
  width: 30%;
  margin: 150px auto;
}
</style>
