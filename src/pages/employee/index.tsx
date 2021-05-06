import { Image, Flex, Spacer, Box, Button } from '@chakra-ui/react'
import Head from 'next/head'
import { TFunction } from 'next-i18next'
import { withTranslation, Link } from '../../../i18n'
import EmployeeLayout from '../../layouts/EmployeeLayout'

function Home({ t }: { readonly t: TFunction }) {
  return (
    <EmployeeLayout>
      <Head>
        <title>{t('homepage')}</title>
      </Head>
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

Home.getInitialProps = async () => ({
  namespacesRequired: ['user-index'],
})

export default withTranslation('user-index')(Home)
