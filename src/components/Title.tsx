import { Text, Divider } from '@chakra-ui/react'

export default function Title({ title }: { title: string }) {
  return (
    <div>
      <Text fontSize='22px' fontWeight='medium' mb={2}>
        {title}
      </Text>
      <Divider mb='2' />
    </div>
  )
}
