<template>
  <div class="view-container">
    <div class="query-box content-shadow">
      <a-form :form="queryForm" layout="inline">
        <a-form-item label="任务类型：">
          <a-select placeholder="请选择" @change="handleSelectChange1" v-model="queryForm.etlTaskType">
            <a-select-option value="male">male</a-select-option>
            <a-select-option value="female">female</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="最近执行时间：" v-model="queryForm.lastExecTimeStart">
          <a-date-picker />
        </a-form-item>
        <a-form-item label="最近执行状态：">
          <a-select
            placeholder="请选择"
            @change="handleSelectChange2"
            v-model="queryForm.lifecycleStatus"
          >
            <a-select-option value="male">male</a-select-option>
            <a-select-option value="female">female</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="任务状态：">
          <a-select placeholder="请选择" @change="handleSelectChange3" v-model="queryForm.runStatus">
            <a-select-option value="male">male</a-select-option>
            <a-select-option value="female">female</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </div>
    <div class="add-search-box">
      <div class="add-btn-box">
        <div class="add-btn" @click="createEtlData()">
          <a-icon type="plus" />ETL任务
        </div>
        <div class="add-btn" @click="createRealtimeData()">
          <a-icon type="plus" />实时数据任务
        </div>
        <div class="add-btn" @click="createMainTable()">
          <a-icon type="plus" />主表任务
        </div>
      </div>
      <div class="search-box">
        <a-input class="search-input" v-model="queryForm.taskName" placeholder="搜索任务名称">
          <a-icon slot="prefix" type="search" :style="{ color: '#999999' }" />
        </a-input>
      </div>
    </div>

    <div class="table-data-box content-shadow">
      <a-table ref="table" size="default" :data-source="tableData" :pagination="false">
        <a-table-column title="ID" rowKey="taskId" data-index="taskId" key="taskId" />
        <a-table-column title="任务类型" rowKey="taskTypeText" data-index="taskTypeText" key="taskTypeText" />
        <a-table-column title="任务名称" rowKey="taskName">
          <template slot-scope="record">
            <a href="javascript:void(0);" @click="handleCheck(record.taskId)">{{ record.taskName }}</a>
          </template>
        </a-table-column>
        <a-table-column
          title="数据源名"
          rowKey="dataSourceName"
          data-index="dataSourceName"
          key="dataSourceName"
        />
        <a-table-column title="数据表名" rowKey="tableName" data-index="tableName" key="tableName" />
        <a-table-column title="定时规则" rowKey="timeRule" data-index="timeRule" key="timeRule" />
        <a-table-column
          title="最近执行时间"
          rowKey="updateTime"
          data-index="updateTime"
          key="updateTime"
        />
        <a-table-column
          title="最近执行状态"
          rowKey="runStatusText"
          data-index="runStatusText"
          key="runStatusText"
        />
        <a-table-column
          title="任务状态"
          rowKey="lifecycleStatusText"
          data-index="lifecycleStatusText"
          key="lifecycleStatusText"
        />
        <a-table-column title="操作" rowKey="action">
          <template slot-scope="record">
            <a-tooltip>
              <template slot="title">禁用</template>
              <my-icon type="icontingyong" class="myicon" @click="handlePause(record)" />
            </a-tooltip>
            <a-tooltip>
              <template slot="title">启用</template>
              <my-icon type="iconqiyong" class="myicon" @click="handlePaly(record)" />
            </a-tooltip>
            <a-tooltip>
              <template slot="title">编辑</template>
              <my-icon type="iconbianji" class="myicon" @click="handleEdit(record)" />
            </a-tooltip>
            <a-tooltip>
              <template slot="title">重置</template>
              <my-icon type="iconzhongzhi" class="myicon" @click="handleReset(record)" />
            </a-tooltip>

            <a-tooltip>
              <template slot="title">单次执行</template>
              <my-icon type="icondancizhihang" class="myicon" @click="handleOnceRun(record)" />
            </a-tooltip>

            <a-tooltip>
              <template slot="title">设置</template>
              <my-icon type="iconshezhi" class="myicon" @click="handleSetting(record)" />
            </a-tooltip>

            <a-tooltip>
              <template slot="title">删除</template>
              <my-icon type="iconshanchu" class="myicon" @click="handleDelete(record)" />
            </a-tooltip>
          </template>
        </a-table-column>
      </a-table>
      <pagination @change="handleChange" :total="total"></pagination>
    </div>
  </div>
