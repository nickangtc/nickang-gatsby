import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/layout'
import { articles, navItem, articleItem, articleLink } from "./index.module.scss"
import SearchEngineOptimisation from '../components/searchengineoptimisation'

const HomePage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const newestPostsData = data.allMarkdownRemark.edges
  const newestPosts = newestPostsData.map((post, index) => {
    const { date } = post.node.frontmatter
    const dateSansYear = date.split(', ')[0]
    return (
      <li key={index} className={ articleItem }>
        <time dateTime={date} className={ date }>{ dateSansYear }</time>
        <Link to={ post.node.fields.slug } className={ articleLink }>{ post.node.frontmatter.title }</Link>
      </li>
    )
  })

  return (
    <Layout location={location} title={siteTitle}>
      <SearchEngineOptimisation title="Home" location={location} />
      <h1 id="my-digital-garden">Hey, I'm Nick Ang. <span role="img" aria-label="hand wave emoji">👋</span></h1>
      <p>I work as a software engineer and live as a writer. I explore and write about how to live a good, meaningful life.</p>
      <p>New articles every Sunday. <Link to="/subscribe">Subscribe</Link> for free to get weekly personal updates.</p>

      <h2>Recent Articles</h2>
      <ul className={ articles }>
        { newestPosts }
      </ul>
      <nav>
        <p><Link to="/blog" className={ navItem }>Browse all articles →</Link></p>
      </nav>
    </Layout>
  )
}

export default HomePage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 8
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
