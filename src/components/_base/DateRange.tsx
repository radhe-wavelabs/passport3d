import React from "react";
import {
  getCurrentTimezone,
  getFullDateInLocalFormat,
} from "../../lib/helpers/dateHelper";

export type DateRangeProps = {
  startTime: string;
  endTime: string;
  timeZone?: string;
};

const DateRange: React.FC<DateRangeProps> = ({
  startTime,
  endTime,
  timeZone,
}) => {
  //Set current timezone if no timezone passed.
  const formattedTimezone = timeZone || getCurrentTimezone();
  const formattedStartTime = getFullDateInLocalFormat(
    startTime,
    formattedTimezone
  );
  const formattedEndTime = getFullDateInLocalFormat(endTime, formattedTimezone);
  const isSameDate = formattedStartTime === formattedEndTime;

  return (
    <div className={`text-white text-17px p-2`}>
      <div>{formattedStartTime}</div>
      {!isSameDate && (
        <>
          <div>To</div>
          <div>{formattedEndTime}</div>
        </>
      )}
    </div>
  );
};

export default DateRange;
