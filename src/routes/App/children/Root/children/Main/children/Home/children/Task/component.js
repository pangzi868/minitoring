import React from "react";
import "./component.scss";
import Split from "components/Split";
import task from "../../../../../../../../../../store/modules/task";

class BussinessRemind extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: {}
    };
  }

  componentDidMount() {}
  componentWillMount() {
    this.props.getTaskList();
  }
  componentWillReceiveProps(taskList) {
    if (taskList !== this.props.taskList) {
      this.setState({
        taskList
      });
    }
  }
  render() {
    let { taskList } = this.state;
    try {
      taskList = taskList.taskList.payload.uglyData;
    } catch (error) {
      taskList = [];
    }
    taskList = _formatData(taskList) || [];
    return (
      <div className="home-task-component">
        <Split title={"营销任务"} href={"/root/main/task"} />
        <div className="task-content">
          {taskList.map((item, index) => {
            return (
              <div className="task-item" key={index}>
                <div className="item content">
                  <p className="name">{item.value}</p>
                  <p className="tag">
                    <span className="create">{item.taskState}</span>
                    <span className="finish">{item.targetState}</span>
                  </p>
                </div>
                <div className="item time">
                  <p>{item.date}</p>
                  <p>{item.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const _formatData = res => {
  let hasTaskDay = [];
  res.forEach(item => {
    let taskBetweenTime =
      item.task.taskBeginTime.split(" ")[0] +
      "|" +
      item.task.taskEndTime.split(" ")[0];
    hasTaskDay.push({
      taskId: item.task.taskId,
      date: item.task.taskBeginTime.split(" ")[0],
      time: item.task.taskBeginTime.split(" ")[1],
      taskName: item.task.taskName,
      targetState: item.task.targetState,
      taskState: item.task.taskState,
      dateRange: taskBetweenTime
    });
  });
  let allTaskDays = [];

  hasTaskDay.forEach((task, index) => {
    var taskSplit = task.dateRange.split("|");
    var hasTaskDayArr = _getAll(taskSplit[0], taskSplit[1]);
    let currentTaskDay = hasTaskDayArr.map(item => {
      return {
        taskId: task.taskId,
        date: task.date,
        time: task.time,
        targetState: task.targetState,
        taskState: task.taskState,
        value: task.taskName
      };
    });
    allTaskDays = [...allTaskDays, ...currentTaskDay];
  });
  return allTaskDays;
};

const _getAll = (begin, end) => {
  var taskDay = [];
  var ab = begin.split("-");
  var ae = end.split("-");
  var db = new Date();
  db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
  var de = new Date();
  de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
  var unixDb = db.getTime();
  var unixDe = de.getTime();
  for (var k = unixDb; k <= unixDe; ) {
    taskDay.push(_dateFormat(new Date(parseInt(k))));
    k = k + 24 * 60 * 60 * 1000;
  }
  return taskDay;
};
const _dateFormat = date => {
  var s = "";
  var mouth =
    date.getMonth() + 1 >= 10
      ? date.getMonth() + 1
      : "0" + (date.getMonth() + 1);
  var day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
  s += date.getFullYear() + "-"; // 获取年份
  s += mouth + "-"; // 获取月份
  s += day; // 获取日
  return s; // 返回日期
};
export default BussinessRemind;
