import React from "react";
import {
  ICalendarResponse,
  IConferenceEvent,
  IApplicationEvent,
} from "../../models/CalendarEvent";
import "./CalendarCard.scss";
import moment from "moment";
import DatesRemaining from "../DatesRemaining/DatesRemaining";

interface ICalendarCardProps {
  CardDetails: ICalendarResponse;
}

// this displays the calendar card depending on the input data: ICalendarResponse[]
// it is the responsibility of the API to return the correct data
export class CalendarCard extends React.Component<ICalendarCardProps, {}> {
  renderTitle = () => {
    return (
      <div className="title">
        <h1>{this.props.CardDetails.organization.short_name}</h1>
        <p className="blueText miniText">
          {this.props.CardDetails.organization.full_name}
        </p>
      </div>
    );
  };

  showEvents = () => {
    if (this.props.CardDetails.events) {
      return this.props.CardDetails.events.map(this.renderSingleEvent);
    } else {
      return <div />;
    }
  };

  renderSingleEvent = (eventDetails: IConferenceEvent) => {
    const dateMoment: any = moment.utc(eventDetails.start_date);
    var startDay: string = dateMoment.format("(dddd), MMM Do");
    var dateYear: string = dateMoment.format(", YYYY");
    var date: string = startDay + dateYear;
    if (eventDetails.end_date) {
      const endDateMoment: any = moment.utc(eventDetails.end_date);
      var endDay: string = endDateMoment.format(" - (dddd), MMM Do");
      date = startDay + endDay + dateYear;
    }
    return (
      <div className="eventDetails">
        <p className="blueText">{date}</p>
        <p className="miniText">
          {eventDetails.venue_name}, {eventDetails.venue_city}
        </p>
        {this.showEventTags(eventDetails)}
      </div>
    );
  };

  showEventTags = (eventDetails: IConferenceEvent) => {
    if (eventDetails.tags.length > 0) {
      return eventDetails.tags.map((tag: string, index: number) => {
        const info: string = eventDetails.tags[index];
        return (
          <span key={index} className="tag">
            <p>{info}</p>
          </span>
        );
      });
    }
  };

  renderApplications = () => {
    if (this.props.CardDetails.applications) {
      const allApps: IApplicationEvent[] = this.props.CardDetails.applications;
      return allApps.map(this.renderSingleApplication);
    }
  };

  renderSingleApplication = (app: IApplicationEvent, key: number) => {
    // const dateMoment: any = moment.utc(app.start_date);
    // const date: string = dateMoment.format("(dddd), MMM Do");
    var cost: string = "";
    if (app.cost) cost = "$" + app.cost.toString();
    return (
      <div className="AppDetails" key={key}>
        <div className="d-flex justify-content-between">
          <h5 className="weight-400">
              {app.name} {cost}
          </h5>
          <span>
            <button>
              <a
                className="applyBtn"
                href={app.applicationLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply
              </a>
            </button>
          </span>
        </div>
        <DatesRemaining
          key={key}
          startDate={app.start_date}
          endDate={app.end_date}
        />
        {/* <p className="miniText">{date}</p> */}
      </div>
    );
  };

  render() {
    return (
      <div className="CalendarCard">
        {this.renderTitle()}
        {this.showEvents()}
        {this.renderApplications()}
      </div>
    );
  }
}

export default CalendarCard;
