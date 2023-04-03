import type { NextPage } from 'next'

import HomeLayout from '@/layouts/home.layout'

import Main from '@/modules/default/Main'

const Home: NextPage = () => {

  return (
    <HomeLayout>
      <Main/>
    </HomeLayout>
  )
}

export default Home