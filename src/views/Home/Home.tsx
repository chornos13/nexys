import React from 'react'
import { Button, Card, Result, Avatar, Skeleton } from 'antd'
import useFaq from 'data/useFaq'

function Home() {
  const queryFaq = useFaq({
    query: {
      initialValue: {
        page: 1,
        pageSize: 100,
      },
      defaultValue: {
        check: true,
      },
    },
    filtered: {
      initialValue: {
        MasterItemId: 1,
      },
    },
    sorted: {
      initialValue: {
        MasterItemId: true,
      },
    },
  })

  const { data: faqData } = queryFaq

  return (
    <Card>
      {queryFaq.isLoading ? (
        <Result
          icon={<Skeleton.Avatar size={100} active />}
          title={
            <Skeleton
              title={false}
              paragraph={{
                rows: 2,
                style: {
                  maxWidth: 100,
                  margin: 'auto',
                },
              }}
              active
            />
          }
          extra={<Skeleton.Button active />}
        />
      ) : (
        <Result
          icon={
            <Avatar
              size={100}
              icon={
                <img
                  alt={'avatar'}
                  src={faqData.owner.avatar_url}
                  style={{ width: '100%' }}
                />
              }
            />
          }
          title="Great, this is Home!"
          subTitle={faqData.owner.login}
          extra={
            <Button
              onClick={() => {
                queryFaq.helper.setFiltered('page', 10)
              }}
              type="primary"
            >
              Next
            </Button>
          }
        />
      )}
    </Card>
  )
}

export default Home
