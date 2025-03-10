# Interactive FAQ and Resource Hub

A modern, responsive web application built with Next.js and Chakra UI that provides an interactive FAQ system and resource hub. This project features a dark/light theme, searchable content, and categorized information display.

## Features

- 🌓 Dark/Light theme support
- 🔍 Real-time search functionality
- 📱 Fully responsive design
- 🏷️ Category-based filtering
- 📚 Comprehensive FAQ system
- 🎥 Support for video and document guides
- 🔗 External resource linking
- ⚡ Fast and smooth animations

## Tech Stack

- Next.js
- React
- Chakra UI
- TypeScript
- Heroicons

## Project Structure

```
.
├── components/
│   └── FAQSection.tsx       # Main FAQ and resource hub component
├── pages/
│   └── index.tsx           # Main application page
├── public/
│   ├── videos/            # Video guides
│   └── docs/             # PDF documentation
└── theme.ts              # Custom theme configuration
```

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Nemu-x/resource-hub.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Adding New FAQs

Add new FAQ items to the `faqData` array in `components/FAQSection.tsx`:

```typescript
const faqData = [
  {
    question: "Your question here?",
    answer: "Your answer here",
    links: [
      { text: "Link Text", url: "https://example.com" }
    ],
    instructions: [
      {
        title: "Guide Title",
        videoUrl: "/videos/guide-video.mp4",
        documentUrl: "/docs/guide-doc.pdf"
      }
    ]
  }
];
```

### Adding New Categories

Add new categories to the `faqCategories` array:

```typescript
const faqCategories = [
  {
    id: 'category-id',
    icon: '🔍',
    label: 'Category Name',
    keywords: ['keyword1', 'keyword2']
  }
];
```

## Customization

### Theme

Modify `theme.ts` to customize colors, fonts, and component styles:

```typescript
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  // Add your custom theme options here
});
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 
