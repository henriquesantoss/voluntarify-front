import { useRouter } from 'next/router'
import { splitStringByHyphen } from 'utils/split-string-by-hiphen'
import {
  checkoutOrderRequest,
  getMonthlyOrderReport,
} from 'services/orders.service'
import { useAppSelector } from 'hooks/useAppSelector'
import { useRequest } from 'hooks/useRequest'
import { Card } from 'components/Cards/Card'
import { CheckoutTable } from 'components/CheckoutTable'
import { Divisor } from 'components/Divisor'
import { Flex } from 'components/Flex'
import { Button } from 'components/Form/Button'
import { Icon } from 'components/Icon'
import { Info } from 'components/Info'
import { Page } from 'components/Page'
import { withAuth } from 'components/Page/withAuth'
import { Heading, Text } from 'components/Typography'
import { OrderType } from 'constants/order-type'
import { createRoute, ROUTES } from 'constants/routes'

interface CheckoutProps {
  type: OrderType
}

const Checkout = ({ type = OrderType.MONTHLY }: CheckoutProps) => {
  const routes = useRouter()
  const { fid } = routes.query
  const [franchise, groupingId] = splitStringByHyphen(fid)

  const currentYearMonth = useAppSelector(({ order }) => order.currentYearMonth)

  const { fetchData: fetchReportData } = useRequest(
    (data) => getMonthlyOrderReport(data),
    false,
  )
  const { data } = useRequest(
    () => checkoutOrderRequest(groupingId, franchise, type),
    true,
    !!franchise,
    {
      onError: () => routes.push('/'),
      onSuccess: (data) => !data?.[0] && routes.push('/'),
    },
  )

  const checkoutData = data?.[0]

  return (
    <Page>
      <Flex direction='column' gap={10}>
        <Flex gap='sm' align='center'>
          <Icon as='check-square-filled' size='lg' color='success' />
          <Heading lineHeight='none' as='h2'>
            Pedido efetuado com sucesso!
          </Heading>
        </Flex>
        <Divisor />
        <Flex gap={14}>
          <Flex direction='column' gap='xs'>
            <Text size='small' weight='bold' color='darkPrimary'>
              Resumo
            </Text>
            <Info label='Nome do Pedido' value={checkoutData?.nr_pedi_clie} />
            <Info label='Mês de Digitação' value={checkoutData?.dt_ano_mes} />
            <Info label='Franquia' value={checkoutData?.nm_pcro} />
            <Info label='Nº SAP' value={checkoutData?.cd_clie} />
          </Flex>
          <Flex direction='column' gap='xs'>
            <Text size='small' weight='bold' color='darkPrimary'>
              Pagamento
            </Text>
            <Info
              label='Condição de Pagamento'
              value={checkoutData?.ds_cond_pgto}
            />
            <Info label='Forma de Pagamento' value='Boleto' />
            <Info
              label='Endereço de cobrança'
              value={checkoutData?.ds_endr_pgto}
            />
          </Flex>
          <Flex direction='column' gap='xs'>
            <Text size='small' weight='bold' color='darkPrimary'>
              Entrega
            </Text>
            <Text size='small'>{checkoutData?.ds_endr_entr}</Text>
          </Flex>
        </Flex>
        <Divisor />
        <Card>
          <Flex direction='column' gap='md' margin={{ vertical: 'xs' }}>
            <Heading as='h3'>Ordens de Vendas Geradas</Heading>
            <CheckoutTable orders={checkoutData?.ordens} />
            {fid && (
              <Flex justify='space-between' gap='md'>
                <Button
                  styleType='text'
                  leftIcon='arrow-left'
                  onClick={() => routes.push(ROUTES.ORDER[type].url)}
                >
                  Voltar ao início
                </Button>
                <Flex gap='md'>
                  <Button
                    styleType='outlined'
                    leftIcon='arrow-down'
                    onClick={() =>
                      fetchReportData({
                        franchise,
                        groupingId,
                        type,
                        date: currentYearMonth?.[type],
                      })
                    }
                  >
                    Fazer Download
                  </Button>
                  <Button
                    onClick={() =>
                      routes.push(
                        createRoute(fid, ROUTES.ORDER[type].SUMMARY.url),
                      )
                    }
                  >
                    Acompanhar Pedido
                  </Button>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Card>
      </Flex>
    </Page>
  )
}

export default withAuth(Checkout)
