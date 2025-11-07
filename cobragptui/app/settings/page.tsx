'use client';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
  HStack,
  Divider,
  Avatar,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { MdOutlineManageAccounts, MdEdit } from 'react-icons/md';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';
import Card from '@/components/card/Card';

export default function Settings() {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  // Color mode values
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = useColorModeValue('gray.600', 'gray.400');
  const bgCard = useColorModeValue('white', 'navy.800');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');
  const brandColor = useColorModeValue('brand.500', 'brand.400');
  const iconColor = useColorModeValue('navy.700', 'white');

  // Form states
  const [userName, setUserName] = useState('Adela Parkson');
  const [userEmail, setUserEmail] = useState('adela.parkson@example.com');
  const [apiKey, setApiKey] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  // Load saved settings
  useEffect(() => {
    const savedApiKey = localStorage.getItem('apiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications !== null) {
      setNotifications(savedNotifications === 'true');
    }
    const savedAutoSave = localStorage.getItem('autoSave');
    if (savedAutoSave !== null) {
      setAutoSave(savedAutoSave === 'true');
    }
  }, []);

  const handleSaveSettings = () => {
    // Save to localStorage
    if (apiKey) {
      localStorage.setItem('apiKey', apiKey);
    }
    localStorage.setItem('notifications', notifications.toString());
    localStorage.setItem('autoSave', autoSave.toString());

    toast({
      title: 'Settings saved',
      description: 'Your settings have been saved successfully.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const handleResetSettings = () => {
    setUserName('Adela Parkson');
    setUserEmail('adela.parkson@example.com');
    setApiKey('');
    setNotifications(true);
    setAutoSave(true);
    localStorage.removeItem('apiKey');
    localStorage.removeItem('notifications');
    localStorage.removeItem('autoSave');

    toast({
      title: 'Settings reset',
      description: 'All settings have been reset to default.',
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Flex
        direction="column"
        maxW="1200px"
        mx="auto"
        px={{ base: '20px', md: '40px' }}
      >
        {/* Header */}
        <Flex align="center" mb="30px">
          <Icon
            as={MdOutlineManageAccounts}
            width="40px"
            height="40px"
            color={brandColor}
            me="15px"
          />
          <Heading size="lg" color={textColor}>
            Profile Settings
          </Heading>
        </Flex>

        {/* Profile Card */}
        <Card mb="20px" p="30px">
          <Heading size="md" color={textColor} mb="20px">
            Profile Information
          </Heading>
          <Flex direction={{ base: 'column', md: 'row' }} align="center" mb="30px">
            <Avatar
              size="xl"
              name={userName}
              bg={brandColor}
              color="white"
              me={{ base: '0', md: '30px' }}
              mb={{ base: '20px', md: '0' }}
            />
            <VStack align="start" spacing="15px" flex="1" w="100%">
              <FormControl>
                <FormLabel color={textColorSecondary} fontSize="sm">
                  Full Name
                </FormLabel>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  color={textColor}
                  borderColor={borderColor}
                  _focus={{ borderColor: brandColor }}
                />
              </FormControl>
              <FormControl>
                <FormLabel color={textColorSecondary} fontSize="sm">
                  Email Address
                </FormLabel>
                <Input
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
                  type="email"
                  color={textColor}
                  borderColor={borderColor}
                  _focus={{ borderColor: brandColor }}
                />
              </FormControl>
            </VStack>
          </Flex>
        </Card>

        {/* API Configuration Card */}
        <Card mb="20px" p="30px">
          <Heading size="md" color={textColor} mb="20px">
            API Configuration
          </Heading>
          <FormControl>
            <FormLabel color={textColorSecondary} fontSize="sm">
              OpenAI API Key
            </FormLabel>
            <Input
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              type="password"
              color={textColor}
              borderColor={borderColor}
              _focus={{ borderColor: brandColor }}
            />
            <Text fontSize="xs" color={textColorSecondary} mt="8px">
              Your API key is stored locally and never sent to our servers.
            </Text>
          </FormControl>
        </Card>

        {/* Appearance Card */}
        <Card mb="20px" p="30px">
          <Heading size="md" color={textColor} mb="20px">
            Appearance
          </Heading>
          <Flex
            justify="space-between"
            align="center"
            p="15px"
            borderRadius="10px"
            bg={useColorModeValue('gray.50', 'whiteAlpha.100')}
            border="1px solid"
            borderColor={borderColor}
          >
            <HStack spacing="15px">
              <Icon
                as={colorMode === 'light' ? IoMdSunny : IoMdMoon}
                width="24px"
                height="24px"
                color={iconColor}
              />
              <VStack align="start" spacing="2px">
                <Text color={textColor} fontWeight="500" fontSize="sm">
                  Theme Mode
                </Text>
                <Text color={textColorSecondary} fontSize="xs">
                  Currently using {colorMode === 'light' ? 'Light' : 'Dark'} mode
                </Text>
              </VStack>
            </HStack>
            <Button
              onClick={toggleColorMode}
              colorScheme="brand"
              size="sm"
              leftIcon={
                <Icon
                  as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
                  width="16px"
                  height="16px"
                />
              }
            >
              Switch to {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
          </Flex>
        </Card>

        {/* Preferences Card */}
        <Card mb="20px" p="30px">
          <Heading size="md" color={textColor} mb="20px">
            Preferences
          </Heading>
          <VStack spacing="20px" align="stretch">
            <Flex justify="space-between" align="center">
              <VStack align="start" spacing="2px">
                <Text color={textColor} fontWeight="500" fontSize="sm">
                  Enable Notifications
                </Text>
                <Text color={textColorSecondary} fontSize="xs">
                  Receive notifications about chat updates
                </Text>
              </VStack>
              <Switch
                isChecked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                colorScheme="brand"
                size="lg"
              />
            </Flex>
            <Divider borderColor={borderColor} />
            <Flex justify="space-between" align="center">
              <VStack align="start" spacing="2px">
                <Text color={textColor} fontWeight="500" fontSize="sm">
                  Auto-save Conversations
                </Text>
                <Text color={textColorSecondary} fontSize="xs">
                  Automatically save your chat history
                </Text>
              </VStack>
              <Switch
                isChecked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                colorScheme="brand"
                size="lg"
              />
            </Flex>
          </VStack>
        </Card>

        {/* Action Buttons */}
        <Flex
          gap="15px"
          mb="40px"
          direction={{ base: 'column', md: 'row' }}
          justify="flex-end"
        >
          <Button
            variant="outline"
            colorScheme="gray"
            onClick={handleResetSettings}
            w={{ base: '100%', md: 'auto' }}
          >
            Reset to Default
          </Button>
          <Button
            colorScheme="brand"
            onClick={handleSaveSettings}
            w={{ base: '100%', md: 'auto' }}
          >
            Save Changes
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
