/* eslint-disable array-callback-return */
import {
  Box,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react'
import { RiComputerLine } from 'react-icons/ri'
import { FaFax } from 'react-icons/fa'
import { BiPrinter } from 'react-icons/bi'
import React from 'react'
import { SPECIALIZE } from '../types'

export default function Specialize({
  specializes = [],
}: {
  specializes?: SPECIALIZE[]
}) {
  return (
    <Box>
      {specializes?.map((specialize: SPECIALIZE, index: number) => {
        if (specialize.active) {
          switch (specialize.facilityType?.name) {
            case 'computer':
              return (
                <Popover size='xs' placement='bottom-start'>
                  <PopoverTrigger>
                    <Icon
                      key={index}
                      as={RiComputerLine}
                      fontSize='1.2em'
                      m='1'
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Mô tả</PopoverHeader>
                    <PopoverBody>
                      {specialize.description || 'Chưa cập nhật'}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )
            case 'fax':
              return (
                <Popover size='xs' placement='bottom-start'>
                  <PopoverTrigger>
                    <Icon key={index} as={FaFax} fontSize='1em' />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Mô tả</PopoverHeader>
                    <PopoverBody>
                      {specialize.description || 'Chưa cập nhật'}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )
            case 'printer':
              return (
                <Popover size='xs' placement='bottom-start'>
                  <PopoverTrigger>
                    <Icon key={index} as={BiPrinter} fontSize='1em' />
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Mô tả</PopoverHeader>
                    <PopoverBody>
                      {specialize.description || 'Chưa cập nhật'}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              )
            default:
              break
          }
        }
      })}
    </Box>
  )
}
