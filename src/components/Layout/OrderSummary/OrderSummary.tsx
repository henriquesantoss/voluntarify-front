import { useEffect, useState } from 'react'
import { SimpleProduct } from 'entities/product.entity'
import { Selectable } from 'entities/selectable.entity'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { showModal } from 'store/modal/actions'
import { getOrderInfo } from 'store/order/actions'
import { setProductLines } from 'store/product/actions'
import { splitStringByHyphen } from 'utils/split-string-by-hiphen'
import { productLineFilterRequest } from 'services/filters.service'
import { summaryOrderRequest, verifyStock } from 'services/orders.service'
import { getSummaryReport, summaryInfoRequest } from 'services/summary.service'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { useInfinitScroll } from 'hooks/useInfinitScroll'
import { useRequest } from 'hooks/useRequest'
import { Card } from 'components/Cards/Card'
import { Flex } from 'components/Flex'
import { Button } from 'components/Form/Button'
import { Icon } from 'components/Icon'
import { OrderValues } from 'components/OrderValues'
import { Page } from 'components/Page'
import { withAuth } from 'components/Page/withAuth'
import { ProductCardInfo } from 'components/ProductCardInfo'
import { ProductList } from 'components/ProductList'
import { Cost } from 'components/SummaryOrder/Cost'
import { SummaryInfo } from 'components/SummaryOrder/Info'
import { RecommendationVolume } from 'components/SummaryOrder/RecommendationVolume'
import { Volume } from 'components/SummaryOrder/Volume'
import { Tabs } from 'components/Tabs'
import { MODALS, MODAL_TYPES } from 'constants/modals'
import { OrderStatus } from 'constants/order-status'
import { OrderType } from 'constants/order-type'
import { createRoute, ROUTES } from 'constants/routes'

const tabs = (
  productLines: Selectable[],
  products: SimpleProduct[],
  loading: boolean,
) =>
  productLines.map(({ label }) => ({
    label: label.toLowerCase(),
    content: (
      <Flex direction='column' margin={{ top: 10 }}>
        <ProductList hideEdit hideClear products={products} loading={loading} />
      </Flex>
    ),
  }))

interface OrderSummaryProps {
  type: OrderType
  titlePage: string
}

const OrderSummary = ({
  type = OrderType.MONTHLY,
  titlePage,
}: OrderSummaryProps) => {
  const routes = useRouter()
  const { fid } = routes.query
  const [client, orderId] = splitStringByHyphen(fid)
  const [products, setProducts] = useState<SimpleProduct[]>([])
  const [currentTab, setCurrentTab] = useState(0)
  const [material, setMaterial] = useState<string>()
  const [address, setAddress] = useState('')
  const [hasRepression, setRepression] = useState(false)

  const dispatch = useAppDispatch()

  useRequest(() => productLineFilterRequest(type), true, true, {
    onSuccess: (data) => {
      dispatch(setProductLines({ data: data || [], type }))
    },
  })

  useRequest(() => verifyStock(orderId, client, type), true, true, {
    onSuccess: (data) => setRepression(data?.[0]?.fl_estq === 'S'),
  })

  const productLines = useAppSelector(
    ({ product }) => product.filters[type]?.productLines || [],
  )

  const { data: summaryInfo } = useRequest(
    () => summaryInfoRequest(orderId, client, type),
    true,
    !!client,
  )

  const { fetchData: downloadReport } = useRequest(
    () => getSummaryReport(orderId, client, type),
    false,
  )

  const inProgress =
    summaryInfo?.[0] && summaryInfo[0].fl_pedi_inil !== OrderStatus.CONCLUDED

  const { onScroll, loading, cancel } = useInfinitScroll(
    (page, pageSize, source) =>
      summaryOrderRequest(
        orderId,
        page,
        pageSize,
        client,
        source,
        {
          productLine: productLines[currentTab].value,
          material,
        },
        type,
      ),
    6,
    [productLines[currentTab], material],
    !!orderId,
    {
      onSuccess: (data) => {
        data?.length && setProducts([...products, ...data])
      },
    },
  )

  const handleChangeTab = (index: number) => {
    cancel()
    setMaterial('')
    setProducts([])
    setCurrentTab(index)
  }

  useEffect(
    () => {
      orderId && dispatch(getOrderInfo({ orderId, client, type }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orderId],
  )

  if (!fid || !productLines.length) return null

  const handleBack = () =>
    routes.push(
      createRoute(
        fid,
        inProgress
          ? ROUTES.ORDER[type].EDITION.url
          : ROUTES.ORDER[type].CHECKOUT.url,
      ),
    )

  const handleFinalize = () => {
    if (address) {
      dispatch(
        showModal({
          currentModal: MODALS.FINALIZE_ORDER,
          modalType: MODAL_TYPES.CENTER,
          modalProps: { orderId, client, fid, type, address },
        }),
      )
    } else {
      toast.error('O endereço de deve estar preenchido.', {
        icon: <Icon color='error' as='error' />,
        autoClose: 1500,
      })
    }
  }

  return (
    <Page
      onScrollContent={onScroll}
      title={titlePage}
      titleContent={<OrderValues />}
      footer={
        summaryInfo?.[0]
          ? {
              content: (
                <Flex
                  fill='horizontal'
                  justify='space-between'
                  margin={{ right: 'md' }}
                >
                  <Flex>
                    <Button
                      onClick={handleBack}
                      styleType='text'
                      leftIcon='arrow-left'
                    >
                      {inProgress ? 'Voltar à Edição' : 'Voltar'}
                    </Button>
                    {hasRepression && (
                      <Button
                        styleType='text'
                        rightIcon='error'
                        iconColor='error'
                        onClick={() =>
                          dispatch(
                            showModal({
                              currentModal: MODALS.FINALIZE_ORDER,
                              modalType: MODAL_TYPES.CENTER,
                              modalProps: {
                                orderId,
                                client,
                                fid,
                                type,
                                fixedStep: 1,
                              },
                            }),
                          )
                        }
                      >
                        Volume Reprimido
                      </Button>
                    )}
                  </Flex>
                  <Button
                    onClick={downloadReport}
                    styleType='text'
                    leftIcon='arrow-down'
                  >
                    Fazer download
                  </Button>
                </Flex>
              ),
              primaryButton: inProgress
                ? {
                    label: 'Finalizar Pedido',
                    onClick: handleFinalize,
                  }
                : undefined,
            }
          : undefined
      }
    >
      {summaryInfo?.[0] && (
        <SummaryInfo
          summaryInfo={summaryInfo?.[0]}
          address={address}
          setAddress={setAddress}
        />
      )}
      <Flex margin={{ top: 10 }}>
        <Flex gap={10} fill='horizontal'>
          {type === OrderType.MONTHLY && (
            <>
              <Volume orderId={orderId} client={client} type={type} />
              <Cost orderId={orderId} client={client} type={type} />
              <RecommendationVolume
                orderId={orderId}
                client={client}
                type={type}
              />
            </>
          )}
        </Flex>
      </Flex>
      <Flex direction='column' margin={{ top: 10 }}>
        <Card title='Produtos Adicionados' sizeTitle='big' fill>
          <Tabs
            tabs={tabs(productLines, products || [], loading)}
            headerInfo={
              <ProductCardInfo
                value={material}
                onSearchClick={(value) => {
                  setMaterial(value)
                  setProducts([])
                }}
              />
            }
            onChange={handleChangeTab}
          />
        </Card>
      </Flex>
    </Page>
  )
}

export default withAuth(OrderSummary)
