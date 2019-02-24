<template>
  <div class="roles-container">
  <!-- 顶部导航 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  <!-- 主体内容 -->
  <el-card class="box-card">
    <!-- 添加角色按钮 -->
    <el-row>
      <el-col :span="1">
          <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
      </el-col>
    </el-row>
    <!-- 添加角色遮罩层 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addDialogVisible"
      width="50%"
      top="185px"
      :before-close="addDialogClose">
      <!-- 添加角色自带验证表单域 -->
      <el-form
        :model="addForm"
        status-icon
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改角色遮罩层 -->
    <el-dialog
      title="修改角色"
      :visible.sync="editDialogVisible"
      width="50%"
      top="185px"
      :before-close="editDialogCloseBefore">
      <!-- 修改角色自带验证表单域 -->
      <el-form
        :model="editForm"
        status-icon
        :rules="editFormRules"
        ref="editFormRef"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogClose">取 消</el-button>
        <el-button type="primary" @click="editRoles()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 权限分配弹层 -->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%">
      <el-form :model="setRightForm" label-width="120px">
        <el-form-item label="当前的角色:">{{setRightForm.roleName}}</el-form-item>
        <el-form-item label="分配的权限:">
          <el-tree
            :data="rightsList"
            :props="rightsListProps"
            node-key="id"
            default-expand-all
            show-checkbox
            :default-checked-keys="defaultCheckedKeys"
            ref="rightsRef"
          ></el-tree>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialogVisible">取 消</el-button>
        <el-button type="primary" @click="setRight()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 角色列表 -->
    <template>
      <el-table :data="rolesList" border style="width: 100%">
        <el-table-column type="expand">
          <!-- 权限列表 -->
          <template slot-scope="scope">
            <el-row
            v-for="(item1,k) in scope.row.children"
            :key="item1.id"
            :style="k==='0'?'border-bottom:1px solid #ebeef5;border-top:1px solid #ebeef5':'border-bottom:1px solid #ebeef5'">
              <el-col :span="5">
                <el-tag closable @close="delright(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row  v-for="(item2,k2) in item1.children"  :key="item2.id"  :style="k2!==0 ? 'border-top:1px solid #ebeef5': ''">
                  <el-col :span="6">
                    <el-tag
                    type="success"
                    closable
                    @close="delright(scope.row,item2.id)"
                    >{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                    type="warning"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    closable
                    @close="delright(scope.row,item3.id)"
                    >{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column  label="序号"  type="index"></el-table-column>
        <el-table-column  label="角色名称"  prop="roleName"></el-table-column>
        <el-table-column  label="角色描述"  prop="roleDesc"></el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="delRoles(scope.row.id)">删除</el-button>
            <el-button type="warning" size="mini" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </el-card>
  </div>
</template>
<script>
import mix from './RolesList-mixins.js'
export default {
  mixins: [mix],
  data() {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag{margin: 10px 5px}
.el-row{display: flex;align-items: center;}
</style>
