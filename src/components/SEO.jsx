import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, name, type, url, image }) => {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />

      {/* Canonical Link */}
      {url && <link rel="canonical" href={url} />}

      {/* Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter tags */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type === 'article' ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

SEO.defaultProps = {
  title: "Abhay Maheshwari | Software Engineer & AI Enthusiast",
  description: "Official portfolio of Abhay Maheshwari – Full-Stack Software Engineer specializing in React, Node.js, Python, and AI/ML.",
  name: "Abhay Maheshwari",
  type: "website",
  image: "https://abhay-maheshwari.site/preview.png",
  url: "https://abhay-maheshwari.site/"
};

export default SEO;
