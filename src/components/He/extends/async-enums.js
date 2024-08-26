import request from "@/utils/request"

const EnumsMap = new Map()
// 仪表类型配置
const meterType = async (optionsKey) => {
  const config = {
    url: '/energy/type/list',
    method: 'get',
    params: {
      pageNum: 1,
      pageSize: 9999,
    }
  }
  const res = await request(config)
  const { code } = res
  if (code === 200) {
    const data = res.rows || res.list || res.data || []
    const newData = data.map(item => {
      return {
        label: item.energyName,
        value: item.meterType
      }
    })
    EnumsMap.set(optionsKey, newData)
    return newData
  }
}

const AsyncEnumMaps = {
  'meterType': meterType,
}
export default function getAsyncEnums (optionsKey) {
  return new Promise((resolve, reject) => {
    const getAsyncEnumsFnc = AsyncEnumMaps[optionsKey]
    if (EnumsMap.has(optionsKey)) {
      resolve(EnumsMap.get(optionsKey))
    } else if (getAsyncEnumsFnc) {
      resolve(getAsyncEnumsFnc(optionsKey))
    } else {
      reject(new Error(`getAsyncEnums: ${optionsKey}没有配置异步枚举`))
    }
  })
}