import axios from 'axios'

export const getUserIDfromUsername = async (username: string): Promise<string | undefined> => {
  const res = await axios.get(`https://www.threads.net/@${username}`, {
    headers: {
      'authority': 'www.threads.net',
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
      'accept-language': 'ko,en;q=0.9,ko-KR;q=0.8,ja;q=0.7',
      'cache-control': 'no-cache',
      'pragma': 'no-cache',
      'referer': 'https://www.instagram.com/',
      'sec-ch-prefers-color-scheme': 'dark',
      'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
      'sec-ch-ua-full-version-list': `"Not.A/Brand";v="8.0.0.0", "Chromium";v="114.0.5735.198", "Google Chrome";v="114.0.5735.198"'`,
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-ch-ua-platform-version': '"13.0.0"',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': `navigate`,
      'sec-fetch-site': `cross-site`,
      'sec-fetch-user': `?1`,
      'upgrade-insecure-requests': `1`,
      'user-agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36`,
      'viewport-width': `536`,
    }
  })

  // let text: string = (await res.text())
  let text: string = res.data
  // remove ALL whitespaces from text
  text = text.replace(/\s/g, '')
  // remove all newlines from text
  text = text.replace(/\n/g, '')

  const userId: string | undefined = text.match(/"props":{"user_id":"(\d+)"},/)?.[1]
  return userId
}
