import Rightarrow from '../../assets/svg/rightarrow.svg';
import CrossCancel from '../../assets/svg/CrossCancel.svg';
import Back from '../../assets/svg/back.svg';
import DropdownImg from '../../assets/svg/dropdown-img.svg';
import Logout from '../../assets/svg/logout.svg';
import Stop from '../../assets/svg/stop.svg';
import LikeButton from '../../assets/svg/LikeButton.svg';
import BackgroundImage from '../../assets/svg/background-image.svg';
import Equalizer from '../../assets/svg/equalizer.svg';
import Pin from '../../assets/svg/pin.svg';
import Setting from '../../assets/svg/setting.svg';
import Threedot from '../../assets/svg/threedot.svg';
import Add from '../../assets/svg/add.svg';
import Chat from '../../assets/svg/chat.svg';
import Heart from '../../assets/svg/heart.svg';
import Realate from '../../assets/svg/realate-icon.svg';
import Slidearrow from '../../assets/svg/slidearrow.svg';
import Tick from '../../assets/svg/tick.svg';
import Arrow from '../../assets/svg/arrow.svg';
import Delete from '../../assets/svg/delete.svg';
import LessBack from '../../assets/svg/lessback.svg';
import Reload from '../../assets/svg/reload.svg';
import Star from '../../assets/svg/star.svg';
import AppLogo from '../../assets/svg/applogo.svg';
import SelectedBox from '../../assets/svg/slectedBox.svg';
import UnselectedBox from '../../assets/svg/unselectedBox.svg';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';

// Define components
export const UnselectedBoxIcon = ({w = 30, h = 30, size}) => (
  <UnselectedBox height={size ?? h} width={size ?? w} />
);

// Define components
export const SelectedBoxIcon = ({w = 30, h = 30, size}) => (
  <SelectedBox height={size ?? h} width={size ?? w} />
);

// Define components
export const AppLogoIcon = ({w = 30, h = 30, size}) => (
  <AppLogo height={size ?? h} width={size ?? w} />
);

// Define components
export const RightarrowIcon = ({w = 30, h = 30, size}) => (
  <Rightarrow height={size ?? h} width={size ?? w} />
);

export const AddIcon = ({w = 30, h = 30, size}) => (
  <Add height={size ?? h} width={size ?? w} />
);

export const HeartIcon = ({w = 30, h = 30, size}) => (
  <Heart height={size ?? h} width={size ?? w} />
);

export const CrossCancelIcon = ({w = 30, h = 30, size}) => (
  <CrossCancel height={size ?? h} width={size ?? w} />
);

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

export const BackButtonIcon = ({w = 25, h = 25, size, onPress}) => {
  const {goBack} = useNavigation();
  return (
    <TouchableOpacity
      style={{marginTop: '7%', marginLeft: '4%'}}
      activeOpacity={0.5}
      onPress={() => {
        if (!onPress) {
          goBack();
        } else {
          onPress();
        }
      }}>
      <LessBack height={size ?? h} width={size ?? w} />
    </TouchableOpacity>
  );
};

export const LessBackIcon = ({w = 25, h = 25, size}) => (
  <LessBack height={size ?? h} width={size ?? w} />
);

export const SlideArrowIcon = ({w = 30, h = 30, size}) => (
  <Slidearrow height={size ?? h} width={size ?? w} />
);

export const ChatIcon = ({w = 30, h = 30, size}) => (
  <Chat height={size ?? h} width={size ?? w} />
);

export const PinIcon = ({w = 30, h = 30, size}) => (
  <Pin height={size ?? h} width={size ?? w} />
);

export const ThreeDotIcon = ({w = 30, h = 30, size}) => (
  <Threedot height={size ?? h} width={size ?? w} />
);

export const DropdownImgIcon = ({w = 30, h = 30, size}) => (
  <DropdownImg height={size ?? h} width={size ?? w} />
);

export const RealateIcon = ({w = 30, h = 30, size}) => (
  <Realate height={size ?? h} width={size ?? w} />
);

export const DeleteIcon = ({w = 30, h = 30, size}) => (
  <Delete height={size ?? h} width={size ?? w} />
);

export const EqualizerIcon = ({w = 30, h = 30, size}) => (
  <Equalizer height={size ?? h} width={size ?? w} />
);

export const SettingIcon = ({w = 30, h = 30, size}) => (
  <Setting height={size ?? h} width={size ?? w} />
);

export const LogoutIcon = ({w = 30, h = 30, size}) => (
  <Logout height={size ?? h} width={size ?? w} />
);

export const StarIcon = ({w = 30, h = 30, size}) => (
  <Star height={size ?? h} width={size ?? w} />
);
