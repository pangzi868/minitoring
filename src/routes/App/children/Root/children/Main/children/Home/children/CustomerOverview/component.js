import React from 'react'
import ReactEcharts from 'echarts-for-react'
import './component.scss'
import Split from 'components/Split'
import { isArray } from 'util'

class BussinessRemind extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			custOverview: [],
		}
	}
	onClickByModelEvents = {
		click: function(e) {
			console.log(e)
		},
	}
	getOption(value) {
		/**
     * 图标所需数据
     */
		var data = {
			id: 'echartPie',
			value: [value.superNum, value.diamondNum, value.platinumNum, value.goldNum, value.proPacNum],
			legend: ['至尊卡', '钻石卡', '白金卡', '金卡', '普卡'],
			color: ['#FFE700', '#2CD9C5', '#FFC4F5', '#2D99FF', '#826AF9'],
		}
		/**
     * 数据处理
     */
		var seriesData = []
		data.value.forEach(function(item, index) {
			seriesData.push({
				value: item,
				name: data.legend[index],
			})
		})
		var option = {
			backgroundColor: '#fff',
			tooltip: {
				trigger: 'item',
				show: false,
			},
			// legend: {
			//     orient: 'horizontal',
			//     top: 16,
			//     icon: 'circle',
			//     selectedMode: false,
			//     itemWidth: 6,
			//     itemHeight: 6,
			//     itemGap: 6,
			//     borderRadius: 6,
			//     data: data.legend
			// },
			//     tooltip: {
			//     show:true,
			//     trigger: 'item',
			//     position: ['35%', '32%'],
			//     backgroundColor: 'implements',
			//     textStyle:{
			//         color: '#000000',
			//         fontStyle: 'normal',
			//         fontWeight: 'normal',
			//         fontFamily: 'sans-serif',
			//         fontSize: 14,
			//     },
			//     formatter: function(params){
			//         return formatter(params);
			//     }
			// },
			series: [
				{
					type: 'pie',
					radius: ['40%', '60%'],
					center: ['50%', '40%'],
					legendHoverLink: false,
					avoidLabelOverlap: false,
					// clickable:false,
					// selectedMode: 'single',//单点击设置
					// hoverAnimation: data.hoverAnimation === false ? false : true,
					// radius: ['40%', '67%'],
					color: data.color,
					label: {
						normal: {
							show: false,
							position: 'center',
							// position: "inner",
							// formatter: '{d}%',
							formatter: function(param) {
								if (!param.percent) return ''
								return Math.round(param.percent) + '%'
								// var f = Math.round(param.percent * 10) / 10;
								// console.log(param.percent)
								// var s = f.toString();
								// var rs = s.indexOf(".");
								// if (rs < 0) {
								//   rs = s.length;
								//   s += ".";
								// }
								// while (s.length <= rs + 1) {
								//   s += "0";
								// }
								// return s + "%";
							},
							textStyle: {
								// color: '#fff',
								fontSize: 12,
								align: 'center',
							},
						},
						emphasis: {
							show: 'center',
							formatter: function(param) {
								return `${param.data.name} \n ${param.data.value} \n ${param.percent}%` //"{b} \n {d}%"
							},
							textStyle: {
								fontSize: '20',
								fontWeight: 'bold',
							},
						},
					},
					labelLine: {
						normal: {
							show: false,
						},
					},
					data: seriesData,
				},
			],
		}
		return option
	}
	componentDidMount() {
		const myChart = this.reactEachartsPie.getEchartsInstance()
		myChart.on('mouseover', v => {
			if (v.dataIndex !== 0) {
				myChart.dispatchAction({
					type: 'downplay',
					seriesIndex: 0,
					dataIndex: 0,
				})
			}
		})
		myChart.on('mouseout', v => {
			myChart.dispatchAction({
				type: 'highlight',
				seriesIndex: 0,
				dataIndex: 0,
			})
		})
		// console.log(this.reactEachartsPie.getEchartsInstance())
	}
	componentWillMount() {
		this.props.getCustOverview()
	}
	componentWillReceiveProps({ custOverview }) {
		if (custOverview !== this.props.custOverview) {
			custOverview = _filterData(custOverview.uglyData)
			this.setState({
				custOverview,
			})
		}
	}
	componentDidUpdate() {
		const myChart = this.reactEachartsPie.getEchartsInstance()
		this.timer = setTimeout(() => {
			myChart.dispatchAction(
				{
					type: 'highlight',
					seriesIndex: 0,
					dataIndex: 0,
				},
			)
		}, 0)
	}
	render() {
		const { custOverview } = this.state
		return (
			<div className="home-overview-component">
				<Split title={'客服概览'} />
				<p className="title">
					总客户数：
					{custOverview.diamondNum +
						custOverview.goldNum +
						custOverview.platinumNum +
						custOverview.proPacNum +
						custOverview.superNum}
					人
				</p>
				<ReactEcharts
					ref={ref => (this.reactEachartsPie = ref)}
					option={this.getOption(custOverview)}
					style={{ height: '300px', width: '100%' }}
					className="react_for_echarts"
					onEvents={this.onClickByModelEvents}
					onMouse
				/>
			</div>
		)
	}

	componentWillUnmount() {
		clearTimeout(this.timer)
	}
}
const _filterData = data => {
	let ret = {}
	if (isArray(data) && data.length > 0) {
		ret = data[0]
		data.forEach(item => {
			if (new Date(item.rptTime).getTime() > new Date(data[0].rptTime).getTime()) {
				ret = item
			}
		})
	}
	return ret
}
export default BussinessRemind
