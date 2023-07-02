import React from "react";
import { Link, graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";

import Bio from "../components/bio";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Tags from "../components/tags";

import { rhythm, scale } from "../utils/typography";

import { InArticleAdBlock } from "../components/adBlocks";

const shortcodes = { InArticleAdBlock };

function BlogPostTemplate({
  location,
  pageContext,
  data: { mdx, site },
  children,
}) {
  const post = mdx;
  const siteTitle = site.siteMetadata.title;
  const featuredImageSrc =
    post.frontmatter.featuredImage.childImageSharp.gatsbyImageData.images
      .fallback.src;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        keywords={post.frontmatter.keywords}
        featuredImageSrc={featuredImageSrc}
      />
      <h1>{post.frontmatter.title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: `block`,
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
        {post.frontmatter.date} - {post.fields.timeToRead.text} (
        {post.fields.timeToRead.words} words)
      </p>

      <MDXProvider components={shortcodes}>{children}</MDXProvider>

      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />

      <Bio />

      <hr
        style={{
          marginBottom: rhythm(1),
        }}
      />

      <Tags tags={post.frontmatter.keywords}></Tags>

      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link to={`/blog${previous.fields.slug}`} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link to={`/blog${next.fields.slug}`} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  );
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        keywords
        featuredImage {
          childImageSharp {
            gatsbyImageData(layout: FIXED, height: 630, width: 1200)
          }
        }
      }
      fields {
        timeToRead {
          minutes
          text
          time
          words
        }
      }
    }
  }
`;
