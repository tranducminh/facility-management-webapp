import { Image, Flex, Spacer, Box, Button } from '@chakra-ui/react'
import Link from 'next/link'
import EmployeeLayout from '../../layouts/EmployeeLayout'

function Home() {
  return (
    <EmployeeLayout>
      <Flex justify='space-between' align='center'>
        <Box maxW='50%'>
          <Box fontSize='xxx-large' fontWeight='bold'>
            Học viện chính trị
          </Box>
          <Box fontSize='xxx-large' fontWeight='bold'>
            Quốc gia Hồ Chí Minh
          </Box>
          <Box fontSize='xx-large' fontWeight='medium'>
            Hệ thống quản lý cơ sở vật chất
          </Box>
          <Link href='/employee/facilities'>
            <Button
              variant='solid'
              fontWeight='bold'
              size='md'
              mt={5}
              colorScheme='teal'>
              Bắt đầu
            </Button>
          </Link>
        </Box>
        <Spacer />
        <Image src='/assets/images/poster.png' maxW='50%' />
      </Flex>
    </EmployeeLayout>
  )
}

export default Home
