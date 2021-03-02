export const schema = gql`
  type Picture {
    id: Int!
    file: String
    file_name: String
  }

  type Query {
    pictures: [Picture]
  }

  input CreatePictureInput {
    file: String
    file_name: String
  }

  type Mutation {
    createPicture(input: CreatePictureInput): Picture
  }
`
