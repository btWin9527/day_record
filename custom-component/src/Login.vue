<template>
  <el-form class="form" ref="form" :model="user" :rules="rules">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="user.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="user.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login">登 录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Login',
  data () {
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
    login () {
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
