import PropTypes from "prop-types";
import React from "react";
import PostCard from "./postCard";

function RelatedPosts({ openGraphDefaultImage, rootSlug, relatedPosts }) {
  if (relatedPosts.length === 0 || relatedPosts.length === 1)
    return <div class="related-posts"></div>;

  const scrollRight = () => {
    const container = document.querySelector(".related-posts-flex");

    container.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    const container = document.querySelector(".related-posts-flex");

    container.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  return (
    <nav>
      <div className="related-posts-title">Related Posts</div>
      <div className="related-posts">
        <button className="prev-button" onClick={scrollLeft}>
          &lt;
        </button>
        <div className="related-posts-flex">
          {relatedPosts.map((post) => {
            if (post.node.fields.slug === rootSlug) return null;

            const title = post.node.frontmatter.title;
            const date = post.node.frontmatter.date;
            const slug = post.node.fields.slug;

            const image =
              post.node.frontmatter.primaryImage?.childImageSharp
                .gatsbyImageData ||
              post.node.frontmatter.openGraphImage?.childImageSharp
                .gatsbyImageData ||
              openGraphDefaultImage.childImageSharp.gatsbyImageData;

            return (
              <PostCard
                key={slug}
                title={title}
                date={date}
                slug={slug}
                image={image}
              ></PostCard>
            );
          })}
        </div>
        <button className="next-button" onClick={scrollRight}>
          &gt;
        </button>
      </div>
    </nav>
  );
}

RelatedPosts.defaultProps = {
  relatedPosts: [],
};

RelatedPosts.propTypes = {
  rootSlug: PropTypes.string.isRequired,
  relatedPosts: PropTypes.arrayOf(PropTypes.object),
  openGraphDefaultImage: PropTypes.object.isRequired,
};

export default RelatedPosts;
