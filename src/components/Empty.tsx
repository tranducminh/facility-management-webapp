import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/react'

export default function Empty({ title }: { title: string }) {
  return (
    <Alert
      status='info'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='200px'>
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        {title}
      </AlertTitle>
    </Alert>
  )
}
