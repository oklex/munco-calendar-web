import React from "react";
// import CalendarCard from "../../../components/SingleEventLink/CalendarCard";
// import { ICalendarResponse } from "../../../models/CalendarEvent";
import CalendarCard from "../../components/singleEventLink/CalendarCard";
import { ICalendarResponse } from "../../models/CalendarEvent";
import CalendarService from "../../services/CalendarService/CalendarService";
import "./Calendar.scss";
import Helmet from "react-helmet";
import ReactTooltip from "react-tooltip";

interface ICalendarState {
  allCalendarEvents: ICalendarResponse[];
  loading: boolean;
  selectedFilter: CalendarFilterTypes;
}

enum CalendarFilterTypes {
  allApps = "All Applications",
  staffApps = "Staff Applications",
  secretariatApps = "Secretariat Applications",
  delegateRegistration = "Delegate Registration",
  volunteer = "Volunteer Opportunities",
}

const allCalendarFilterTypes: CalendarFilterTypes[] = [
  CalendarFilterTypes.allApps,
  CalendarFilterTypes.staffApps,
  CalendarFilterTypes.secretariatApps,
  CalendarFilterTypes.delegateRegistration,
  CalendarFilterTypes.volunteer,
];

// this contains the page
// which contains search selection & carousel that contains Calendar cards
export class Calendar extends React.Component<{}, ICalendarState> {
  state = {
    allCalendarEvents: [],
    selectedFilter: CalendarFilterTypes.allApps,
    loading: true,
  };

  componentDidMount = async () => {
    const allCalendarEvents: ICalendarResponse[] = await CalendarService.getAll();
    this.setState({
      allCalendarEvents: allCalendarEvents,
      loading: false,
    });
  };

  renderArrow = (text: string, className: string) => {
    return <div className={className}>{text}</div>;
  };

  showAllCards = () => {
    if (this.state.loading === true) {
      return (
        <div className="errorMessage">
          <h3>Loading...</h3>
        </div>
      );
    } else if (this.state.allCalendarEvents.length === 0) {
      return (
        <div className="errorMessage">
          <h1>oops &#128552;</h1>
          <p>
            we encountered some problem <br />
            check back later!
          </p>
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
          <div className="flex-grow-1 selection">
            <p className="selectionText">Applications</p>
          </div>
        </div>
        <ul>{this.showAllFilterOptions()}</ul>
      </div>
    );
  };

  filterOptions = () => {
    return (
      <div className="filterBar">
        <div className="d-flex">
          <div>
            <h2>Filter by: </h2>
          </div>
          <div className="dropdown flex-grow-1 selection">
            <button
              className="btn selectionBtn selectionText dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.state.selectedFilter}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {this.showAllFilterOptions()}
            </div>
          </div>
        </div>
      </div>
    );
  };
  showAllFilterOptions = () => {
    return allCalendarFilterTypes.map((type: string) => {
      if (type != this.state.selectedFilter) {
        return (
          <span
            className="filterOption notAvailable dropdown-item"
            data-tip="option not available yet"
          >
            {type}
          </span>
        );
      }
    });
  };

  render() {
    return (
      <div className="ConferenceCalendar">
        <ReactTooltip />
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
                {this.filterOptions()}
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
