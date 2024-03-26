import React from 'react'
import { AxiosError } from 'axios'
import { frontendAxios } from '../services/axios'
import { AiAPIResponse } from '../ts-utils/interface/ai-api-response.interface'
import { ResponseBody } from '../ts-utils/types/ResponseBody.type'

export const useAiModifyImage = <T>() => {
  const [aiImage, setAiImage] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const fetchAiModifiedImage = React.useCallback(
    async (body: T) => {
      setLoading(true)
      setError(null)
      try {
        const res = await frontendAxios.post<ResponseBody<AiAPIResponse>>('/ai-modify-image', body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        if (!res.data.success) {
          throw Error(res.data.error?.message || 'server error')
        }
        setAiImage(res.data.data.processed_image)
        return res.data.data.processed_image
      } catch (error) {
        const { message } = error as AxiosError
        console.log('fetchAiModifiedImage Error message:', message)
        setError(message)
        throw error //for additional handlers after this request
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return { fetch: fetchAiModifiedImage, data: aiImage, loading, error, setError }
}
