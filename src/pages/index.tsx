import { Image, Flex, Spacer, Box, Button } from '@chakra-ui/react'
import Head from 'next/head'
import { TFunction } from 'next-i18next'
import { withTranslation, Link } from '../../i18n'
import UserLayout from '../layouts/UserLayout'

function Home({ t }: { readonly t: TFunction }) {
  return (
    <UserLayout>
      <Head>
        <title>{t('homepage')}</title>
      </Head>
      <Flex justify='space-between' align='center'>
        <Box maxW='50%'>
          <Box fontSize='xxx-large' fontWeight='bold'>
            {t('hcma')}
          </Box>
          <Box fontSize='xx-large' fontWeight='medium'>
            {t('webName')}
          </Box>
          <Link href='/dashboard'>
            <Button
              variant='solid'
              fontWeight='bold'
              size='lg'
              mt={5}
              colorScheme='teal'>
              {t('start')}
            </Button>
          </Link>
        </Box>
        <Spacer />
        <Image src='/assets/images/poster.png' maxW='50%' />
      </Flex>
    </UserLayout>
  )
}

Home.getInitialProps = async () => ({
  namespacesRequired: ['user-index'],
})

export default withTranslation('user-index')(Home)
