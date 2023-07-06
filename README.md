# Threads API
> Unofficial Node.js/TypeScript client for [Threads](https://threads.net).

```ts
import { ThreadsAPI } from "threads-api";

const main = async () => {
  const threadsAPI = new ThreadsAPI();

  const userId = await threadsAPI.getUserIDfromUsername('_junhoyeo')
  console.log(userId) // 5438123050
  if (!userId) {
    return
  }

  const user = await threadsAPI.getUserProfile('_junhoyeo', userId)
  console.log(JSON.stringify(user))
  // {"is_private":false,"profile_pic_url":"https://scontent.cdninstagram.com/v/t51.2885-19/358202847_614947594069692_3487562382200036996_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=tpgN_Gl7Ss8AX94k8HE&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBGBH_HkXPSEjyug08k1UEzSXmxPkPdCCWkDhaMIWem2g&oe=64ABED68&_nc_sid=10d13b","username":"_junhoyeo","hd_profile_pic_versions":[{"height":320,"url":"https://scontent.cdninstagram.com/v/t51.2885-19/358202847_614947594069692_3487562382200036996_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=tpgN_Gl7Ss8AX94k8HE&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfC70LtKV6hU2YF5CwIrgQY59J2hlmm-cERWxFgnt1eHWQ&oe=64ABED68&_nc_sid=10d13b","width":320},{"height":640,"url":"https://scontent.cdninstagram.com/v/t51.2885-19/358202847_614947594069692_3487562382200036996_n.jpg?stp=dst-jpg_s640x640&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=tpgN_Gl7Ss8AX94k8HE&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCOJaBsV8c6jQgCzCouwEKaKmB4MsyUoZQjgiehKiXmNw&oe=64ABED68&_nc_sid=10d13b","width":640}],"is_verified":false,"biography":"🐰🏴‍☠️ generalist hacker, designer, dreamer","biography_with_entities":null,"follower_count":122,"profile_context_facepile_users":null,"bio_links":[{"url":"https://junho.io/about"}],"pk":"5438123050","full_name":"Junho Yeo 🫧","id":null}
}
main();
```
