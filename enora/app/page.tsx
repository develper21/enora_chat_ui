'use client';

import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Switch,
  Tag,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  FiBell,
  FiChevronLeft,
  FiChevronRight,
  FiEdit2,
  FiMenu,
  FiPlus,
  FiSearch,
  FiSend,
  FiSettings,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { MdAutoAwesome, MdOutlineTimeline, MdOutlineTune } from 'react-icons/md';

type MessageRole = 'user' | 'assistant';

type Message = {
  id: number;
  role: MessageRole;
  content: string;
  time: string;
};

type Thread = {
  id: number;
  title: string;
  updated: string;
  model: string;
};

export default function ChatWorkspace() {
  const [sidebarThreads] = useState<Thread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [activeThread, setActiveThread] = useState<number | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [autoArchive, setAutoArchive] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  const pageBg = useColorModeValue('linear-gradient(180deg,#f7f5ff, #f5fbff)', '#05060d');
  const surfaceBg = useColorModeValue('white', 'rgba(12,14,25,0.9)');
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
  const subtleColor = useColorModeValue('gray.500', 'gray.400');
  const strongText = useColorModeValue('gray.900', 'whiteAlpha.900');
  const assistantBubble = useColorModeValue('blackAlpha.50', 'whiteAlpha.100');
  const userBubble = useColorModeValue('purple.500', 'purple.400');
  const sidebarWidth = isSidebarCollapsed ? 92 : 296;
  const quickPrompts: string[] = [];
  const usageInsights: { label: string; value: string }[] = [];

  const handleSendMessage = () => {
    const trimmed = messageInput.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: trimmed,
      time: 'Just now',
    };

    const assistantReply: Message = {
      id: Date.now() + 1,
      role: 'assistant',
      content: `Here’s a draft tailored to “${trimmed}”. Feel free to tweak tone or ask me to expand it further.`,
      time: 'Moments ago',
    };

    setMessages((prev) => [...prev, userMessage, assistantReply]);
    setMessageInput('');
  };

  return (
    <Flex minH="100vh" bg={pageBg} color={strongText}>
      <Box
        display={{ base: 'none', md: 'flex' }}
        w={`${sidebarWidth}px`}
        transition="width 0.25s ease"
        borderRight="1px solid"
        borderColor={borderColor}
        bg={surfaceBg}
        backdropFilter="blur(12px)"
      >
        <SidebarContent
          activeThread={activeThread}
          isCollapsed={isSidebarCollapsed}
          onSelectThread={setActiveThread}
          onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
          threads={sidebarThreads}
        />
      </Box>

      <Flex direction="column" flex="1" minH="100vh">
        <Flex
          px={{ base: 4, md: 8 }}
          py={4}
          align="center"
          justify="space-between"
          borderBottom="1px solid"
          borderColor={borderColor}
          bg={surfaceBg}
          backdropFilter="blur(12px)"
          position="sticky"
          top={0}
          zIndex={2}
        >
          <HStack spacing={4}>
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label="Open navigation"
              icon={<FiMenu />}
              variant="ghost"
              onClick={onOpen}
            />
            <Box>
              <Text fontSize="lg" fontWeight="700">
                Enora workspace
              </Text>
              <HStack spacing={2} color={subtleColor} fontSize="sm">
                <Icon as={MdOutlineTimeline} />
                <Text>Live conversations</Text>
              </HStack>
            </Box>
            <Tag colorScheme="purple" borderRadius="full">
              GPT-4o live
            </Tag>
          </HStack>
          <HStack spacing={3}>
            <IconButton
              aria-label="Toggle notifications"
              variant="ghost"
              icon={<FiBell />}
            />
            <IconButton
              aria-label="Toggle color mode"
              variant="ghost"
              icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
              onClick={toggleColorMode}
            />
            <Button variant="ghost" leftIcon={<FiSettings />} display={{ base: 'none', md: 'flex' }}>
              Workspace settings
            </Button>
            <Avatar name="Adela Parkson" size="sm" />
          </HStack>
        </Flex>

        <Flex flex="1" direction={{ base: 'column', xl: 'row' }} gap={6} p={{ base: 4, md: 8 }}>
          <Flex
            flex="1"
            direction="column"
            bg={surfaceBg}
            borderRadius="2xl"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="lg"
            overflow="hidden"
            minH="520px"
          >
            <Flex
              px={{ base: 4, md: 6 }}
              py={4}
              borderBottom="1px solid"
              borderColor={borderColor}
              justify="space-between"
              align="center"
            >
              <HStack spacing={3}>
                <IconButton aria-label="Tune conversation" icon={<MdOutlineTune />} variant="ghost" />
                <Text fontWeight="600">Conversation flow</Text>
              </HStack>
              <HStack spacing={3}>
                <Badge colorScheme="purple" borderRadius="full">
                  Smart context
                </Badge>
                <Button size="sm" variant="outline" borderRadius="full">
                  Switch model
                </Button>
              </HStack>
            </Flex>

            <Stack spacing={4} flex="1" overflowY="auto" px={{ base: 4, md: 6 }} py={6}>
              {messages.length === 0 ? (
                <Flex
                  direction="column"
                  align="center"
                  justify="center"
                  border="1px dashed"
                  borderColor={borderColor}
                  borderRadius="2xl"
                  py={12}
                  px={6}
                  textAlign="center"
                  color={subtleColor}
                >
                  <Avatar mb={4} size="sm" bg="purple.500" icon={<MdAutoAwesome color="white" />} />
                  <Text fontWeight="600" mb={2} color={strongText}>
                    No messages yet
                  </Text>
                  <Text fontSize="sm">
                    Start a conversation to see replies and context appear here.
                  </Text>
                </Flex>
              ) : (
                messages.map((message) => (
                  <Flex key={message.id} justify={message.role === 'user' ? 'flex-end' : 'flex-start'}>
                    <Box maxW="520px">
                      <HStack spacing={3} justify={message.role === 'user' ? 'flex-end' : 'flex-start'}>
                        {message.role === 'assistant' && (
                          <Avatar size="sm" bg="purple.500" icon={<MdAutoAwesome color="white" />} />
                        )}
                        <Box
                          borderRadius="2xl"
                          px={4}
                          py={3}
                          bg={message.role === 'user' ? userBubble : assistantBubble}
                          color={message.role === 'user' ? 'white' : strongText}
                          boxShadow="md"
                        >
                          <Text fontSize="sm" whiteSpace="pre-wrap">
                            {message.content}
                          </Text>
                        </Box>
                        {message.role === 'user' && <Avatar size="sm" name="You" bg="blackAlpha.200" />}
                      </HStack>
                      <Text fontSize="xs" mt={1} color={subtleColor} textAlign={message.role === 'user' ? 'right' : 'left'}>
                        {message.time}
                      </Text>
                    </Box>
                  </Flex>
                ))
              )}
            </Stack>

            <Box borderTop="1px solid" borderColor={borderColor} p={{ base: 4, md: 6 }}>
              <Stack spacing={4}>
                {quickPrompts.length > 0 ? (
                  <HStack spacing={3} flexWrap="wrap">
                    {quickPrompts.map((prompt) => (
                      <Button
                        key={prompt}
                        size="sm"
                        variant="ghost"
                        borderRadius="full"
                        border="1px solid"
                        borderColor={borderColor}
                        onClick={() => setMessageInput(prompt)}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </HStack>
                ) : (
                  <Text fontSize="sm" color={subtleColor}>
                    Add quick prompts to speed up common requests.
                  </Text>
                )}
                <Flex gap={3} direction={{ base: 'column', md: 'row' }}>
                  <Input
                    placeholder="Send a message or type / for commands"
                    value={messageInput}
                    onChange={(event) => setMessageInput(event.target.value)}
                    borderRadius="full"
                    border="1px solid"
                    borderColor={borderColor}
                    minH="54px"
                  />
                  <Button
                    colorScheme="purple"
                    rightIcon={<FiSend />}
                    borderRadius="full"
                    minH="54px"
                    onClick={handleSendMessage}
                  >
                    Send
                  </Button>
                </Flex>
              </Stack>
            </Box>
          </Flex>

          <Stack
            w={{ base: '100%', xl: '340px' }}
            spacing={6}
            flexShrink={0}
            position="relative"
          >
            <Box
              bg={surfaceBg}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              p={6}
              boxShadow="lg"
            >
              <Flex justify="space-between" align="center" mb={4}>
                <Text fontWeight="600">Profile</Text>
                <Button size="xs" variant="outline" leftIcon={<FiEdit2 />}>
                  Add details
                </Button>
              </Flex>
              <HStack spacing={4} align="flex-start">
                <Avatar size="lg" bg="purple.500" icon={<MdAutoAwesome color="white" />} />
                <Box>
                  <Text fontWeight="600">No profile connected</Text>
                  <Text fontSize="sm" color={subtleColor}>
                    Personalize this workspace by adding your name, role, and avatar.
                  </Text>
                  <Badge mt={2} colorScheme="purple" borderRadius="full">
                    Complete setup
                  </Badge>
                </Box>
              </HStack>
            </Box>

            <Box
              bg={surfaceBg}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              p={6}
              boxShadow="lg"
            >
              <Text fontWeight="600" mb={3}>
                Usage snapshot
              </Text>
              {usageInsights.length > 0 ? (
                <Stack spacing={4}>
                  {usageInsights.map((insight) => (
                    <Flex key={insight.label} justify="space-between" align="center">
                      <Text color={subtleColor} fontSize="sm">
                        {insight.label}
                      </Text>
                      <Text fontWeight="600">{insight.value}</Text>
                    </Flex>
                  ))}
                </Stack>
              ) : (
                <Text fontSize="sm" color={subtleColor}>
                  Connect telemetry to view usage insights.
                </Text>
              )}
              <Divider my={4} />
              <Button w="full" colorScheme="purple" variant="outline" borderRadius="full">
                View analytics
              </Button>
            </Box>

            <Box
              bg={surfaceBg}
              borderRadius="2xl"
              border="1px solid"
              borderColor={borderColor}
              p={6}
              boxShadow="lg"
            >
              <Text fontWeight="600" mb={4}>
                Workspace controls
              </Text>
              <Stack spacing={4}>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="500">Notifications</Text>
                    <Text fontSize="xs" color={subtleColor}>
                      Alerts for assistant handoffs
                    </Text>
                  </Box>
                  <Switch
                    colorScheme="purple"
                    isChecked={notificationsEnabled}
                    onChange={(event) => setNotificationsEnabled(event.target.checked)}
                  />
                </Flex>
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="500">Auto-archive chats</Text>
                    <Text fontSize="xs" color={subtleColor}>
                      Move silent threads after 72h
                    </Text>
                  </Box>
                  <Switch
                    colorScheme="purple"
                    isChecked={autoArchive}
                    onChange={(event) => setAutoArchive(event.target.checked)}
                  />
                </Flex>
                <Button leftIcon={<FiSettings />} variant="ghost" justifyContent="flex-start">
                  Advanced preferences
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="xs">
        <DrawerOverlay />
        <DrawerContent bg={surfaceBg}>
          <DrawerCloseButton mt={2} />
          <DrawerBody px={0}>
            <SidebarContent
              activeThread={activeThread}
              isCollapsed={false}
              onSelectThread={(id) => {
                setActiveThread(id);
                onClose();
              }}
              onToggleCollapse={() => undefined}
              threads={sidebarThreads}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

type SidebarProps = {
  threads: Thread[];
  activeThread: number | null;
  isCollapsed: boolean;
  onSelectThread: (id: number) => void;
  onToggleCollapse: () => void;
};

function SidebarContent({
  threads,
  activeThread,
  isCollapsed,
  onSelectThread,
  onToggleCollapse,
}: SidebarProps) {
  const accent = useColorModeValue('purple.500', 'purple.300');
  const borderColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.200');
  const subtle = useColorModeValue('gray.500', 'gray.400');

  return (
    <Flex direction="column" h="100%" w="full">
      <Flex
        align="center"
        justify={isCollapsed ? 'center' : 'space-between'}
        px={4}
        py={4}
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        <HStack spacing={3}>
          <Avatar size="sm" bg={accent} icon={<MdAutoAwesome color="white" />} />
          {!isCollapsed && (
            <Box>
              <Text fontWeight="700">Enora</Text>
              <Text fontSize="xs" color={subtle}>
                Conversational AI
              </Text>
            </Box>
          )}
        </HStack>
        <IconButton
          aria-label="Collapse sidebar"
          icon={isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
          size="sm"
          variant="ghost"
          onClick={onToggleCollapse}
        />
      </Flex>

      <Flex direction="column" flex="1" px={isCollapsed ? 2 : 4} py={4} gap={4}>
        {!isCollapsed && (
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color={subtle} />
            </InputLeftElement>
            <Input
              placeholder="Search chats"
              borderRadius="full"
              border="1px solid"
              borderColor={borderColor}
              pl={10}
            />
          </InputGroup>
        )}
        <Button
          leftIcon={<FiPlus />}
          justifyContent={isCollapsed ? 'center' : 'flex-start'}
          borderRadius="full"
          colorScheme="purple"
        >
          {!isCollapsed && 'New chat'}
        </Button>

        <Text fontSize="xs" textTransform="uppercase" color={subtle} px={isCollapsed ? 0 : 2}>
          Recent
        </Text>

        <VStack align="stretch" spacing={2} flex="1" overflowY="auto">
          {threads.length === 0 && !isCollapsed && (
            <Box
              borderRadius="xl"
              border="1px dashed"
              borderColor={borderColor}
              p={4}
              textAlign="center"
              color={subtle}
              fontSize="sm"
            >
              No chats yet. Create one to see it listed here.
            </Box>
          )}
          {threads.map((thread) => {
            const isActive = activeThread === thread.id;
            return (
              <Tooltip key={thread.id} label={thread.title} placement="right" isDisabled={!isCollapsed}>
                <Flex
                  onClick={() => onSelectThread(thread.id)}
                  align="center"
                  gap={3}
                  px={isCollapsed ? 2 : 4}
                  py={3}
                  borderRadius="xl"
                  cursor="pointer"
                  border="1px solid"
                  borderColor={isActive ? accent : 'transparent'}
                  bg={isActive ? 'purple.500' : 'transparent'}
                  color={isActive ? 'white' : undefined}
                  transition="all 0.2s ease"
                >
                  <Icon as={FiSearch} boxSize={4} opacity={isActive ? 0.8 : 0.6} />
                  {!isCollapsed && (
                    <Box flex="1">
                      <Text fontWeight="600" noOfLines={1}>
                        {thread.title}
                      </Text>
                      <Text fontSize="xs" opacity={0.8}>
                        {thread.updated}
                      </Text>
                    </Box>
                  )}
                  {!isCollapsed && (
                    <Tag size="sm" borderRadius="full" variant="subtle" colorScheme="whiteAlpha">
                      {thread.model}
                    </Tag>
                  )}
                </Flex>
              </Tooltip>
            );
          })}
        </VStack>

        <Box
          borderTop="1px solid"
          borderColor={borderColor}
          pt={4}
          mt="auto"
          px={isCollapsed ? 0 : 2}
        >
          <Button
            variant="ghost"
            leftIcon={<FiSettings />}
            justifyContent={isCollapsed ? 'center' : 'flex-start'}
            w="full"
          >
            {!isCollapsed && 'Workspace settings'}
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
