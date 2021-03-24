<template>
  <div class="admin-organization">
    <div class="organization-menu">
      <a-spin :spinning="menuSpinning">
        <div class="menu-header">
          <span v-if="!isCreate" @click="isCreate = !isCreate">
            <my-icon type="iconchuangjian_xianyuan1" />添加组织
          </span>
          <div class="item-inputbox" v-else>
            <input
              ref="createInput"
              type="text"
              class="tree-create"
              v-model="orgValue"
              @blur="handleCreateOrg"
              @enter="handleCreateOrg"
            />
          </div>
        </div>
        <ul class="menu-list">
          <li v-for="(item, index) in menuList" :key="item.orgCode" :class="{'selected': index == selectIndex}" @click="handleClick(item, index)">
            <span v-if="editIndex != index">{{ item.orgName }}</span>
            <div class="tools">
              <my-icon type="iconbianji" class="myicon" @click="handleEdit(item,index)" />
              <my-icon type="iconshanchu" class="myicon" @click="handleDel(item,index)" />
            </div>
            <div class="item-inputbox" v-if="editIndex == index">
              <input
                :ref="'input'+ index"
                type="text"
                class="tree-event"
                v-model="inputVal"
                @blur="handleEditOrg(item, index)"
                @enter="handleEditOrg(item, index)"
              />
            </div>
          </li>
        </ul>
      </a-spin>
    </div>
    <div class="organization-content">
      <a-row :gutter="0" class="content-name">
        <a-col :lg="3" :md="4" :sm="6" :xs="6">
          组织名称
        </a-col>
        <a-col :lg="21" :md="20" :sm="18" :xs="18" class="current-name">
          {{ currentOrganization.orgName }}
        </a-col>
      </a-row>

      <a-row :gutter="0" class="content-tree">
        <a-col :lg="3" :md="4" :sm="6" :xs="6">
          菜单列表
        </a-col>
        <a-col :lg="21" :md="20" :sm="18" :xs="18" class="tree-box">
          <a-spin :spinning="treeSpinning">
            <a-tree
              checkable
              v-model="checkedKeys"
              :tree-data="menuTree"
              :expanded-keys="expandedKeys"
              :auto-expand-parent="autoExpandParent"
              :selected-keys="selectedKeys"
              :replace-fields="replaceFields"
              @expand="onExpand"
              @select="onSelect"
              @check="onCheck"
            />
          </a-spin>
        </a-col>
      </a-row>
        
      <div class="content-footer">
        <a-button type="primary" @click="save()" :loading="saveLoading">
          保存
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserOrganizationList, getOrganizationDetail, getOrganizationDefault, saveOrgMenu, doDeleteOrg } from '@/api/user-center'

