<template>
  <div class="view-container">
    <a-tabs default-active-key="1" @change="switchTab">
      <a-tab-pane key="1" tab="结果集列表">
        <div class="search-box">
          <a-input class="search-input" v-model="searchValue" placeholder="搜索数据结果集名称">
            <a-icon slot="prefix" type="search" :style="{ color: '#999999' }" />
          </a-input>
        </div>
        <div class="content-box">
          <div class="left-content content-shadow">
            <div class="left-header" @click="handleAdd(item,index)">
              <my-icon type="iconchuangjian_xianyuan1" />创建数据分组
            </div>
            <ul class="left-list">
              <li
                :key="item.cdpTableCategoryCode"
                v-for="(item, index) in sideMenuList"
                :class="{'selected': index == selectIndex}"
                @click="handleSelect(item,index)"
              >
                <span v-if="editIndex != index">{{ item.cdpTableCategoryName }}</span>
                <div class="tools">
                  <my-icon type="iconbianji" @click="handleEdit(item,index)" />
                  <my-icon type="iconshanchu" @click="handleDel(item,index)" />
                </div>
                <div class="item-inputbox" v-if="editIndex == index">
                  <input
                    :ref="'input'+ index"
                    type="text"
                    class="tree-event"
                    v-model="inputVal"
                    @blur="handleBlur"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div class="right-content content-shadow">
            <a-table :data-source="tableData" :pagination="false">
              <a-table-column title="名称" rowKey="cdpTableName">
                <template slot-scope="record">
                  <a
                    href="javascript:void(0);"
                    @click="handleCheck(record.cdpTableId)"
                  >{{ record.cdpTableName }}</a>
                </template>
              </a-table-column>
              <a-table-column
                title="数据属性"
                rowKey="tableNature"
                data-index="tableNature"
                key="tableNature"
              />
              <a-table-column title="来源" rowKey="dataSourceType">
                <template slot-scope="record">
                  <img
                    class="data-type-icon"
                    v-if="record.dataSourceType == 1"
                    src="../../../assets/mysql.jpg"
                    alt
                  />
                  <img
                    class="data-type-icon"
                    v-if="record.dataSourceType == 3"
                    src="../../../assets/sql.jpg"
                    alt
                  />
                  <img
                    class="data-type-icon"
                    v-if="record.dataSourceType == 5"
                    src="../../../assets/kafka.jpg"
                    alt
                  />
                </template>
              </a-table-column>
              <a-table-column title="上次同步时间" data-index="lastExecTime" key="lastExecTime" />
              <a-table-column title="操作" rowKey="action">
                <template slot-scope="record">
                  <a-tooltip>
                    <template slot="title">预览</template>
                    <my-icon
                      type="iconview"
                      class="myicon"
                      @click="handlePreview(record.cdpTableId)"
                    />
                  </a-tooltip>
                  <!-- <a-divider type="vertical" /> -->
                  <a-tooltip>
                    <template slot="title">设置</template>
                    <my-icon
                      type="iconshezhi"
                      class="myicon"
                      @click="handleSetting(record.cdpTableId)"
                    />
                  </a-tooltip>
                </template>
              </a-table-column>
            </a-table>
            <pagination @change="handleChange" :total="total"></pagination>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="统一标识表">Content of Tab Pane 2</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { tableNatureEnumInfo, tableGroupList, cdpTableList } from '@/api/data'
import pagination from '@/components/Pagination/Pagination.vue'
export default {
  components: {
    pagination
  },
  data() {
    return {
      searchValue: '',
      menuSpinning: false,
      sideMenuList: [],
      queryParam: {
        pageNo: 1,
        size: 10
      },
      tableNatureList: [], // 列表筛选
      tableSpinning: false,
      tableData: [],
      total: 0,
      pagination: {
        current: 1,
        pageSize: 10
      },
      selectIndex: 0,
      inputVal: '',
      editIndex: -1
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.tableSpinning = true
      this.menuSpinning = true
      const ret = await tableGroupList()
      this.menuSpinning = false
      if (ret.status == 200 && ret.data) {
        const retData = ret.data.data
        this.sideMenuList = retData || []
      }
      let params = {
        cdpTableName: this.searchValue,
        pageQueryParam: this.queryParam,
        tableNatureList: this.tableNatureList
      }
      const res = await cdpTableList(params)
      console.log(res, 'res')
      this.tableSpinning = false
      if (res.status == 200 && res.data) {
        const tableData = res.data.data.list
        this.tableData = tableData || []
        this.total = res.data.data.total

        console.log(this.tableData, 'this.tableData')
      }
    },
    switchTab() {},
    handleAdd(item, index) {
      this.selectIndex = index
    },
    handleSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
    handleEdit(item, index) {
      this.editIndex = index
      this.inputVal = item.name
      this.$nextTick(() => {
        this.$refs['input' + index][0].focus()
      })
    },
    // 失焦处理
    handleBlur() {
      this.editIndex = -1
    },
    handleCheck(id) {
      console.log('id', id)
      this.$router.push({ path: '/data/etl-data-result/detail' })
    },
    handlePreview(id) {
      console.log('id', id)
    },
    handleSetting(id) {
      console.log('id', id)
    },
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
  width: 100%;
  margin-bottom: 18px;
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

.content-box {
  width: 100%;
  height: 100%;
  .left-content {
    float: left;
    width: 250px;
    height: 100%;
    background-color: #ffffff;
    .left-header {
      cursor: pointer;
      width: 100%;
      padding-left: 14px;
      height: 57px;
      line-height: 57px;
      color: @primary;
      border-bottom: solid 1px @borderColor;
      i {
        color: @primary;
        margin-right: 10px;
      }
    }
    .left-list {
      list-style: none;
      padding-left: 0;
      li {
        .item-inputbox {
          display: inline-block;

          & input {
            height: 30px;
            width: 140px;
            border: 0;
            outline: none;
            color: @fontColor;
            background: transparent;
            border-bottom: 1px solid @borderColor;
            text-align: left;
            font-weight: normal;
          }
        }
        .tools {
          display: none;
          float: right;
          i {
            cursor: pointer;
            margin-right: 6px;
            &:last-child {
              margin-right: 0;
            }
            &:hover {
              color: @primary;
            }
          }
        }
        &:hover {
          background-color: #f7f7f7;
          .tools {
            display: inline-block;
          }
        }
        &:first-child {
          margin-top: 8px;
        }
        padding: 0 20px 0 35px;
        height: 40px;
        line-height: 40px;
        font-weight: 400;
        cursor: pointer;
        box-sizing: border-box;
        border-left: 2px solid transparent;
      }
      .selected {
        border-left: 2px solid @primary;
        background-color: rgba(76, 142, 250, 0.1);
        &:hover {
          background-color: rgba(76, 142, 250, 0.1);
        }
      }
    }
  }
  .right-content {
    float: left;
    width: calc(~'100% - 266px');
    height: 100%;
    background-color: #ffffff;
    margin-left: 16px;
  }
  .myicon {
    margin-right: 10px;
  }
  .data-type-icon {
    height: 24px;
  }
}
</style>
