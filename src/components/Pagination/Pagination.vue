<template>
  <div class="pagination clearfix">
    <dir class="left">
      <p class="fl">每页显示</p>
      <a-select
        class="fl"
        :default-value="defaultPageSize"
        style="width: 60px;margin-top: -4px;"
        @change="handleChange"
      >
        <a-select-option
          :value="size"
          :key="index"
          v-for="(size,index) in pageSizeOptions"
        >{{ size }}</a-select-option>
      </a-select>
      <p
        class="fl"
      >条 | 共 {{ pages }} 页（ 当前显示 {{ left_number }} ~ {{ right_number }} 行 ，共 {{ total }} 行 )</p>
    </dir>
    <div class="right">
      <a-pagination
        v-if="total"
        :current="current"
        :total="total"
        :pageSize="pageSize"
        :pageSizeOptions="pageSizeOptions"
        @change="hanleClick"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 47,
      required: false
    },
    defaultPageSize: {
      type: Number,
      default: 10,
      required: false
    },
    pageSizeOptions: {
      type: Array,
      default: () => ['10', '20', '30', '40', '50']
    }
  },
  data() {
    return {
      // 总页数
      pages: Math.ceil(this.total / this.defaultPageSize),
      // 当前页数
      current: 1,
      // 默认条数
      pageSize: this.defaultPageSize,
      left_number: 1,
      right_number: 10
    }
  },
  watch: {
    pageSize(val) {
      this.setNumber(val, 1)
    },
    current(val) {
      this.setNumber(val, 2)
    },
    total(val) {
      this.pages = Math.ceil(this.total / this.defaultPageSize)
      if (val < this.defaultPageSize) {
        this.right_number = val
      }
    }
  },
  methods: {
    handleChange(value) {
      this.pageSize = Number(value)
      this.current = 1
      this.$emit('change', [this.current, this.pageSize])
    },
    hanleClick(page, pageSize) {
      this.current = page
      this.$emit('change', [page, pageSize])
    },
    setNumber(val, type) {
      if (type == 2) {
        if (val == 1) {
          this.left_number = 1
        } else {
          this.left_number = (val - 1) * this.pageSize + 1
        }
        this.right_number = val * this.pageSize > this.total ? this.total : val * this.pageSize
      } else {
        this.right_number = val * this.current > this.total ? this.total : this.current * val
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  margin: 16px 0;
  color: #666666;
  .left {
    float: left;
    padding-left: 28px;
    margin-top: 3px;
  }
  .right {
    float: right;
    margin-right: 15px;
  }
  .fl {
    float: left;
  }
  /deep/ .ant-select-selection {
    border: none;
  }
  /deep/ .ant-select-focused .ant-select-selection,
  .ant-select-selection:focus,
  .ant-select-selection:active {
    box-shadow: none;
  }
  /deep/ .ant-select-selection-selected-value {
    color: #666666;
  }
}
</style>
