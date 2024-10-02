# Videogames System

In this project we have 3 npm workspaces to fix:
  1. `aws-resources` It contains the AWS CDK resources: 1 dynamodb table which contains the videogames and 2 lambdas.

  **Problem**: This workspace contains some build issues.
  
  2. `get-ps4-users-lambda` It contains the source code of a lambda. This lambda has a multi-layer architecture. This lambda
  gets the list of users are still playing in PS4.

  **Problem**: Implement a solution that returns an array of strings containing the names of the existing users in dynamo
  that have not played more than 1 ps5 videogame. **Ideally this lambda runtime complexity performance needs to be linear (O(n)).**

  ```
  *Example*:
  Given a dynamodb output:
  - [
    {
      username: 'Rafe Adler',
      platform: Platform.ps5,
      videogame: 'Uncharted 3'
    },
    {
      username: 'Rafe Adler',
      platform: Platform.ps5,
      videogame: 'Uncharted 4'
    },
    {
      username: 'Elena Fisher',
      platform: Platform.ps5,
      videogame: 'Hogwarts Legacy'
    },
    {
      username: 'Chloe Frazer',
      platform: Platform.ps4,
      videogame: 'Cyberpunk 2077'
    }
  ]
  Output:
  - [ 'Elena Fisher', 'Chloe Frazer' ]
  ```

  3. `insert-videogame-admin-lambda` It contains the source code of a lambda. This lambda has a multi-layer architecture.
  This lambda assignes an admin per videogame.

  **Problem**: Implement a solution that given an array of events, it ensures the first admin event is the one assigned to the videogame

  ```
    *Example*:
    Input:
    - [
      {
        admin: 'Samuel Drake',
        platform: Platform.ps4,
        videogame: 'The last of us part II'
      },
      {
        admin: 'Elena Fisher',
        platform: Platform.ps4,
        videogame: 'The last of us part II'
      },
      {
        admin: 'Chloe Frazer',
        platform: Platform.ps4,
        videogame: 'Cyberpunk 2077'
      }
    ]
    Output:
    - [
      {
        admin: 'Samuel Drake',
        platform: Platform.ps4,
        videogame: 'The last of us part II'
      },
      {
        admin: 'Chloe Frazer',
        platform: Platform.ps4,
        videogame: 'Cyberpunk 2077'
      }
    ]
  ```

<br>
<br>
<br>
<br>

Useful commands:
- `mvn compile`: Builds every npm workspace
- `cdk synth`: Synthesize CDK code to check if it's a valid CFN Stack

