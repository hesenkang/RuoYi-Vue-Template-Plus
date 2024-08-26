export const ALARM_LEVEL_ENUM = [
  { label: '提示', value: 1, color: '' },
  { label: '一般', value: 2, color: '' },
  { label: '警示', value: 3, color: '' },
  { label: '重要', value: 4, color: '#E6A23C' },
  { label: '紧急', value: 5, color: '#F56C6C' },
]

// 开户管理配置
export const UserStatus = [
  { label: '未开户', value: '0' },
  { label: '已开户', value: '1' },
]

// 计费方案配置

// 计费类型
export const ChargeType = [
  { label: '电', value: '1' },
  { label: '水', value: '2' },
  { label: '气', value: '3' },
]

// 计费方式
export const ChargeMethod = [
  { label: '单价', value: '1' },
  { label: '时段单价', value: '2' },
  { label: '复费率', value: '3' },
]

// 计费状态
export const ChargeStatus = [
  { label: '禁用', value: '0' },
  { label: '启用', value: '1' },
]