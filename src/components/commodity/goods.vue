<template>
  <div>
    <!-- 顶部面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <!-- 商品查询搜索 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @click="getGoodsList">
            <el-button slot="append" icon="el-icon-search" @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 添加商品 -->
      <!-- 商品列表信息 -->
      <template>
        <el-table  :data="goodsList"  border  style="width: 100%">
          <el-table-column  fixed  type="index"  label="序号"></el-table-column>
          <el-table-column  fixed  prop="goods_name"  label="商品名称"></el-table-column>
          <el-table-column  fixed  prop="goods_price"  label="商品价格(元)"></el-table-column>
          <el-table-column  fixed  prop="goods_weight"  label="商品重量"></el-table-column>
          <el-table-column  fixed  prop="add_time"  label="创建时间"></el-table-column>
          <el-table-column  fixed="right"  label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>
  </div>
</template>

<script>
import mix from './goods.js'
export default {
  mixins: [mix],
  data() {
    return {
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
