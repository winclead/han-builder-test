# YouTube Trending Videos App

## Overview

This application displays the current trending videos on YouTube in South Korea. It provides a simple and intuitive interface for users to discover popular content without needing to visit the YouTube website directly. The app is built with modern, framework-less web technologies, including Web Components, to ensure a modular and maintainable codebase.

## Implemented Features

### Core Functionality
- **Trending Video Display:** Fetches and displays a list of the most popular videos on YouTube in South Korea. Each video is presented with its title, thumbnail image, and a direct link to the video on YouTube.

### Design and UI
- **Modern Aesthetics:** The app features a clean and visually appealing design with a focus on user experience. It uses a modern color palette, typography, and layout to create an engaging interface.
- **Responsive Design:** The layout is fully responsive and adapts to different screen sizes, ensuring a seamless experience on both desktop and mobile devices.
- **Interactive Elements:** Video thumbnails and titles are interactive, with hover effects and clear visual cues to enhance usability.

### Technical Implementation
- **Web Components:** The video list is rendered using a custom `<youtube-video>` element, encapsulating the structure, style, and behavior of each video item. This promotes reusability and separation of concerns.
- **ES Modules:** The JavaScript code is organized into modules, with separate files for the main application logic and the Web Component definition.
- **YouTube Data API:** The application uses the YouTube Data API v3 to fetch trending video data. It requires a user-provided API key for authentication.

## Current Plan

The current development focuses on creating a visually appealing and user-friendly interface to display trending YouTube videos. The following steps will be taken:

1. **Create the basic HTML structure** for the main page, including a container for the video list.
2. **Implement the main JavaScript logic** to fetch data from the YouTube Data API and populate the video list. This will include a placeholder for the user's API key.
3. **Define a custom `<youtube-video>` Web Component** to represent each video item in the list. This component will manage its own HTML structure and styling using a Shadow DOM.
4. **Apply modern CSS styles** to create a visually appealing and responsive layout. This will include styles for the main page and the `<youtube-video>` component.
5. **Provide clear instructions** for the user on how to obtain and use their own YouTube Data API key to run the application.

By following this plan, we will create a functional and well-designed application that effectively showcases trending YouTube content.