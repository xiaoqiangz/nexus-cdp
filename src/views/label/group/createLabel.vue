<template>
  <div class="create-label">
    <a-card class="card-form">
      <a-form-model 
        layout="inline" 
        ref="ruleForm" 
        :model="form" 
        :label-col="labelCol" 
        :wrapper-col="wrapperCol" 
        @submit="handleSubmit" 
        @submit.native.prevent>
        <a-row :gutter="0">
          <a-col :lg="6" :md="8" :sm="12" :xs="12">
            <a-form-model-item label="分群名称" style="width: 100%;">
              <a-input v-model="formInline.groupName" placeholder="分群名称" />
            </a-form-model-item>
          </a-col>

          <a-col :lg="6" :md="8" :sm="12" :xs="12">
            <a-form-model-item label="注释" style="width: 100%;">
              <a-input v-model="formInline.annotation" placeholder="注释" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
    <h6>分群规则</h6>
    <a-card class="card-rules">
      <a-row :gutter="0" class="rules-head">
        <a-col :lg="4" :md="6" :sm="12" :xs="12" :offset="2">
          <i>*</i> 选择标签
        </a-col>
        <a-col :lg="4" :md="6" :sm="12" :xs="12">
          <i>*</i> 操作符
        </a-col>
        <a-col :lg="4" :md="6" :sm="12" :xs="12">
          <i>*</i> 值
        </a-col>
      </a-row>

      <a-form-model
        ref="customForm"
        :model="customForm">
        <div class="group-item">
          <div class="item-left">
            <span>1</span>
          </div>
          <div class="item-right">
            <div class="vertical-qie"><span></span></div>
            <div class="form-row">
              <a-row :gutter="0">
                <a-col :lg="4" :md="6" :sm="12" :xs="12">
                  <a-form-model-item>
                    <a-input placeholder="星级大类" />
                  </a-form-model-item>
                </a-col>

                <a-col :lg="4" :md="6" :sm="12" :xs="12">
                  <a-form-model-item>
                    <a-input placeholder="等于" />
                  </a-form-model-item>
                </a-col>

                <a-col :lg="4" :md="6" :sm="12" :xs="12">
                  <a-form-model-item>
                    <a-input placeholder="高星会员" />
                    <div class="line-btns">
                      <a-icon type="minus-circle-o" />
                    </div>
                  </a-form-model-item>
                </a-col>
              </a-row>

              <a-row :gutter="0">
                <a-col :lg="4" :md="6" :sm="12" :xs="12">
                  <a-form-model-item>
                    <a-input placeholder="注册日期" />
                  </a-form-model-item>
                </a-col>

                <a-col :lg="4" :md="6" :sm="12" :xs="12">
                  <a-form-model-item>
                    <a-input placeholder="区间" />
                  </a-form-model-item>
                </a-col>

                <a-col :lg="10" :md="12" :sm="12" :xs="12">
                  <a-form-model-item>
                    <!-- <a-input placeholder="高星会员" /> -->
                    <a-date-picker />
                    <span class="line-zhi">至</span>
                    <a-date-picker />
                    <div class="line-btns">
                      <a-icon type="minus-circle-o" />
                      <a-icon type="plus-circle" />
                    </div>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </div>
            <span class="btn-delete">
              <my-icon type="iconshanchu" />
            </span>
          </div>
        </div>

        <div class="mid-letter">
          <span>且</span>
        </div>

        <div class="group-item">
          <div class="item-left">
            <span>2</span>
          </div>
          <div class="item-right">
            <div class="vertical-qie"><span></span></div>
            <div class="form-row">
              <a-row :gutter="0">
                <a-col :lg="4" :md="6" :sm="12" :xs="12">
                  <a-form-model-item>
                    <a-input placeholder="星级大类" />
                  </a-form-model-item>
                </a-col>

                <a-col :lg="4" :md="6" :sm="12" :xs="12">
                  <a-form-model-item>
                    <a-input placeholder="等于" />
                  </a-form-model-item>
                </a-col>

                <a-col :lg="4" :md="6" :sm="12" :xs="12">
                  <a-form-model-item>
                    <a-input placeholder="高星会员" />
                    <div class="line-btns">
                      <a-icon type="minus-circle-o" />
                    </div>
                  </a-form-model-item>
                </a-col>
              </a-row>

              <a-row :gutter="0">
                <a-col :lg="4" :md="6" :sm="12" :xs="12">
                  <a-form-model-item>
                    <a-input placeholder="注册日期" />
                  </a-form-model-item>
                </a-col>

                <a-col :lg="4" :md="6" :sm="12" :xs="12">
                  <a-form-model-item>
                    <a-input placeholder="区间" />
                  </a-form-model-item>
                </a-col>

                <a-col :lg="10" :md="12" :sm="12" :xs="12">
                  <a-form-model-item>
                    <!-- <a-input placeholder="高星会员" /> -->
                    <a-date-picker />
                    <span class="line-zhi">至</span>
                    <a-date-picker />
                    <div class="line-btns">
                      <a-icon type="minus-circle-o" />
                      <a-icon type="plus-circle" />
                    </div>
                  </a-form-model-item>
                </a-col>
              </a-row>
            </div>
            <span class="btn-delete">
              <my-icon type="iconshanchu" />
            </span>
          </div>
        </div>

        <div class="create-btn">
          <a-button type="primary"> <a-icon type="plus" />人群特征</a-button>
        </div>
      </a-form-model>
    </a-card>
    <div class="form-footer">
      <a-button-group>
        <a-button type="primary">取消</a-button>
        <a-button type="primary">保存</a-button>
      </a-button-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateLabel',
  components: {},
  data() {
    return {
      labelCol: { 
        xs: { span: 8 },
        sm: { span: 8 },
        md: { span: 8 },
        lg: { span: 6 },
        lxl: { span: 6 }
      },
      wrapperCol: { 
        xs: { span: 16 },
        sm: { span: 16 },
        md: { span: 16 },
        lg: { span: 18 },
        lxl: { span: 18 }
      },
      formInline: {
        groupName: '',
        annotation: ''
      },
      form: {},
      customForm: {}
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleSubmit() {}
  }
}
</script>