export default {
  name: 'Organization',
  data() {
    return {
      isCreate: false,
      orgValue: '',
      inputVal: '',
      menuList: [],
      menuSpinning: false,
      treeSpinning: false,
      editIndex: -1,
      selectIndex: 0,
      currentOrganization: '',
      menuTree: [],
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      parentNodekeys: [], // 父节点id
      replaceFields: {
        title: 'permissionName',
        key: 'permissionId'
      },
      saveLoading: false
    }
  },
  created() {
    this.initFetchData()
    this.initFetchOrgTree()
  },
  methods: {
    async initFetchData() {
      this.menuSpinning = true
      const ret = await getUserOrganizationList()
      this.menuSpinning = false
      if (ret) {
        this.menuList = ret.data && ret.data.data || []
        if (this.menuList && this.menuList[0].orgCode) {
          this.currentOrganization = ret.data.data[0]
          this.fetchOrgDetail(ret.data.data[0].orgCode)
        }
      }
    },

    async initFetchOrgTree() {
      this.menuList = []
      this.treeSpinning = true
      const ret = await getOrganizationDefault()
      this.treeSpinning = false
      if (ret) {
        this.menuTree = ret.data && ret.data.data || []
        this.parentNodekeys = []
        this.menuTree && this.menuTree.forEach(ele => {
          this.parentNodekeys.push(ele.permissionId)
        })
      }
    },

    handleClick(item, index) {
      if (!item || !item.orgCode) return
      this.selectIndex = index
      this.currentOrganization = item
      this.fetchOrgDetail(item.orgCode)
    },

    async fetchOrgDetail(orgCode) {
      const ret = await getOrganizationDetail({ orgCode: orgCode })
      if (ret) {
        console.info('ret')
        console.info(ret)
        this.checkedKeys = []
        ret.data && ret.data.data && ret.data.data.forEach(item => {
          this.checkedKeys.push(item.permissionId)
        })
      }
    },

    async handleCreateOrg() {
      if (!this.orgValue) {
        this.isCreate = false 
        return
      }
      if (this.orgValue.length > 10) {
        this.$notification['error']({
          message: '组织名称不能超过10个字符'
        })
        return
      }
      const param = {
        orgName: this.orgValue
      }
      const ret = await saveOrgMenu(param)
      if (ret && ret.status == 200) {
        this.orgValue = ''
        this.isCreate = false
        this.initFetchData()
      }
    },

    handleEdit(item, index) {
      this.editIndex = index
      this.inputVal = item.orgName
      this.$nextTick(() => {
        this.$refs['input' + index][0].focus()
      })
    },

    handleDel(record, index) {
      this.$confirm({
        title: '删除',
        content: '确认删除该组织?',
        onOk() {
          return new Promise((resolve, reject) => {
            if (!record || !record.orgCode) return false
            doDeleteOrg({ orgCode: record.orgCode }).then(res => {
              if (res && res.status == 200) {
                this.menuList.splice(index, 1)
                resolve()
              }
            }).catch(() => console.error('error'))
            // record
            resolve()
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel() {}
      })
    },

    async handleEditOrg(record, index) {
      this.editIndex = -1
      if (!this.inputVal || !record) {
        return false
      }
      if (this.inputVal.length > 10) {
        this.$notification['error']({
          message: `名称最长不能超过10个字符`
        })
        return false
      }
      const ret = await saveOrgMenu({ orgCode: record.orgCode, orgName: record.orgName })
      if (ret.status == 200 && ret) {
        this.menuList[index].orgName = this.inputVal
      }
    },

    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },

    onSelect(selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },

    onCheck(checkedKeys, info) {
      console.log('onCheck', checkedKeys, info)
      this.checkedKeys = checkedKeys
    },

    async save() {
      if (!this.currentOrganization) return false
      const parentKeysArr = this.parentNodekeys
      const idsArr = this.checkedKeys && this.checkedKeys.filter(item => {
        if (parentKeysArr.includes(item)) {
          return item
        }
      })
      const params = {
        orgCode: this.currentOrganization.orgCode,
        orgName: this.currentOrganization.orgName,
        permissionIds: idsArr
      }
      this.saveLoading = true
      const ret = await saveOrgMenu(params)
      this.saveLoading = false
    }
  }
}
</script>
<style lang="less" scoped>
.admin-organization {
  display: flex;
  height: 100%;
  .organization-menu {
    width: 250px;
    height: 100%;
    background-color: #ffffff;
    .menu-header {
      cursor: pointer;
      width: 100%;
      padding-left: 14px;
      height: 57px;
      line-height: 57px;
      color: #4C8EFA;
      border-bottom: solid 1px #E7E7E7;
      span {
        cursor: pointer;
        i {
          color: @primary;
          margin-right: 10px;
        }
      }
      .item-inputbox {
        display: inline-block;
        margin-left: 35px;
        & input {
          height: 20px;
          width: 140px;
          border: 0;
          outline: none;
          color: @fontColor;
          background: transparent;
          border-bottom: 1px solid @borderColor;
          text-align: left;
          font-weight: normal;
          box-sizing: border-box;
        }
      }
    }
    .menu-list {
      list-style: none;
      padding-left: 0;
      li {
        padding: 0 20px 0 35px;
        height: 40px;
        line-height: 40px;
        font-weight: 400;
        cursor: pointer;
        box-sizing: border-box;
        border-left: 2px solid transparent;
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
  .organization-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-left: 16px;
    padding: 40px;
    background-color: #ffffff;
    .ant-row + .ant-row {
      margin-top: 20px;
    }
    .content-name {
      height: 30px;
      line-height: 30px;
      .current-name {
        padding-left: 10px;
        border: 1px solid #DDDDDD;
        background-color: #F1F1F1;
      }
    }
    .content-tree {
      height: 100%;
      .tree-box {
        height: 100%;
        border: 1px solid #E7E7E7;
        .ant-tree {
          .ant-tree-child-tree {
            li {
              .ant-tree-checkbox {
                display: none !important;
              }
            }
          }
        }
      }
    }
    .content-footer {
      margin-top: 16px;
      height: 30px;
      text-align: right;
    }
  }
}
</style>
