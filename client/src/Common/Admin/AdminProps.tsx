import { Painting } from "./AdminTypes"

export type AdminProps = {
  isLoggedIn: boolean
  paintings: Array<Painting>
  handleAdminLoad: () => void
}

export type AdminState = {
  newPainting: Painting
}