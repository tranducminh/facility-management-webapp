import {
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
  FormErrorMessage,
} from '@chakra-ui/react'
import { ArrowRightIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { Link } from '../../../../../i18n'
import AdminDashboard from '../../../../layouts/AdminDashboard'
import axios from '../../../../utils/axios'
import { BUILDING } from '../../../../types'

type FormData = {
  name: string
}

export default function Building() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const [building, setBuilding] = useState<BUILDING>({})
  useEffect(() => {
    const buildingName = router.query['building-name'] as string
    axios
      .get(`buildings/${buildingName.split('-')[1]}`)
      .then((result) => {
        const building_ = result.data.building
        setBuilding(building_)
        if (building_.floors.length > 0) {
          router.push(
            `/admin/buildings/${buildingName}/floor-${building_.floors[0].name}`
          )
        }
      })
      .catch((error) => {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const createNewFloor = async (data: FormData) => {
    await axios
      .post('/floors', { ...data, buildingId: building.id })
      .then((response) => {
        const floor_ = response.data.floor
        router.push(
          `/admin/buildings/building-${building.name}/floor-${floor_.name}`
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function validateFloorName(value: string) {
    let error
    if (!value) {
      error = 'Tên tầng không được bỏ trống'
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
          <BreadcrumbItem>
            <Link href='/admin/buildings/building-a1'>
              <BreadcrumbLink>
                <Text textStyle='bold-md'>Tòa nhà {building?.name}</Text>
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
          <Text textStyle='bold-sm' mt='0.1rem'>
            Tạo tầng mới
          </Text>
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={{ name: '' }}
            onSubmit={async (values: FormData, actions: any) => {
              await createNewFloor(values)
              actions.setSubmitting(false)
            }}>
            {(props) => (
              <Form>
                <ModalHeader>Tạo tầng mới</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <Field name='name' validate={validateFloorName}>
                    {({ field, form }: { field: any; form: any }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel>Tên tầng</FormLabel>
                        <Input
                          {...field}
                          id='name'
                          colorScheme='teal'
                          placeholder='Tên tầng'
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
