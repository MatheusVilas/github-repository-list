import axios from "axios";
import { Service } from "typedi";

@Service()
export class LoginController {
  async getAuthorizationURL(): Promise<any> {
    return {
      url: `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user%20public_repo`,
    };
  }

  async getAccessToken(input: any): Promise<any> {
    const oauth = (
      await axios.post(
        "https://github.com/login/oauth/access_token",
        {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code: input.code,
        },
        {
          headers: { accept: "application/json" },
        }
      )
    ).data;

    if (typeof oauth.error !== "undefined") {
      console.error(oauth);
      throw "It's not possible to authenticate the user";
    }

    const user = await axios.get("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${oauth.access_token}`,
      },
    });

    return {
      accessToken: oauth.access_token,
      userName: user.data.name,
    };
  }
}
