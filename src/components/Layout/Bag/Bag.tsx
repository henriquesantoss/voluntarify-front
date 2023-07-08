import { ReactNode } from 'react'
import * as Popover from '@radix-ui/react-popover'
import cardBagsMock from 'mockups/cardBag.json'
import { Divisor } from 'components/Divisor'
import { Flex } from 'components/Flex'
import { Icon } from 'components/Icon'
import { Heading, Text } from 'components/Typography'
import * as S from './Bag.style'
import { CardBag } from './CardBag'

export const Bag = ({ children }: { children: ReactNode }) => (
  <Popover.Root>
    <Popover.Anchor>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
    </Popover.Anchor>
    <Popover.Portal>
      <S.Content>
        <S.Container>
          <Flex justify='space-between' margin={{ bottom: 'md' }}>
            <Heading as='h3'>Sacola</Heading>
            <S.Close>
              <Icon as='close' />
            </S.Close>
          </Flex>
          <Divisor direction='horizontal' margin />
          <Text size='small' color='dark' weight='medium'>
            4 Modelos/cor adicionados
          </Text>
          <Flex
            margin={{ top: 10 }}
            direction='column'
            gap='md'
            fill='horizontal'
            style={{ overflow: 'auto', height: '55%' }}
          >
            {cardBagsMock.map((card) => (
              <Flex key={card.code + card.colorId} margin={{ bottom: 'md' }}>
                <CardBag {...card} />
              </Flex>
            ))}
          </Flex>
          <Divisor direction='horizontal' margin />
          <Flex direction='column' gap={4}>
            <Flex justify='space-between'>
              <Text size='small' color='dark' weight='medium'>
                Total de Pares
              </Text>
              <Text size='small' color='dark' weight='bold'>
                48 Pares
              </Text>
            </Flex>
            <Flex justify='space-between'>
              <Text size='small' color='dark' weight='medium'>
                Custo total do Pedido
              </Text>
              <Text size='small' color='dark' weight='bold'>
                R$2.199,84
              </Text>
            </Flex>
          </Flex>
        </S.Container>
        <S.Arrow />
      </S.Content>
    </Popover.Portal>
  </Popover.Root>
)
