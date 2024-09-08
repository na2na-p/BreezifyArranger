import { COMMON_SX_PROPS } from './Spacer.constants';
import type { SpacerProps } from './Spacer.types';

const useSpacer = ({ size, direction }: SpacerProps) => {
  const directionStyle =
    direction === 'HORIZONTAL'
      ? { width: size, height: 'auto', display: 'inline-block' }
      : { height: size, width: 'auto' };

  const style = { ...directionStyle, ...COMMON_SX_PROPS };

  return {
    directionStyle,
    style,
  } as const;
};

export default useSpacer;
