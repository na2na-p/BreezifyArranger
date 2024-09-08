import useSpacer from './Spacer.hooks';
import type { SpacerProps } from './Spacer.types';

/**
 * direction = VERTICALの場合、margin top/bottomと同じような使い方になります。
 */
const Spacer = ({ size, direction = 'VERTICAL' }: SpacerProps) => {
  const { style } = useSpacer({ size, direction });
  return (
    <>
      <div style={style} />
    </>
  );
};

export default Spacer;
