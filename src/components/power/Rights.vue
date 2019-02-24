<template>
    <div>
      <!-- 顶部面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 主体卡片内容 -->
      <el-card class="box-card">
          <el-table :data="rightsList"  border  style="width: 100%">
            <el-table-column  type="index"  label="序号"></el-table-column>
            <el-table-column  prop="authName"  label="权限名称"></el-table-column>
            <el-table-column  prop="path"  label="路径"></el-table-column>
            <el-table-column label="等级">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.level==='0'">一级</el-tag>
                <el-tag v-else-if="scope.row.level==='1'" type="success">二级</el-tag>
                <el-tag v-else type="warning">三级</el-tag>
              </template>
            </el-table-column>
          </el-table>
      </el-card>
    </div>
</template>

<script>
import mix from './RightsList-mixins.js'
export default {
  mixins: [mix],
  data() {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
</style>
