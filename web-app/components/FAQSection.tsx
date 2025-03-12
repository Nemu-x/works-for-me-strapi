import React, { FC, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  Divider,
  useColorMode,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { ExternalLinkIcon, ChevronDownIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import { PlayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

// Types
interface Instruction {
  title: string;
  videoUrl?: string;
  documentUrl?: string;
}

interface FAQItem {
  question: string;
  answer: string;
  links?: Array<{ text: string; url: string }>;
  instructions?: Instruction[];
}

interface TopLevelCategory {
  id: 'general' | 'staff' | 'student';
  icon: string;
  label: string;
  priorityResources: string[];
  prioritySupport: string[];
}

interface FAQCategory {
  id: string;
  icon: string;
  label: string;
  includes?: string[];
  keywords?: string[];
}

// Sample data
const supportPortals = {
  main: "https://support.example.com",
  help: "https://help.example.com",
  docs: "https://docs.example.com",
};

const faqData: FAQItem[] = [
  {
    question: "How do I get started?",
    answer: "Follow our quick start guide to begin using the platform.",
    links: [{ text: "Quick Start Guide", url: "https://docs.example.com/quickstart" }]
  },
  {
    question: "How to reset my password?",
    answer: "You can reset your password through the account settings.",
    instructions: [
      {
        title: "Password Reset Guide",
        videoUrl: "/videos/password-reset.mp4",
        documentUrl: "/docs/password-reset.pdf"
      }
    ]
  }
];

const systemsData = {
  resources: [
    { name: "Documentation", url: "https://docs.example.com", description: "Official Documentation", icon: "📚" },
    { name: "API Reference", url: "https://api.example.com", description: "API Documentation", icon: "🔧" },
    { name: "Community", url: "https://community.example.com", description: "User Community", icon: "👥" }
  ],
  support: [
    { name: "Help Center", url: supportPortals.help, description: "Support Center", icon: "💡" },
    { name: "Technical Support", url: supportPortals.main, description: "Technical Help", icon: "🔧" },
    { name: "Documentation", url: supportPortals.docs, description: "Guides & Tutorials", icon: "📖" }
  ]
};

const topLevelCategories: TopLevelCategory[] = [
  { 
    id: 'general',
    icon: '🏠',
    label: 'General',
    priorityResources: ['Documentation', 'Community'],
    prioritySupport: ['Help Center']
  },
  {
    id: 'staff',
    icon: '👥',
    label: 'Staff',
    priorityResources: ['API Reference', 'Documentation'],
    prioritySupport: ['Technical Support']
  },
  {
    id: 'student',
    icon: '🎓',
    label: 'Student',
    priorityResources: ['Documentation', 'Community'],
    prioritySupport: ['Help Center', 'Documentation']
  }
];

const faqCategories: FAQCategory[] = [
  { id: 'all', icon: '📑', label: 'All' },
  { 
    id: 'getting-started', 
    icon: '🚀', 
    label: 'Getting Started',
    keywords: ['start', 'begin', 'setup', 'install']
  },
  { 
    id: 'account', 
    icon: '🔐', 
    label: 'Account',
    keywords: ['password', 'login', 'account', 'profile']
  },
  { 
    id: 'features', 
    icon: '✨', 
    label: 'Features',
    keywords: ['feature', 'function', 'capability']
  }
];

// Modal Component
const InstructionModal: FC<{ instruction: Instruction; isOpen: boolean; onClose: () => void }> = ({
  instruction,
  isOpen,
  onClose
}) => (
  <Modal isOpen={isOpen} onClose={onClose} size="4xl">
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{instruction.title}</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <VStack spacing={4} align="stretch">
          {instruction.videoUrl && (
            <Box>
              <Heading size="md" mb={2}>Video Guide</Heading>
              <video width="100%" controls>
                <source src={instruction.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          )}
          {instruction.documentUrl && (
            <Box>
              <Heading size="md" mb={2}>Written Guide</Heading>
              <Link href={instruction.documentUrl} isExternal>
                <Button leftIcon={<Icon as={DocumentTextIcon} />} colorScheme="blue" variant="outline">
                  Open Documentation
                </Button>
              </Link>
            </Box>
          )}
        </VStack>
      </ModalBody>
    </ModalContent>
  </Modal>
);

// Main Component
const FAQSection: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  
  // Color mode values
  const bgGradient = useColorModeValue(
    'linear(to-b, blue.50, gray.50)',
    'linear(to-b, gray.800, gray.900)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBorderColor = useColorModeValue('blue.200', 'blue.500');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const headingColor = useColorModeValue('gray.900', 'white');
  const inputBg = useColorModeValue('white', 'gray.700');
  const placeholderColor = useColorModeValue('gray.400', 'gray.500');
  const linkColor = useColorModeValue('blue.500', 'blue.300');
  
  // Accordion colors
  const accordionHoverBg = useColorModeValue('gray.50', 'gray.700');
  const accordionExpandedBg = useColorModeValue('blue.50', 'blue.900');
  const accordionExpandedColor = useColorModeValue('blue.600', 'blue.200');

  const [selectedInstruction, setSelectedInstruction] = useState<Instruction | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'general' | 'staff' | 'student'>('general');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Filtering logic
  const getFilteredSystems = (category: TopLevelCategory['id']) => {
    const currentCategory = topLevelCategories.find(cat => cat.id === category);
    
    let filteredResources = [...systemsData.resources];
    let filteredSupport = [...systemsData.support];

    if (currentCategory) {
      filteredResources.sort((a, b) => {
        const aIndex = currentCategory.priorityResources.indexOf(a.name);
        const bIndex = currentCategory.priorityResources.indexOf(b.name);
        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });

      filteredSupport.sort((a, b) => {
        const aIndex = currentCategory.prioritySupport.indexOf(a.name);
        const bIndex = currentCategory.prioritySupport.indexOf(b.name);
        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredResources = filteredResources.filter(system =>
        system.name.toLowerCase().includes(query) ||
        system.description.toLowerCase().includes(query)
      );
      filteredSupport = filteredSupport.filter(system =>
        system.name.toLowerCase().includes(query) ||
        system.description.toLowerCase().includes(query)
      );
    }

    return { resources: filteredResources, support: filteredSupport };
  };

  const getFilteredFAQ = () => {
    return faqData.filter(faq => {
      const matchesSearch = !searchQuery.trim() || 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (!activeTag || activeTag === 'all') return true;

      const category = faqCategories.find(cat => cat.id === activeTag);
      if (!category || !category.keywords) return true;

      return category.keywords.some(keyword => 
        faq.question.toLowerCase().includes(keyword) ||
        faq.answer.toLowerCase().includes(keyword)
      );
    });
  };

  const filteredSystems = getFilteredSystems(activeCategory);
  const filteredFAQ = getFilteredFAQ();

  return (
    <Box bgGradient={bgGradient} minH="100vh" p={4}>
      <VStack spacing={6} align="stretch">
        <HStack justify="space-between" align="center">
          <Box>
            <Heading size="xl" mb={4} color={headingColor}>Resource Hub</Heading>
            <Text fontSize="lg" color={textColor} mb={6}>
              Find documentation, guides, and support resources all in one place.
            </Text>
          </Box>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            size="lg"
            variant="ghost"
            color={headingColor}
            _hover={{
              transform: 'rotate(360deg)',
              transition: 'transform 0.5s'
            }}
          />
        </HStack>

        <HStack spacing={4} mb={6}>
          {topLevelCategories.map(category => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? 'solid' : 'outline'}
              colorScheme="blue"
              leftIcon={<Text>{category.icon}</Text>}
            >
              {category.label}
            </Button>
          ))}
        </HStack>
        
        <Box mb={6}>
          <HStack>
            <Box flex="1">
              <input
                type="text"
                placeholder="Search for guides, services, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  fontSize: '16px',
                  backgroundColor: inputBg,
                  color: textColor,
                }}
              />
              <style jsx>{`
                input::placeholder {
                  color: ${placeholderColor};
                }
              `}</style>
            </Box>
            {searchQuery && (
              <Button
                onClick={() => setSearchQuery("")}
                variant="ghost"
                colorScheme="blue"
              >
                Clear
              </Button>
            )}
          </HStack>
        </Box>

        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={4} mb={8}>
          {filteredSystems.resources.map((system, index) => (
            <Link 
              key={index} 
              href={system.url} 
              isExternal 
              _hover={{ textDecoration: 'none' }}
            >
              <Box 
                p={3}
                borderWidth={1}
                borderRadius="lg"
                bg={cardBg}
                borderColor={borderColor}
                _hover={{ 
                  shadow: 'lg',
                  borderColor: hoverBorderColor,
                  transform: 'translateY(-4px) scale(1.02)',
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                height="100%"
              >
                <VStack align="start" spacing={1}>
                  <Text fontSize="xl" mb={1}>{system.icon}</Text>
                  <Heading size="sm" color={headingColor}>{system.name}</Heading>
                  <Text color={textColor} fontSize="xs">{system.description}</Text>
                </VStack>
              </Box>
            </Link>
          ))}
        </SimpleGrid>

        <Box mb={8}>
          <Heading size="lg" mb={4} color={headingColor}>Support Services</Heading>
          <SimpleGrid columns={{ base: 2, sm: 3, md: 3, lg: 6 }} spacing={4}>
            {filteredSystems.support.map((system, index) => (
              <Link 
                key={index} 
                href={system.url} 
                isExternal
                _hover={{ textDecoration: 'none' }}
              >
                <Box 
                  p={3}
                  borderWidth={1}
                  borderRadius="lg"
                  bg={cardBg}
                  borderColor={borderColor}
                  _hover={{ 
                    shadow: 'lg',
                    borderColor: hoverBorderColor,
                    transform: 'translateY(-4px) scale(1.02)',
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  height="100%"
                >
                  <VStack align="start" spacing={1}>
                    <Text fontSize="xl" mb={1}>{system.icon}</Text>
                    <Heading size="sm" color={headingColor}>{system.name}</Heading>
                    <Text color={textColor} fontSize="xs">{system.description}</Text>
                  </VStack>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Box>

        <Divider />

        <Box id="faq" mb={8}>
          <Heading size="xl" mb={6} color={headingColor}>Frequently Asked Questions</Heading>
          
          <HStack spacing={4} mb={6} wrap="wrap">
            {faqCategories.map(category => (
              <Button
                key={category.id}
                size="sm"
                onClick={() => setActiveTag(category.id)}
                variant={activeTag === category.id ? 'solid' : 'outline'}
                colorScheme="blue"
                leftIcon={<Text>{category.icon}</Text>}
              >
                {category.label}
              </Button>
            ))}
          </HStack>

          <Accordion allowMultiple>
            {filteredFAQ.map((faq, index) => (
              <AccordionItem 
                key={index} 
                border="1px solid"
                borderColor={borderColor}
                borderRadius="md"
                mb={2}
                overflow="hidden"
                bg={cardBg}
              >
                <h2>
                  <AccordionButton 
                    _expanded={{ 
                      bg: accordionExpandedBg,
                      color: accordionExpandedColor
                    }}
                    _hover={{
                      bg: accordionHoverBg
                    }}
                    transition="all 0.2s"
                  >
                    <Box flex="1" textAlign="left" fontWeight="semibold">
                      {faq.question}
                    </Box>
                    <Icon
                      as={ChevronDownIcon}
                      transform={isOpen ? 'rotate(-180deg)' : undefined}
                      transition="transform 0.2s"
                      w={5}
                      h={5}
                    />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={4}>
                    <Text whiteSpace="pre-line" color={textColor}>{faq.answer}</Text>
                    {faq.links && (
                      <Box>
                        {faq.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            href={link.url}
                            isExternal
                            color={linkColor}
                            display="inline-flex"
                            alignItems="center"
                            mr={4}
                          >
                            {link.text} <ExternalLinkIcon mx="2px" />
                          </Link>
                        ))}
                      </Box>
                    )}
                    {faq.instructions && (
                      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
                        {faq.instructions.map((instruction, instIndex) => (
                          <Button
                            key={instIndex}
                            onClick={() => {
                              setSelectedInstruction(instruction);
                              onOpen();
                            }}
                            leftIcon={<Icon as={PlayIcon} />}
                            colorScheme="blue"
                            variant="outline"
                          >
                            {instruction.title}
                          </Button>
                        ))}
                      </SimpleGrid>
                    )}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>

        <Box as="footer" textAlign="center" py={2} mt={2} borderTop="1px" borderColor="gray.200">
          <Link href="https://github.com/yourusername/resource-hub" isExternal color="blue.500" fontSize="xs">
            View on GitHub <ExternalLinkIcon mx="1px" />
          </Link>
        </Box>

        {selectedInstruction && (
          <InstructionModal
            instruction={selectedInstruction}
            isOpen={isOpen}
            onClose={onClose}
          />
        )}
      </VStack>
    </Box>
  );
};

export default FAQSection; 