import React from 'react'
import { Chrono } from 'react-chrono'
import { Box, Badge } from '@chakra-ui/react'

export default function Timeline() {
  const data = [
    {
      title: '7:00 ~ 8:00',
    },
    {
      title: '8:00 ~ 10:00',
    },
    {
      title: '10:00 ~ 12:00',
    },
    {
      title: '13:00 ~ 15:00',
    },
    {
      title: '15:00 ~ 17:00',
    },
    {
      title: '18:00 ~ 20:00',
    },
    {
      title: '20:00 ~ 22:00',
    },
  ]
  return (
    <div>
      <Chrono
        items={data}
        mode='HORIZONTAL'
        theme={{
          primary: 'teal',
          secondary: '#ffffff',
          cardBgColor: 'rgba(0,0,0,0)',
        }}>
        {data.map(() => (
          <TimelineContent />
        ))}
      </Chrono>
    </div>
  )
}

const TimelineContent = () => (
  <Box w='100%' borderWidth='1px' borderRadius='lg' overflow='hidden'>
    <Box p='6'>
      <Box d='flex' alignItems='center' justifyContent='space-between' mb='3'>
        <Box
          fontWeight='bold'
          letterSpacing='wide'
          fontSize='xl'
          textTransform='uppercase'>
          #211196
        </Box>
        <Badge borderRadius='full' colorScheme='teal'>
          Event
        </Badge>
      </Box>

      <Box
        color='gray.500'
        fontWeight='semibold'
        letterSpacing='wide'
        fontSize='md'
        textTransform='uppercase'
        mb='2'>
        21/11/2022 &bull; 6:00 ~ 21:00
      </Box>

      <Box
        mt='1'
        fontWeight='semibold'
        as='h2'
        lineHeight='tight'
        isTruncated
        fontSize='md'>
        Hoạt động ngoại khóa
      </Box>
    </Box>
  </Box>
)
