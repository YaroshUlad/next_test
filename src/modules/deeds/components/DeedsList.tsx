import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/core/hooks'
import { fetchAllDeeds, deleteDeed } from '@/modules/deeds/deeds.actions'
import { Button, Card } from 'antd'
import CreateDeedForm from '@/modules/deeds/components/CreateDeedForm'

const DeedsList = () => {
  const deeds = useAppSelector(state => state.deeds.deeds.data.deeds)

  const dispatch = useAppDispatch()

  const handleDeleteDeed = (id: string) => {
    dispatch(deleteDeed(id))
  }

  useEffect(() => {
    dispatch(fetchAllDeeds())
  }, [])
  return (
    <div className={'container'}
         style={{ marginTop: '15px'}}
         >
      <CreateDeedForm/>
      <div style={{ display: 'grid', gridTemplateColumns: '33% 33% 33%', gap: 5, marginTop: '15px' }}>
        {deeds && deeds.length > 0 ? deeds.map((el) => {
          return (
            <div key={el.id}>
              <Card title='Deed Card' bordered={false}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div>Title: {el.title}</div>
                </div>
                <Button onClick={(e) => {
                  e.stopPropagation()
                  handleDeleteDeed(el.id)
                }}>Delete</Button>
              </Card>
            </div>
          )
        })
        : (<Card title='User Card' bordered={false}>
          You have not deeds yet
        </Card>)
      }</div>
    </div>
  )
}

export default DeedsList