import { Metadata } from 'next'
import FormWrapper from '../components/FormWrapper'

export const metadata: Metadata = {
  title: 'AI Animals',
  description:
    'Generating funny ai-images of your pets',
}

const MainPage = () => {
  return (
    <FormWrapper/>
  )
}

export default MainPage
