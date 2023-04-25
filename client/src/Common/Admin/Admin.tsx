import React from "react"
import { AdminProps, AdminState } from "./AdminProps"
import { addData, removeData } from "./AdminUtils"
import { Painting } from "./AdminTypes"


class Admin extends React.Component<AdminProps, AdminState> {
  state: AdminState = {
    newPainting: {
      title: "",
      description: "",
      price: 0
    }
  }

  componentDidMount(): void {
    this.props.handleAdminLoad()
  }

  handleRemoveData(id: number): void {
    removeData(id)
    this.props.handleAdminLoad()
  }

  handleSubmit(painting: Painting): void {
    addData(painting)
    this.props.handleAdminLoad()
  }

  handleTitleChange(newTitle: string){
    this.setState({
      ...this.state,
      newPainting: {
        ...this.state.newPainting,
        title: newTitle
      }
    })
  }

  handleDescriptionChange(newDescription: string){
    this.setState({
      ...this.state,
      newPainting: {
        ...this.state.newPainting,
        description: newDescription
      }
    })
  }

  handlePriceChange(newPrice: number){
    this.setState({
      ...this.state,
      newPainting: {
        ...this.state.newPainting,
        price: newPrice
      }
    })
  }

  render(): React.ReactNode {
    return (
      <div>
        <div>admin!</div>
        <div>
          <p>Current paintings</p>
          {this.props.paintings.map(painting => (
            <div>
              {painting.id && <div>{painting.title}<button onClick={() => this.handleRemoveData(painting.id as number)}>Remove</button></div>}
            </div>
          ))}
        </div>
        <div>
          <p>Add painting</p>
          <form onSubmit={() => this.handleSubmit(this.state.newPainting)}>
            <label>
              Name:
              <input type="text" value={this.state.newPainting.title} name="name" onChange={(e) => this.handleTitleChange(e.currentTarget.value)}/>
            </label>
            <label>
              Description:
              <input type="text" value={this.state.newPainting.description} name="description" onChange={(e) => this.handleDescriptionChange(e.currentTarget.value)} />
            </label>
            <label>
              Price:
              <input type="number" value={this.state.newPainting.price} name="price" onChange={(e) => this.handlePriceChange(parseFloat(e.currentTarget.value))} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default Admin