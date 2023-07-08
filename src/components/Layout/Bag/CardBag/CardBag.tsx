import { Flex } from 'components/Flex'
import { Button } from 'components/Form/Button'
import { Info } from 'components/Info'
import { Text } from 'components/Typography'
import * as S from './CardBag.styles'

interface CardBagProps {
  title?: string
  totalPrice?: string | number
  unitPrice?: string | number
  colorId?: string
  colorName?: string
  productLine?: string
  family?: string
  amount?: string | number
  recommended?: boolean
  imageUrl: string
  code?: string
}

export const CardBag = ({
  title,
  unitPrice,
  totalPrice,
  imageUrl,
  code,
}: CardBagProps) => {
  return (
    <S.Wrapper>
      <Flex gap={4}>
        <div style={{ width: '80px', height: '80px', position: 'relative' }}>
          <S.StyledImage src={imageUrl} layout='fill' objectFit='contain' />
        </div>

        <Flex direction='column' gap={4} style={{ marginRight: '16px' }}>
          <Flex justify='space-between' align='center'>
            <Text size='small' weight='bold'>
              {title}
            </Text>
            <Info label='Custo Unitário' value={unitPrice} />
          </Flex>

          <Flex direction='column' gap={4}>
            <Info label='Cód' value={code} />
          </Flex>
          <Flex align='center' justify='space-between' gap={20}>
            <Info label='Total de Pares' value='12' />
            <Info label='Custo Total' value={totalPrice} />
            <Button size='sm' styleType='text' leftIcon='trash'>
              Limpar Pares
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </S.Wrapper>
  )
}
