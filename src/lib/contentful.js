import { createClient } from "contentful";

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

console.log("🔍 Checking Contentful credentials:");
console.log("CONTENTFUL_SPACE_ID:", SPACE_ID || "❌ Not found");
console.log("CONTENTFUL_ACCESS_TOKEN:", ACCESS_TOKEN || "❌ Not found");

if (!SPACE_ID || !ACCESS_TOKEN) {
  throw new Error("❌ Missing Contentful credentials. Check your .env.local file.");
}

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

// ✅ Ensure this function is only defined once
export async function getArtists() {
  const res = await client.getEntries({ content_type: "artist" });

  return res.items.map((item) => ({
    title: item.fields.title,
    slug: item.fields.slug, // ✅ Ensure it's just "phillipp-jung"
    featuredImage: item.fields.featuredImage?.fields?.file?.url 
      ? `https:${item.fields.featuredImage.fields.file.url}`
      : "",
    bio: item.fields.bio?.content || [], // ✅ Extract Rich Text content for bio
    socialLinks: item.fields.socialLinks || {}, // ✅ JSON object containing social links
    dateCreated: item.fields.dateCreated || null, // ✅ Store date created
  }));
}

// ✅ Fetch articles from Contentful
export async function getArticles() {
  const res = await client.getEntries({ content_type: "article" });

  return res.items.map((item) => ({
    title: item.fields.title, // ✅ Title of the article
    excerpt: item.fields.url, // ✅ Using the URL as an excerpt
  }));
}

// ✅ Fetch home banners from Contentful
export async function getBanners() {
  const res = await client.getEntries({ content_type: "homeBanner" });

  return res.items.map((item) => ({
    imageUrl: item.fields.bannerImage?.fields?.file?.url || "",
  }));
}
