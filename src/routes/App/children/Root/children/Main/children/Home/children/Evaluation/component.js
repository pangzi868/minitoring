import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { DatePicker, List } from 'antd-mobile'
import './component.scss'
import Split from 'components/Split'
import NoData from '../../images/no-data.svg'

class BussinessRemind extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			date: new Date(),
			activeIndex: 0,
			custEvaluation: [],
		}
		this.getCustEvaluation = this.getCustEvaluation.bind(this)
	}

	componentWillMount() {
		this.props.getCustEvaluation('contributionGrade')
	}
	componentWillReceiveProps({ custEvaluation }) {
		if (custEvaluation !== this.props.custEvaluation) {
			custEvaluation = custEvaluation.uglyData
			this.setState({
				custEvaluation,
			})
		}
	}
	getCustEvaluation(activeIndex) {
		if (activeIndex === this.state.activeIndex) return
		const typeMap = ['contributionGrade', 'loyaltyGrade', 'riskGrade']
		this.setState({
			activeIndex,
		})
		this.props.getCustEvaluation(typeMap[activeIndex])
		this.dateChangeHandler = this.dateChangeHandler.bind(this)
	}
	// 按日期排序
	sort(data = []) {
		var dateArr = []
		data = JSON.parse(JSON.stringify(data))
		if (!data[0]) return data
		if (data[0] && !data[0].rptTime) return data
		dateArr = data.map((item, index) => {
			return new Date(item.rptTime).getTime()
		})
		for (let i = 0; i < dateArr.length - 1; i++) {
			for (let j = i + 1; j < dateArr.length; j++) {
				if (dateArr[i] > dateArr[j]) {
					;[dateArr[i], dateArr[j]] = [dateArr[j], dateArr[i]]
					;[data[i], data[j]] = [data[j], data[i]]
				}
			}
		}
		return data
	}
	getOption(data) {
		let option = {
			title: {
				text: '',
			},
			color: ['#4F98EA', '#E67373', '#50BC4E', '#FABF26', '#82C1F4', '#00BBCA', '#B57BE9'],
			renderAsImage: true,
			calculable: true,
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow',
				},
				backgroundColor: 'rgba(255, 255, 255, 0.7)',
				borderRadius: 4,
				textStyle: {
					fontSize: 12,
					color: '#999999',
				},
				formatter: function(eventData) {
					// var e = window.event;
					// if (e.type === "click") {
					// _renderLoyaltyDetail(eventData[0].name)
					// }
					var dataShow = eventData.map(function(value) {
						return (
							'<div style="line-height: 18px; margin: 0 6px;">' +
							'<span style="display: inline-block; width: 10px; height: 10px; background-color: ' +
							value.color +
							'; margin-right: 5px;"></span>' +
							value.seriesName +
							'：' +
							value.value +
							'人' +
							'</div>'
						)
					})
					var dateArr = eventData[0].name.split('-')
					var dateStr = dateArr[0] + '年' + dateArr[1] + '月' + dateArr[2] + '日'
					return dateStr + dataShow.join('')
				},
			},
			legend: {
				data: [
					{
						name: '90-100分',
						icon: 'circle',
						textStyle: {
							color: '#4F98EA',
						},
					},
					{
						name: '80-90分',
						icon: 'circle',
						textStyle: {
							color: '#E67373',
						},
					},
					{
						name: '70-80分',
						icon: 'circle',
						textStyle: {
							color: '#50BC4E',
						},
					},
					{
						name: '60-70分',
						icon: 'circle',
						textStyle: {
							color: '#FABF26',
						},
					},
					{
						name: '50-60分',
						icon: 'circle',
						textStyle: {
							color: '#82C1F4',
						},
					},
					{
						name: '40-50分',
						icon: 'circle',
						textStyle: {
							color: '#00BBCA',
						},
					},
					{
						name: '40分以下',
						icon: 'circle',
						textStyle: {
							color: '#B57BE9',
						},
					},
        ],
        textStyle: {
          rich: {
            item: {
              width: 65,
            },
          },
        },
				selected: {
					'90-100分': true,
					'80-90分': true,
					'70-80分': true,
					'60-70分': false,
					'50-60分': false,
					'40-50分': false,
					'40分以下': false,
				},
				formatter: ['{item|{name}}'].join('\n'),
				right: 0,
				left: 0,
				top: 10,
        padding: [0, 10, 0, 10],
        // borderWidth: 1,
        // borderColor: "black",
				itemWidth: 10,
				itemHeight: 10,
				inactiveColor: '#666',
			},
			grid: {
				left: '0',
				right: '5%',
				bottom: '3%',
				containLabel: true,
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				axisLine: {
					lineStyle: {
						color: '#999',
						fontSize: '12px',
					},
				},
				axisLabel: {
					color: '#999',
					fontSize: '12',
					formatter: function(value, index) {
						var date = new Date(value)
						var texts = [date.getMonth() + 1, date.getDate()]
						if (index === 0) {
							texts.unshift(date.getFullYear())
						}
						return texts.join('/')
					},
					// rotate: 50
				},
				// data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
			},
			yAxis: {
				type: 'value',
				axisLine: {
					show: false,
				},
				axisLabel: {
					formatter: '{value}',
				},
			},
			series: [
				{
					name: '90-100分',
					type: 'line',
					smooth: true,
					data: ['60', '70', '45', '40', '55', '86', '88'],
				},
				{
					name: '80-90分',
					type: 'line',
					smooth: true,
					data: ['60', '70', '45', '40', '55', '86', '88'],
				},
				{
					name: '70-80分',
					type: 'line',
					smooth: true,
					data: ['60', '70', '45', '40', '55', '86', '88'],
				},
				{
					name: '60-70分',
					type: 'line',
					smooth: true,
					data: ['60', '70', '45', '40', '55', '86', '88'],
				},
				{
					name: '50-60分',
					type: 'line',
					smooth: true,
					data: ['60', '70', '45', '40', '55', '86', '88'],
				},
				{
					name: '40-50分',
					type: 'line',
					smooth: true,
					data: ['60', '70', '45', '40', '55', '86', '88'],
				},
				{
					name: '40分以下',
					type: 'line',
					smooth: true,
					data: ['60', '70', '45', '40', '55', '86', '88'],
				},
			],
		}
		let date = [],
			res_100 = [],
			res_90 = [],
			res_80 = [],
			res_70 = [],
			res_60 = [],
			res_50 = [],
			res_40 = []

		data.forEach(item => {
			date.push(item.rptTime)
			res_100.push(item.hundredMark)
			res_90.push(item.nintyMark)
			res_80.push(item.eightyMark)
			res_70.push(item.seventyMark)
			res_60.push(item.sixtyMark)
			res_50.push(item.fiftyMark)
			res_40.push(item.fortyMark)
		})
		option.xAxis.data = date
		option.series[0].data = res_100
		option.series[1].data = res_90
		option.series[2].data = res_80
		option.series[3].data = res_70
		option.series[4].data = res_60
		option.series[5].data = res_50
		option.series[6].data = res_40
		return option
	}
	dateChangeHandler(date) {
		this.setState({ date })
	}
	render() {
		let { custEvaluation } = this.state
		custEvaluation = this.sort(custEvaluation)
		const dateEvaluation = custEvaluation.filter(
			item => new Date(item.rptTime).getTime() === _getDate(this.state.date).getTime(),
		)
		return (
			<div className="home-evaluation-component">
				<Split title={'客户评价结果统计'} />
				<div className="tab-content">
					<div
						className={`item ${this.state.activeIndex === 0 ? 'active' : ''}`}
						onClick={() => {
							this.getCustEvaluation(0)
						}}
					>
						综合贡献度
					</div>
					<div
						className={`item ${this.state.activeIndex === 1 ? 'active' : ''}`}
						onClick={() => {
							this.getCustEvaluation(1)
						}}
					>
						忠诚度
					</div>
					<div
						className={`item ${this.state.activeIndex === 2 ? 'active' : ''}`}
						onClick={() => {
							this.getCustEvaluation(2)
						}}
					>
						风险度
					</div>
				</div>
				<ReactEcharts
					option={this.getOption(custEvaluation)}
					style={{ height: '300px', width: '100%' }}
					className="react_for_echarts"
					onEvents={this.onClickByModelEvents}
				/>
				<List
					className="date-picker-list"
					style={{
						backgroundColor: 'white',
						marginTop: '20px',
						color: '#666',
						fontSize: '26px',
					}}
				>
					<DatePicker
						mode="date"
						title="选择时间"
						extra=""
						value={this.state.date}
						onChange={date => this.dateChangeHandler(date)}
					>
						<List.Item arrow="horizontal" className="">
							<span>选择日期</span>
						</List.Item>
					</DatePicker>
				</List>
				{dateEvaluation && dateEvaluation.length ? (
					<div className="date-content">
						<div className="date-item">
							<p className="score">90-100分</p>
							<p className="number" style={{ color: '#4F98EA' }}>
								{dateEvaluation[0].hundredMark}
								<span className="unit">人</span>
							</p>
						</div>
						<div className="date-item">
							<p className="score">80-90分</p>
							<p className="number" style={{ color: '#E67373' }}>
								{dateEvaluation[0].nintyMark}
								<span className="unit">人</span>
							</p>
						</div>
						<div className="date-item">
							<p className="score">70-80分</p>
							<p className="number" style={{ color: '#50BC4E' }}>
								{dateEvaluation[0].eightyMark}
								<span className="unit">人</span>
							</p>
						</div>
						<div className="date-item">
							<p className="score">66-70分</p>
							<p className="number" style={{ color: '#FABF26' }}>
								{dateEvaluation[0].seventyMark}
								<span className="unit">人</span>
							</p>
						</div>
						<div className="date-item">
							<p className="score">50-60分</p>
							<p className="number" style={{ color: '#82C1F4' }}>
								{dateEvaluation[0].sixtyMark}
								<span className="unit">人</span>
							</p>
						</div>
						<div className="date-item">
							<p className="score">40-50分</p>
							<p className="number" style={{ color: '#00BBCA' }}>
								{dateEvaluation[0].fiftyMark}
								<span className="unit">人</span>
							</p>
						</div>
						<div className="date-item">
							<p className="score">40分以下</p>
							<p className="number" style={{ color: '#B57BE9' }}>
								{dateEvaluation[0].fortyMark}
								<span className="unit">人</span>
							</p>
						</div>
					</div>
				) : (
					<div className="no-data-wapper">
						<img alt="logo" src={NoData} className="no-data" />
						<p>暂无搜索结果</p>
					</div>
				)}
			</div>
		)
	}
}
const _getDate = date => {
	return new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
}
export default BussinessRemind
