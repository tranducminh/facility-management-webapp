import { Text, Icon, Flex } from '@chakra-ui/react'
import { BsTools } from 'react-icons/bs'
import { withTranslation, Link } from '../../../../../i18n'

import { useColor } from '../../../../theme/useColorMode'

export default function FacilityItem() {
  const { hoverTextColor, hoverBgColor } = useColor()
  return (
    <Link href='/user/facilities/ipad'>
      <Flex
        borderWidth='2px'
        borderRadius='lg'
        flexDirection='row'
        alignItems='center'
        p={4}
        cursor='pointer'
        _hover={{
          color: hoverTextColor,
          backgroundColor: hoverBgColor,
          borderColor: hoverBgColor,
        }}>
        <Icon as={BsTools} fontSize='2xl' />
        <Text textAlign='center' textStyle='bold-md' ml='5'>
          Ipad
        </Text>
      </Flex>
    </Link>
  )
}
