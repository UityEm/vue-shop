export default {
  data() {
    return {
      rightsList: []
    }
  },
  created() {
    this.getrightsList()
  },
  methods: {
    // 获取权限列表
    async getrightsList() {
      const {data: res} = await this.$http.get('rights/list')
      // console.log(res.data)
      if (res.meta.status !== 200) {
        return this.$message.error('res.meta.msg')
      }
      this.rightsList = res.data
    }
  }
}
