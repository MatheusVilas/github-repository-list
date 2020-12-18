import axios from "axios";
import { Service } from "typedi";
import queryString from "query-string";

@Service()
export class LoginController {
  async getAuthorizationURL(): Promise<string> {
    return `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user%20public_repo`;
  }

  async getUserData(code: string): Promise<string> {
    const oauth = (
      await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: code,
        },
        {
          headers: { accept: "application/json" },
        }
      )
    ).data;

    if (typeof oauth.error !== "undefined") {
      console.error(oauth);
      throw "Não é possível autentificar o usuário";
    }

    const user = await axios.get("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${oauth.access_token}`,
      },
    });

    return queryString.stringify({
      accessToken: oauth.access_token,
      userName: user.data.name,
      location: user.data.location,
      bio: user.data.bio,
      avatar: user.data.avatar_url,
      url: user.data.url,
    });
  }
}
