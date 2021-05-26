/* eslint-disable @typescript-eslint/ban-types */
import { Grid, GridItem } from '@chakra-ui/react'
import { BUILDING, FLOOR, ROOM } from '../../../../types'
import RoomItem from './RoomItem'

export default function RoomList({
  rooms,
  building,
  floor,
  refresh,
}: {
  rooms: ROOM[]
  building: BUILDING
  floor: FLOOR
  refresh: Function
}) {
  return (
    <Grid templateColumns='repeat(5, 1fr)' gap={4}>
      {rooms.map((room, index) => (
        <GridItem colSpan={1} key={index}>
          <RoomItem
            room={room}
            building={building}
            floor={floor}
            refresh={refresh}
          />
        </GridItem>
      ))}
    </Grid>
  )
}
