import React, { Component } from "react"
import { extend } from "lodash"

import images from "./data/images"
import languageColors from "./data/languageColors"

class Repo extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const isHovering = this.state.isHovering
    const { org, repo } = this.props

    const issueComponent = issue => (
      <div
        onMouseEnter={() => this.setState({ isHovering: issue.id })}
        onMouseLeave={() => this.setState({ isHovering: undefined })}
        style={styles.issue}
        key={issue.id}
      >
        <a
          target="_blank"
          href={issue.htmlUrl}
          style={{
            textDecoration: "none",
            color: isHovering === issue.id ? "#0366d6" : "#586069"
          }}
        >
          {issue.title}
        </a>
      </div>
    )

    const list = repo.issues.map(issueComponent)

    const logoSrc = images[org]

    return (
      <div style={styles.container}>
        <div style={styles.flexContainer}>
          {logoSrc && <img style={styles.logo} src={logoSrc} />}
          <h3 style={styles.linkHeader}>
            <a target="_blank" href={repo.htmlUrl} style={styles.link}>
              {org} / {repo.name}
            </a>
          </h3>
        </div>

        <div style={styles.subHeader}>{repo.description}</div>

        {repo.language && (
          <div style={styles.flexContainer}>
            <div
              style={extend({}, styles.languageIcon, {
                backgroundColor: languageColors[repo.language]
              })}
            />
            <div style={styles.smallText}>{repo.language}</div>
          </div>
        )}

        <div style={styles.listContainer}>{list}</div>
      </div>
    )
  }
}

const styles = {
  container: {
    border: "1px solid #e1e4e8",
    borderRadius: "3px",
    padding: "32px 32px 27px 32px",
    marginTop: "32px",
    marginBottom: "32px"
  },
  logo: {
    height: "22px",
    width: "22px",
    marginRight: "8px"
  },
  linkHeader: {
    fontWeight: "600px",
    fontSize: "20px",
    margin: "0",
    lineHeight: 1.5
  },
  smallText: {
    fontSize: "12px",
    color: "#586069",
    lineHeight: 1.5,
    marginTop: "1px"
  },
  link: {
    color: "#0366d6",
    textDecoration: "none"
  },
  flexContainer: {
    display: "flex",
    alignItems: "center"
  },
  languageIcon: {
    borderRadius: "50%",
    height: "12px",
    width: "12px",
    marginRight: "4px"
  },
  subHeader: {
    fontWeight: 400,
    fontSize: "18px",
    margin: "10px 0 8px 0"
  },
  listContainer: {
    margin: "20px 0 0 20px"
  },
  issue: {
    margin: "15px 0",
    cursor: "pointer"
  },
  issueLink: {
    margin: "15px 0",
    textDecoration: "none"
  }
}

export default Repo
