# TAG Glasses - Digital Identity Layer

A modern web application for trying on virtual glasses with intelligent face detection and positioning.

## Features

- **Smart Face Detection**: Automatically detects faces and positions glasses optimally
- **Interactive Controls**: Drag, resize, and rotate glasses with precision
- **Real-time Editing**: See changes instantly as you adjust
- **Compact Interface**: Passport-sized image cards for focused editing
- **Responsive Design**: Works seamlessly across all devices

## Technology Stack

- **Frontend**: Next.js 16 with React 19
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives
- **Face Detection**: Custom smart positioning algorithms
- **Image Processing**: HTML5 Canvas API
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm package manager

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd tag-glasses
```

2. Install dependencies
```bash
npm install
# or
pnpm install
```

3. Start the development server
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Upload Photo**: Click the upload area or drag and drop an image
2. **Auto-Position**: Glasses automatically position on detected faces
3. **Manual Adjust**: Use inline controls to fine-tune position, size, and rotation
4. **Save Result**: Generate and download your final image

## Controls

- **Drag**: Click and drag glasses to move them
- **Arrow Keys**: Precise movement (up, down, left, right)
- **Zoom**: Scale glasses larger or smaller
- **Rotate**: Rotate glasses left or right
- **Auto-Detect**: Re-run face detection for optimal positioning

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── upload-section.tsx # Main upload interface
│   └── ...               # Other sections
├── lib/                   # Utility libraries
│   ├── face-detection.ts  # Face detection service
│   └── utils.ts          # Helper functions
├── hooks/                 # Custom React hooks
└── public/               # Static assets
    ├── images/           # Image assets
    └── google/           # AI model files
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Components

- **UploadSection**: Main interface for image upload and glasses editing
- **FaceDetectionService**: Handles smart positioning algorithms
- **Navigation**: App navigation and routing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.

## Support

For support and questions, please contact the development team.

---

Built with ❤️ by the TAG Glasses team

