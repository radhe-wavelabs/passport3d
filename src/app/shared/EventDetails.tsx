import React from "react";
import { utcToZonedTime } from "date-fns-tz";
import { EventPublicDetailsResponseType } from "../../lib/api";
import { getFormatTimezone } from "../../lib/helpers/dateHelper";
import DateRange from "../../components/_base/DateRange";
import useSetKeyIdClass from "../../hooks/use-set-key-id-class";
import clientLogo from "../../Assets/provenance-trust-vertical.png";

type PropsType = {
  details: {
    endTime: string;
    startTime: string;
    name: string;
    timeZone: string;
    logoTitle?: string;
    logoUrl?: string;
  } & Partial<EventPublicDetailsResponseType>;
};

const EventDetails: React.FC<PropsType> = (props: PropsType) => {
  const { endTime, startTime, name, timeZone, logoTitle, logoUrl } =
    props.details;
  const startDateTime = utcToZonedTime(startTime, timeZone);
  const eventOffsetGMT = getFormatTimezone(startDateTime, timeZone);

  const wrapperCssClass =
    "w-100 overflow-hidden flex flex-col md:flex-row justify-start md:justify-between mt-6 px-4 md:px-0 items-start";
  const headerCssClass = "font-bold text-left md:text-right ";
  const classNameEventDetails =
    "editable-" + useSetKeyIdClass() + "-event-details";
  const classNameEventDetailsName = `${classNameEventDetails}--name`;
  const classNameEventDetailsDate = `${classNameEventDetails}--date`;
  const classNameEventDetailsImage = `${classNameEventDetails}--image`;
  const classNameEventDetailsWrapper = `${classNameEventDetails}--wrapper`;
  const classNameEventDetailsTimeZone = `${classNameEventDetails}--time-zone`;

  return (
    <>
      <div className="img-wapper">
        <img
          src={clientLogo}
          alt={logoTitle}
          title={logoTitle}
          // className={`${classNameEventDetailsImage} max-w-xs`}
          style={{ objectFit: "contain", maxHeight: "8rem", height: "inherit" }}
        />
      </div>
      <div className="client-text">
        <p>{name}</p>
        {/* <div
            className={`${classNameEventDetailsDate} text-primary font-size-12px ${headerCssClass} uppercase flex justify-start md:justify-end`}
            style={{ letterSpacing: '0.6px' }}
          >
            <DateRange startTime={startTime} endTime={endTime} timeZone={timeZone}/>
          </div> */}
        {/* <p className={`${classNameEventDetailsTimeZone} text-gray-500 font-size-12px ${headerCssClass}`}>
            {eventOffsetGMT}
          </p> */}
      </div>
    </>
  );
};

export default EventDetails;
