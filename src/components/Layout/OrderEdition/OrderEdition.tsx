import { useEffect, useReducer, useState } from 'react'
import { ProductListFilters, SimpleProduct } from 'entities/product.entity'
import { Selectable } from 'entities/selectable.entity'
import { useRouter } from 'next/router'
import { hideModal, showConfirmModal, showModal } from 'store/modal/actions'
import { getOrderInfo } from 'store/order/actions'
import {
  addProducts,
  setFamilies,
  setProductLines,
  setProducts,
} from 'store/product/actions'
import { splitStringByHyphen } from 'utils/split-string-by-hiphen'
import {
  familyFilterRequest,
  productLineFilterRequest,
} from 'services/filters.service'
import { clearOrder, verifyStock } from 'services/orders.service'
import * as productsService from 'services/products.service'
import { useAppDispatch } from 'hooks/useAppDispatch'
import { useAppSelector } from 'hooks/useAppSelector'
import { useInfinitScroll } from 'hooks/useInfinitScroll'
import { useRequest } from 'hooks/useRequest'
import { Divisor } from 'components/Divisor'
import { Flex } from 'components/Flex'
import { Button } from 'components/Form/Button'
import { FranchiseGroupInfo } from 'components/FranchiseGroupInfo'
import { OrderValues } from 'components/OrderValues'
import { Page } from 'components/Page'
import { withAuth } from 'components/Page/withAuth'
import { ProductFilters } from 'components/ProductFilters'
import { ProductList } from 'components/ProductList'
import { Tabs } from 'components/Tabs'
import { WindowPortal } from 'components/WindowPortal'
import { MODALS, MODAL_TYPES } from 'constants/modals'
import { OrderType } from 'constants/order-type'
import { createRoute, ROUTES } from 'constants/routes'

const resultTab = { label: 'Resultados', value: 'Resultados' }

const tabs = (
  productLines: Selectable[],
  products: SimpleProduct[],
  loading: boolean,
  type: OrderType,
) =>
  productLines.map(({ label }) => ({
    label: label.toLowerCase(),
    content: <ProductList products={products} loading={loading} type={type} />,
  }))

interface OrderEditionProps {
  type?: OrderType
  titlePage: string
}

