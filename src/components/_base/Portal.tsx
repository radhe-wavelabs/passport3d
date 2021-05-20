import { ReactNode, FunctionComponent, useEffect } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode
}
const mount = document.getElementById('portal-root') as HTMLElement;
const node = document.createElement('div');
export const Portal: FunctionComponent<Props> = (props: Props): JSX.Element => {

  useEffect(() => {
    mount.appendChild(node);
    return () => {
      mount.removeChild(node);
    };
  }, []);

  return createPortal(props.children, node);
};

export default Portal;
