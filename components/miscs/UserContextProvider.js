import { Component, createContext } from "react";

export const UserContext = createContext();

export class UserContextProvider extends Component {

  state = {
    user: this.props.user,
  }

  setUser = (data) => this.setState({ ...this.state, user: data })
  logout = () => this.setState({ ...this.state, user: {} })
  render() {
    return (
      <UserContext.Provider value={{
        ...this.state,
        setUser: this.setUser,
        logout: this.logout,
      }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
