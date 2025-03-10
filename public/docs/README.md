# Documentation Directory

This directory contains PDF documentation files for various features and guides. Add your PDF files here and update the `faqData` array in `components/FAQSection.tsx` to reference them.

## Example Structure

```
docs/
├── getting-started.pdf
├── feature-guide.pdf
└── troubleshooting.pdf
```

## Adding New Documentation

1. Add your PDF file to this directory
2. Update the FAQ data in `components/FAQSection.tsx`:

```typescript
{
  question: "Your question here?",
  answer: "Your answer here",
  instructions: [
    {
      title: "Guide Title",
      documentUrl: "/docs/your-file.pdf"
    }
  ]
}
``` 