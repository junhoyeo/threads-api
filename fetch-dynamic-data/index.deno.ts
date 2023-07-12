// * Run this file to fetch dynamic data (such as app versions) and save it to the api
// * This allows user agent formulating to be more accurate and less likely to be detected
//? RUN COMMAND: deno run --allow-read --allow-write --allow-env --allow-net index.deno.ts
import * as path from 'https://deno.land/std@0.177.0/path/mod.ts';

let androidData = await fetch('https://m.apkpure.com/threads-an-instagram-app/com.instagram.barcelona', {
  headers: {
    accept:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.6',
    'cache-control': 'max-age=0',
    'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Brave";v="114"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'cross-site',
    'sec-fetch-user': '?1',
    'sec-gpc': '1',
    'upgrade-insecure-requests': '1',
    Referer: 'https://www.google.com/',
    'Referrer-Policy': 'origin',
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  },
  body: null,
  method: 'GET',
});
let androidDataText = await androidData.text();
const latestAppVersion = androidDataText
  .split(`<p class="details_sdk">`)[1]
  .split('</p>')[0]
  .split('<span>')[1]
  .split('</span>')[0];
console.log('Latest ANDROID App Version:', latestAppVersion);

const dynamicData = `export const LATEST_ANDROID_APP_VERSION = '${latestAppVersion}';`;

const __dirname = new URL('.', import.meta.url).pathname;

const dynamicDataFile = path.join(__dirname, '../', 'threads-api', 'src', 'dynamic-data.ts');

await Deno.writeTextFile(dynamicDataFile, dynamicData);

console.log('📝 Saved and synced dynamic data to api');
