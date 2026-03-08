
// Please replace 'YOUR_API_KEY' with your own YouTube Data API key.
const API_KEY = 'YOUR_API_KEY';
const videoContainer = document.getElementById('video-container');

// Web Component for displaying a YouTube video
class YouTubeVideo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const videoId = this.getAttribute('video-id');
    const title = this.getAttribute('title');
    const thumbnailUrl = this.getAttribute('thumbnail-url');

    this.shadowRoot.innerHTML = `
      <style>
        .video-item {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          margin: 10px;
          width: 300px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .video-item:hover {
          transform: translateY(-5px);
        }
        .video-item a {
          text-decoration: none;
          color: inherit;
        }
        .video-item img {
          width: 100%;
          height: auto;
        }
        .video-item h3 {
          padding: 10px;
          margin: 0;
          font-size: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      </style>
      <div class="video-item">
        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
          <img src="${thumbnailUrl}" alt="${title}">
          <h3>${title}</h3>
        </a>
      </div>
    `;
  }
}

customElements.define('youtube-video', YouTubeVideo);

async function getTrendingVideos() {
  if (API_KEY === 'YOUR_API_KEY') {
    videoContainer.innerHTML = '<p>Please enter your YouTube Data API key in main.js</p>';
    return;
  }

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=KR&maxResults=24&key=${API_KEY}`);
    const data = await response.json();

    if (data.items) {
      data.items.forEach(item => {
        const videoElement = document.createElement('youtube-video');
        videoElement.setAttribute('video-id', item.id);
        videoElement.setAttribute('title', item.snippet.title);
        videoElement.setAttribute('thumbnail-url', item.snippet.thumbnails.medium.url);
        videoContainer.appendChild(videoElement);
      });
    } else {
      videoContainer.innerHTML = '<p>Could not fetch trending videos.</p>';
    }
  } catch (error) {
    console.error('Error fetching trending videos:', error);
    videoContainer.innerHTML = '<p>An error occurred while fetching videos.</p>';
  }
}

getTrendingVideos();
