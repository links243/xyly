<template>
  <div class="register_form">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="用户名/手机" />
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="form.captcha" placeholder="验证码">
          <template slot="append">
            <div @click="sendCaptcha">
              发送验证码
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input v-model="form.nickname" placeholder="昵称" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码" type="password" />
      </el-form-item>
      <el-form-item prop="password2">
        <el-input v-model="form.password2" placeholder="确认密码" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btnRegister" @click="onSubmit">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '13845678911',
        captcha: '000000',
        nickname: 'test_01',
        password: '123456',
        password2: '123456'
      },
      rules: {
        username: [{ required: true, message: '请输入正确的手机号码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入正确的验证码', trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入正确的昵称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入正确格式的密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        password2: [{ required: true, validator: validatePass2, message: '请再次输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取验证码
    sendCaptcha () {
      const reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/

      if (reg.test(this.form.username)) {
        this.$axios.post('/captchas', { tel: this.form.username })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.$message.warning('手机号码格式错误')
      }
    },
    // 注册
    onSubmit () {
      console.log(this.$refs)
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { password2, ...resForm } = this.form
          console.log(resForm)
          this.$axios.post('/accounts/register', resForm).then((res) => {
            console.log(res)
          }).catch((err) => {
            console.log(err)
          })
        } else {
          this.$message.error('请检查输入文本')
          return false
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.register_form {
  padding: 20px;

  .btnRegister {
    width: 100%;
  }
}
</style>
