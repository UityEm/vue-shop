export default {
  data() {
    return {
      // 用户列表数据
      rolesList: [],
      // 添加角色遮罩层
      addDialogVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      addFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      // 修改角色遮罩层
      editDialogVisible: false,
      editForm: {
        roleName: '',
        roleDesc: ''
      },
      editFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      // 分配角色权限
      setRightDialogVisible: false,
      // 获取当前分配的权限角色
      setRightForm: {
        id: 0,
        roleName: ''
      },
      // 获取权限列表
      rightsList: [],
      rightsListProps: {
        label: 'authName',
        children: 'children'
      },
      // 收集默认权限ID 信息
      defaultCheckedKeys: []
    }
  },
  created() {
    this.getRolesList()
  },
  methods: {
    // 获取角色列表
    async getRolesList() {
      const {data: res} = await this.$http.get('roles')
      // console.log(res.data)
      if (res.meta.status !== 200) {
        return this.$message.error('res.meta.msg')
      }
      this.rolesList = res.data
      // // 更新总记录数目
      // this.queryInfo.total = res.data.total
    },
    // 添加角色信息
    addRoles() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) {
          return null
        }
        // 实时数据添加
        const {data: res} = await this.$http.post('roles', this.addForm)
        if (res.meta.status !== 201) {
          return this.$message({
            message: '添加角色失败',
            type: 'error',
            duration: 1000
          })
        }
        // 关闭弹层
        this.addDialogVisible = false
        // 页面刷新
        this.getRolesList()
        // 清除Form表单信息
        this.$refs.addFormRef.resetFields()
        this.$message({
          message: '添加用户成功!',
          type: 'success',
          duration: 1000
        })
      })
    },
    // 添加角色弹层关闭前回调
    addDialogClose(done) {
      // 关闭弹层内容清空
      this.$refs.addFormRef.resetFields()
      //  关闭弹框
      done()
    },
    // 修改角色展示弹出
    async showEditDialog(id) {
      const {data: res} = await this.$http.get('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message({
          message: '获取角色信息失败',
          type: 'error',
          duration: 1000
        })
      }
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 修改角色信息
    editRoles() {
      // console.log(this.editForm.roleId)
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) {
          return null
        }
        const {data: res} = await this.$http.put('roles/' + this.editForm.roleId, this.editForm)
        console.log(res.data)
        if (res.meta.status !== 200) {
          return this.$message({
            message: '修改角色失败',
            type: 'error',
            duration: 1000
          })
        }
        // 关闭弹层
        this.editDialogVisible = false
        // 刷新页面
        this.getRolesList()
        // 清除Form 表单信息
        this.$refs.editFormRef.resetFields()
        this.$message({
          message: '修改角色成功',
          type: 'success',
          duration: 1000
        })
      })
    },
    // 修改用户弹层自然关闭
    editDialogCloseBefore(done) {
      this.$refs.editFormRef.resetFields()
      done()
    },
    // 点击取消按钮执行回调
    editDialogClose() {
      // 关闭弹层内容清空
      this.$refs.editFormRef.resetFields()
      // 关闭弹层
      this.editDialogVisible = false
    },
    // 删除角色信息
    async delRoles(id) {
      // console.log(this.id)
      const cfm = await this.$confirm('确定要删除该角色么?', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      // 判断是否点击确认按钮
      if (cfm === 'confirm') {
        const {data: res} = await this.$http.delete('roles/' + id)
        if (res.meta.status !== 200) {
          this.$message({
            message: '失败',
            type: 'error',
            duration: 1000
          })
        } else {
          this.$message({
            message: '成功',
            type: 'success',
            duration: 1000
          })
          this.getRolesList()
        }
      }
    },
    // 权限删除功能
    async delright(role, rightId) {
      const cfm = await this.$confirm('确定要删除该权限么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (cfm === 'confirm') {
        const {data: res} = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        if (res.meta.status !== 200) {
          return this.$message({
            message: '删除失败',
            type: 'error',
            duration: 1000
          })
        }
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 1000
        })
        role.children = res.data
      }
    },
    // 分配权限展示弹层
    async showSetRightDialog(role) {
      const {data: res} = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      // 获取成功执行  弹层显示
      this.setRightDialogVisible = true
      // 当前分配角色对应ID  信息
      this.setRightForm = role
      // 当前分配权限列表
      this.rightsList = res.data
      // 设置树节点默认选中
      // 条件: 当前角色所拥有的权限要选中
      var arrId = [] // 接收当前拥有权限的id 变量
      // 从role中把默认所拥有的id获取到 并存储到arrId中
      this.getHaveRights(role, arrId)
      // 此时通过getHaveRights()调用 已经将默认权限id给到了arrId中
      // 将arrId 赋值给 defaultCheckedKeys
      this.defaultCheckedKeys = arrId
    },
    // 获取角色默认的权限ID
    // 通过递归遍历的方式将角色对应得 默认ID 获取到
    getHaveRights(node, keys) {
      if (!node.children) {
        return keys.push(node.id)
      }
      node.children.forEach(item => {
        return this.getHaveRights(item, keys)
      })
    },
    async setRight() {
      // 把 '全选' 节点id获取到 返回给数组
      var ids1 = this.$refs.rightsRef.getCheckedKeys()
      // 把 '半选' 节点id获取到 返回给数组
      var ids2 = this.$refs.rightsRef.getHalfCheckedKeys()
      // console.log(ids1)
      // console.log(ids2)
      // 将全选和半选的权限id合并到一起 并通过逗号连接变为字符串
      var allids = [...ids1, ...ids2].join(',')
      const {data: res} = await this.$http.post('roles/' + this.setRightForm.id + '/rights', {rids: allids})
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.setRightDialogVisible = false
      this.$message.success(res.meta.msg)
      this.getRolesList()
    }
  }
}
