import React, { useCallback, useLayoutEffect } from 'react';
import Icon from '../../../components/_base/Icon';

export interface IPagination {
  firstIndex: number,
  lastIndex: number,
  step: number
}
interface IProps extends IPagination {
  setPaginationConfig: (pagination: IPagination) => void,
  trackLength: number,
  pageContentBlock: HTMLDivElement | null,
  itemWidth: number
}
const pageValues = {
  indexDecrease: 1,
  zeroIndex: 0,
  minSize: 1,
  maxSize: 6,
  itemPaddingWidth: 16,
  reservedWidth: 220
};

const SessionsPagination: React.FC<IProps> = (props: IProps) => {
  const { trackLength, setPaginationConfig, pageContentBlock, step, itemWidth } = props;

  const changePaginationStep = useCallback(() => {
    if (!pageContentBlock) return;
    const width = pageContentBlock.offsetWidth;
    let newStep = Math.floor((width - pageValues.reservedWidth) / (itemWidth + pageValues.itemPaddingWidth));
    newStep = Math.max(newStep, pageValues.minSize);
    newStep = Math.min(newStep, pageValues.maxSize);
    if (newStep !== step) {
      setPaginationConfig({ firstIndex: 0, lastIndex: newStep - pageValues.indexDecrease, step: newStep });
    }
  }, [pageContentBlock, setPaginationConfig, itemWidth, step]);

  useLayoutEffect(() => {
    const lastIndex = Math.min(trackLength - pageValues.indexDecrease, step - pageValues.indexDecrease );
    setPaginationConfig({ firstIndex: pageValues.zeroIndex, step: step, lastIndex });
  }, [trackLength, setPaginationConfig, step]);

  useLayoutEffect(() => {
    changePaginationStep();
    window.addEventListener('resize', changePaginationStep);
    return () => window.removeEventListener('resize', changePaginationStep);
  }, [pageContentBlock, changePaginationStep]);

  const increasePages = () => {
    let firstIndex = Math.min(trackLength - pageValues.indexDecrease, props.lastIndex + step);
    firstIndex = Math.max(pageValues.zeroIndex, firstIndex - step + pageValues.indexDecrease);
    const lastIndex = Math.min(trackLength - pageValues.indexDecrease, props.lastIndex + step);
    setPaginationConfig({ firstIndex, lastIndex, step: step });
  };
  const decreasePages = () => {
    const firstIndex = Math.max(pageValues.zeroIndex, props.firstIndex - step);
    const lastIndex = Math.max(pageValues.zeroIndex, props.firstIndex - step) + step - pageValues.indexDecrease;
    setPaginationConfig({ firstIndex, lastIndex, step: step });
  };

  if (!pageContentBlock || !step || trackLength < step + pageValues.indexDecrease) return null;
  return (
    <div className='w-50px text-center text-primary flex py-2.5 items-center'>
      <span
        className={props.firstIndex ? 'cursor-pointer' : 'opacity-20'}
        onClick={decreasePages}
      ><Icon.RightArrow className='fill-primary transform rotate-180' /></span>
      <span
        className={'pl-1 sm:pl-2 ' + ( props.lastIndex + pageValues.indexDecrease !== trackLength ? 'cursor-pointer' : 'opacity-20')}
        onClick={increasePages}
      ><Icon.RightArrow className='fill-primary' /></span>
    </div>
  );
};

export default SessionsPagination;
