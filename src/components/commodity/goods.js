export default {
  data() {
    return {
      // 商品数据列表
      goodsList: [],
      // 查询用户的参数对象
      queryInfo: {
        // 搜索条件
        query: '',
        // 展示第 N 页数据
        pagenum: 1,
        // 每页显示的 条数
        pagesize: 5,
        total: 0
      }
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    // 获取列表数据
    async getGoodsList() {
      const {data: res} = await this.$http.get('goods', {
        params: this.queryInfo
      })
      // console.log(res.data)
      if (res.meta.status !== 200) {
        return this.$message.error('res.data.msg')
      }
      this.goodsList = res.data.goods
    }
    // 添加商品信息
  }
}
