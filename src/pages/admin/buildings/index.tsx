import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Flex,
  Grid,
  FormControl,
  FormLabel,
  useDisclosure,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Formik, Form, Field } from 'formik'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import AdminDashboard from '../../../layouts/AdminDashboard'
import { Link } from '../../../../i18n'
import BuildingItem from './components/BuildingItem'
import axios from '../../../utils/axios'
import { BUILDING, FLOOR } from '../../../types'

type FormData = {
  name: string
}
export default function Building() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [buildings, setBuildings] = useState<BUILDING[]>([{}])
  useEffect(() => {
    axios
      .get('/buildings')
      .then((result) => {
        setBuildings(result.data.buildings)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const createBuilding = async (data: FormData) => {
    await axios
      .post('/buildings', data)
      .then((result) => {
        const building_ = result.data.building as BUILDING
        setBuildings([...buildings, building_])
        onClose()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const calculateRoomQuantity = (floors: FLOOR[] = []): number => {
    let roomQuantity = 0
    floors.forEach((floor: FLOOR) => {
      roomQuantity += floor?.rooms?.length || 0
    })
    return roomQuantity
  }

  function validateBuildingName(value: string) {
    let error
    if (!value) {
      error = 'Tên tòa nhà không được bỏ trống'
    }
    return error
  }

  return (
    <AdminDashboard isBuilding>
      <Flex justifyContent='space-between' alignItems='center' mb={5}>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link href='/admin/buildings'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Tòa nhà</Text>
              </BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
        </Breadcrumb>
        <Button
          rightIcon={<ArrowRightIcon fontSize='xs' />}
          colorScheme='teal'
          variant='ghost'
          size='sm'
          onClick={onOpen}>
          <Text textStyle='bold-sm'>Tạo tòa nhà mới</Text>
        </Button>
      </Flex>
      <Grid templateColumns='repeat(5, 1fr)' gap={4}>
        {buildings.map((building, index) => (
          <BuildingItem
            key={index}
            buildingName={building.name}
            totalFloor={building?.floors?.length || 0}
            totalRoom={calculateRoomQuantity(building?.floors)}
            totalRequest={0}
          />
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{ name: '' }}
            onSubmit={async (values: FormData, actions: any) => {
              await createBuilding(values)
              actions.setSubmitting(false)
            }}>
            {(props) => (
              <Form>
                <ModalHeader>Tạo tòa nhà mới</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Field name='name' validate={validateBuildingName}>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel htmlFor='name'>Tên tòa nhà</FormLabel>
                        <Input
                          {...field}
                          colorScheme='teal'
                          id='name'
                          placeholder='Tên tòa nhà'
                        />
                        <FormErrorMessage>{form.errors?.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <ModalFooter>
                  <Button size='sm' onClick={onClose} mr={3}>
                    Hủy
                  </Button>
                  <Button
                    size='sm'
                    colorScheme='teal'
                    type='submit'
                    isLoading={props.isSubmitting}>
                    Tạo mới
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </AdminDashboard>
  )
}
