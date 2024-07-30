// Importing SVG files
import Arrow from '../../assets/svg/arrow.svg';
import Back from '../../assets/svg/back.svg';
import Tick from '../../assets/svg/tick.svg';
import LikeButton from '../../assets/svg/LikeButton.svg';
import BackgroundImage from '../../assets/svg/background-image.svg';
import LessBack from '../../assets/svg/lessback.svg';
import SlideArrow from '../../assets/svg/slidearrow.svg';
import Chat from '../../assets/svg/chat.svg';
import Pin from '../../assets/svg/pin.svg';
import ThreeDot from '../../assets/svg/threedot.svg';
import DropdownImg from '../../assets/svg/dropdown-img.svg';
import Realate from '../../assets/svg/realate-icon.svg';
import Stop from '../../assets/svg/stop.svg';
import Reload from '../../assets/svg/reload.svg';

// Define components
export const ArrowIcon = ({w = 30, h = 30, size}) => (
  <Arrow height={size ?? h} width={size ?? w} />
);

export const ReloadIcon = ({w = 30, h = 30, size}) => (
  <Reload height={size ?? h} width={size ?? w} />
);
export const StopIcon = ({w = 30, h = 30, size}) => (
  <Stop height={size ?? h} width={size ?? w} />
);

export const BackIcon = ({w = 30, h = 30, size}) => (
  <Back height={size ?? h} width={size ?? w} />
);

export const TickIcon = ({w = 30, h = 30, size}) => (
  <Tick height={size ?? h} width={size ?? w} />
);

export const LikeButtonIcon = ({w = 30, h = 30, size}) => (
  <LikeButton height={size ?? h} width={size ?? w} />
);

export const BackgroundImageIcon = ({w = 30, h = 30, size}) => (
  <BackgroundImage height={size ?? h} width={size ?? w} />
);

export const LessBackIcon = ({w = 30, h = 30, size}) => (
  <LessBack height={size ?? h} width={size ?? w} />
);

export const SlideArrowIcon = ({w = 30, h = 30, size}) => (
  <SlideArrow height={size ?? h} width={size ?? w} />
);

export const ChatIcon = ({w = 30, h = 30, size}) => (
  <Chat height={size ?? h} width={size ?? w} />
);

export const PinIcon = ({w = 30, h = 30, size}) => (
  <Pin height={size ?? h} width={size ?? w} />
);

export const ThreeDotIcon = ({w = 30, h = 30, size}) => (
  <ThreeDot height={size ?? h} width={size ?? w} />
);

export const DropdownImgIcon = ({w = 30, h = 30, size}) => (
  <DropdownImg height={size ?? h} width={size ?? w} />
);

export const RealateIcon = ({w = 30, h = 30, size}) => (
  <Realate height={size ?? h} width={size ?? w} />
);
