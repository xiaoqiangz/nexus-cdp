
<template>
  <div class="adminBox">
    <div style="margin-bottom:14px">
      <a-button type="primary" icon="plus" shape="round" @click="handleAdd">邀请管理员</a-button>
    </div>
    <div class="tableBox content-shadow">
      <a-table
        ref="table"
        size="default"
        rowKey="userId"
        :columns="columns"
        :data-source="tableData"
        :pagination="pagination"
      >
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a-tooltip v-if="!record.disableBtn">
              <template slot="title">禁用</template>
              <my-icon type="icontingyong" class="myicon" @click="handleDisable(record)" />
            </a-tooltip>
            <a-tooltip>
              <template slot="title">删除</template>
              <my-icon type="iconshanchu" class="myicon" @click="handleDel(record)" />
            </a-tooltip>
          </template>
        </span>
      </a-table>
      <pagination @change="hanleChange" :total="totalNum"></pagination>
    </div>
  </div>
</template>

<script>
import { STable } from '@/components'
import pagination from '@/components/Pagination/Pagination.vue'
import { queryAdminPages, disabledAdmin, deletedAdmin } from '@/api/user-center'

const statusMap = {
  1: {
    status: 'default',
    text: '已创建'
  },
  3: {
    status: 'success',
    text: '已激活'
  },
  2: {
    status: 'warning',
    text: '已邀请'
  },
  4: {
    status: 'error',
    text: '已禁用'
  }
}
export default {
  name: 'Admin',
  components: {
    STable,
    pagination
  },
  data() {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: { 
        pageNo: 1, 
        size: 10 
      },
      // 表头
      columns: [
        {
          title: '邮箱',
          dataIndex: 'email',
          width: 150
        },
        {
          title: '用户名',
          dataIndex: 'username',
          width: 150
        },
        {
          title: '组织',
          dataIndex: 'userOrgName',
          needTotal: true,
          width: 100
        },
        {
          title: '用户组',
          dataIndex: 'userGroup',
          needTotal: true,
          width: 100
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 150
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          width: 100
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: 100
        }
      ],
      pagination: {
        pageSize: 10
      },
      // 总条数
      totalNum: 0,
      tableData: []
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      // let i = (this.queryParam.pageNo - 1) * this.queryParam.size
      // let count =
      //   this.queryParam.size * this.queryParam.pageNo > 100 ? 100 : this.queryParam.size * this.queryParam.pageNo
      // let list = []
      // for (i; i < count; i++) {
      //   let obj = {
      //     username: '0-' + (i + 1),
      //     email: '12345-' + (i + 1),
      //     roleName: '分（子）公司市场',
      //     userGroup: '哈哈哈',
      //     userGroup1: '嗯嗯嗯',
      //     updatedAt: '2019-03-16 05:57:55',
      //     status: 1,
      //     id: 1 + i
      //   }
      //   list.push(obj)
      // }
      // this.tableData = list
      const ret = await queryAdminPages({
        pageQueryParam: {
          pageNo: this.queryParam.pageNo,
          size: this.queryParam.size
        }
      })
      if (ret && ret.status == 200) {
        const resData = ret.data && ret.data.data
        this.tableData = resData && resData.list || []
        this.totalNum = resData && resData.total || 0
      }
    },
    // 邀请管理员
    handleAdd() {
      this.$router.push({ path: '/system/admin/create' })
    },
    // 禁用
    handleDisable(record) {
      this.$confirm({
        title: '确认禁用该管理员?',
        content: '禁用之后不可复原',
        onOk() {
          return new Promise((resolve, reject) => {
            disabledAdmin({ userId: record.userId }).then(res => {
              if (res && res.status == 200) {
              }
              resolve()
            }).catch(error => {
              console.error(error)
              // reject()
            })
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {}
      })
    },

    // 删除
    handleDel(record) {
      this.$confirm({
        title: '确认要删除吗?',
        content: '删除之后不可复原',
        onOk() {
          return new Promise((resolve, reject) => {
            // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
            deletedAdmin({ userId: record.userId }).then(res => {
              if (res && res.status == 200) {
              }
              resolve()
            }).catch(error => {
              console.error(error)
              // reject()
            })
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {}
      })
    },
    hanleChange(event) {
      this.queryParam.pageNo = event[0]
      this.queryParam.size = event[1]
      // table 默认每页条数
      this.pagination.pageSize = event[1]
      this.fetchData()
    }
  }
}
</script>
<style lang="less" scoped>
.adminBox {
  width: 100%;
  height: 100%;
  .tableBox {
    width: 100%;
    height: 100%;
    background-color: @backgroudColor;
    /deep/ .ant-table-pagination {
      display: none;
    }
  }
  .myicon {
    margin-right: 10px;
    color: #666666;
  }
}
</style>
