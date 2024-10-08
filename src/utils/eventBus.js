import Vue from 'vue'

const bus = new Vue()

export default {
    /**
     * 注册全局事件
     * @param eventName 事件名称
     * @param handler 事件处理函数
     * @param scope vm对象，一般传this 建议必须要传（页面的this），自动销毁功能
     * @param once 是否单次注册
     */
    on(eventName, handler, scope = null, once = false) {
        if (once) {
            bus.$once(eventName, handler)
            return
        }
        bus.$off(eventName)
        bus.$on(eventName, handler)
        if (scope) {
            let originalDestroy = scope.$destroy
            scope.$destroy = function() {
                bus.$off(eventName, handler)
                originalDestroy.call(this)
            }
        }
    },
    off: (type, handler) => {
        if (!type) {
            delete EventStore[uid]
            bus.$off()
            return
        }
        const key = Array.isArray(type) ? type.join(',') : type
            // 删除对应的事件
        delete EventStore[uid][key]
        bus.$off(type, handler)
    },
    /**
     * 触发事件
     * @param eventName 要触发的事件名称
     * @param data 事件对象
     */
    emit(eventName, data = {}) {
        bus.$emit(eventName, data)
    },
}