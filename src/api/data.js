import { axios } from '@/utils/request'

/**
 * 获取table nature enum 信息 func
 * @param parameter
 * @returns {*}
 */
export function tableNatureEnumInfo(parameter) {
  return axios({
    url: '/etlTask/getTableNatureEnumInfo',
    method: 'get',
    params: parameter
  })
}

/**
 * 查询分组列表 func
 * @param parameter
 * @returns {*}
 */
export function tableGroupList(parameter) {
  return axios({
    url: '/cdp-etl/cdpTable/getTableGroupList',
    method: 'get',
    params: parameter
  })
}

/**
 * cdp table 列表 func
 * @param parameter
 * @returns {*}
 */
export function cdpTableList(parameter) {
  return axios({
    url: '/cdp-etl/etlTask/cdpTableList',
    method: 'post',
    data: parameter
  })
}

/**
 * 根据table id获取表的列 func
 * @param parameter
 * @returns {*}
 */
export function tableColumnsForMarkTag(parameter) {
  return axios({
    url: '/cdpTable/getTableColumnsForMarkTag',
    method: 'get',
    params: parameter
  })
}

/**
 * 任务列表查询 func
 * @param parameter
 * @returns {*}
 */
export function etlTaskList(parameter) {
  return axios({
    url: 'cdp-etl/etlTask/pageList',
    method: 'post',
    data: parameter
  })
}
/**
 * 数据源列表查询 func
 * @param parameter
 * @returns {*}
 */
export function dataSourceList(parameter) {
  return axios({
    url: 'cdp-etl/dataSource/pageList',
    method: 'post',
    data: parameter
  })
}

/**
 * 数据源列表查询 func
 * @param parameter
 * @returns {*}
 */
export function dataSourceType(parameter) {
  return axios({
    url: 'cdp-etl/dataSource/getAvailableDataSourceType',
    method: 'get',
    data: parameter
  })
}

/**
 * 新增数据源 func
 * @param parameter
 * @returns {*}
 */
export function saveDataSource(parameter) {
  return axios({
    url: 'cdp-etl/dataSource/save',
    method: 'post',
    data: parameter
  })
}

/**
 * 新增数据源--检测 func
 * @param parameter
 * @returns {*}
 */
export function checkDataSource(parameter) {
  return axios({
    url: 'cdp-etl/jobApi/testDbConnect',
    method: 'get',
    params: parameter
  })
}
/**
 * 编辑数据源--检测 func
 * @param parameter
 * @returns {*}
 */
export function checkEditDataSource(parameter) {
  return axios({
    url: 'cdp-etl/dataSource/testConsumerConnectKafka',
    method: 'post',
    data: parameter
  })
}

/**
 * 删除数据源 func
 * @param parameter
 * @returns {*}
 */
export function deleteDataSource(parameter) {
  return axios({
    url: 'cdp-etl/dataSource/delete',
    method: 'get',
    params: parameter
  })
}
