import moment from "moment";

export function toRelative(date: Date) {
  const dateFormat = "YYYY-MM-DD";
  const statusDate = moment.utc(date, dateFormat).format(dateFormat);
  const today = moment.utc().format(dateFormat);
  const relativeStatusDate = moment(statusDate, dateFormat).from(today);
  let displayDate = statusDate == today ? "today" : relativeStatusDate;
  if (displayDate == "a day ago") {
    displayDate = "yesterday";
  }
  return displayDate;
}
