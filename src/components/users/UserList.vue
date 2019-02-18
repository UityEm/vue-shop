<template>
  <div class="user-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @click="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 添加用户遮罩层 -->
      <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="50%"
        top="185px"
        :before-close="addDialogClose">
        <!-- 添加用户自带验证表单域 -->
        <el-form
          :model="addForm"
          status-icon
          :rules="addFormRules"
          ref="addFormRef"
          label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户遮罩层 -->
      <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%"
        top="185px"
        :before-close="editDialogCloseBefore">
        <!-- 修改用户自带验证表单域 -->
        <el-form
          :model="editForm"
          status-icon
          :rules="editFormRules"
          ref="editFormRef"
          label-width="100px"
          class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogClose">取 消</el-button>
          <el-button type="primary"  @click="editUser()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 用户列表 -->
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="mobile" label="手机号码" width="180"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
        <el-table-column prop="email" label="邮编" width="180"></el-table-column>
        <el-table-column prop="mg_state" label="状态" width="100">
          <template slot-scope="scope">
            <!-- 用户状态开关,插槽实现,row可以帮助获得每条信息 -->
            <el-switch
            v-model="scope.row.mg_state"
            @change="changeState(scope.row.id, scope.row.mg_state)"
            ></el-switch>
          </template></el-table-column>
        <el-table-column prpo label="操作" width="200">
          <template slot-scope="scope">
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">编辑角色</div>
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">删除角色</div>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="delUser(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip placement="top" :enterable="false">
              <div slot="content">分配角色</div>
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2, 5, 10, 15]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="queryInfo.total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import mix from './UserList-mixins.js'
export default {
  mixins: [mix],
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
</style>
