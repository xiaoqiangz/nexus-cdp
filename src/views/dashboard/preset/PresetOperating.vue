<template>
  <div class="funnel-layout">
    <a-spin :spinning="spinning">
      <h3>全链路转化漏斗</h3>

      <my-icon class="icon-fresh" type="iconshuaxin" />

      <a-form-model
        class="ant-advanced-search-form"
        layout="inline"
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-row :gutter="0">
          <a-col :sm="24">
            <a-form-model-item class="row-date" label="日期" prop="date">
              <a-range-picker
                class="line-down"
                @change="onChange"
                style="width: 334px;"
                v-decorator="['data', { rules: [{ required: true, message: 'Input something!'}]}]"
              >
                <a-icon slot="suffixIcon" type="calendar" />
              </a-range-picker>
              <a class="advanced-serch" @click="advanced =!advanced">
                <my-icon type="iconshaixuan" />高级筛选
              </a>
            </a-form-model-item>
          </a-col>

          <template v-if="advanced">
            <a-col :lg="6" :md="8" :sm="12" :xs="12">
              <a-form-model-item label="活动名称">
                <a-select class="line-down" default-value="lucy" loading>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :lg="6" :md="8" :sm="12" :xs="12">
              <a-form-model-item label="项目方">
                <a-select class="line-down" default-value="lucy" loading>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :lg="6" :md="8" :sm="12" :xs="12">
              <a-form-model-item label="城市">
                <a-select class="line-down" default-value="lucy" loading>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :lg="6" :md="8" :sm="12" :xs="12">
              <a-form-model-item label="来源大类-小类">
                <a-select class="line-down" default-value="lucy" loading>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :lg="6" :md="8" :sm="12" :xs="12">
              <a-form-model-item label="活动分类">
                <a-select class="line-down" default-value="lucy" loading>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :lg="6" :md="8" :sm="12" :xs="12">
              <a-form-model-item label="渠道来源">
                <a-select class="line-down" default-value="lucy" loading>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :lg="6" :md="8" :sm="12" :xs="12">
              <a-form-model-item label="校区">
                <a-select class="line-down" default-value="lucy" loading>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :lg="6" :md="8" :sm="12" :xs="12">
              <a-form-model-item label="年级">
                <a-select class="line-down" default-value="lucy" loading>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :lg="6" :md="8" :sm="12" :xs="12">
              <a-form-model-item label="产品线">
                <a-select class="line-down" default-value="lucy" loading>
                  <a-select-option value="lucy">
                    Lucy
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

            <a-col :lg="18" :md="16" :sm="12" :xs="12" class="form-btns">
              <a-button style="margin-left: 10px;" @click="resetForm">
                重置
              </a-button>
              
              <a-button type="primary" @click="onSubmit">
                确定
              </a-button>
            </a-col>
          </template>
        </a-row>
      </a-form-model>

      <a-row class="funnel-panel">
        <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <h5>曝光量</h5>
          <div class="desc">
            <span>90,193,002</span>
            <i>次</i>
          </div>
          <a-tooltip placement="top">
            <template slot="title">
              <span>曝光量</span>
            </template>
            <a-icon class="panel-tip" type="question-circle" />
          </a-tooltip>
        </a-col>

        <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <h5>转化客户数</h5>
          <div class="desc">
            <span>4,320,920</span>
            <i>人</i>
          </div>
          <a-tooltip placement="top">
            <template slot="title">
              <span>转化客户数</span>
            </template>
            <a-icon class="panel-tip" type="question-circle" />
          </a-tooltip>
        </a-col>

        <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <h5>转化金额</h5>
          <div class="desc">
            <span>72,984,029</span>
            <i>元</i>
          </div>
          <a-tooltip placement="top">
            <template slot="title">
              <span>转化金额</span>
            </template>
            <a-icon class="panel-tip" type="question-circle" />
          </a-tooltip>
        </a-col>

        <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
          <h5>成交客户数</h5>
          <div class="desc">
            <span>34,209</span>
            <i>人</i>
          </div>
          <a-tooltip placement="top">
            <template slot="title">
              <span>成交客户数</span>
            </template>
            <a-icon class="panel-tip" type="question-circle" />
          </a-tooltip>
        </a-col>
      </a-row>

      <div class="funnel-wrap">
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <class-funnel :propsData="onLineFunnel" />
        </a-col>
        <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
          <class-funnel :propsData="offLineFunnel" />
        </a-col>
      </div>
    </a-spin>
  </div>
</template>

<script>
import ClassFunnel from '@/components/ClassFunnel'
export default {
  name: 'PresetOperating',
  components: {
    'class-funnel': ClassFunnel
  },
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
      form: {
        date: undefined
      },
      rules: {
        date: [{ required: true, message: '请选择日期', trigger: 'change' }]
      },
      spinning: false,
      advanced: false,
      onLineFunnel: {
        title: '市场线上漏斗图',
        colors: ['#588EFF', '#58A2D4', '#58B8A7'],
        options: [
          {
            name: '落地页UV',
            children: [
              {
                value: 20,
                width: '33.3%'
              },
              {
                value: 30,
                width: '33.3%'
              },
              {
                value: 50,
                width: '33.3%'
              }
            ]
          },
          {
            name: '留资',
            children: [
              {
                value: 20,
                width: '30%'
              },
              {
                value: 10,
                width: '20%'
              },
              {
                value: 20,
                width: '25%'
              }
            ]
          },
          {
            name: '有效电话',
            children: [
              {
                value: 10,
                width: '45%'
              }
            ]
          }
        ]
      },
      offLineFunnel: {
        title: '市场线下漏斗图',
        colors: ['#58B8A7', '#59CB7C'],
        options: [
          {
            name: '留资',
            children: [
              {
                value: 20,
                width: '33.3%'
              },
              {
                value: 30,
                width: '33.3%'
              },
              {
                value: 50,
                width: '33.3%'
              }
            ]
          },
          {
            name: '有效电话',
            children: [
              {
                value: 10,
                width: '30%'
              },
              {
                value: 10,
                width: '20%'
              },
              {
                value: 10,
                width: '25%'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    onChange(value) {
      console.log(`selected ${value}`)
    },
    
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>
