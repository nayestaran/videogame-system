import { AwsDynamoDB } from './data/aws-dynamodb';

type DomainConfig = {
  readonly awsDynamoDB: AwsDynamoDB;
};

export enum Platform {
  ps4 = 'ps4',
  ps5 = 'ps5'
}

export type User = {
  readonly username: string;
  readonly platform: Platform;
  readonly videogame: string;
};

export type DomainOutput = Array<string>;

export class Domain {
  private readonly awsDynamoDB: AwsDynamoDB;

  public constructor({ awsDynamoDB }: DomainConfig) {
    this.awsDynamoDB = awsDynamoDB;
  }

  public async execute(): Promise<DomainOutput> {
    const listOfUsers = await this.awsDynamoDB.getListOfUsers();

    const ps5GamesPerUser = new Map<string, number>();

    const validUsers = listOfUsers.reduce((previousValidUsers, user) => {
      if (user.platform === Platform.ps5 || !ps5GamesPerUser.get(user.username)) {
        const currentPs5Games = (ps5GamesPerUser.get(user.username) ?? 0) + 1;

        ps5GamesPerUser.set(user.username, currentPs5Games);

        if (currentPs5Games > 1) {
          previousValidUsers.delete(user.username);
        } else {
          previousValidUsers.add(user.username);
        }

        return previousValidUsers;
      }

      return previousValidUsers.add(user.username);
    }, new Set<string>());

    return Array.from(validUsers.keys());
  }
}
