<template>
  <div class="label-portrait">
    <div class="top content-shadow">
      <div class="topLeft">
        <div class="userId">
          搜索用户标识：
          <a-select
            default-value="lucy"
            style="width: 300px;"
            @change="handleChange"
            v-model="userId"
            class="underline"
          >
            <a-select-option value="jack">Jack</a-select-option>
          </a-select>
        </div>
        <div class="userContent">
          输入用户内容：
          <a-input
            id="warning"
            class="search-input"
            placeholder="请输入用户内容"
            style="width: 300px"
            v-model="userContent"
          />
        </div>
      </div>
      <div class="topRight">
        <a-button type="primary" shape="round" @click="query">查询</a-button>
      </div>
    </div>
    <div class="list content-shadow">
      <a-table :columns="columns" :data-source="data" :pagination="false">
        <a slot="name" slot-scope="text">{{ text }}</a>
      </a-table>
    </div>
    <div class="card">
      <div class="cardLeft content-shadow">
        <a-card title="已有标签" :headStyle="tstyle">
          <p>人口属性类</p>
          <div class="line" v-for="(item) in arrayName" :key="item.index">
            <a-tag color="cyan" class="tag">{{ item.city }}</a-tag>
          </div>
          <p>用车特征</p>
          <div class="line" v-for="(item) in arrayName" :key="item.index">
            <a-tag color="cyan" class="tag">{{ item.city }}</a-tag>
          </div>
          <p>试驾特征</p>
          <div class="line" v-for="(item) in arrayName" :key="item.index">
            <a-tag color="cyan" class="tag">{{ item.city }}</a-tag>
          </div>
        </a-card>
      </div>
      <div class="cardRight content-shadow">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1">
            <span slot="tab">
              <a-icon type="apple" />画像
            </span>
            <div>
              <a-tag color="#FF683FD1">基本信息</a-tag>
              <a-tag color="#1890ff">消费信息</a-tag>
              <a-tag color="#52c41a">销售驾驶</a-tag>
              <a-tag color="#faad14">其他信息</a-tag>
            </div>
            <div class="info">
              <a-tag class="tag tagInfoOne">
                <i class="tagTop">性别</i>
                <i class="tagBottom">男</i>
              </a-tag>
            </div>
            <div class="info">
              <a-tag class="tag tagInfoTwo">
                <i>省份</i>
                <i class="tagBottom">北京</i>
              </a-tag>
            </div>
            <div class="info">
              <a-tag class="tag tagInfoThree">
                <i>123</i>
                <i class="tagBottom">22222</i>
              </a-tag>
            </div>
            <div class="info">
              <a-tag class="tag tagInfoFour">
                <i>123</i>
                <i class="tagBottom">22222</i>
              </a-tag>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2">
            <span slot="tab">
              <a-icon type="android" />行为
            </span>
            Tab 2
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '客户ID（主）',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '姓名',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '手机号',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'OPENID',
    dataIndex: 'openid',
    key: 'openid'
  },
  {
    title: '邮箱',
    dataIndex: 'eamil',
    key: 'eamil'
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    phone: '18879089099',
    openid: 22,
    eamil: 'yuanlle@163.com'
  }
]
export default {
  name: 'LabelPortrait',
  data() {
    return {
      data,
      columns,
      tstyle: { height: '14px' },
      arrayName: [
        { name: 1, city: 'shanghai' },
        { name: 2, city: 'shanghai' },
        { name: 3, city: 'shanghai' },
        { name: 4, city: 'shanghai' }
      ],
      userId: '',
      userContent: ''
    }
  },
  methods: {
    handleChange() {},
    query() {
      console.log(11111)
    }
  }
}
</script>
<style lang="less">
.label-portrait {
  .top {
    padding: 20px 33px;
    background: #ffffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .topLeft {
      display: flex;
      .userId {
        margin-right: 100px;
        .underline {
          .ant-select-selection {
            color: #999999;
            border: none;
            border-bottom: 1px solid #cccccc;
          }
        }
      }
      .userContent {
        .search-input {
          border: none !important;
          border-bottom: 1px solid #cccccc !important;
        }
      }
    }
  }
  .list {
    margin: 10px 0;
    background: #ffffffff;
  }
  .card {
    display: flex;
    .cardLeft {
      width: 39%;
      .line {
        display: inline-block;
        margin-bottom: 10px;
        .tag {
          width: 70px;
          height: 24px;
          margin: 5px 10px 5px 0;
          line-height: 24px;
          text-align: center;
        }
      }
    }
    .cardRight {
      margin-left: 1%;
      width: 60%;
      background: #ffffffff;
      padding: 0 10px;
      .tag {
        margin: 5px 10px 5px 0;
        width: 110px;
        height: 52px;
        text-align: center;
        line-height: 22px;
        // color: #FF666666;
        i {
          display: block;
        }
      }
      .tagInfoOne {
        border: 1px solid rgba(104, 63, 209, 1);
        .tagBottom {
          color: rgba(104, 63, 209, 1);
        }
      }
      .tagInfoTwo {
        border-color: #1890ff;
        .tagBottom {
          color: #1890ff;
        }
      }
      .tagInfoThree {
        border-color: #52c41a;
        .tagBottom {
          color: #52c41a;
        }
      }

      .tagInfoFour {
        border-color: #faad14;
        .tagBottom {
          color: #faad14;
        }
      }
      .info {
        margin-top: 5px;
      }
    }
  }
}
</style>
