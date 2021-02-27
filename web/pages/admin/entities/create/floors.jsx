import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { MdCancel } from 'react-icons/md';

import ControlledNumber from '../../../../components/Admin/Forms/ControlledNumber';
import ControlledText from '../../../../components/Admin/Forms/ControlledText';
import Layout from '../../../../components/Layout';
import { post } from '../../../../helpers/apiHelper';
import webRoutes from '../../../../helpers/webRoutes';

const CreateFloors = () => {
  const [number, setNumber] = useState(1);
  const [name, setName] = useState('');
  const { colorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();

  const bg = useColorModeValue('#fafafa');

  return (
    <Layout title={['Create Floor']}>
      <Flex as="form" borderRadius="md" direction="column" align="center" justify="center">
        <VStack
          px={[7, 14]}
          py={[5, 10]}
          spacing={5}
          borderRadius="md"
          w={['full', 'full', '60%']}
          border={colorMode === 'light' ? '1px solid #000' : '1px solid #fff'}
          bg={bg}
        >
          <Heading
            textAlign="center"
            fontSize={['md', 'md', 'lg']}
            textTransform="uppercase"
            color="#4e54c8"
          >
            Create a new floor!
          </Heading>

          <Text textAlign="center" fontSize="sm">
            Hello Owner! Please fill up some details first!
          </Text>

          <ControlledNumber
            stateValue={number}
            stateDispatch={setNumber}
            formLabel="Floor Number"
            formHelper="The floor number to input."
          />

          <ControlledText
            stateValue={name}
            stateDispatch={setName}
            formLabel="Floor Name"
            formHelper="The floor name."
            formPlaceholder="Name of the floor..."
          />

          <ButtonGroup variant="outline" spacing={6}>
            <Button
              type="submit"
              leftIcon={<Icon as={IoCreateOutline} />}
              colorScheme="teal"
              disabled={!name || !number}
              onClick={async (e) => {
                e.preventDefault();

                const apiResponse = await post({ number, name, entity: 'floors' }, '/api/create');

                if (apiResponse.status === 'success') {
                  toast({
                    title: 'Successfully created!',
                    description: 'Thank you! You will be redirected shortly.',
                    status: 'success',
                    isClosable: true,
                  });

                  return setTimeout(() => router.push(webRoutes.adminEntities('floors')), 1000);
                }

                return toast({
                  title: 'Failed to create!',
                  description: apiResponse.response.message,
                  status: 'error',
                  isClosable: true,
                });
              }}
            >
              Create
            </Button>
            <Button
              leftIcon={<Icon as={MdCancel} />}
              onClick={() => router.push(webRoutes.adminHomepage)}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </VStack>
      </Flex>
    </Layout>
  );
};

export default CreateFloors;
