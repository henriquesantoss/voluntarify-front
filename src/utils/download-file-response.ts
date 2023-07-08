import { AxiosResponse } from 'axios'

export const downloadFileResponse = (response: AxiosResponse) => {
  const filename = response.headers['content-disposition'].split('filename=')[1]

  const href = URL.createObjectURL(response.data)

  const link = document.createElement('a')
  link.href = href
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
  URL.revokeObjectURL(href)
}
