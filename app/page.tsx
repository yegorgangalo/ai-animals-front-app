import { Metadata } from 'next'
import Form from "../components/Form";

export const metadata: Metadata = {
  title: 'AI Animals',
  description:
    'Generating funny ai-images of your pets',
}

const App = () => {
  return (
    <Form/>
  )
}

export default App
