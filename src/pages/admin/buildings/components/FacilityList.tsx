import { Grid, GridItem } from '@chakra-ui/react'
import { FACILITY } from '../../../../types'
import FacilityItem from './FacilityItem'

export default function FacilityList({
  facilities = [],
}: {
  facilities?: FACILITY[]
}) {
  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={3}>
      {!facilities
        ? null
        : facilities.map((facility: FACILITY, index: number) => (
          <GridItem key={index} colSpan={1} overflow='hidden'>
            <FacilityItem facility={facility} />
          </GridItem>
        ))}
    </Grid>
  )
}
