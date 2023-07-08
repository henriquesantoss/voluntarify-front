import { useState } from 'react'
import formatClose from 'mockups/formatClose.json'
import formatGridClose from 'mockups/formatGridClose.json'
import viewMaterialCard from 'mockups/viewAdminMaterialCards.json'
import viewMaterial from 'mockups/viewMaterial.json'
import Image from 'next/image'
import { numberWithDots } from 'utils/number-with-dots'
import { useWindowSize } from 'hooks/useWindowsSize'
import { AsyncSelect } from 'components/AsyncSelect'
import { Flex } from 'components/Flex'
import { Button } from 'components/Form/Button'
import { Input } from 'components/Form/Input'
import { Select } from 'components/Form/Select'
import { Info } from 'components/Info'
import { Tag } from 'components/Tag'
import { Heading, Text } from 'components/Typography'
import { Modal } from '..'
import * as S from './ViewAdminMaterial.styles'

const Card = ({ title, value }: { title: string; value: number }) => (
  <S.Wrapper gap='xs' direction='column'>
    <Text size='small' weight='bold'>
      {title}
    </Text>
    <Text size='small'>{numberWithDots(value)}</Text>
  </S.Wrapper>
)

const InfoCard = ({ label, value }: { label: string; value: number }) => (
  <S.Wrapper gap='xs' minPadding minWidth>
    <Text size='small' weight='bold'>
      {label}
    </Text>
    <Text size='small'>{value}</Text>
  </S.Wrapper>
)

const InfoFranchise = ({ label, value }: { label: string; value: string }) => (
  <Flex gap='xs'>
    <Text size='small' weight='bold'>
      {label}
    </Text>
    <Text size='small'>{value}</Text>
  </Flex>
)

export const ViewAdminMaterial = ({ allocated }: { allocated: boolean }) => {
  const { width, breakpoints } = useWindowSize()
  const [showFilters, setShowFilters] = useState(false)

  return (
    <Modal titleLevel='h4' title='Forecasat' backgroundColor='light'>
      <>
        <Flex direction='column' gap={10} margin={{ left: 'xs', right: 'xs' }}>
          <Flex gap={10} align='center'>
            <Image
              alt='Par de sandálias roxas'
              src='/image-pair.svg'
              width={width && width <= breakpoints.xl ? '140px' : '160px'}
              height={width && width <= breakpoints.xl ? '140px' : '160px'}
            />
            <Flex direction='column' fill='both'>
              <Heading as={width && width <= breakpoints.xl ? 'h3' : 'h1'}>
                Sandália Havaianas Top Pride All Over
              </Heading>
              <Flex
                fill='horizontal'
                justify='space-between'
                margin={{ top: 'md' }}
              >
                <Flex gap={10}>
                  <Info
                    label='Cor'
                    value='Azul (0031)'
                    size={width && width <= breakpoints.xl ? 'nano' : 'small'}
                  />
                  <Info
                    label='Linha'
                    value='Unissex'
                    size={width && width <= breakpoints.xl ? 'nano' : 'small'}
                  />
                  <Info
                    label='Família'
                    value='Pride'
                    size={width && width <= breakpoints.xl ? 'nano' : 'small'}
                  />
                </Flex>
                <Tag
                  styleType={allocated ? 'pink' : 'success'}
                  text={allocated ? 'não alocado' : 'alocado'}
                />
              </Flex>
              <Flex margin={{ top: 'md', bottom: 10 }}>
                <Info label='Total de Franquias' value={numberWithDots(1585)} />
              </Flex>

              <Flex fill='horizontal' gap={8}>
                {viewMaterialCard.map((item) => (
                  <Card
                    key={item.title}
                    title={item.title}
                    value={item.value}
                  />
                ))}
              </Flex>
            </Flex>
          </Flex>
          {!allocated && (
            <Flex
              direction='column'
              margin={
                width && width <= breakpoints.xl ? { left: 36 } : { left: 40 }
              }
              gap={9}
            >
              <Flex gap='xs' direction='column'>
                <Text
                  size={width && width <= breakpoints.xl ? 'nano' : 'small'}
                >
                  Formato Caixa Fechada
                </Text>
                <Flex wrap='wrap' direction='row' gap='md'>
                  {formatClose.map((item) => (
                    <Flex key={item.label}>
                      <InfoCard label={item.label} value={item.value} />
                    </Flex>
                  ))}
                </Flex>
              </Flex>
              <Flex gap='xs' direction='column'>
                <Text
                  size={width && width <= breakpoints.xl ? 'nano' : 'small'}
                >
                  Formato Caixa Grade
                </Text>
                <Flex wrap='wrap' direction='row' gap='md'>
                  {formatGridClose.map((item) => (
                    <Flex key={item.label}>
                      <InfoCard label={item.label} value={item.value} />
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </Flex>
          )}
          <Flex gap={10} fill='horizontal' margin={{ top: 'sm' }}>
            <Input label='Busca por franquia' />
            <Button leftIcon='search' size='lg'>
              Buscar
            </Button>
            <Button
              size='lg'
              leftIcon={showFilters ? 'chevron-up' : 'chevron-down'}
              styleType='text'
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? 'Esconder Filtros' : 'Mais Filtros'}
            </Button>
          </Flex>
          {showFilters && (
            <form>
              <Flex gap={10}>
                <Select options={[]} legend='Categoria' />
                <Select options={[]} legend='Família' />
                <AsyncSelect
                  legend='Cor/Estampa'
                  data={[]}
                  onSearch={() => [{}]}
                />
                <Button type='submit' size='lg' leftIcon='filter'>
                  Filtrar
                </Button>
              </Flex>
            </form>
          )}
        </Flex>
        <Flex margin={{ top: 10 }}>
          <InfoFranchise
            label='Total de franquias:'
            value={numberWithDots(200)}
          />
        </Flex>
        <Flex direction='column' gap={'xs'}>
          {viewMaterial.map((item) => (
            <S.Content key={item.title}>
              <Flex direction='column' fill='both' gap={4}>
                <Flex fill='horizontal' justify='space-between'>
                  <Text
                    size={width && width <= breakpoints.xl ? 'small' : 'medium'}
                    weight='bold'
                  >
                    {item.title}
                  </Text>
                  <Info
                    label='Volume recomendado'
                    value={`${numberWithDots(item.volume)} pares`}
                  />
                </Flex>
                <Flex fill='horizontal' justify='space-between'>
                  <Info label='SAP' value={item.sap} />
                  <Text size='small'>{item.endereco}</Text>
                </Flex>
              </Flex>
            </S.Content>
          ))}
        </Flex>
      </>
    </Modal>
  )
}
