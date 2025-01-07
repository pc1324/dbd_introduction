import { defineStore } from 'pinia'
import { ref } from 'vue'
import image1 from '@/assets/carousel/001.jpg'
import image2 from '@/assets/carousel/002.jpg'
import image3 from '@/assets/carousel/003.jpg'
import image4 from '@/assets/carousel/004.jpg'
import image5 from '@/assets/carousel/005.webp'
import image6 from '@/assets/carousel/006.webp'
import image7 from '@/assets/carousel/007.webp'
import image8 from '@/assets/carousel/008.webp'
import image9 from '@/assets/carousel/009.webp'
import image10 from '@/assets/carousel/010.webp'
import image11 from '@/assets/carousel/011.webp'
import image12 from '@/assets/carousel/012.webp'
import image13 from '@/assets/carousel/013.webp'
import image14 from '@/assets/carousel/014.webp'
import image15 from '@/assets/carousel/015.webp'
import image16 from '@/assets/carousel/016.webp'

export const userHomeStore = defineStore('dbd-home', () => {
  // 走马灯数据
  const carouselList = ref([
    { id: 1, image: image1, description: '', link: '' },
    { id: 2, image: image2, description: '', link: '' },
    { id: 3, image: image3, description: '', link: '' },
    { id: 4, image: image4, description: '', link: '' },
    { id: 5, image: image5, description: '', link: '' },
    { id: 6, image: image6, description: '', link: '' },
    { id: 7, image: image7, description: '', link: '' },
    { id: 8, image: image8, description: '', link: '' },
    { id: 9, image: image9, description: '', link: '' },
    { id: 10, image: image10, description: '', link: '' },
    { id: 11, image: image11, description: '', link: '' },
    { id: 12, image: image12, description: '', link: '' },
    { id: 13, image: image13, description: '', link: '' },
    { id: 14, image: image14, description: '', link: '' },
    { id: 15, image: image15, description: '', link: '' },
    { id: 16, image: image16, description: '', link: '' }
  ])

  // 获取走马灯数据(暂时不用)
  // const getCarouselList = async () => {
  //   const res = await getCarouselListService()
  //   carouselList.value = res.data.data
  // }

  return {
    carouselList
  }
})
