<template>
  <a-select
    show-search
    placeholder="请选择组织"
    option-filter-prop="children"
    :filter-option="filterOption"
    v-model="userOrgCodeId"
    @focus="handleFocus"
    @blur="handleBlur"
    @change="handleChange">
    <a-select-option v-for="item in userGroupsList" :key="item.orgCode">{{ item.orgName }}</a-select-option>
  </a-select>
</template>

<script>
import { getUserOrganizationList } from '@/api/user-center'
export default {
  name: 'UserOrganization',
  props: {
    orgCodeId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      userGroupsList: [],
      userOrgCodeId: undefined
    }
  },
  created() {
    this.fetchUserGroupsList()
  },
  methods: {
    initData() {
      this.userOrgCodeId = this.orgCodeId || undefined
    },

    async fetchUserGroupsList() {
      const ret = await getUserOrganizationList()
      if (ret && ret.status == 200) {
        this.userGroupsList = ret.data && ret.data.data || []
      }
    },

    handleChange(value) {
      console.info('value')
      console.info(value)
      this.userOrgCodeId = value
      this.$emit('change', value)
    },

    handleBlur() {
      console.log('blur')
    },

    handleFocus() {
      console.log('focus')
    },

    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    }
  },
  watch: {
    orgCodeId: (value, oldvalue) => {
      if (oldvalue !== value) {
        this.userOrgCodeId = this.orgCodeId || undefined
      }
    }
  }
}
</script>
