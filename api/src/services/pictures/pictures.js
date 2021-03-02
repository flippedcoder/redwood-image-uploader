import { db } from 'src/lib/db'

export const pictures = () => {
  return db.picture.findMany()
}

export const createPicture = ({ input }) => {
  return db.picture.create({ data: input })
}
