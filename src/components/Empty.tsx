import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Text,
} from '@chakra-ui/react'

export default function Empty({
  title,
  description = '',
}: {
  title: string
  description?: string
}) {
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
      <AlertDescription maxWidth='sm'>
        <Text mt='0.1rem'>{description}</Text>
      </AlertDescription>
    </Alert>
  )
}
