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

export async function getContactPage() {
    const res = await client.getEntries({ content_type: "contactPage" });
  
    if (!res.items.length) return null;
  
    const item = res.items[0].fields;
  
    return {
      title: item.title || "Contact Us",
      subtitle: item.subtitle || "",
      body: item.body || null, // ✅ Keep body as a Rich Text object
      address: item.address || "",
      phone: item.phone || "",
      email: item.email || "",
    };
  }
  
  export async function getProductionsPage() {
    try {
      console.log("🔥 Fetching data from Contentful...");
      const res = await client.getEntries({ content_type: "productions" });
  
      if (!res.items.length) {
        console.warn("⚠️ No items found for productions!");
        return null;
      }
  
      console.log("✅ Contentful API Response:", res);
  
      const page = res.items[0].fields;
  
      const formattedData = {
        title: page.title || "Productions",
        featuredImage: page.featuredImage?.fields?.file?.url
          ? `https:${page.featuredImage.fields.file.url}`
          : "",
        section1: page.section1 || "",
        section2: page.section2 || "",
        video: page.videoUrl || "", // ✅ Now using Video URL
        videoPoster: page.videoPoster?.fields?.file?.url
          ? `https:${page.videoPoster.fields.file.url}`
          : "",
        videoTitle: page.videoTitle || "",
        gallery: page.gallery?.fields?.file?.url // ✅ Handle single image correctly
          ? {
              image: `https:${page.gallery.fields.file.url}`,
              alt: page.gallery.fields.title || "Gallery Image",
              title: page.gallery.fields.description || "",
            }
          : null, // ✅ Set null if no gallery image exists
      };
  
      console.log("✅ Formatted Data:", formattedData);
      return formattedData;
    } catch (error) {
      console.error("❌ Error fetching Contentful data:", error);
      return null;
    }
  }
  