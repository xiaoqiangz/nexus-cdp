<template>
  <div class="userList">
    <div class="left-content content-shadow">
      <div class="left-header">
        <span v-if="!isCreate" @click="handleCreate">
          <my-icon type="iconchuangjian_xianyuan1" />创建角色
        </span>
        <div class="item-inputbox" v-else>
          <input
            ref="createInput"
            type="text"
            class="tree-create"
            v-model="createVal"
            @blur="createNewRole()"
            @keyup.enter="createNewRole()"
          />
        </div>
      </div>
      <ul class="left-list">
        <a-spin :spinning="leftSpinning">
          <li
            :key="item.id"
            v-for="(item, index) in userList"
            :class="{'selected': index == selectIndex}"
            @click="handleClick(item, index)"
          >
            <span v-if="editIndex != index">{{ item.roleName }}</span>
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
                @blur="handleBlur(item, index)"
              />
            </div>
          </li>
        </a-spin>
      </ul>
    </div>
    <div class="rightBox">
      <a-spin :spinning="treeSpinning">
        <div class="right-content content-shadow">
          <div class="right-header">用户角色：管理员</div>
          <div class="steps">
            <a-steps :current="step">
              <a-step title="权限模块"></a-step>
              <a-step title="数据模块" />
            </a-steps>
          </div>
          <div class="content">
            <p>{{ step == 0 ? '权限模块' : '数据模块' }}</p>
            <div class="content-box" v-show="step == 0">
              <div class="left">
                <a-tree
                  v-model="checkedAccessKeys"
                  checkable
                  :expanded-keys="expandAccessKeys"
                  :auto-expand-parent="autoExpandParent"
                  :tree-data="accessTreeData"
                  :replace-fields="replaceFields"
                  @expand="onExpandAccess"
                  @select="onSelectAccess"
                  @check="onCheckAccess"
                />
              </div>
              <div class="right">
                <a-spin :spinning="!showAllButtons">
                  <template v-if="showAllButtons">
                    <div class="but-box" v-for="item in accessModulesTree" :key="item.permissionId">
                      <p v-if="item.accessible && item.children.length">{{ item.permissionName }}</p>
                      <template v-if="item.accessible">
                        <ul class="butList" v-for="child in item.children" :key="child.permissionId">
                          <p>{{ child.permissionName }}</p>
                          <template v-if="child.accessible">
                            <template v-for="(categories, index) in child.categories">
                              <template v-if="index > 0">
                                <template v-for="cate in categories">
                                  <li :key="cate.permissionId" v-if="cate.accessible">
                                    {{ child.permissionName + '-' + cate.permissionName }}
                                    <my-icon type="icontag_s" class="myicon" @click="handleDel(cate)" />
                                  </li>
                                </template>
                              </template>
                            </template>
                          </template>
                        </ul>
                      </template>
                    </div>
                  </template>
                </a-spin>
              </div>
            </div>
            <div class="content-box" v-show="step == 1">
              <div class="data-box">
                <a-tree
                  v-model="checkedSchoolKeys"
                  checkable
                  :expanded-keys="expandSchoolKeys"
                  :auto-expand-parent="autoExpandSchool"
                  :selected-keys="selectedSchoolKeys"
                  :tree-data="schoolTreeData"
                  @expand="onExpandSchool"
                  @select="onSelectSchool"
                  @check="onCheckSchool"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="buttonList">
          <span class="cancel-btn" v-if="step==0">取消</span>
          <a-button 
            class="step-btn" 
            shape="round" 
            style="width:120px" 
            v-if="step==0" 
            @click="handleStep(1)" 
            :loading="nextLoading">下一步</a-button>
          <a-button class="step-btn" shape="round" style="width:120px" v-if="step==1" @click="handleStep(0)">上一步</a-button>
          <a-button 
            type="primary" 
            shape="round" 
            style="width:120px" 
            v-if="step==1" 
            :loading="saveLoading" 
            @click="saveAllSub()">保存</a-button>
        </div>
      </a-spin>
    </div>
  </div>
</template>

<script>
import { 
  queryAllRoles,
  queryAccessRouteTree,
  deleteRole, 
  queryRoleDetail, 
  editRole, 
  createUserGroup, 
  getRoleSchoolTree, 
  saveRoleSchoolBind 
  } from '@/api/user-center'

