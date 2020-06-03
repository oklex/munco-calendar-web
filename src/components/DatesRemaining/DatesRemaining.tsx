import React from "react";
import "./DatesRemaining.scss";
import moment, { Moment } from "moment";

interface IDatesRemainingProps {
  startDate: Date;
  endDate: Date;
  currentDate?: Date;
}

interface IDatesRemainingState {
  currentDate: Date;
  oneWeekFromNow: Moment;
  startMoment: Moment;
  endMoment: Moment;
  startDateText: string;
  endDateText: string;
  timerBarClass: TimerBarClass | null;
  timerDisplayDate: Date | null;
  timerDescription: string | null;
}

enum TimerBarClass {
  WAITING = "waiting",
  OPEN = "open",
  CLOSED = "closed",
}

class DatesRemaining extends React.Component<
  IDatesRemainingProps,
  IDatesRemainingState
> {
  state: IDatesRemainingState = {
    currentDate: this.props.currentDate ? this.props.currentDate : new Date(),
    startMoment: moment(this.props.startDate).startOf('day'),
    endMoment: moment(this.props.endDate).endOf('day'),
    startDateText: moment(this.props.startDate).format("(dddd), MMM Do"),
    endDateText: moment(this.props.endDate).format("(dddd), MMM Do"),
    oneWeekFromNow: moment(new Date()).add(7, "days"),
    timerBarClass: null,
    timerDisplayDate: null,
    timerDescription: null,
  };

  componentDidMount = () => {
    console.log(this.props, " c. ", this.state);
    console.log("date test: ", new Date(this.props.endDate));
    if (this.state.endMoment.isBefore()) {
      console.log(
        "ended on: ",
        this.props.endDate,
        "it is currently",
        this.state.currentDate,
        this.state.endDateText
      );
      this.setState({
        timerBarClass: TimerBarClass.CLOSED,
        timerDisplayDate: this.props.endDate,
        timerDescription: "closed on " + this.state.endDateText,
      });
    } else if (this.state.startMoment.isBefore()) {
      // has started
      if (
        this.state.endMoment.isSame(moment(), "day") &&
        this.state.endMoment.isSame(moment(), "month")
      ) {
        console.log(
          "closing today",
          this.props.endDate,
          this.state.currentDate
        );
        this.setState({
          timerBarClass: TimerBarClass.OPEN,
          timerDisplayDate: this.props.endDate,
          timerDescription: "closing today! " + this.state.endDateText,
        });
      } else if (
        this.state.endMoment.isBefore(this.state.oneWeekFromNow) 
      ) {
        console.log("closing soon", this.props.endDate, this.state.currentDate);
        this.setState({
          timerBarClass: TimerBarClass.OPEN,
          timerDisplayDate: this.props.endDate,
          timerDescription: "closing soon; on " + this.state.endDateText,
        });
      } else {
        console.log("closing later");
        this.setState({
          timerBarClass: TimerBarClass.OPEN,
          timerDisplayDate: this.props.endDate,
          timerDescription: "started; closing on " + this.state.endDateText,
        });
      }
    } else if (this.state.startMoment.isAfter()) {
      // has not yet started
      this.setState({
        timerBarClass: TimerBarClass.WAITING,
        timerDisplayDate: this.props.startDate,
        timerDescription: "opens on " + this.state.startDateText,
      });
    } else {
      throw Error("dates comparisons failed");
    }
  };

  renderDateDescription = () => {
    return <p className="miniText">{this.state.timerDescription}</p>;
  };

  renderTimerBar = () => {
    if (this.state.timerBarClass && this.state.timerDisplayDate) {
      const comingDate: Date = this.state.timerDisplayDate;
      const segmentLimit: number = 21;
      const segments: number = this.getDaysUntil(comingDate);
      if (segments > segmentLimit) {
        // return a solid bar
        return <div className={this.state.timerBarClass + "-full"}></div>;
      } else {
        console.log(segments);
        return (
          <div className={this.state.timerBarClass}>
            {this.renderSegments(segments)}
          </div>
        );
      }
    } else {
      return <div>no data</div>;
    }
  };

  renderSegments = (n: number) => {
    let returnJSX: JSX.Element[] = [];

    for (var i: number = 0; i < n; i++) {
      returnJSX.push(
        <div
          key={i}
          className={
            "s-" +
            i +
            " " +
            "segment" +
            " " +
            "segment-" +
            this.state.timerBarClass
          }
        ></div>
      );
    }
    return returnJSX;
  };

  getDaysUntil = (comingDate: Date) => {
    let millisecondsPerDay = 1000 * 60 * 60 * 24;
    let comingTime: Moment = moment(comingDate)
    let currentTime: Moment = moment(this.state.currentDate)
    let millisBetween = comingTime.diff(currentTime);
    let days = millisBetween / millisecondsPerDay;
    console.log("days until: ", comingDate, Math.ceil(days));
    return Math.ceil(days);
  };

  render() {
    return (
      <div>
        <div className="date-indicator">{this.renderTimerBar()}</div>
        {this.renderDateDescription()}
      </div>
    );
  }
}

export default DatesRemaining;
