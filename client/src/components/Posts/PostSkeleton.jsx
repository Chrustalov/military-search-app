import React from "react";
import ContentLoader from "react-content-loader";

const PostSkeleton = (props) => {
  return (
    <ContentLoader
      speed={2}
      width={350}
      height={380}
      viewBox="0 0 390 440"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="0" y="8" rx="8" ry="8" width="390" height="250" />
      <rect x="0" y="274" rx="8" ry="8" width="265" height="24" />
      <rect x="0" y="311" rx="8" ry="8" width="390" height="54" />
      <rect x="0" y="380" rx="8" ry="8" width="120" height="20" />
      <rect x="0" y="411" rx="8" ry="8" width="120" height="20" />
    </ContentLoader>
  );
};

export default PostSkeleton;
