export interface User {
  _id: string
  username: string
}

export interface Post {
  _id: string
  text: string
  image?: string
  user: User
  createdAt: string
}