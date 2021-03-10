import {
  Button,
  chakra,
  HStack,
  Icon,
  IconButton,
  Image,
  Spacer,
  useColorMode,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useContext } from 'react';
import { FaMoon } from 'react-icons/fa';

import webRoutes from '../helpers/webRoutes';
import UserContext from '../utils/userContext';

const Header = () => {
  const { state } = useContext(UserContext);
  const { toggleColorMode } = useColorMode();

  return (
    <HStack as="nav" p={4} spacing={2}>
      <NextLink href={webRoutes.homepage} passHref>
        <HStack spacing={2}>
          <Image src="/logo.png" w={6} h={6} borderRadius="md" />
          <chakra.span fontSize="lg">Asuna</chakra.span>
        </HStack>
      </NextLink>

      <Spacer />

      <HStack spacing={3}>
        <NextLink href={webRoutes.listOfRooms} passHref>
          Rooms
        </NextLink>

        {state.isAuthenticated ? (
          <NextLink href={webRoutes.profile} passHref>
            <Button colorScheme="green" size="sm">
              Profile
            </Button>
          </NextLink>
        ) : (
          <NextLink href={webRoutes.signIn} passHref>
            <Button colorScheme="green" size="sm">
              Sign In
            </Button>
          </NextLink>
        )}

        <IconButton
          size="sm"
          colorScheme="red"
          aria-label="Activate Dark Mode"
          icon={<Icon as={FaMoon} />}
          variant="outline"
          onClick={() => toggleColorMode()}
        />
      </HStack>
    </HStack>
  );
};

export default Header;
