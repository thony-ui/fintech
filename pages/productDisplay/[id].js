import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'
import ResponsiveAppBar from '../../components/NavbarWithoutSearchBar'
import ProductDisplay from '../../components/ProductDisplay'
import Footer from '../../components/Footer'

function Index() {
  const router = useRouter()
  const [curId, setCurId] = useState("")
  useEffect(() => {
    const {id} = router.query;
    if (id) {
      setCurId(id);
    }
  },[router.query])
  return (
    <div>
      <ResponsiveAppBar />
      <ProductDisplay id = {curId}/>
      <Footer />
    </div>
  )
}

export default Index