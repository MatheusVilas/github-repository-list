import axios from "axios";
import { Service } from "typedi";
import { getRepositoriesInput, IRepository } from "./types";

@Service()
export class RepositoryController {
  async getRepositories(
    input: getRepositoriesInput,
    auth: any
  ): Promise<IRepository[]> {
    try {
      let configs: any = {};
      if (auth?.githubToken !== undefined) {
        configs = {
          headers: {
            Accept: "application/vnd.github.v3+json",
            Authorization: `token ${auth.githubToken}`,
          },
        };
      }

      const repos = await axios.get(
        `https://api.github.com/users/${input.owner}/repos`,
        configs
      );

      if (auth?.githubToken !== undefined) {
        return await Promise.all(
          repos.data.map(async (repo: IRepository) => {
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
        return repos.data.map((repo: IRepository) => ({
          ...repo,
          starred: false,
        }));
      }
    } catch (error) {
      console.error(error);
      const status = error.response.status as string;
      throw error.response.data.message;
    }
  }
}
