import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { RiLoginCircleFill, RiRewindFill } from 'react-icons/ri';

import { post } from '../../helpers/apiHelper';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();
  const router = useRouter();

  return (
    <Flex as="form" borderRadius="md" direction="column" align="center" justify="center">
      <VStack
        px={[7, 14]}
        py={[5, 10]}
        spacing={5}
        borderRadius="md"
        w={['full', 'full', '60%']}
        bg="#fafafa"
      >
        <Heading
          textAlign="center"
          fontSize={['md', 'md', 'lg']}
          textTransform="uppercase"
          color="#4e54c8"
        >
          Log in to your account!
        </Heading>

        <Text textAlign="center" fontSize="sm">
          Hello! For us to provide better services, please login first!
        </Text>

        <FormControl isRequired>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            textAlign="center"
            bg="white"
            id="username"
            placeholder="PatrickStar1350..."
            value={username}
            onChange={({ currentTarget: { value } }) => setUsername(value)}
            focusBorderColor="green.500"
            size="lg"
          />
          <FormHelperText fontSize="xs">Your username that you used to register.</FormHelperText>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            textAlign="center"
            bg="white"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            errorBorderColor="red.500"
            minLength={8}
            isInvalid={password.length < 8 && password.length > 0}
            onChange={({ currentTarget: { value } }) => setPassword(value)}
            focusBorderColor="green.500"
            size="lg"
          />
          <FormHelperText fontSize="xs">Your password that you used to register.</FormHelperText>
        </FormControl>

        <ButtonGroup variant="outline" spacing={6}>
          <Button
            leftIcon={<Icon as={RiLoginCircleFill} />}
            type="submit"
            colorScheme="teal"
            disabled={!username || !password || password.length < 8}
            onClick={async (e) => {
              e.preventDefault();

              const apiResponse = await post({ username, password }, '/api/login');

              if (apiResponse.status === 'success') {
                toast({
                  title: 'Successfully authenticated!',
                  description: 'Welcome! Please wait while you are being redirected!',
                  status: 'success',
                  isClosable: true,
                });

                return setTimeout(() => router.push('/'), 1000);
              }

              return toast({
                title: 'Failed to login!',
                description: apiResponse.response.message,
                status: 'error',
                isClosable: true,
              });
            }}
          >
            Sign In
          </Button>
          <Button leftIcon={<Icon as={RiRewindFill} />} colorScheme="blue">
            Cancel
          </Button>
        </ButtonGroup>
      </VStack>
    </Flex>
  );
};

export default LoginForm;