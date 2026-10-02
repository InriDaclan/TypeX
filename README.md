# TypeX - Modern Typing Practice Application

A modern, futuristic typing practice and speed test website built with pure HTML, CSS, and Vanilla JavaScript.

## Features

- **Modern Interface**: Dark/near-black background with strong accent color (#00f3ff), clean typography, and smooth animations
- **Typing Speed Test**: Measure your Words Per Minute (WPM) with accurate timing
- **Accuracy Tracking**: Real-time accuracy percentage and error counting
- **Character Highlighting**: Visual feedback for correct, incorrect, current, and untyped characters
- **Multiple Test Durations**: Choose from 15s, 30s, 60s, or 120s tests
- **Practice Mode**: Three difficulty levels (Beginner, Intermediate, Advanced) with tailored passages
- **Statistics Dashboard**: Track your best WPM, average WPM, best accuracy, and tests completed
- **Persistent Settings**: All preferences and statistics saved locally using browser localStorage
- **Customizable Themes**: Choose between Dark, Light, and Blue themes
- **Sound Effects**: Optional audio feedback for errors and test completion
- **Fully Responsive**: Works seamlessly on desktop, laptop, tablet, and mobile devices
- **No Frameworks**: Built with only HTML, CSS, and Vanilla JavaScript

## File Structure

- `index.html` - Main HTML structure and layout
- `style.css` - All styling, animations, and responsive design
- `script.js` - All application logic and functionality
- `README.md` - This file

## How to Use

1. **Open the Application**: Simply open `index.html` in any modern web browser
2. **Start a Test**: 
   - Navigate to the "Type Test" section (default landing page)
   - Click in the typing area and begin typing the displayed text
   - The test starts automatically when you type your first character
3. **View Results**: 
   - When time runs out or you complete the text, see your results
   - Click "Try Again" to retest with the same passage
   - Click "New Test" for a different random passage
4. **Practice Mode**:
   - Go to the "Practice" section
   - Select a difficulty level (Beginner/Intermediate/Advanced)
   - Type the passage to see real-time practice stats
5. **Track Progress**:
   - Visit the "Statistics" section to view your typing history
   - Reset statistics anytime using the reset button
6. **Customize Experience**:
   - Visit the "Settings" section to adjust:
     - Test duration (15s/30s/60s/120s)
     - Theme (Dark/Light/Blue)
     - Sound effects (on/off)
     - Error highlighting (on/off)

## Technical Implementation

### Core Concepts
- **Hidden Input Technique**: Uses absolutely positioned, transparent input fields overlaid on text displays to capture keystrokes while showing visually enhanced text
- **Character-by-Character Analysis**: Compares user input against reference text to determine correctness and provide real-time feedback
- **Local Storage Persistence**: Saves user statistics and preferences between sessions
- **Request Animation Frame**: Efficiently handles typing events and UI updates

### Design Principles
- **Minimalist Interface**: Focus remains on the typing area as the central element
- **Futuristic Aesthetic**: Electric cyan accents on dark background create a modern, tech-forward feel
- **Fluid Animations**: Subtle transitions and micro-interactions enhance usability without distraction
- **Accessibility**: Proper color contrast, keyboard navigation, and semantic HTML

## Browser Support

TypeX works in all modern browsers that support:
- CSS Variables
- Flexbox and Grid Layout
- Local Storage API
- Basic ES6 JavaScript features

Tested successfully in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Customization

To modify the typing passages, edit the `passages` object in `script.js`:
```javascript
passages: {
    test: [ /* Array of test passages */ ],
    beginner: [ /* Array of beginner passages */ ],
    intermediate: [ /* Array of intermediate passages */ ],
    advanced: [ /* Array of advanced passages */ ]
}
```

To change colors or themes, modify the CSS variables in `:root` section of `style.css`.

## Credits

Built as a standalone typing application demonstrating modern web development techniques with HTML, CSS, and JavaScript.

---

*TypeX - Practice. Improve. Master.* 
