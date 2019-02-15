<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="logo-box">
        <img src="../assets/img/logo.png" alt>
      </div>
      <!-- 登录表单 -->
      <el-form :model="loginForm" :rules="loginFormRules" ref="loginFormRef">
        <el-form-item  prop="username">
          <el-input v-model="loginForm.username">
            <i slot="prefix" class="iconfont icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password">
            <i slot="prefix" class="iconfont icon-3702mima"></i>
          </el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-row>
          <el-col :offset="7">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          {required: true, message: '请输入登录名称', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入登录密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.loginFormRef.validate(async(valid) => {
        if (!valid) return null
        const {data: res} = await this.$http.post('/login', this.loginForm)
        if (res.meta.status !== 200) {
          window.sessionStorage.removeItem('token')
          this.$message.error('用户名或密码错误')
        } else {
          this.$message.success('登录成功')
          window.sessionStorage.setItem('token', res.data.token)
          // 页面跳转 通过  vue-router 编程式导航 实现
          this.$router.push('/home')
        }
      })
    },
    resetForm() {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
.login-container {
  background-color: #2b4b6b;
  height: 100%;
  overflow: hidden;
  .login-box {
    width: 450px;
    height: 304px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .logo-box {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 8px;
      box-shadow: 0 0 10px #eee;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
}
.el-form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box
  }
</style>
