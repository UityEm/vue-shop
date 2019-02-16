<template>
  <el-container class="home-container">
    <!-- 头部部分 -->
  <el-header class="home-header">
    <div class="logo-box">
      <img src="../assets/img/heima.png" alt="">
      <span>电商后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
  </el-header>
  <el-container>
    <el-aside :width="menushow ? '65px':'200px'" class="home-aside">
      <div
        style="background-color:rgb(74, 80, 100);
        height:25px;
        line-height:25px;
        font-size:12px;
        text-align:center;
        color:white;
        letter-spacing:0.1em;
        user-select:none;
        cursor:pointer;"
        @click="menushow=!menushow"
      >|||</div>
      <el-row>
        <el-menu
        background-color="#333744"
        active-text-color="#409eff"
        text-color="#fff"
        :unique-opened="true"
        :style="menushow ? 'width:65px;' : 'width:200px'"
        :collapse="menushow"
        :collapse-transition="false"
        >
        <el-submenu
        :index="item.id + ''"
        v-for="(item,k) in menuList"
        :key="item.id">
          <template slot="title">
            <i :class="'iconfont icon-'+menuicon[k]"></i>
            <span>{{ item.authName }}</span>
          </template>
          <el-menu-item-group>
          <el-menu-item
          :index="item.id+'-'+item2.id"
          v-for="item2 in item.children"
          :key="item2.id">
            <i class="el-icon-menu"></i>
            {{ item2.authName }}
          </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        </el-menu>
      </el-row>
    </el-aside>
    <el-main class="home-main">
      <router-view/>
    </el-main>
  </el-container>
  </el-container>
</template>
<script>
export default {
  created() {
    this.getMenuList()
  },
  data() {
    return {
      // 左侧按钮导航是否显示
      menushow: false,
      menuList: [],
      menuicon: ['users', 'tijikongjian', 'shangpin', 'danju', 'baobiao']
    }
  },
  methods: {
    async getMenuList() {
      const { data: res } = await this.$http.get('/menus')
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error('res.meta.msg')
      }
      this.menuList = res.data
    },
    logout() {
      this.$confirm('确定要退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.removeItem('token')
          this.$message.success('已退出管理系统')
          this.$router.push('/')
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="less" scoped>
.home-container{
  height: 100%;
  .home-header{
    background-color: #373d41;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    padding-right: 20px;
    .logo-box{
      display: flex;
      color: #fff;
      font-size: 22px;
      align-items: center;
      // 禁止被用户选中
      user-select: none;
      img{
        width: 60px;
        height: 60px;
        margin-right: 10px;
      }
    }
  }
.home-aside{
  background-color: #333744;
  width: 200px;
  .el-menu{
    width: 300px;
  }
}
.home-main{
  background-color: #eaedf1;
}
}
</style>