</template>

<script>
import { etlTaskList } from '@/api/data'
import pagination from '@/components/Pagination/Pagination.vue'
const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '已激活'
  },
  2: {
    status: 'success',
    text: '成功'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}
export default {
  components: {
    pagination
  },
  data() {
    return {
      queryForm: {
        pageQueryParam: {
          pageNo: 0,
          size: 10
        },
        etlTaskType: 1,
        lastExecTimeStart: '',
        lastExecTimeEnd: '',
        lifecycleStatus: 2,
        runStatus: 4,
        taskName: ''
      },
      tableData: [],
      total: 0,
      pagination: {
        current: 1,
        pageSize: 10
      }
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
      this.tableSpinning = true
      this.menuSpinning = true
      let params = { ...this.queryForm }
      const res = await etlTaskList(params)
      this.tableSpinning = false
      if (res.status == 200 && res.data) {
        const tableData = res.data.data.list
        tableData.forEach(item => {
          if (item.taskType == 1) item.taskTypeText = 'ETL任务' 
          if (item.taskType == 5) item.taskTypeText = '实时数据任务' 
          if (item.taskType != 1 && item.taskType != 5) item.taskTypeText = '主表任务' 
 
          if (item.runStatus == 1) item.runStatusText = '草稿' 
          if (item.runStatus == 2) item.runStatusText = '正常' 
          if (item.runStatus == 3) item.runStatusText = '暂停' 
          if (item.runStatus == 4) item.runStatusText = '失败' 

          if (item.lifecycleStatus == 1) item.lifecycleStatusText = '未进行' 
          if (item.lifecycleStatus == 2) item.lifecycleStatusText = '运行中' 
          if (item.lifecycleStatus == 3) item.lifecycleStatusText = '失败' 
          if (item.lifecycleStatus == 4) item.lifecycleStatusText = '成功' 
        })
        this.tableData = tableData || []
        this.total = res.data.data.total

        console.log(this.tableData, 'this.tableData')
      }
    },
    handleSelectChange1() {},
    handleSelectChange2() {},
    handleSelectChange3() {},
    // 创建ETL任务
    createEtlData() {
      this.$router.push({ path: '/data/etl-data-insert/create-etl-data' })
    },
    // 创建实时数据任务
    createRealtimeData() {
      this.$router.push({ path: '/data/etl-data-insert/create-realtime-data' })
    },
    // 创建主表任务
    createMainTable() {
      this.$router.push({ path: '/data/etl-data-insert/create-main-table' })
    },
    handleCheck(item) {
      console.log(item)
      this.$router.push({ path: '/data/etl-data-insert/detail' })
    },
    handlePause(item) {},
    handlePaly(item) {},
    handleEdit(item) {},
    handleReset(item) {},
    handleOnceRun(item) {},
    handleSetting(item) {},
    handleDelete(item) {},
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
.query-box {
  height: 60px;
  background: #fff;
  padding: 0 16px;
  display: flex;
  align-items: center;
  /deep/ .ant-form.ant-form-inline {
    display: flex;
    align-items: center;
    /deep/ .ant-row.ant-form-item {
      display: flex;
      align-items: center;
      /deep/ .ant-select {
        width: 121px;
        /deep/ .ant-select-selection {
          border: none;
          border-radius: 0;
          border-bottom: 1px solid #d9d9d9;
        }
      }
      /deep/ .ant-calendar-picker {
        width: 198px;
        /deep/ .ant-calendar-picker-input.ant-input {
          border: none;
          border-radius: 0;
          border-bottom: 1px solid #d9d9d9;
        }
      }
    }
  }
}
.add-search-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .add-btn-box {
    display: flex;
    align-items: center;
    height: 64px;
    .add-btn {
      display: inline-block;
      height: 32px;
      font-size: @fontSize1;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      background: @primary;
      border-radius: 15px;
      padding: 6px 23px 9px 22px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .search-box {
    display: flex;
    justify-content: flex-end;
    .search-input {
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
}

.table-data-box {
  background: #fff;
}
.myicon {
  margin-right: 10px;
}
</style>
