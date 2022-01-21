import moment from "moment";

export const getTimeString = (time) => {
  if (moment().startOf("month").diff(time, "months") === 0)
    if (moment().startOf("day").diff(time, "days") === 0)
      return moment(time).format("HH:mm");
    else return moment(time).format("D MMM");
  else return moment(time).format("DD/MM/YY");
};
