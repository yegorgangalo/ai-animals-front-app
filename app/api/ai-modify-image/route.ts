import { NextResponse, NextRequest } from 'next/server'
import { AxiosError } from 'axios'
import { serverAxios } from '../../../services/axios'
import { AiAPIResponse } from '../../../ts-utils/interface/ai-api-response.interface'
import testImageBase64 from '../../../data/test-image-base64.json'

const aiModifyController = async (req: NextRequest) => {
  try {
    const reqFormData = await req.formData()

    const prompt = reqFormData.get('prompt') as string
    const imageFile: File | null = reqFormData.get('image') as unknown as File

    if (typeof prompt !== 'string' || !prompt) {
      return NextResponse.json({ error: { message: 'no prompt data' }, success: false }, { status: 400 })
    }
    if (!imageFile) {
      return NextResponse.json({ error: { message: 'no image' }, success: false }, { status: 400 })
    }

    console.log('User data:', { prompt, imageFile });

    // const response = await serverAxios.post('/api/main', reqFormData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // })
    // return NextResponse.json({ data: response.data, success: true })

    const response = await new Promise<{ data: AiAPIResponse}>((resolve, reject ) => {
      setTimeout(() => resolve({
        data: {
          processed_image: testImageBase64,
        },
      }), 2000)
    })

    return NextResponse.json({ data: response.data, success: true })
  } catch (error) {
    console.log('aiModifyController error:', error)
    const { data, status, statusText } = (error as AxiosError).response || {}
    return NextResponse.json({ error: { message: data }, success: false }, { status, statusText })
  }
}

export { aiModifyController as POST }
