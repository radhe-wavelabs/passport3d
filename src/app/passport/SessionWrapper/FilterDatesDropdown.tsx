import React from 'react';
import { getShortDateInLocalFormat } from '../../../lib/helpers/dateHelper';

interface IProps {
  onChangeSelection: (selectedDate: string) => void,
  dateOptions: string[],
  selectedDate: string,
  eventTimeZone: string
}

const FilterDatesDropdown: React.FC<IProps> = (props: IProps): JSX.Element | null => {
  const getDateInShortFormat = (date: string) => {
    return getShortDateInLocalFormat(new Date(date), props.eventTimeZone);
  };

  return (
    <div className='relative'>
      <div className='bg-primary-light py-1 px-2 rounded-5px truncate cursor-pointer w-full leading-4 flex justify-between'>
        <div className='font-size-12px font-medium'>{getDateInShortFormat(props.selectedDate)}</div>
        <div className='font-size-14px'>&#x25BE;</div>
      </div>
      <select
        className='absolute left-0 top-0 font-size-12px px-1 h-full opacity-0 z-10 w-full'
        onChange={(e) => props.onChangeSelection(e.target.value)}
        value={props.selectedDate}
      >
        {props.dateOptions.map(d => <option key={d} value={d}>{getDateInShortFormat(d)}</option>)}
      </select>
    </div>
  );
};

export default FilterDatesDropdown;
