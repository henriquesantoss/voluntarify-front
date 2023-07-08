import * as A from 'components/Icons'
import * as S from './Icon.styles'

export const icons = {
  add: <A.AddIcon />,
  bag: <A.BagIcon />,
  box: <A.BoxIcon />,
  calendar: <A.CalendarIcon />,
  card: <A.CardIcon />,
  contract: <A.ContractIcon />,
  copy: <A.CopyIcon />,
  coupon: <A.CouponIcon />,
  check: <A.CheckIcon />,
  clear: <A.ClearIcon />,
  clock: <A.ClockIcon />,
  close: <A.CloseIcon />,
  edit: <A.EditIcon />,
  error: <A.ErrorIcon />,
  faq: <A.FaqIcon />,
  filter: <A.FilterIcon />,
  heart: <A.HeartIcon />,
  help: <A.HelpIcon />,
  home: <A.HomeIcon />,
  info: <A.InfoIcon />,
  list: <A.ListIcon />,
  location: <A.LocationIcon />,
  logout: <A.LogOutIcon />,
  money: <A.MoneyIcon />,
  perfil: <A.PerfilIcon />,
  play: <A.PlayIcon />,
  profile: <A.ProfileIcon />,
  ruler: <A.RulerIcon />,
  save: <A.SaveIcon />,
  search: <A.SearchIcon />,
  star: <A.StarIcon />,
  store: <A.StoreIcon />,
  trash: <A.TrashIcon />,
  wallet: <A.WalletIcon />,
  warning: <A.WarningIcon />,
  windows: <A.WindowsIcon />,
  'arrow-all': <A.ArrowAll />,
  'add-square': <A.AddSquareIcon />,
  'arrow-down': <A.ArrowDownIcon />,
  'arrow-left': <A.ArrowLeftIcon />,
  'arrow-up': <A.ArrowUpIcon />,
  'bell-close': <A.BellCloseIcon />,
  'cell-phone': <A.CellPhoneIcon />,
  'check-square': <A.CheckSquareIcon />,
  'check-square-filled': <A.CheckSquareFilledIcon />,
  'chevron-down': <A.ChevronDownIcon />,
  'chevron-left': <A.ChevronLeftIcon />,
  'chevron-right': <A.ChevronRightIcon />,
  'chevron-up': <A.ChevronUpIcon />,
  'close-square': <A.CloseSquareIcon />,
  'foot-left': <A.FootLeftIcon />,
  'foot-pair': <A.FootPairIcon />,
  'hand-bag': <A.Handbag />,
  'heart-filled': <A.HeartFilledIcon />,
  'more-horizontal': <A.MoreHorizontalIcon />,
  'subtract-square': <A.SubtractSquareIcon />,
}

export type IconsType = keyof typeof icons

export type IconProps = {
  as: IconsType
  color?: S.IconColors
  size?: S.IconSizes
  onClick?: () => void
  testId?: string
}

export const Icon = ({
  as: icon,
  color = 'inherit',
  size,
  onClick,
  testId,
}: IconProps) => (
  <S.Wrapper data-testid={testId} onClick={onClick} $color={color} size={size}>
    {icons[icon]}
  </S.Wrapper>
)
