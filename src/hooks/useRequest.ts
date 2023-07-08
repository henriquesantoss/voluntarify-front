import { useEffect, useState } from 'react'
import axios, { AxiosError, AxiosResponse } from 'axios'

let source = axios.CancelToken.source()
let cancelled = false

export const useRequest = <T>(
  request: (props?: any) => Promise<AxiosResponse<T>>,
  onMount = true,
  canRun = true,
  callback?: {
    onSuccess?: (data: T | undefined) => void
    onFinish?: () => void
    onError?: (error: AxiosError<any> | null) => void
  },
  resetDepts: unknown[] = [],
) => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError<
    T & { return_chav: string; return_code: number }
  > | null>(null)

  const cancel = () => {
    if (loading) {
      cancelled = true
      setLoading(false)
      source.cancel()
      source = axios.CancelToken.source()
    }
  }

  const clear = () => {
    cancel()
    setError(null)
    setData(undefined)
  }

  const fetchData = async (props?: any) => {
    try {
      setError(null)
      setLoading(true)
      const response = await request(props)
      setData(response.data)
      callback?.onSuccess && callback.onSuccess(response.data)
    } catch (error: any) {
      setError(error)
      callback?.onError && callback.onError(error)
    } finally {
      if (cancelled) {
        cancelled = false
      } else {
        setLoading(false)
      }
      callback?.onFinish && callback.onFinish()
    }
  }

  useEffect(() => {
    onMount && canRun && fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canRun, ...resetDepts])

  return { data, loading, error, fetchData, clear, cancel }
}
