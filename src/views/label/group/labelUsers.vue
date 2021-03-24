<template>
  <div class="label-users">
    <a-card class="head-card">
      <a-card-grid :hoverable="false">
        <a-card-meta title="分群名" description="高购买力人群">
          <a-avatar slot="avatar">
            <my-icon type="iconfenqunmingcheng" />
          </a-avatar>
        </a-card-meta>
      </a-card-grid>

      <a-card-grid :hoverable="false">
        <a-card-meta title="用户数" description="125">
          <a-avatar slot="avatar">
            <my-icon type="iconyonghurenshu" />
          </a-avatar>
        </a-card-meta>
      </a-card-grid>

      <a-card-grid :hoverable="false">
        <a-card-meta title="创建时间" description="2020-05-01 12:28:43">
          <a-avatar slot="avatar">
            <my-icon type="iconchuangjianshijian" />
          </a-avatar>
        </a-card-meta>
      </a-card-grid>
    </a-card>

    <a-card
      style="width:100%"
      :tab-list="tabList"
      :active-tab-key="key"
      class="card-table"
      @tabChange="key => onTabChange(key, 'key')"
    >
      <span slot="customRender" slot-scope="item">
        <a-icon type="home" />
        {{ item.key }}
      </span>
      <a slot="extra" href="#">下载</a>
      <!-- {{ contentList[key] }} -->
      <template v-if="key === 'tab1'">
        <p>添加用户标签</p>
      </template>
      <template v-else>
        <a-tree-select
          class="line-down"
          v-model="value"
          style="width: 270px; margin: 0 0 18px 13px;"
          :tree-data="treeData"
          tree-checkable
          :show-checked-strategy="SHOW_PARENT"
          search-placeholder="Please select"
        />
        <a-table
          ref="table"
          size="default"
          rowKey="index"
          :columns="columns"
          :data-source="tableData"
          :pagination="pagination"
          :loading="loading"
        ></a-table>
        <pagination @change="hanleChange" :pageSizeOptions="sizes" :total="total" v-show="total>0" />
      </template>
    </a-card>
  </div>
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
import { STable } from '@/components'
import pagination from '@/components/Pagination/Pagination.vue'

const SHOW_PARENT = TreeSelect.SHOW_PARENT
export default {
  name: 'LabelUsers',
  components: {
    STable,
    pagination
  },
  data() {
    return {
      treeData: [
        {
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-0',
              key: '0-0-0'
            }
          ]
        },
        {
          title: 'Node2',
          value: '0-1',
          key: '0-1',
          children: [
            {
              title: 'Child Node3',
              value: '0-1-0',
              key: '0-1-0',
              disabled: true
            },
            {
              title: 'Child Node4',
              value: '0-1-1',
              key: '0-1-1'
            },
            {
              title: 'Child Node5',
              value: '0-1-2',
              key: '0-1-2'
            }
          ]
        }
      ],
      tabList: [
        {
          key: 'tab1',
          name: '图表',
          scopedSlots: { tab: 'customRender' }
        },
        {
          key: 'tab2',
          name: '列表',
          tab: 'tab2'
        }
      ],
      contentList: {
        tab1: 'content1',
        tab2: 'content2'
      },
      key: 'tab1',
      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
          width: 100
        },
        {
          title: '会员性别',
          dataIndex: 'email',
          width: 150,
          ellipsis: true
        },
        {
          title: '购买品类偏好',
          dataIndex: 'roleNames',
          width: 150,
          ellipsis: true
        },
        {
          title: '7天交易额',
          dataIndex: 'roleName',
          width: 100
        },
        {
          title: '总交易额',
          dataIndex: 'createTime',
          width: 150
        },
        {
          title: '首次消费日期',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          width: 100
        }
      ],
      tableData: [],
      loading: false,
      sizes: ['10', '20', '30', '40', '50'],
      pagination: {
        pageSize: 10
      },
      total: 20,
      value: ['0-0-0'],
      SHOW_PARENT
    }
  },
  created() {},
  mounted() {},
  methods: {
    onTabChange(key, type) {
      console.log(key, type)
      this[type] = key
    },

    hanleChange(value) {}
  }
}
</script>

<style lang="less" scoped>
@primaryColor: #4B8DF9;

.label-users {
  .ant-card-contain-grid {
    .ant-card-body {
      padding: 51px 0;
      .ant-card-grid {
        padding: 0 0 0 67px !important;
        width: 15%;
        text-align: left;
        border: none;
        box-shadow: none;
        .ant-card-meta {
          .ant-card-meta-avatar {
            .ant-avatar  {
              background-color: transparent;
              .anticon {
                font-size: 32px;
                color: #999999;
              }
            }
          }
          .ant-card-meta-detail {
            .ant-card-meta-title {
              height: 12px;
              line-height: 12px;
              font-size: 12px;
              color: #666666;
            }
            .ant-card-meta-description {
              height: 16px;
              line-height: 16px;
              font-size: 16px;
              font-weight: bold;
              color: @fontColor;
            }
          }
        }
      }
    }
  }
  .card-table {
    margin-top: 12px;
    .ant-card-head {
      height: 41px;
      padding: 0 0 0 19px;
      .ant-card-head-wrapper {
        position: absolute;
        top: 13px;
        right: 19px;
        height: 14px;
        line-height: 14px;
        font-weight:400;
        font-size:14px;
        a {
          color: #999999;
        }
      }
      .ant-tabs {
        .ant-tabs-bar {
          .ant-tabs-nav-wrap {
            .ant-tabs-nav-scroll {
              .ant-tabs-nav {
                .ant-tabs-tab {
                  padding: 14px 16px;
                  font-size:14px;
                  color: #999999;
                }
                .ant-tabs-tab-active {
                  color: @primary;
                  .anticon {
                    color: @primary;
                  }
                }
              }
            }
          }
        }
      }
    }
    .ant-card-body {
      padding: 24px 0;
      p {
        margin: 0;
        padding-left: 19px;
        color: #333;
        font-size:14px;
      }
    }
  }
}
</style>
