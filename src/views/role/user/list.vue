<template>
  <div class="userList">
    <div style="margin-bottom:14px">
      <a-button type="primary" icon="plus" shape="round" @click="handleAdd" v-action="permissionsButs.add">邀请用户</a-button>
    </div>
    <div class="left-content content-shadow">
      <div class="left-header" v-action="permissionsButs.addGroup">
        <span v-if="!isCreate" @click="handleCreate">
          <my-icon type="iconchuangjian_xianyuan1" />创建用户组
        </span>
        <div class="item-inputbox" v-else>
          <input
            ref="createInput"
            type="text"
            class="tree-create"
            v-model="createVal"
            @blur="handleCreateBlur"
            @keyup.enter="handleCreateBlur"
          />
        </div>
      </div>
      <ul class="left-list">
        <li
          :key="item.id"
          v-for="(item, index) in userList"
          :class="{'selected': index == selectIndex}"
          @click="handleClick(item,index)"
        >
          <span v-if="editIndex != index">{{ item.groupName }}</span>
          <div class="tools" v-if="index != 0">
            <my-icon type="iconbianji" class="myicon" @click.stop="handleUserEdit(item,index)" v-action="permissionsButs.editGroup"/>
            <my-icon type="iconshanchu" class="myicon" @click.stop="handleUserDel(item,index)" v-action="permissionsButs.delGroup"/>
          </div>
          <div class="item-inputbox" v-if="editIndex == index">
            <input
              :ref="'input'+ index"
              type="text"
              class="tree-event"
              v-model="inputVal"
              @blur="handleBlur(item)"
              @keyup.enter="handleBlur(item)"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="right-content content-shadow">
      <a-table
        ref="table"
        size="default"
        rowKey="index"
        :columns="columns"
        :data-source="tableData"
        :pagination="pagination"
        :loading="loading"
      >
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>

        <span slot="action" slot-scope="text, record">
          <template>
            <a-tooltip v-show="isAdmin(record.roles)" v-action="permissionsButs.edit">
              <template slot="title">编辑</template>
              <my-icon type="iconbianji" class="myicon" @click="handleEdit(record)" />
            </a-tooltip>
            <a-tooltip v-show="record.status==3 && isAdmin(record.roles)" v-action="permissionsButs.reset">
              <template slot="title">重置密码</template>
              <my-icon type="iconmimazhongzhi2" class="myicon" @click="handleReset(record)" />
            </a-tooltip>
            <a-tooltip
              v-show="record.status==3 && isAdmin(record.roles) && userId != record.userId"
              v-action="permissionsButs.disable"
            >
              <template slot="title">禁用</template>
              <my-icon type="iconyonghujinyong" class="myicon" @click="handleDisable(record)" />
            </a-tooltip>
            <a-tooltip v-show="record.status==4 && isAdmin(record.roles)" v-action="permissionsButs.enable">
              <template slot="title">启用</template>
              <my-icon type="iconyonghuqiyong" class="myicon" @click="handleEnable(record)" />
            </a-tooltip>
            <a-tooltip v-show="isAdmin(record.roles) && userId != record.userId" v-action="permissionsButs.del">
              <template slot="title">删除</template>
              <my-icon type="iconshanchu" class="myicon" @click="handleDel(record)" />
            </a-tooltip>
          </template>
        </span>
      </a-table>
      <pagination @change="hanleChange" :pageSizeOptions="sizes" :total="total" v-show="total>0"></pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import pagination from '@/components/Pagination/Pagination.vue'
import { mapGetters } from 'vuex'
import {
  getUserGroup,
  getUserPage,
  saveUserGroup,
  delUserGroup,
  delUser,
  disableUser,
  enableUser,
  resetUser
} from '@/api/system'

