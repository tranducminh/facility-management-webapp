import { Image, Flex, Spacer, Box, Button } from '@chakra-ui/react'
import Head from 'next/head'
import { withTranslation } from '../../i18n'
import UserLayout from '../layouts/user-layout'

function Home({ t }: { t: any }) {
  return (
    <UserLayout>
      <Head>
        <title>{t('homepage')}</title>
      </Head>
      <Flex justify='space-between' align='center'>
        <Box>
          <Box fontSize='xxx-large' fontWeight='bold'>
            {t('hcma')}
          </Box>
          <Box fontSize='xx-large' fontWeight='medium'>
            {t('webName')}
          </Box>
          <Button
            variant='solid'
            fontWeight='bold'
            size='lg'
            mt={5}
            colorScheme='teal'>
            {t('start')}
          </Button>
        </Box>
        <Spacer />
        <Image src='/assets/images/poster.png' />
      </Flex>
    </UserLayout>
  )
}

Home.getInitialProps = async () => ({
  namespacesRequired: ['user-index'],
})

export default withTranslation('user-index')(Home)
