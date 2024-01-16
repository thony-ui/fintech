import React, {useEffect,useState} from 'react'
import Search from '../../components/Search'
import { useRouter } from 'next/router'

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
        <Search id = {curId}/>
    </div>
  )
}

export default Index