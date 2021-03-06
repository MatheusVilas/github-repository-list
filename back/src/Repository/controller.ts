import axios, { AxiosResponse } from "axios";
import { Service } from "typedi";
import { getRepositoriesInput, IRepository } from "./types";

@Service()
export class RepositoryController {
  async getRepositories(
    input: getRepositoriesInput,
    token: string
  ): Promise<IRepository[]> {
    try {
      let configs: any = {};
      if (token) {
        configs = {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${token}`,
          },
        };
      }

      const repositories: AxiosResponse<IRepository[]> = await axios.get(
        `https://api.github.com/users/${input.owner}/repos`,
        configs
      );

      if (token) {
        return await Promise.all(
          repositories.data.map(async (repo: IRepository) => {
            let starred: boolean;
            try {
              await axios.get(
                `https://api.github.com/user/starred/${repo.full_name}`,
                configs
              );
              starred = true;
            } catch (e) {
              starred = false;
            }
            return { ...repo, starred };
          })
        );
      } else {
        return repositories.data.map((repo: IRepository) => ({
          ...repo,
          starred: false,
        }));
      }
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async handleStarRepository(
    fullName: string,
    token: string
  ): Promise<boolean> {
    try {
      let starred: boolean;
      const configs = {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${token}`,
        },
      };

      try {
        await axios.get(
          `https://api.github.com/user/starred/${fullName}`,
          configs
        );
        await axios.delete(
          `https://api.github.com/user/starred/${fullName}`,
          configs
        );
        starred = false;
      } catch (e) {
        await axios.put(
          `https://api.github.com/user/starred/${fullName}`,
          {},
          configs
        );
        starred = true;
      }

      return starred;
    } catch (error) {
      console.error(error);

      throw new Error(error.response.data.message);
    }
  }
}
