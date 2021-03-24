<template>
  <div class="view-container content-shadow">
    <div class="user-time">
      <div class="user-name">测试MySQL数据持续抽取</div>
      <div class="times">
        <span>创建时间: 2020-06-15 15:47:26</span>
        <span>更新时间: 2020-06-15 15:47:26</span>
        <span>最近执行时间: 2020-06-16 04:26:57</span>
      </div>
    </div>
    <div class="module-container monitor">
      <div class="module-title">ETL任务监控</div>
      <div class="monitor-content"></div>
    </div>
    <div class="module-container">
      <div class="module-title">输入配置</div>
      <div class="sql-container">
        <div class="sql-title">SQL语句</div>
        <div class="sql-content">
          select
          `order_id`,`store_id`,`user_id`,`total_amount`,`discount_amount`,`due_amount`,`actual_pay_amount`,`contact_name`,`contact_mobile`,`order_platform`,`is_payed`,`status`,`comment`,`create_time`,`update_time`,`is_deleted` from `a_order`
        </div>
      </div>
    </div>
    <div class="module-container">
      <div class="module-title">抽取规则</div>
      <div class="vertical-table">
        <div class="table-row">
          <span class="title">抽取规则</span>
          <span class="content">全量覆盖抽取</span>
        </div>
        <div class="table-row">
          <span class="title">主键</span>
          <span class="content">order_id</span>
        </div>
        <div class="table-row">
          <span class="title">增量标记字段</span>
          <span class="content">-</span>
        </div>
        <div class="table-row">
          <span class="title">去重频次</span>
          <span class="content">-</span>
        </div>
      </div>
    </div>
    <div class="module-container">
      <div class="module-title">定时规则</div>
      <div class="module-table">
        <a-table :columns="columns" :data-source="data" :pagination="false" bordered></a-table>
      </div>
    </div>
    <div class="module-container">
      <div class="module-title">存储目标</div>
      <div class="vertical-table"></div>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '任务频率',
    dataIndex: 'name'
  },
  {
    title: '频率时间',
    dataIndex: 'money'
  },
  {
    title: '任务开始时间',
    dataIndex: 'address'
  },
  {
    title: '开始日期',
    dataIndex: 'address'
  },
  {
    title: '结束日期',
    dataIndex: 'address'
  }
]
const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park'
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park'
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park'
  }
]
export default {
  data() {
    return {
      data,
      columns
    }
  },
  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.view-container {
  background: #fff;
  color: #333333;
  .module-title {
    font-size: @fontSize2;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin: 20px 0;
  }
  .user-time {
    height: 80px;
    border-bottom: 1px solid @borderColor;
    padding: 16px 60px 16px 20px;
    .user-name {
      font-size: 18px;
      margin-bottom: 5px;
      font-weight: bold;
    }
    .times span {
      font-size: @fontSize1;
      margin-right: 20px;
    }
  }

  .module-container {
    padding: 0 20px;
    height: 300px;
    .sql-container {
      padding: 0 10px;
    }
    .sql-title {
      height: 26px;
      line-height: 26px;
      font-weight: bold;
    }
    .sql-content {
      width: 100%;
      min-height: 190px;
      background-color: #f1f1f1;
      padding: 20px;
      margin-bottom: 10px;
      word-wrap: break-word;
    }
    .vertical-table {
      width: 100%;
      border: 1px solid @borderColor;
      .table-row {
        width: 100%;
        height: 50px;
        line-height: 50px;
        span{
          display: inline-block;
          height: 49px;
        }
        .title {
          width: 160px;
          padding: 0 20px;
          background-color: #F7F7F7;
          border-right: 1px solid @borderColor;
          border-bottom: 1px solid @borderColor;
        }
        .content {
          width: calc(~'100% - 160px');
          padding: 0 20px;
          border-bottom: 1px solid @borderColor;
        }
      }
      .table-row:nth-last-child(1) span {
        border-bottom: none;
      }
    }
  }
  .monitor {
    border-bottom: 1px solid @borderColor;
  }
}
</style>
