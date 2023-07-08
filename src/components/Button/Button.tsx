import * as S from './Button.styles'

export type ButtonSizes = 'sm' | 'md' | 'lg'
type StyleType = 'filled' | 'outlined' | 'text'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  styleType?: StyleType
  size?: ButtonSizes
  disabled?: boolean
  loading?: boolean
}

export const Button = ({ children, loading, ...restProps }: ButtonProps) => {
  const iconSize = restProps.size === 'sm' ? 'sm' : 'md'

  return (
    <S.Wrapper
      data-testid='button'
      $loading={loading}
      type='button'
      {...restProps}
    >
      {/* {!loading && !!leftIcon && (
        <Icon
          as={leftIcon}
          color={iconColor}
          size={iconSize}
          testId='button-left-icon'
        />
      )} */}
      <span data-testid='button-children'>{children}</span>
      {/* {!loading && !!rightIcon && (
        <Icon
          as={rightIcon}
          color={iconColor}
          size={iconSize}
          testId='button-right-icon'
        />
      )} */}
    </S.Wrapper>
  )
}
