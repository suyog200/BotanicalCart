import MainContent from '@/components/MainContent'
import MainBanner from '../components/MainBanner'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import Testimonials from '@/components/Testimonials'

const Home = () => {
  return (
    <div className='mt-4'>
      <MainBanner/>
      <MainContent/>
      <FeaturedProducts/>
      <Testimonials/>
    </div>
  )
}

export default Home