<style lang="less" scoped>
@primaryColor: #4B8DF9;
.create-label {
  display: flex;
  flex-direction: column;
  height: 100%;
  >h6 {
    margin: 16px 0;
    height: 12px;
    line-height: 12px;
    font-size: 12px;
    color: @fontColor;
    font-weight:bold;
  }
  .card-form {
    .ant-card {
      .ant-card-body {
        padding: 33px 0 33px 51px;
      }
    }
  }
  .card-rules {
    padding: 0;
    height: 100%;
    .ant-card-body {
      padding: 0;
      .rules-head {
        height: 47px;
        font-size: 12px;
        color: @fontColor;
        line-height: 47px;
        font-weight:400;
        i {
          font-style: normal;
          color: #E53935;
        }
      }
      .group-item {
        position: relative;
        display: flex;
        // cursor: pointer;
        // overflow-y: scroll;
        &:hover {
          background-color: #F3F9FF;
          .item-left {
            span {
              color: @primary;
            }
          }
          .item-right {
            border-left-color: @primary;
            .btn-delete {
              display: block;
            }
          }
        }
        .item-left {
          width: 50px;
          span {
            position: absolute;
            top: 22px;
            left: 22px;
            font-size: 14px;
            color: @fontColor;
            font-weight: bold;
          }
        }
        .item-right {
          position: relative;
          padding: 18px 0;
          flex: 1;
          display: flex;
          border-left: 4px solid #E7E7E7;
          .vertical-qie {
            width: 67px;
            span {
              position: absolute;
              left: 32px;
              top: 29px;
              display: block;
              width: 2px;
              height: 50px;
              background-color: #E7E7E7;
              z-index: 2;
              &::before {
                content: '且';
                position: absolute;
                top: 20%;
                left: -12px;
                font-size: 12px;
                color: #4B8DF9;
                padding: 5px;
                background: #e1e9f9;
                border: 2px solid #e7e7e7;
                border-radius: 3px;
                font-weight: 600;
                z-index: 3;
              }
            }
          }
          .form-row {
            flex: 1;
            >.ant-row {
              height: 30px;
              >.ant-col {
                height: 30px;
                .ant-form-item-control {
                  line-height: 30px;
                  .ant-calendar-picker {
                    .anticon {
                      color: #CBCBCB;
                    }
                  }
                }
                .ant-form-item {
                  margin: 0;
                }
              }
              .ant-input {
                width: 130px;
                height: 30px;
                font-size: 14px;
                color: @primary;
                font-weight:400;
                line-height: 30px;
                background:rgba(225,234,250,1);
                border: 1px solid rgba(76, 142, 250, 1);
                box-shadow: 0px 0px 4px 0px rgba(76,142,250,1);
              }
            }
            .ant-row + .ant-row {
              margin-top: 10px;
            }
            
            .line-zhi {
              margin: 0 26px;
              font-size: 14px;
              color: #656565;
            }
            
            .line-btns {
              display: inline-block;
              margin-left: 12px;
              .anticon-minus-circle-o, .anticon-plus-circle {
                font-size: 14px;
                cursor: pointer;
              }
              .anticon-minus-circle-o {
                color: #CBCBCB;
              }
              .anticon-plus-circle {
                margin-left: 11px;
                color: @primaryColor;
              }
            }
          }
          
          .btn-delete {
            position: absolute;
            display: none;
            top: 9px;
            right: 14px;
            z-index: 2;
            .anticon {
              font-size: 13px;
              color: #999999;
            }
          }
        }
      }
      .mid-letter {
        margin: 12px 0 12px 17px;
        cursor: pointer;
        span {
          padding: 6px;
          font-size: 12px;
          color: @primaryColor;
          background-color: #E1E9F9;
          border-radius: 3px;
          font-weight: 600;
        }
      }
      .create-btn {
        margin-top: 20px;
        display: block;
        button {
          margin-left: 61px;
          height:30px;
          color: #4B8DF9;
          background-color: #FFFFFF;
          border: 1px solid #4B8DF9;
          border-radius:15px;
        }
      }
    }
  }

  // 提交按钮在下面的form公用提交
  .form-footer {
    width: 100%;
    height: 111px;
    line-height: 111px;
    text-align: right;
  }
}
</style>
