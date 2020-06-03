import { ICalendarResponse } from "../../models/CalendarEvent";
import { conferenceAPI } from "../constants";

export const CalendarService = {
  async getAll(): Promise<ICalendarResponse[]> {
    try {
      const { data } = await conferenceAPI.get('/api/applications/all')
      return data
    } catch (err) {
      return [];
    }
  },
  async getUpcoming(): Promise<ICalendarResponse[]> {
    try {
      const { data } = await conferenceAPI.get('/api/applications/upcoming')
      return data
    } catch (err) {
      return [];
    }
  }
};

export enum sortBy {
  name,
  application,
  event
}

export default CalendarService;
