import MainContent from '@/components/MainContent'
import MainBanner from '../components/MainBanner'
import { FeaturedProducts } from '@/components/FeaturedProducts'

const Home = () => {
  return (
    <div className='mt-4'>
      <MainBanner/>
      <MainContent/>
      <FeaturedProducts/>
    </div>
  )
}

export default Home
