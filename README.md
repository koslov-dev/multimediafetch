# MultiMediaFetch
The "multimediafetch" module is a powerful music and video downloading tool that allows developers to ease the task of downloading content from many popular platforms. With its simple and intuitive interface, "multimediafetch" offers a comprehensive solution to efficiently extract and store audio and video files.

## Installation
```bash
npm install multimediafetch
```

## Usage
```js
const multimediafetch = require('multimediafetch')

// example Youtube download
multimediafetch.ytdl({
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // required
  format: "mp3", // "mp3" or "mp4" required
  quality: "High", // optional
  title: "Never Gonna", // optional 
  path: "./" // optional
})

// example TikTok download
multimediafetch.ttkdl({
  url: "https://www.tiktok.com/@musicalize.ofc/video/7131034569368734982?is_from_webapp=1&sender_device=pc&web_id=7242139675170981381", // required
  title: "Never Gonna", // optional 
  path: "./" // optional
})

// example SoundCloud download
multimediafetch.scdl({
  url: "https://soundcloud.com/rick-astley-official/never-gonna-give-you-up-4", // required
  title: "Never Gonna", // optional 
  path: "./" // optional
})
```

## Support
Discord: se.sh or dvrkzin
