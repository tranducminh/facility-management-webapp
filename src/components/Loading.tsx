import { Spinner, Box } from '@chakra-ui/react'

export default function Loading({ size = 'sm' }: { size?: string }) {
  return (
    <Box w='100%' height='100%'>
      <Spinner size={size} color='teal' />
    </Box>
  )
}
