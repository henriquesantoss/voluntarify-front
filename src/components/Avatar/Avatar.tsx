import { ProfileIcon } from 'components/Icons'
import * as S from './Avatar.styles'

interface AvatarProps {
  size: number | string
  src?: string
  alt: string
}

export const Avatar = ({ size, alt, src }: AvatarProps) => (
  <S.Wrapper size={size}>
    {src ? (
      <S.AvatarImage layout='fill' src={src} alt={alt} />
    ) : (
      <S.ContainerIcon fill='both' align='center' justify='center'>
        <ProfileIcon />
      </S.ContainerIcon>
    )}
  </S.Wrapper>
)
