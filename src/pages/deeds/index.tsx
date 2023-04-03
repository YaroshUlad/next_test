import React from 'react'

import HomeLayout from '@/layouts/home.layout'
import DeedsList from '@/modules/deeds/components/DeedsList'

const DeedsPage = () => {
  return (
    <HomeLayout>
      <DeedsList/>
    </HomeLayout>
  )
}

export default DeedsPage