const OrderEdition = ({
  type = OrderType.MONTHLY,
  titlePage,
}: OrderEditionProps) => {
  const router = useRouter()
  const { fid } = router.query
  const [client, orderId] = splitStringByHyphen(fid)
  const [currentTab, setCurrentTab] = useState(0)
  const [showRecomendationWindow, setShowRecomendationWindow] = useState(false)
  const [hasRepression, setRepression] = useState(false)
  const [refreshKey, incrementRefreshKey] = useReducer((state) => state + 1, 0)
  const [filters, setFilters] =
    useState<Omit<ProductListFilters, 'productLine'>>()

  const infoData = useAppSelector(({ order }) => order.info)
  const products = useAppSelector(({ product }) => product.products)
  const productLines = useAppSelector(
    ({ product }) => product.filters[type]?.productLines || [],
  )
  const showResults = !!filters?.material

  const dispatch = useAppDispatch()

  const { onScroll, loading, cancel } = useInfinitScroll(
    (page, pageSize, source) =>
      productsService.productListRequest(
        orderId,
        page,
        pageSize,
        client,
        source,

        {
          productLine: showResults ? undefined : productLines[currentTab].value,
          ...filters,
        },
        type,
      ),
    6,
    [productLines[currentTab], filters, refreshKey],
    !!orderId,
    {
      onSuccess: (data) => {
        data?.length && dispatch(addProducts({ products: data }))
      },
    },
  )

  const handleChangeTab = (index: number) => {
    cancel()
    setCurrentTab(showResults ? index - 1 : index)
    setFilters({})
    dispatch(setProducts({ products: {} }))
  }

  const onSearch = (material: string) => {
    cancel()
    setCurrentTab(0)
    setFilters({ material })
    dispatch(setProducts({ products: {} }))
  }

  useRequest(() => familyFilterRequest(type), true, true, {
    onSuccess: (data) => {
      dispatch(setFamilies({ data: data || [], type }))
    },
  })

  useRequest(() => productLineFilterRequest(type), true, true, {
    onSuccess: (data) => {
      dispatch(setProductLines({ data: data || [], type }))
    },
  })

  useRequest(() => verifyStock(orderId, client, type), true, true, {
    onSuccess: (data) => setRepression(data?.[0]?.fl_estq === 'S'),
  })

  const { data: recomendationList, loading: recomendationListLoading } =
    useRequest(
      () => productsService.recomendationListRequest(orderId, client, type),
      true,
      !!client,
    )

  const { fetchData: clearOrderRequest } = useRequest(
    () => clearOrder(orderId, client, type),
    false,
    true,
    {
      onSuccess: () => {
        incrementRefreshKey()
        dispatch(hideModal())
      },
    },
  )

  useEffect(
    () => {
      orderId && dispatch(getOrderInfo({ orderId, client, type }))
      return () => {
        cancel()
        dispatch(setProducts({ products: {} }))
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orderId, refreshKey],
  )

  return (
    <>
      <Page
        onScrollContent={onScroll}
        title={titlePage}
        titleContent={
          <FranchiseGroupInfo
            group={infoData?.ds_agrp_coml}
            franchise={infoData?.nm_pcro}
          />
        }
        footer={{
          primaryButton: {
            label: 'Resumo do Pedido',
            onClick: () =>
              typeof fid === 'string' &&
              router.push(createRoute(fid, ROUTES.ORDER[type].SUMMARY.url)),
          },
          secundaryButton: {
            label: 'Limpar Pedido',
            leftIcon: 'clear',
            styleType: 'outlined',
            onClick: () =>
              dispatch(
                showConfirmModal({
                  title: 'Limpar pedido',
                  description: 'Ao continuar com a ação o pedido será zerado.',
                  primaryButton: {
                    label: 'Limpar pedido',
                    onClick: clearOrderRequest,
                  },
                  secundaryButton: {
                    label: 'Voltar',
                    onClick: () => {
                      dispatch(hideModal())
                    },
                  },
                }),
              ),
          },
          content: (
            <Flex
              fill='horizontal'
              justify='space-between'
              align='center'
              margin={{ right: 'lg' }}
            >
              <Flex align='center'>
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
              <Flex align='center'>
                {type === OrderType.MONTHLY && (
                  <Button
                    styleType='text'
                    leftIcon='save'
                    size='lg'
                    onClick={() => setShowRecomendationWindow(true)}
                    loading={recomendationListLoading}
                    disabled={
                      !recomendationListLoading && !recomendationList?.[0]
                    }
                  >
                    Recomendação
                  </Button>
                )}
              </Flex>
            </Flex>
          ),
        }}
      >
        <Divisor margin />
        <ProductFilters
          filters={filters}
          type={type}
          onSearch={onSearch}
          onChange={(values) => {
            cancel()
            setFilters(values)
            dispatch(setProducts({ products: {} }))
          }}
        />
        <Divisor margin />
        <Tabs
          tabIndex={currentTab}
          sticky
          tabs={tabs(
            showResults ? [resultTab, ...productLines] : productLines,
            Object.values(products) || [],
            loading,
            type,
          )}
          headerInfo={<OrderValues />}
          onChange={handleChangeTab}
        />
      </Page>
      {!!recomendationList && showRecomendationWindow && (
        <WindowPortal
          height={600}
          width={930}
          onClose={() => setShowRecomendationWindow(false)}
        >
          <ProductList
            hideTags
            hideEdit
            hideClear
            margin
            products={recomendationList}
          />
        </WindowPortal>
      )}
    </>
  )
}

export default withAuth(OrderEdition)
