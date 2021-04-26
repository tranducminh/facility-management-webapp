import { Grid, GridItem } from '@chakra-ui/react'
import { BUILDING, FLOOR, ROOM } from '../../../../types'
import RoomItem from './RoomItem'

export default function RoomList({
  rooms,
  building,
  floor,
}: {
  rooms: ROOM[]
  building: BUILDING
  floor: FLOOR
}) {
  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={4}>
      {rooms.map((item, index) => (
        <GridItem colSpan={1} key={index}>
          <RoomItem roomName={item.name} building={building} floor={floor} />
        </GridItem>
      ))}
    </Grid>
  )
}
