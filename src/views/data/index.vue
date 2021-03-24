<template>
  <div class="view-container">
    <a-row :gutter="23">
      <a-col :span="8">
        <div class="data-module-box" @click="jumpToEtlResult">
          <img class="icon" src="../../assets/data_01.png" alt />
          <div class="text-box">
            <h3>我的数据集</h3>
            <p>已清洗好的结果数据表</p>
          </div>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="data-module-box" @click="jumpToEtlInsert">
          <img class="icon" src="../../assets/data_02.png" alt />
          <div class="text-box">
            <h3>数据接入</h3>
            <p>ETL数据管理</p>
          </div>
        </div>
      </a-col>
      <a-col :span="8">
        <div class="data-module-box" @click="jumpToEtlSource">
          <img class="icon" src="../../assets/data_03.png" alt />
          <div class="text-box">
            <h3>数据源</h3>
            <p>数据源接入管理</p>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'DataService',
  data() {
    return {}
  },
  methods: {
    jumpToEtlResult() {
      this.$router.push({ path: '/data/etl-data-result' })
    },
    jumpToEtlInsert() {
      this.$router.push({ path: '/data/etl-data-insert' })
    },
    jumpToEtlSource() {
      this.$router.push({ path: '/data/etl-data-source' })
    }
  }
}
</script>

<style lang="less" scoped>
.data-module-box {
  height: 128px;
  background: #ffffff;
  border: 1px solid @borderColor;
  box-shadow: 0px 0px 18px 2px rgba(76, 142, 250, 0.1);
  display: flex;
  align-items: center;
  cursor: pointer;
  .icon {
    width: 48px;
    height: 48px;
    margin: 0 27px 0 39px;
  }
  .text-box {
    margin-top: 10px;
    h3 {
      font-size: 18px;
    }
    p {
      font-size: @fontSize1;
      color: #656565;
    }
  }
}
</style>
