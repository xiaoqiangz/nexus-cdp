<template>
  <div class="label-detail">
    <div class="detail-left">
      <a-input
        class="search-input"
        ref="userNameInput"
        v-model="iptSearchVal"
        placeholder="搜索标签树或节点"
      >
        <a-icon slot="prefix" type="search" />
      </a-input>

      <a-tree
        :expanded-keys="expandedKeys"
        :auto-expand-parent="autoExpandParent"
        :tree-data="treeLabel"
        @expand="onExpand"
      >
        <template slot="title" slot-scope="{ title }">
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span
              style="color: #f50"
            >{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }}</span>
        </template>
      </a-tree>
    </div>
    <div class="detail-right">
      <a-breadcrumb separator=">" class="label-breadcrumb">
        <a-breadcrumb-item>
          <a href>全部标签</a>
        </a-breadcrumb-item>
        <a-breadcrumb-item>基本标签</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="advanced-search">
        <a-button-group>
          <a-button type="primary">
            <a-icon type="left" />批量分类
          </a-button>
          <a-button type="primary">
            <a-icon type="left" />同步画像
          </a-button>
          <a-icon type="setting" />
        </a-button-group>
        <a-input
          class="advanced-search-input"
          ref="userNameInput"
          v-model="iptSearchVal"
          placeholder="搜索标签树或节点"
        >
          <a-icon slot="prefix" type="search" />
        </a-input>
      </div>
      <div class="table-content">
        <a-table
          ref="table"
          size="default"
          rowKey="index"
          :columns="columns"
          :data-source="tableData"
          :pagination="pagination"
          :loading="loading"
        >
          <span slot="action">
            <template></template>
          </span>
        </a-table>
        <pagination @change="hanleChange" :pageSizeOptions="sizes" :total="total"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { STable } from '@/components'
import pagination from '@/components/Pagination/Pagination.vue'
export default {
  name: 'LabelDetail',
  components: {
    STable,
    pagination
  },
  data() {
    return {
      iptSearchVal: '',
      treeLabel: [
        {
          title: '全部标签',
          children: [
            {
              title: '人口属性',
              children: [
                {
                  title: '客户标签'
                },
                {
                  title: '基本属性'
                },
                {
                  title: '会员信息',
                  children: [
                    {
                      title: '星座'
                    },
                    {
                      title: '性别'
                    },
                    {
                      title: '年龄'
                    },
                    {
                      title: '地域',
                      children: [
                        {
                          title: '北京'
                        },
                        {
                          title: '南京'
                        },
                        {
                          title: '上海'
                        }
                      ]
                    }
                  ]
                },
                {
                  title: '购买行为'
                },
                {
                  title: '支付偏好'
                },
                {
                  title: '支付渠道'
                },
                {
                  title: '购买行为'
                }
              ]
            },
            {
              title: '其他标签'
            }
          ]
        }
      ],
      expandedKeys: [],
      autoExpandParent: true,
      columns: [
        {
          title: '标签名                                                            ',
          dataIndex: 'username',
          width: 100
        },
        {
          title: '任务名',
          dataIndex: 'email',
          width: 150,
          ellipsis: true
        },
        {
          title: '创建时间',
          dataIndex: 'roleNames',
          width: 150,
          ellipsis: true
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: 100
        }
      ],
      tableData: [],
      sizes: ['10', '20', '30', '40', '50'],
      pagination: {
        pageSize: 10
      },
      // 总条数
      total: 0,
      loading: false
    }
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    
    hanleChange(value) {}
  }
}
</script>

<style lang="less" scoped>
@primaryColor: #4b8df9;
.label-detail {
  display: flex;
  height: 100%;
  .detail-left {
    width: 380px;
    height: 100%;
    background-color: #ffffff;
    .search-input {
      .anticon {
        color: #999;
      }
      .ant-input {
        color: #999999;
        border: none;
        border-bottom: 1px solid #cccccc;
      }
    }
    padding: 25px 59px 0 30px;
  }
  .detail-right {
    flex: 1;
    margin-left: 20px;
    .label-breadcrumb {
      margin-bottom: 17px;
      font-size: 14px;
      .ant-breadcrumb-link {
        color: #333333;
        font-weight: 600;
        a {
          color: #4c8efa;
        }
      }
      .ant-breadcrumb-separator {
        color: #999999;
      }
    }
    .advanced-search {
      .ant-btn-group {
        button + button {
          margin-left: 10px;
        }
        > .anticon {
          margin-left: 15px;
          color: #4c8efa;
          font-size: 16px;
          cursor: pointer;
        }
      }
      .advanced-search-input {
        float: right;
        width: 300px;
        .ant-input {
          border-radius: 15px;
        }
        .anticon {
          color: #999999;
        }
      }
    }
    .table-content {
      margin-top: 16px;
      height: 100%;
      background-color: #fff;
      border: 1px solid #ffffff;
    }
  }
}
</style>