const statusMap = {
  1: {
    status: 'default',
    text: '已创建'
  },
  3: {
    status: 'success',
    text: '已激活'
  },
  2: {
    status: 'warning',
    text: '已邀请'
  },
  4: {
    status: 'error',
    text: '已禁用'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    pagination
  },
  data() {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: { pageNo: 1, size: 10 },
      // 表头
      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
          width: 100
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          width: 150,
          ellipsis: true
        },
        {
          title: '角色',
          dataIndex: 'roleNames',
          width: 150,
          ellipsis: true
        },
        {
          title: '用户组',
          dataIndex: 'roleName',
          width: 100
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          width: 150
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
          width: 100
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
      userList: [],
      selectIndex: 0,
      sizes: ['10', '20', '30', '40', '50'],
      pagination: {
        pageSize: 10
      },
      // 总条数
      total: 0,
      editIndex: -1,
      inputVal: '',
      createVal: '',
      isCreate: false,
      loading: false,
      userCreated: false,
      userGroup: {
        groupId: '',
        groupName: '所有用户组',
        orgCode: 'apexCorp'
      },
      groupId: '',
      // 按钮权限
      permissionsButs: {
        edit: 'A01B05C12',
        add: 'A01B05C01',
        disable: 'A01B05C04',
        enable: 'A01B05C05',
        del: 'A01B05C06',
        reset: 'A01B05C07',
        delGroup: 'A01B05C09',
        addGroup: 'A01B05C11',
        editGroup: 'A01B05C13'
      }
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created() {
    this.getUserGroupFn()
  },
  methods: {
    /**
     * 用户组
     * isAdd：是否新增用户组名
     * gId:用户组名更新后刷新用户列表
     */
    async getUserGroupFn(isAdd = false, gId = -1) {
      this.userList = [{ ...this.userGroup }]
      let users = await getUserGroup()
      this.userList = this.userList.concat(users.data.data)
      let groupId = ''
      if (isAdd && gId == -1) {
        // 新增用户组名
        this.selectIndex = this.userList.length - 1 // 展示最新的用户组列表
        groupId = this.userList.slice(-1)[0].groupId // 取用户组最后一个用户的groupId
      }
      if (gId != -1) {
        groupId = gId
      }
      this.fetchData(groupId)
    },
    // 用户列表
    async fetchData(id = '') {
      this.groupId = id
      this.loading = true
      let params = {
        groupId: id,
        pageQueryParam: { ...this.queryParam }
      }
      let tabledata = await getUserPage(params)
      let list = tabledata.data.data.list
      let index = 0
      for (let item of list) {
        item.index = index++
        item.roleName = this.getGroupName(item.groupId)
        item.roleNames = this.getRoles(item.roles)
      }
      this.tableData = tabledata.data.data.list
      this.total = tabledata.data.data.total
      this.loading = false
    },
    // 获取用户组名
    getGroupName(id) {
      for (let user of this.userList) {
        if (user.groupId == id) {
          return user.groupName
        }
      }
    },
    // 获取角色
    getRoles(roles) {
      let name = ''
      for (let role of roles) {
        name += ' ' + role.roleName
      }
      return name
    },
    handleEdit(record) {
      this.$router.push({ path: `/system/management/edit/${record.userId}` })
    },
    handleDel(record) {
      let that = this
      this.$confirm({
        title: '确认要删除该用户吗?',
        onOk() {
          delUser({ userId: record.userId }).then(res => {
            if (res && res.status == 200) {
              that.$message.success('删除成功')
              that.fetchData(that.groupId)
            }
          })
        }
      })
    },
    // 重置密码
    handleReset(record) {
      resetUser({ userId: record.userId, resetUri: window.location.origin }).then(res => {
        if (res && res.status == 200) {
          this.$message.success('邮件发送成功')
        }
      })
    },
    // 禁用
    handleDisable(record) {
      let that = this
      this.$confirm({
        title: '确认要禁用该用户吗?',
        onOk() {
          disableUser({ userId: record.userId }).then(res => {
            if (res && res.status == 200) {
              that.$message.success('状态更新成功')
              that.fetchData(that.groupId)
            }
          })
        }
      })
    },
    // 启用
    handleEnable(record) {
      enableUser({ userId: record.userId }).then(res => {
        if (res && res.status == 200) {
          this.$message.success('状态更新成功')
          this.fetchData(this.groupId)
        }
      })
    },
    // 选中用户组
    handleClick(item, index) {
      this.selectIndex = index
      this.fetchData(item.groupId)
    },
    hanleChange(event) {
      this.queryParam.pageNo = event[0]
      this.queryParam.size = event[1]
      // table 默认每页条数
      this.pagination.pageSize = event[1]
      this.fetchData()
    },
    handleUserDel(item, index) {
      let that = this
      this.$confirm({
        title: '确认要删除该用户组吗?',
        content: '删除之后不可复原',
        onOk() {
          delUserGroup({ groupId: item.groupId }).then(res => {
            if (res && res.status == 200) {
              that.$message.success('删除用户组成功')
              that.deleteUserSuccess(index)
            }
          })
        },
        onCancel() {}
      })
    },
    // 删除用户组成功
    async deleteUserSuccess(index) {
      let selectGroupId = this.userList[this.selectIndex].groupId
      this.userList = [{ ...this.userGroup }]
      let users = await getUserGroup()
      this.userList = this.userList.concat(users.data.data)
      // 删除的是选中的用户组 默认显示全部用户组
      if (index == this.selectIndex) {
        this.selectIndex = 0
        this.fetchData()
      } else {
        for (let i = 0, len = this.userList.length; i < len; i++) {
          if (selectGroupId == this.userList[i].groupId) {
            this.selectIndex = i
            break
          }
        }
      }
    },
    handleUserEdit(item, index) {
      this.editIndex = index
      this.inputVal = item.groupName
      this.$nextTick(() => {
        this.$refs['input' + index][0].focus()
      })
    },
    // 失焦处理
    handleBlur(item) {
      if (this.userCreated) return
      if (this.inputVal == '' || this.inputVal == item.groupName) {
        this.userCreated = false
        this.editIndex = -1
        return
      }
      this.userCreated = true
      let obj = {
        groupId: item.groupId,
        groupName: this.inputVal
      }
      saveUserGroup(obj)
        .then(res => {
          if (res && res.status == 200) {
            this.$message.success('更新用户组名成功')
            this.getUserGroupFn(false, item.groupId)
          }
        })
        .finally(() => {
          this.userCreated = false
          this.editIndex = -1
        })
    },
    handleCreateBlur() {
      this.isCreate = false
      if (this.userCreated) return
      if (this.createVal == '') {
        this.userCreated = false
        return
      }
      this.userCreated = true
      let obj = {
        groupName: this.createVal
      }
      saveUserGroup(obj)
        .then(res => {
          if (res && res.status == 200) {
            this.$message.success('创建用户组成功')
            this.getUserGroupFn(true)
          }
        })
        .finally(() => {
          this.userCreated = false
        })
    },
    handleCreate() {
      this.isCreate = true
      this.$nextTick(() => {
        this.createVal = ''
        this.$refs.createInput.focus()
      })
    },
    handleAdd() {
      this.$router.push({ path: '/system/management/create' })
    },
    isAdmin(roles) {
      let admin = true
      roles.forEach(v => {
        if (v.roleType === 2) {
          admin = false
        }
      })
      return admin
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
      // cursor: pointer;
      width: 100%;
      padding: 16px 14px 16px;
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
  .right-content {
    float: left;
    margin-left: 16px;
    width: calc(~'100% - 266px');
    height: 100%;
    background-color: #ffffff;
    /deep/ .ant-table-pagination {
      display: none;
    }
  }
  .myicon {
    margin-right: 10px;
    color: #666666;
  }
}
</style>