export default {
  name: 'TableList',
  components: {},
  data() {
    return {
      step: 0,
      inputVal: '',
      createVal: '',
      editIndex: -1,
      isCreate: false,
      selectIndex: 0,
      replaceFields: {
        title: 'permissionName',
        key: 'permissionId'
      },
      accessTreeData: [],
      accessModulesTree: [],
      accessModulesData: [], //  用来存储所有按钮权限的id
      schoolTreeData: [],
      userList: [],
      checkedAccessKeys: [],
      expandAccessKeys: [], // 要展开的的树节点的父级
      autoExpandParent: true,
      autoExpandSchool: true,
      treeSpinning: false,
      leftSpinning: false,
      saveLoading: false,
      showAllButtons: true,
      checkedSchoolKeys: [],
      expandSchoolKeys: [],
      selectedSchoolKeys: [],
      nextLoading: false,
      currentRole: {}
    }
  },
  created() {
    this.fetchData()
    this.fetchAccessTree()
    this.fetchSchoolData()
  },
  methods: {
    handleEdit(item, index) {
      this.editIndex = index
      this.inputVal = item.roleName
      this.$nextTick(() => {
        this.$refs['input' + index][0].focus()
      })
    },

    // 失焦处理
    async handleBlur(record) {
      this.editIndex = -1
      if (!this.inputVal) {
        return false
      }
      if (this.inputVal.length > 10) {
        this.$notification['error']({
          message: `名称最长不能超过10个字符`
        })
        return false
      }
      const ret = await editRole({ roleName: this.inputVal, roleId: record.roleId })
      if (ret.status == 200 && ret.data) {
        this.fetchData()
      }
    },

        handleCreate() {
      this.isCreate = true
      this.$nextTick(() => {
        this.$refs.createInput.focus()
      })
    },

    // 创建一个新角色
    async createNewRole() {
      if (!this.createVal) return
      if (this.createVal.length > 10) {
        this.$notification['error']({
          message: `名称最长不能超过10个字符`
        })
        return
      }
      const ret = await editRole({ roleName: this.createVal })
      console.info('ret')
      console.info(ret)
      if (ret && ret.status == 200) {
        this.createVal = ''
        this.isCreate = false
        this.fetchData()
      }
    },

    async fetchData() {
      this.leftSpinning = true
      const ret = await queryAllRoles()
      this.leftSpinning = false
      if (ret.status == 200 && ret.data) {
        const retData = ret.data.data
        this.userList = ret.data.data || []
        let firstRoleId = ret.data.data && ret.data.data[0] && ret.data.data[0].roleId
        if (ret.data.data[0].roleId) {
          this.currentRole = ret.data.data[0]
          this.fetchRoleDetail(ret.data.data[0].roleId)
          this.fetchSchoolData(ret.data.data[0].roleId)
        }
      }
    },

    async fetchAccessTree() {
      this.treeSpinning = true
      this.accessTreeData = []
      const ret = await queryAccessRouteTree()
      this.treeSpinning = false
      if (ret && ret.status == 200) {
        this.accessTreeData = ret.data && ret.data.data
      }
    },

    async fetchSchoolData(roleId) {
      const ret = await getRoleSchoolTree({ roleId: roleId })
      this.schoolTreeData = []
      this.checkedSchoolKeys = []
      this.expandSchoolKeys = []
      if (ret && ret.status == 200) {
          this.schoolTreeData = ret.data && ret.data.data && ret.data.data.schoolTree
          this.checkedSchoolKeys = ret.data && ret.data.data && ret.data.data.roleSchoolList.map(String)
          this.expandSchoolKeys = ret.data && ret.data.data && ret.data.data.roleSchoolList.map(String)
        }
    },

    handleClick(item, index) {
      this.currentRole = item
      this.selectIndex = index
      this.fetchRoleDetail(item.roleId)
      this.fetchSchoolData(item.roleId)
    },

    async fetchRoleDetail(roleId) {
      if (!roleId) return
      this.treeSpinning = true
      const ret = await queryRoleDetail({ roleId: roleId })
      this.treeSpinning = false
      if (ret.status == 200 && ret.data) {
        let permissionList = ret.data.data && ret.data.data.permissionList || []
        this.checkedAccessKeys = []
        this.expandAccessKeys = []
        this.accessModulesData = []
        this.accessModulesTree = permissionList
        permissionList && permissionList.forEach(item => {
          item.accessible && this.checkedAccessKeys.push(item.permissionId)
          item.accessible && this.expandAccessKeys.push(item.permissionId)
          item.accessible && this.accessModulesData.push(item.permissionId)

          item.children && item.children.forEach(children => {
            children.accessible && this.checkedAccessKeys.push(children.permissionId)
            children.accessible && this.expandAccessKeys.push(children.permissionId)
            children.accessible && this.accessModulesData.push(children.permissionId)

            children.categories && Object.values(children.categories).forEach((values, key) => {
              values && values.forEach(value => {
              value.accessible && this.accessModulesData.push(value.permissionId)
              })
            })
          })
        })

        this.showCategoriesDetail(this.checkedAccessKeys)
      }
    },

    showCategoriesDetail(checkedKeys) {
      if (!checkedKeys || !this.accessModulesTree) return
      let checkModuleData = []
      this.accessModulesTree && this.accessModulesTree.forEach(item => {
        if (checkedKeys.includes(item.permissionId)) {
          item.accessible = true
        } else {
          item.accessible = false
        }
        item.children && item.children.forEach(children => {
          if (checkedKeys.includes(item.permissionId) && checkedKeys.includes(children.permissionId)) {
            children.accessible = true
          } else {
            children.accessible = false
          }
          if (children.categories) {
            Object.values(children.categories).forEach((values, key) => {
              checkedKeys.includes(children.permissionId) && values && values.forEach(value => {
                value.accessible = true
                checkModuleData.push(value.permissionId)
              })
            })
          } else {
            Object.values(children.categories).forEach((values, key) => {
              checkedKeys.includes(children.permissionId) && values && values.forEach(value => {
                value.accessible = false
              })
            })
          }
        })
      })
      this.accessModulesData = []
      this.accessModulesData = Array.from(new Set([...checkModuleData, ...checkedKeys]))
    },

    onExpandAccess(expandKeys) {
      this.expandAccessKeys = expandKeys
      this.autoExpandParent = false
    },

    onCheckAccess(checkedKeys, info) {
      const halfKeys = info.halfCheckedKeys
      let newCheckedKeys = Array.from(new Set([...checkedKeys, ...halfKeys]))
      this.showCategoriesDetail(newCheckedKeys)
    },

    onSelectAccess(selectKeys, info) {
    },

    onExpandSchool(expandKeys) {
      this.expandSchoolKeys = expandKeys
      this.autoExpandSchool = false
    },

    onSelectSchool(selectKeys, info) {
      this.selectedSchoolKeys = selectKeys
    },

    onCheckSchool(checkedKeys, info) {
      this.checkedSchoolKeys = checkedKeys
    },

    handleDel(record, index) {
      if (!record || !record.permissionId) return false
      let targetIndex = this.accessModulesData.indexOf(record.permissionId)
      this.accessModulesData.splice(targetIndex, 1)
      record.accessible = false
    },

    async handleStep(type) {
      this.step = type
    },

    async saveAllSub() {
      let paramPermission = {
        permissionIds: this.accessModulesData,
        roleId: this.currentRole.roleId,
        roleName: this.currentRole.roleName
      }
      let paramSchool = {
        roleId: this.currentRole.roleId,
        schoolList: this.checkedSchoolKeys
      }
      this.saveLoading = true
      Promise.allSettled([editRole(paramPermission), saveRoleSchoolBind(paramSchool)]).then(res => {
      }).finally(() => {
        this.saveLoading = false
      })
    }
  } 
}
</script>
<style lang="less" scoped>
.userList {
  height: 100%;
  width: 100%;
  //   clear: both;
  .left-content {
    float: left;
    width: 250px;
    height: 100%;
    background-color: #ffffff;
    .left-header {
      cursor: pointer;
      width: 100%;
      // padding: 16px 14px 16px;
      padding-left: 14px;
      height: 57px;
      line-height: 57px;
      color: @primary;
      border-bottom: solid 1px @borderColor;
      span {
        // height: 40px;
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
  .rightBox {
    float: left;
    width: calc(~'100% - 266px');
    height: 100%;
    margin-left: 16px;
    .buttonList {
      display: flex;
      justify-content: flex-end;
      margin-top: 15px;
      .cancel-btn {
        margin-right: 30px;
      }
      .step-btn {
        color: #75afff;
        background-color: #fff;
        border-color: #75afff;
        margin-right: 10px;
      }
    }
    .right-content {
      position: relative;
      height: calc(~'100vh - 146px');
      width: 100%;
      background-color: #ffffff;
      .right-header {
        width: 100%;
        padding-left: 24px;
        height: 57px;
        line-height: 57px;
        font-size: 16px;
        // border-bottom: solid 1px @borderColor;
      }
      .content {
        height: calc(~'100% - 57px');
        padding: 20px 24px;
        .content-box {
          height: calc(~'100% - 36px');
          // overflow: hidden;
          .data-box{
            width: 100%;
            height: 100%;
            border: dashed 1px #ddddddff;
            overflow: auto;
            padding: 10px 20px;
            box-sizing: border-box;
            margin-right: 2%;
          }
          .left {
            float: left;
            width: 39%;
            height: 100%;
            border: dashed 1px #ddddddff;
            overflow: auto;
            padding: 10px 20px;
            box-sizing: border-box;
            margin-right: 2%;
          }
          .right {
            float: left;
            overflow-y: auto;
            padding: 20px 30px;
            width: 59%;
            height: 100%;
            border: dashed 1px #ddddddff;
            box-sizing: border-box;
            .but-box {
              margin-bottom: 10px;
              p {
                margin-bottom: 10px;
              }
              .butList {
                overflow: hidden;
                list-style: none;
                padding-left: 10px;
                li {
                  margin-right: 10px;
                  float: left;
                  margin-bottom: 5px;
                  background-color: #f2f2f2ff;
                  padding: 2px 5px;
                  text-align: center;
                  i {
                    font-size: 10px;
                    margin-left: 4px;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
    }
    .steps{
      width: 50%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 20px;
    }
  }
}
</style>
