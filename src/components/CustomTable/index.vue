<template>
  <div class="table-wrapper">
    <a-alert v-if="showAlert" showIcon style="margin-bottom: 16px">
      <template slot="message">
        <span style="margin-right: 12px">已选择: <a style="font-weight: 600">{{ this.selectedRows.length }}</a></span>
      </template>
    </a-alert>
    <a-table
      :columns="columns"
      :key="rowKey"
      :pagination="showPagination"
      :loading="showLoading"
      :components="components"
      :rowSelection="rowSelection"
      :dataSource="localDataSource"
      v-bind="{...$attrs, ...$props}"
      slots
      bordered
    >
      <!-- <a slot="description" slot-scope="text">{{ text }}</a> -->
      <!-- Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) -->
    
      <!-- <template slot="status" slot-scope="text">{{ text }}</template> -->
      <template v-for="(val, slot) in $slots" :slot="slot"><a :key="slot">{{ this.$slots[slot] }}</a></template>
    </a-table>
  </div>
</template>

<script>
import Vue from 'vue'
import { get } from 'lodash'
import Sortable from 'sortablejs'
import VueDraggableResizable from 'vue-draggable-resizable' // 列表头部可伸缩

Vue.component('vue-draggable-resizable', VueDraggableResizable)

export default {
  name: 'CustomTable',
  props: {
    rowKey: {
      type: [String, Function],
      default: 'key'
    },
    data: {
      type: Function,
      required: true
    },
    columns: {
      type: Array,
      default: () => []
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showSizeChanger: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'default'
    },
    alert: {
      type: [Object, Boolean],
      default: null
    },
    /** @Deprecated */
    showAlertInfo: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    pageURI: {
      type: Boolean,
      default: false
    },
    showDragTable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showLoading: false,
      needTotalList: [],

      selectedRows: [],
      selectedRowKeys: [],

      localDataSource: [],
      localPagination: Object.assign({}, this.pagination),
      showAlert: false
    }
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.onChangeSelectRows(selectedRowKeys, selectedRows)
        },
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name
          }
        })
      }
    }
  },
  created() {
    this.showAlert = (typeof this.alert === 'object' && this.alert !== null && this.alert.show) && typeof this.rowSelection.selectedRowKeys !== 'undefined' || this.alert
    this.initColumns()
    const { pageNo } = this.$route.params
    const currentPageNum = this.pageNum
    const currentPageSize = this.pageSize
    this.pageParams =
      this.showPagination &&
      Object.assign({}, this.pageParams, {
        current: currentPageNum,
        pageSize: this.currentPageSize
      })

    this.loadData()
  },

  mounted() {
    console.info('this.scopedSlots')
    console.info(this.$slots)
    console.info(this.$props)
    console.info(this.scopedSlots)
    this.initDragTable()
  },
  watch: {
    'localPagination.current'(val) {},
    pageNum(val) {
      Object.assign(this.localPagination, {
        current: val
      })
    },
    pageSize(val) {
      Object.assign(this.localPagination, {
        pageSize: val
      })
    },
    showSizeChanger(val) {
      Object.assign(this.localPagination, {
        showSizeChanger: val
      })
    }
  },
  methods: {
    /**
     * 多选框
     */
    onChangeSelectRows(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
    },
    getCheckboxProps() {},

    /**
     * 用于更新已选中的列表数据 total 统计
     * @param selectedRowKeys
     * @param selectedRows
     */
    updateSelect (selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
      this.selectedRowKeys = selectedRowKeys
      const list = this.needTotalList
      // this.needTotalList = list.map(item => {
      //   return {
      //     ...item,
      //     total: selectedRows.reduce((sum, val) => {
      //       const total = sum + parseInt(get(val, item.dataIndex))
      //       return isNaN(total) ? 0 : total
      //     }, 0)
      //   }
      // })
    },

    /**
     * 清空 table 已选中项
     */
    clearSelected() {
      if (this.rowSelection) {
        this.rowSelection.onChange([], [])
        this.updateSelect([], [])
      }
    },

    /**
     * 是否使列表可可拖拽
     */
    initDragTable() {
      if (this.showDragTable) {
        const dragTableTBody = document.querySelector('.ant-table-tbody')
        new Sortable(dragTableTBody, {
          animation: 150, // ms, number 单位：ms，定义排序动画的时间
          dragClass: 'sortable-drag', // 正在被拖拽中的css类名
          easing: 'cubic-bezier(1, 0, 0, 1)', // Easing for animation. Defaults to null. See https://easings.net/ for examples.
          // handle: '.my-handle', // 格式为简单css选择器的字符串，使列表单元中符合选择器的元素成为拖动的手柄，只有按住拖动手柄才能使列表单元进行拖动
          onUpdate: function(event) {
            console.info(event)
          },
          onEnd: function(event) {
            // console.error(event)
          }
        })
      }
    },

    /**
     * 是否使列表可伸缩
     */
    initColumns() {
      const columns = this.columns
      const draggingMap = {}
      columns.forEach(col => {
        draggingMap[col.key] = col.width
      })
      const draggingState = Vue.observable(draggingMap)
      this.components = {
        header: {
          cell: (h, props, children) => {
            let thDom = null
            const { key, ...restProps } = props
            const col = columns.find(col => {
              const k = col.dataIndex || col.key
              return k === key
            })
            if (col && !col.width) {
              return <th {...restProps}>{children}</th>
            }
            const onDrag = x => {
              draggingState[key] = 0
              col.width = Math.max(x, 1)
            }

            const onDragstop = () => {
              draggingState[key] = thDom.getBoundingClientRect().width
            }
            const colWidth = col && col.width || 20
            const colKey = col && col.key
            return (
              <th {...restProps} v-ant-ref={r => (thDom = r)} width={colWidth} class="resize-table-th">
                {children}
                <vue-draggable-resizable
                  key={colKey}
                  class="table-draggable-handle"
                  w={10}
                  x={draggingState[key] || colWidth}
                  z={1}
                  axis="x"
                  draggable={true}
                  resizable={false}
                  onDragging={onDrag}
                  onDragstop={onDragstop}
                ></vue-draggable-resizable>
              </th>
            )
          }
        }
      }
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    loadData(pagination, filters, sorter) {
      this.showLoading = true
      const parameters = Object.assign(
        {
          pageNo:
            (pagination && pagination.current) || (this.showPagination && this.localPagination.current) || this.pageNum,
          pageSize:
            (pagination && pagination.pageSize) ||
            (this.showPagination && this.localPagination.pageSize) ||
            this.pageSize
        },
        (sorter && sorter.field && { sortField: sorter.field }) || {},
        (sorter && sorter.order && { sortOrder: sorter.order }) || {},
        { ...filters }
      )

      console.log('parameter', parameters)
      const result = this.data(parameters)
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result.then(r => {
          this.localPagination =
            (this.showPagination &&
              Object.assign({}, this.localPagination, {
                current: r.pageNo, // 返回结果中的当前分页数
                total: r.totalCount, // 返回结果中的总记录数
                pageSize: (pagination && pagination.pageSize) || this.localPagination.pageSize
              })) || false

          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (r.data.length === 0 && this.showPagination && this.localPagination.current > 1) {
            this.localPagination.current--
            this.loadData()
            return false
          }

          // 这里用于判断接口是否有返回 r.totalCount 且 this.showPagination = true 且 pageNo 和 pageSize 存在 且 totalCount 小于等于 pageNo * pageSize 的大小
          // 当情况满足时，表示数据不满足分页大小，关闭 table 分页功能
          if (this.showPagination && r.totalCount <= r.pageNo * this.localPagination.pageSize) {
            this.localPagination.hideOnSinglePage = true
          } else {
            this.localPagination = false
          }

          this.localDataSource = r.data // 返回结果中的数组数据
          this.showLoading = false
          // try {
          //   if (this.showPagination && r.totalCount <= (r.pageNo * this.localPagination.pageSize))) {
          //     this.localPagination.hideOnSinglePage = true
          //   }
          // } catch {
          //   console.info(e)
          //   this.localPagination = false
          // }
        })
      }
    }
  }
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
