<template>
  <a-card :bordered="false">
    <custom-table
      :columns="columns"
      :pagination="true"
      rowKey="key"
      :data="loadData"
      :showDragTable="true"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    >
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
    </custom-table>
  </a-card>
</template>

<script>
import Vue from 'vue'
import Sortable from 'sortablejs'
import CustomTable from '@/components/CustomTable'
import { getRoleList, getServiceList } from '@/api/manage'

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  }
}

export default {
  name: 'StandardList',
  components: {
    'custom-table': CustomTable
    // draggable
  },
  data() {
    return {
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'serial' },
          dataIndex: '#',
          width: 20
        },
        {
          title: '规则编号',
          dataIndex: 'no',
          width: 100
        },
        {
          title: '描述',
          dataIndex: 'description',
          scopedSlots: { customRender: 'description' },
          width: 100
        },
        {
          title: '服务调用次数',
          dataIndex: 'callNo',
          sorter: true,
          needTotal: true,
          customRender: text => text + ' 次',
          width: 100
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          width: 100
        },
        {
          title: '更新时间',
          dataIndex: 'updatedAt',
          sorter: true,
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
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        console.log('loadData.parameter', parameter)
        return getServiceList(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
      },
      // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  mounted() {},
  methods: {}
}
</script>

<style lang="less">
.resize-table-th {
  position: relative;
  .table-draggable-handle {
    position: absolute;
    top: 0px;
    z-index: 1;
    user-select: auto;
    width: 10px;
    height: 100% !important;
    bottom: 0;
    left: auto !important;
    right: -5px;
    cursor: col-resize;
    touch-action: none;
    transform: none !important;
  }
}
</style>
