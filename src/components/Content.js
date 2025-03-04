"use client";

import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // Enables GitHub Flavored Markdown (tables, footnotes, etc.)
import rehypeRaw from "rehype-raw"; // Allows rendering raw HTML inside markdown
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import "./content.css";

// ✅ Helper function to encode Markdown URIs
const encodeMarkdownURIs = (source = "") => {
  const markdownLinkRegex = /\[(.+)\]\((.+?)\)/g;
  return source.replace(markdownLinkRegex, (match, text, linkURI) => {
    if (!linkURI) return match;
    return `[${text}](${encodeURI(linkURI)})`;
  });
};

// ✅ Custom renderer for Contentful Rich Text
const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <p className="Content--Paragraph">{children}</p>,
    [BLOCKS.HEADING_2]: (node, children) => <h2 className="Content--Heading">{children}</h2>,
    [BLOCKS.HEADING_3]: (node, children) => <h3 className="Content--SubHeading">{children}</h3>,
    [INLINES.HYPERLINK]: (node, children) => (
      <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const imageUrl = node.data.target.fields.file.url;
      return (
        <div className="Content--ImageWrapper">
          <Image src={`https:${imageUrl}`} alt="" width={800} height={600} style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }} />
        </div>
      );
    },
  },
};

// ✅ Image component inside markdown
const MarkdownImage = ({ src, alt }) => {
  return (
    <div className="Content--ImageWrapper">
      <Image
        src={src.startsWith("http") ? src : `https:${src}`} // Ensure absolute URLs
        alt={alt || ""}
        width={800}
        height={600}
        style={{ objectFit: "contain", maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
};

// ✅ HTML Block for iframes
const HtmlBlock = ({ value }) => {
  if (!value.includes("<iframe")) return <div dangerouslySetInnerHTML={{ __html: value }} />;
  return <div className="Content--Iframe" dangerouslySetInnerHTML={{ __html: value }} />;
};

// ✅ Main Content component
const Content = ({ source, className = "" }) => {
  if (!source) return null;

  // ✅ If `source` is a Contentful Rich Text object, render it
  if (typeof source === "object" && source.nodeType) {
    return <div className={`Content ${className}`}>{documentToReactComponents(source, richTextOptions)}</div>;
  }

  // ✅ If `source` is Markdown, parse & render it
  return (
    <ReactMarkdown
      className={`Content ${className}`}
      remarkPlugins={[remarkGfm]} // Enables extended markdown syntax (tables, etc.)
      rehypePlugins={[rehypeRaw]} // Allows raw HTML inside markdown
      components={{
        img: MarkdownImage, // ✅ Render images properly
        html: HtmlBlock, // ✅ Render HTML properly
      }}
    >
      {encodeMarkdownURIs(source)}
    </ReactMarkdown>
  );
};

// ✅ Define prop types
Content.propTypes = {
  source: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), // Accepts string (Markdown) or object (Rich Text)
  className: PropTypes.string,
};

export default Content;
