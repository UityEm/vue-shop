export default {
  data() {
    var checkMobile = (rule, value, callback) => {
      if (!value.trim()) {
        return callback(new Error('手机号码不能为空'))
      }
      if (!/^1[34578]\d{9}$/.test(value)) {
        return callback(new Error('手机号有误,请重新填写'))
      } else {
        callback()
      }
    }
    return {
      // 用户列表数据
      userList: [],
      // 查询用户的参数对象
      queryInfo: {
        // 搜索条件
        query: '',
        // 展示第 N 页数据
        pagenum: 1,
        // 每页显示的 条数
        pagesize: 2,
        total: 0
      },
      // 添加用户遮罩层
      addDialogVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addFormRules: {
        usernam: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' }
        ],
        mobile: [
          { validator: checkMobile, trigger: 'blur' }
        ]
      },
      // 修改用户遮罩层
      editDialogVisible: false,
      editForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editFormRules: {
        usernam: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' }
        ],
        mobile: [
          { validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    // 修改用户状态
    async changeState(id, state) {
      const {data: res} = await this.$http.put(`users/${id}/state/${state}`)
      if (res.meta.status !== 200) {
        return this.$message.error('修改状态失败')
      }
      this.$message({
        message: '修改状态成功',
        type: 'success',
        duration: 1500
      })
    },
    // 获取用户列表
    async getUserList() {
      const {data: res} = await this.$http.get('users', {
        params: this.queryInfo
      })
      console.log(res.data)
      if (res.meta.status !== 200) {
        return this.message.error('res.meta.msg')
      }
      this.userList = res.data.users
      // 更新总记录数目
      this.queryInfo.total = res.data.total
    },
    // 添加用户信息
    addUser() {
      // 校验用户信息
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return null
        }
        // 实时数据添加
        const {data: res} = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
          return this.$message({
            message: '添加用户失败!',
            type: 'error',
            duration: 1000
          })
        }
        // 关闭弹层
        this.addDialogVisible = false
        // 页面刷新
        this.getUserList()
        // 清除Form表单信息
        this.$refs.addFormRef.resetFields()
        this.$message({
          message: '添加用户成功!',
          type: 'success',
          duration: 1000
        })
      })
    },
    // 删除用户信息
    async delUser(id) {
      const cfm = await this.$confirm('确定要删除该用户么?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 判断是否点击确认按钮
      if (cfm === 'confirm') {
        const {data: res} = await this.$http.delete('users/' + id)
        if (res.meta.status === 200) {
          this.$message({
            message: '删除用户成功',
            type: 'success',
            duration: 1000
          })
          // 刷新页面
          this.getUserList()
        } else {
          this.$message({
            message: '删除用户失败',
            type: 'error',
            duration: 1000
          })
        }
      }
    },
    // 修改用户信息
    // 分页相关
    // 设定每页显示条数
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    // 设定显示第 N 页数据
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    // 添加用户弹层关闭前回调
    addDialogClose(done) {
      //  验证结果
      this.$refs.addFormRef.resetFields()
      // 关闭弹框
      done()
    }
  }
}
