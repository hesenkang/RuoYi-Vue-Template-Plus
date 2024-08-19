<template>
    <div ref="chart" id="chart"></div>
</template>

<script>
export default {
	props: {
		options: {
			type: Object,
			required: true
		},
		//自定义调整尺寸
		resize: Function,
		//可选dark
		mode: String
	},
	data() {
		return {
			chart: null,
			appkey: Math.random(),
			domWidth: 0,
			domHeight: 0
		}
	},
	watch: {
		options(obj) {
			if (obj) {
				this._setOption(obj,true);
			}
		}
	},
	mounted() {
		this.chart = this.$echarts.init(this.$refs.chart, this.mode);
		if (this.options) {
			if (this.$HE.isFunction(this.resize)) {
				this.resize({ chart: this });
			} else {
				this._setOption(this.options, true);
			}
		}
		window.addEventListener('resize', this._resize);
	},
	destroyed() {
		window.removeEventListener('resize', this._resize);
		if (this.chart) {
			this.chart.dispose();
			this.chart = null;
		}
	},
	methods: {
		_resize() {
			this.$HE.throttle(`${this.appkey}:resize`, () => {
				let { clientHeight, clientWidth } = this.$refs.chart || {};
				let { domWidth, domHeight } = this;
				if (clientHeight && clientWidth) {
					this.domWidth = clientWidth;
					this.domHeight = clientHeight;
					if (domHeight != clientHeight || domWidth != clientWidth) {
						if (this.$HE.isFunction(this.resize)) {
							//自定义resize
							this.resize({ chart: this });
						}
						this.chart?.resize();
					}
				}
			});
		},
		/**
		 * @param {Object} option 图表的配置项和数据
		 * @param {Boolean} notMerge 可选。用户可以在这里指定一个或多个组件，如：xAxis, series，这些指定的组件会进行 "replaceMerge"。如果用户想删除部分组件，也可使用 "replaceMerge"。
		 * @param {Boolean} lazyUpdate 可选 在设置完 option 后是否不立即更新图表，默认为 false，即同步立即更新。
		 */
		_setOption(option, notMerge, lazyUpdate) {
			this.chart.setOption(option, notMerge, lazyUpdate);
		}
	}
}
</script>

<style scoped>
    #chart {
        width: 100%;
        height: 100%;
    }
</style>