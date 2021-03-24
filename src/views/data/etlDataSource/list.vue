<template>
  <div class="view-container">
    <div class="search-box clearfix">
      <div class="add-data-source cursor" @click="addDataSource()">
        <a-icon type="link" />
        <span class="ml-10">数据源</span>
      </div>
      <a-input class="search-input" v-model="searchValue" placeholder="搜索数据源名称">
        <a-icon
          class="cursor"
          @click="fetchData(queryParam.pageNo==1)"
          slot="prefix"
          type="search"
          :style="{ color: '#999999' }"
        />
      </a-input>
    </div>
    <div class="table-box content-shadow">
      <a-table :data-source="tableData" :pagination="false">
        <a-table-column
          title="ID"
          rowKey="dataSourceId"
          data-index="dataSourceId"
          key="dataSourceId"
          width="20%"
        />
        <a-table-column
          title="数据源名称"
          rowKey="dataSourceName"
          data-index="dataSourceName"
          key="dataSourceName"
          width="20%"
          ellipsis="true"
        />
        <a-table-column
          title="数据源类型"
          rowKey="dataSourceTypeName"
          data-index="dataSourceTypeName"
          key="dataSourceTypeName"
          width="20%"
          ellipsis="true"
        />
        <a-table-column title="数据库连接" rowKey="jdbcUrl" width="20%" ellipsis="true">
          <template slot-scope="record">
            <span>{{ record.jdbcUrl ? record.jdbcUrl : '-' }}</span>
          </template>
        </a-table-column>
        <a-table-column title="操作" rowKey="action">
          <template slot-scope="record">
            <a-tooltip>
              <template slot="title">编辑</template>
              <my-icon type="iconbianji" class="myicon" @click="handleEdit(record)" />
            </a-tooltip>
            <a-tooltip>
              <template slot="title">删除</template>
              <my-icon type="iconshanchu" class="myicon" @click="handleDel(record.dataSourceId)" />
            </a-tooltip>
          </template>
        </a-table-column>
      </a-table>
      <pagination @change="handleChange" :total="total"></pagination>
    </div>
    <!-- 添加数据源弹框 -->
    <a-modal
      width="60%"
      :title="modalTitle"
      :footer="null"
      :visible="modalVisible"
      :confirm-loading="confirmLoading"
      :bodyStyle="{ overflow: 'hidden',position:'relative',padding:0 }"
      @cancel="handleCancel"
    >
      <a-form
        :form="form"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        style="padding: 50px 24px"
      >
        <a-form-item label="数据源类型" has-feedback>
          <a-select
            v-decorator="['databaseType',{ rules: [{ required: true, message: '请选择数据源类型' }] },]"
            placeholder="数据源类型"
          >
            <a-select-option v-for="item in sourceType" :key="item.code">{{ item.desc }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="数据源名称" has-feedback>
          <a-input
            placeholder="数据源名称"
            v-decorator="['dataSourceName', { rules: [{ required: true, message: '仅支持中英文、数字' }] }]"
          />
        </a-form-item>
        <a-form-item label="连接URL" has-feedback v-if="!isEdit">
          <a-input
            placeholder="连接URL"
            v-decorator="['jdbcUrl', { rules: [{ required: true, message: 'url不能为空' }] }]"
          />
        </a-form-item>
        <a-form-item label="用户名" has-feedback v-if="!isEdit">
          <a-input
            placeholder="用户名"
            v-decorator="['userName', { rules: [{ required: true, message: '用户名不能为空' }] }]"
          />
        </a-form-item>
        <a-form-item label="密码" has-feedback v-if="!isEdit">
          <a-input
            type="password"
            placeholder="密码"
            v-decorator="['password', { rules: [{ required: true, message: '请输入密码' }] }]"
          />
        </a-form-item>
        <a-form-item label="bootstrap.servers" has-feedback v-if="isEdit">
          <a-input
            placeholder="bootstrap.servers"
            v-decorator="['bootstrapServers', { rules: [{ required: true, message: '请输入bootstrap.servers' }] }]"
          />
        </a-form-item>
        <a-form-item label="认证配置" has-feedback v-if="isEdit">
          <a-textarea placeholder="认证配置" v-decorator="['authenticationConfigs']" :rows="4" />
        </a-form-item>
        <a-form-item label="consumer configs" has-feedback v-if="isEdit">
          <a-textarea placeholder="consumer configs" v-decorator="['consumerConfigs']" :rows="4" />
        </a-form-item>
      </a-form>
      <div class="footer-box">
        <a-button type="primary" ghost @click="handleShowDrawer()">测试</a-button>
        <div class="footer-right">
          <div class="cancel-btn" @click="handleCancel()">取消</div>
          <a-button type="primary" @click="handleOk()">确定</a-button>
        </div>
      </div>
      <a-drawer
        :title="false"
        placement="left"
        :closable="false"
        :visible="drawerVisible"
        :get-container="false"
        :wrap-style="{ position: 'absolute' }"
        :drawerStyle="{ backgroundColor: '#ecf8ff' }"
        @close="handleCloseDrawer"
      >
        <h3>测试结果</h3>
        <div>{{ checkResult? checkResult: '等待中...' }}</div>
        <a-button class="drawer-close" type="primary" @click="handleCloseDrawer">关闭</a-button>
      </a-drawer>
    </a-modal>
  </div>
</template>

<script>
import {
  dataSourceList,
  dataSourceType,
  saveDataSource,
  checkDataSource,
  checkEditDataSource,
  deleteDataSource
} from '@/api/data'
import pagination from '@/components/Pagination/Pagination.vue'
export default {
  components: {
    pagination
  },
  data() {
    return {
      isEdit: false,
      dataSourceId: '',
      searchValue: '',
      queryParam: {
        pageNo: 1,
        size: 10
      },
      tableSpinning: false,
      tableData: [],
      total: 0,
      pagination: {
        current: 1,
        pageSize: 10
      },
      modalTitle: '',
      modalVisible: false,
      confirmLoading: false,
      sourceType: [],
      form: this.$form.createForm(this, { name: 'add-data-source' }),
      drawerVisible: false,
      checkResult: ''
    }
  },
  created() {
    this.fetchData()
    this.getDataSourceType()
  },
  methods: {
    async fetchData() {
      this.tableSpinning = true
      let params = {
        dataSourceName: this.searchValue,
        pageQueryParam: this.queryParam
      }
      const res = await dataSourceList(params)
      this.tableSpinning = false
      if (res.status == 200 && res.data) {
        const tableData = res.data.data.list
        this.tableData = tableData || []
        this.total = res.data.data.total
        console.log(this.tableData, 'this.tableData')
      }
    },
    async getDataSourceType() {
      const res = await dataSourceType()
      if (res.status == 200 && res.data) {
        this.sourceType = res.data.data || []
      }
    },
    // 添加数据源
    addDataSource() {
      this.isEdit = false
      this.modalTitle = '连接数据源'
      this.modalVisible = true
    },
    handleOk() {
      console.log(1)
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values, 'values')
          this.confirmLoading = true
          let params = { ...values }
          if (this.isEdit) params.dataSourceId = this.dataSourceId
          saveDataSource(params)
            .then(res => {
              if (res && res.status == 200) {
              }
            })
            .catch(err => {
              console.info(err)
            })
        }
      })
      setTimeout(() => {
        this.modalVisible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel() {
      this.modalVisible = false
    },
    handleShowDrawer() {
      this.drawerVisible = true
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values, 'values')
          this.confirmLoading = true
          if (this.isEdit) {
            checkEditDataSource(values)
              .then(res => {
                if (res && res.status == 200) {
                  this.confirmLoading = false
                  this.checkResult = res.message
                }
              })
              .catch(err => {
                console.info(err)
              })
          } else {
            checkDataSource(values)
              .then(res => {
                if (res && res.status == 200) {
                  this.confirmLoading = false
                  this.checkResult = res.message
                }
              })
              .catch(err => {
                console.info(err)
              })
          }
        }
      })
    },
    handleCloseDrawer() {
      this.drawerVisible = false
    },
    handleEdit(item) {
      console.log(item, 'item')
      this.isEdit = true
      this.dataSourceId = item.dataSourceId
      setTimeout(() => {
        this.form.setFieldsValue({
          databaseType: item.dataSourceType,
          dataSourceName: item.dataSourceName,
          bootstrapServers: item.bootstrapServers,
          authenticationConfigs: item.authenticationConfigs,
          consumerConfigs: item.consumerConfigs
        })
      }, 0)
      this.modalVisible = true
    },
    handleDel(id) {
      let params = {
        dataSourceId: id
      }
      deleteDataSource(params)
        .then(res => {
          this.$message.success('删除成功')
          this.fetchData()
        })
        .catch(err => {
          console.info(err)
        })
    },
    // 分页操作
    handleChange(event) {
      this.queryParam.pageNo = event[0]
      this.queryParam.size = event[1]
      this.pagination.pageSize = event[1] // table 默认每页条数
      this.fetchData()
    }
  }
}
</script>

<style lang="less" scoped>
.search-box {
  .add-data-source {
    float: left;
    width: 120px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    color: #ffffff;
    background-color: @primary;
    border-radius: 15px;
    margin-bottom: 18px;
  }
  .search-input {
    float: right;
    width: 300px;
    height: 32px;
    /deep/ .ant-input {
      border: none;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(221, 221, 221, 1);
      border-radius: 15px;
    }
  }
}
.table-box {
  background-color: #ffffff;
}
.footer-box {
  width: 100% !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  padding: 0 20px 20px 30px;
  .cancel-btn {
    margin-right: 50px;
  }
  .footer-right {
    display: flex;
    align-items: center;
  }
}
.drawer-close {
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -30px;
}
.myicon {
  margin-right: 10px;
}
.ml-10 {
  margin-left: 10px;
}
</style>
