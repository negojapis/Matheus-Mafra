const { execSync } = require('child_process');
const path = require('path');

const publicVideosDir = path.resolve(__dirname, '../public/Videos');

const heroList = [
  { in: 'snapinsta-1791554979756.mp4', outVid: 'stream-1.mp4', outPoster: 'stream-1-poster.jpg', start: 10, dur: 6 },
  { in: 'snapinsta-1791555011720.mp4', outVid: 'stream-2.mp4', outPoster: 'stream-2-poster.jpg', start: 10, dur: 6 },
  { in: 'snapinsta-1791555056267.mp4', outVid: 'stream-3.mp4', outPoster: 'stream-3-poster.jpg', start: 10, dur: 6 },
  { in: 'snapinsta-1791555120099.mp4', outVid: 'stream-4.mp4', outPoster: 'stream-4-poster.jpg', start: 10, dur: 6 },
  { in: 'snapinsta-1791555136570.mp4', outVid: 'stream-5.mp4', outPoster: 'stream-5-poster.jpg', start: 10, dur: 6 },
  { in: 'snapinsta-1791555214315.mp4', outVid: 'stream-6.mp4', outPoster: 'stream-6-poster.jpg', start: 10, dur: 6 },
  { in: 'snapinsta-1791555222989.mp4', outVid: 'stream-7.mp4', outPoster: 'stream-7-poster.jpg', start: 10, dur: 6 },
];

const highlightItem = {
  in: 'mafra-filme-1.mp4',
  outVid: 'mafra-filme-1-preview.mp4',
  outPoster: 'mafra-filme-1-poster.jpg',
  start: 5,
  dur: 8,
  scale: 640
};

const galleryList = [
  { in: 'snapinsta-1791906965525.mp4', outVid: 'gallery-preview-1.mp4', outPoster: 'gallery-poster-1.jpg', start: 2, dur: 6 },
  { in: 'snapinsta-1791906993931.mp4', outVid: 'gallery-preview-2.mp4', outPoster: 'gallery-poster-2.jpg', start: 2, dur: 6 },
  { in: 'snapinsta-1791907073465.mp4', outVid: 'gallery-preview-3.mp4', outPoster: 'gallery-poster-3.jpg', start: 2, dur: 6 },
  { in: 'snapinsta-1791907083880.mp4', outVid: 'gallery-preview-4.mp4', outPoster: 'gallery-poster-4.jpg', start: 2, dur: 6 },
  { in: 'snapinsta-1791907169170.mp4', outVid: 'gallery-preview-5.mp4', outPoster: 'gallery-poster-5.jpg', start: 2, dur: 6 },
  { in: 'snapinsta-1791907244709.mp4', outVid: 'gallery-preview-6.mp4', outPoster: 'gallery-poster-6.jpg', start: 2, dur: 6 },
  { in: 'snapinsta-1791907286509.mp4', outVid: 'gallery-preview-7.mp4', outPoster: 'gallery-poster-7.jpg', start: 2, dur: 6 },
  { in: 'snapinsta-1791907294029.mp4', outVid: 'gallery-preview-8.mp4', outPoster: 'gallery-poster-8.jpg', start: 2, dur: 6 },
  { in: 'snapinsta-1791907401710.mp4', outVid: 'gallery-preview-9.mp4', outPoster: 'gallery-poster-9.jpg', start: 2, dur: 6 },
  { in: 'snapinsta-1791907460644.mp4', outVid: 'gallery-preview-10.mp4', outPoster: 'gallery-poster-10.jpg', start: 2, dur: 6 },
];

function processItem(item, defaultScale = 480) {
  const inputPath = path.join(publicVideosDir, item.in);
  const outVidPath = path.join(publicVideosDir, item.outVid);
  const outPosterPath = path.join(publicVideosDir, item.outPoster);
  const scale = item.scale || defaultScale;

  console.log(`Processing ${item.in} -> ${item.outVid}...`);
  // 1. Generate video clip
  const vidCmd = `ffmpeg -y -ss ${item.start} -t ${item.dur} -i "${inputPath}" -vf "scale=${scale}:-2" -c:v libx264 -crf 26 -preset fast -an -movflags +faststart "${outVidPath}"`;
  execSync(vidCmd, { stdio: 'inherit' });

  // 2. Generate poster image
  console.log(`Generating poster ${item.outPoster}...`);
  const posterCmd = `ffmpeg -y -ss ${item.start} -i "${inputPath}" -vframes 1 -q:v 2 "${outPosterPath}"`;
  execSync(posterCmd, { stdio: 'inherit' });
}

console.log('--- Processing Hero Corridor Videos ---');
heroList.forEach(item => processItem(item, 480));

console.log('--- Processing Highlight Video ---');
processItem(highlightItem, 640);

console.log('--- Processing Gallery Videos ---');
galleryList.forEach(item => processItem(item, 480));

console.log('All done!');
