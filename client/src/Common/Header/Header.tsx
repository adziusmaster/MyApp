import React from "react"
import { HeaderProps } from "./HeaderProps"
import { fetchData, addData, newPainting, removeData } from "./HeaderState"

export const Header = (props: HeaderProps): JSX.Element => {
  return (
    <div>Header
      <button onClick={() => fetchData()}>Fetchiee</button>
      <button onClick={() => addData(newPainting)}>add</button>
      <button onClick={() => removeData(1)}>remove</button>
    </div>
  )
}