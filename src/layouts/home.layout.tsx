import React, { FC, ReactNode } from 'react'
import Head from 'next/head'
import {Layout} from 'antd'
import HeaderMenuButton from '@/components/HeaderMenuButton'

const {Content, Header} = Layout

export const SITE_TITLE = 'ITV WebCinema'

interface HomeLayoutProps {
  pageTitle?: string
  title?: string
  children: ReactNode
}

const HomeLayout: FC<HomeLayoutProps> = ({ title, children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Head>
        <meta name='og:title' content={SITE_TITLE} />
        <title>{title || SITE_TITLE}</title>
      </Head>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ color: 'white', fontSize: 16, display: 'flex', justifyContent: 'center', flexGrow: 1  }}>Test next nest</div>
          {/*<Dropdown menu={{ items }} placement='bottomRight'>*/}
          {/*  <Avatar icon={<UserOutlined />} />*/}
          {/*</Dropdown>*/}
          <HeaderMenuButton/>
        </div>
      </Header>
      <Content style={{ minHeight: '100%', flexGrow: 1 }}>{children}</Content>
    </Layout>
  )
}

export default HomeLayout