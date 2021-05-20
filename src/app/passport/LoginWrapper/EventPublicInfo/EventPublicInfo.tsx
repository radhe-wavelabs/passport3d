import React from "react";
import DateRange from "../../../../components/_base/DateRange";
import TextAsHTML from "../../../../components/_base/TextAsHTML";
import { EventPublicDetailsResponseType } from "../../../../lib/api";
import useSetKeyIdClass from "../../../../hooks/use-set-key-id-class";
import Icon from "../../../../components/_base/Icon";
import clientLogo from "../../../../Assets/provenance-trust-vertical.png";

interface EventPublicInfoInterface {
  data: EventPublicDetailsResponseType;
}

const EventPublicInfo: React.FC<EventPublicInfoInterface> = (props) => {
  const {
    name,
    startTime,
    endTime,
    publicDescription,
    timeZone,
    logoUrl,
    logoTitle,
  } = props.data;
  const key = useSetKeyIdClass();
  const className = key ? `editable-${key}` : "editable-sign-in";
  const classNameContainer = `${className}--left-content`;
  const classNameTitle = `${className}--left-content-title`;
  const classNameDate = `${className}--left-content-date`;
  const classNameDescription = `${className}--left-content-description`;
  return (
    <div
      className="container"
      // className={`${classNameContainer} ml-6 lg:ml-0 w-full md:w-2/3 pr-12`}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={clientLogo}
          alt={logoTitle}
          title={logoTitle}
          style={{ objectFit: "contain", maxHeight: "8rem" }}
        />
      </div>
      <div
        className={`${classNameTitle} text-white text-22px  p-3`}
        // className={`${classNameTitle} header-font-size font-bold text-primary line-height-22px header-line truncate-advanced-2 mt-5`}
        title={name}
      >
        {name}
      </div>
      <hr />
      <div
      // className={`${classNameDate} text-primary font-bold mt-2 uppercase text-sm`}
      >
        <DateRange
          startTime={startTime}
          endTime={endTime}
          timeZone={timeZone}
        />
      </div>
      <div className={`fill-current text-white`} style={{ marginTop: "7%" }}>
        <Icon.DownArrow width="35px" height="35px" />
      </div>

      {/* <div
        className={`${classNameDescription} mt-5 text-sm truncate-advanced-3`}
      >
        <TextAsHTML formattedText={publicDescription} />
      </div> */}
    </div>
  );
};

export default EventPublicInfo;
