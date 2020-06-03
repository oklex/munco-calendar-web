import React from "react";
// import CalendarCard from "../../../components/SingleEventLink/CalendarCard";
// import { ICalendarResponse } from "../../../models/CalendarEvent";
import CalendarCard from '../../components/singleEventLink/CalendarCard'
import { ICalendarResponse } from '../../models/CalendarEvent'
import CalendarService from '../../services/CalendarService/CalendarService'
import "./Calendar.scss";
import Helmet from "react-helmet";

interface ICalendarState {
  allCalendarEvents: ICalendarResponse[];
  loading: boolean,
}

// enum CalendarFilterTypes {
//   staffApps = "Staff Applications",
//   secretariatApps = "Secretariat Applications",
//   delegateRegistration = "Delegate Registration",
//   volunteer = "Volunteer Opportunities"
// }

// this contains the page
// which contains search selection & carousel that contains Calendar cards
export class Calendar extends React.Component<{}, ICalendarState> {
  state = {
    allCalendarEvents: [],
    loading: true
  };

  componentDidMount = async () => {
    const allCalendarEvents: ICalendarResponse[] = await CalendarService.getAll();
    this.setState({
      allCalendarEvents: allCalendarEvents,
      loading: false
    });
  };

  renderArrow = (text: string, className: string) => {
    return <div className={className}>{text}</div>;
  };

  showAllCards = () => {
    if (this.state.loading === true) {
      return (<div className='errorMessage'>
        <h3>Loading...</h3>
      </div>)
    } else if (this.state.allCalendarEvents.length === 0) {
      return (
        <div className='errorMessage'>
          <h1>huh &#128552;</h1>
          <p>looks like there's nothing here <br/>check back later!</p>
        </div>
      );
    } else {
      return this.state.allCalendarEvents.map(
        (event: ICalendarResponse, key: number) => {
          if (
            !event.applications ||
            (event.applications && event.applications.length === 0)
          ) {
            return <div key={key}></div>; // omit no applications
          } else {
            return <CalendarCard key={key} CardDetails={event} />;
          }
        }
      );
    }
  };

  selectFilter = () => {
    return (
      <div className="filterBar">
        <div className="d-flex">
          <div>
            <h2>Filter by: </h2>
          </div>
          <div className='flex-grow-1 selection'>
            <p className='selectionText'>Applications</p>
          </div>
        </div>
        <ul>
    {/* <li>{CalendarFilterTypes.secretariatApps}</li>
    <li>{CalendarFilterTypes.staffApps}</li>
    <li>{CalendarFilterTypes.delegateRegistration}</li>
    <li>{CalendarFilterTypes.volunteer}</li> */}
        </ul>
      </div>
    );
  };

  render() {
    return (
      <div className="ConferenceCalendar">
        <Helmet>
          <title>Conference Applications</title>
          <meta
            name="description"
            content="Calendar for Model UN conferences in BC and internationally. See all dates and site links and more."
          />
          <link rel="canonical" href="https://wwww.munco.ca/calendar" />
        </Helmet>
        <div className="row">
          <div className="col-sm-6 colapseOnMobile">
            <div className="fixed-cover">
              <div className="title">
                <h1>Conference Calendar</h1>
                {this.selectFilter()}
                <div className="menu-tools">
                  <div className="menu-tag">
                    Do you manage a conference?
                    <p className="tooltiptext">
                      Tell us what dates you're planning!
                    </p>
                  </div>
                  <div className="menu-tag">
                    Report a problem
                    <p className="tooltiptext">
                      PM us on Facebook or Instagram!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="calendar-section">{this.showAllCards()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
