# Video Guides Directory

This directory contains video guides and tutorials in MP4 format. Add your video files here and update the `faqData` array in `components/FAQSection.tsx` to reference them.

## Example Structure

```
videos/
├── getting-started.mp4
├── feature-demo.mp4
└── troubleshooting.mp4
```

## Adding New Videos

1. Add your MP4 file to this directory
2. Update the FAQ data in `components/FAQSection.tsx`:

```typescript
{
  question: "Your question here?",
  answer: "Your answer here",
  instructions: [
    {
      title: "Guide Title",
      videoUrl: "/videos/your-video.mp4"
    }
  ]
}
```

## Video Guidelines

- Format: MP4
- Resolution: 1280x720 (minimum)
- Frame rate: 30fps
- Audio: AAC, stereo
- Maximum file size: 100MB 