import React, { Component } from "react"
import { flatten } from "lodash"

import Repo from "./Repo"

const API_URL = "https://easy-issues.herokuapp.com/api/orgs"
// const API_URL = "http://localhost:3004/api/orgs"

const languages = [
  "All",
  "JavaScript",
  "Ruby",
  "Python",
  "C++",
  "TypeScript",
  "C#",
  "PHP",
  "Java"
].sort()

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      language: "All",
      orgs: []
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    fetch(API_URL)
      .then(res => res.json())
      .then(orgs => {
        this.setState({ orgs })
      })
      .catch(error => console.log(error))
  }

  render() {
    const { orgs, language } = this.state

    const list = flatten(
      orgs.map(org =>
        org.repos
          .filter(repo => [repo.language, "All"].includes(language))
          .map(repo => <Repo key={repo.id} repo={repo} org={org.name} />)
      )
    )

    return (
      <div style={styles.container}>
        <div style={styles.headerContainer}>
          <div>
            <h1 style={styles.header}>Contribute to Open Source Software</h1>
            <div style={styles.subHeader}>
              A collection of easy onboarding tickets, updated daily.
            </div>
          </div>
          <select
            style={styles.select}
            onChange={e => this.setState({ language: e.target.value })}
          >
            {languages.map(language => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        {list}
      </div>
    )
  }
}

const styles = {
  container: {
    fontFamily:
      "InterUI,-apple-system,BlinkMacSystemFont,Helvetica Neue,Segoe UI,Oxygen,Ubuntu,Cantarell,Open Sans,sans-serif",
    maxWidth: "900px",
    width: "100%",
    margin: "0 auto",
    padding: "0 50px",
    boxSizing: "border-box"
  },
  headerContainer: {
    display: "flex",
    alignItems: "center"
  },
  header: {
    fontWeight: 500,
    fontSize: "48px",
    color: "#24292e",
    lineHeight: 1.25
  },
  select: {
    fontSize: "18px"
  },
  subHeader: {
    fontWeight: 400,
    fontSize: "21px",
    color: "#586069"
  }
}

export default App
