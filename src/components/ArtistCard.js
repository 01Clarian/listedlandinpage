import Image from "next/image";

const ArtistCard = ({ featuredImage, title, slug }) => (
  <a href={slug} className="ArtistCard">
    {featuredImage && (
      <div className="ArtistCard--Image">
        <Image
          src={featuredImage}
          alt={title}
          width={300} // Set width to prevent layout shifts
          height={300} // Set height to maintain proportions
          style={{ objectFit: "cover", borderRadius: "10px" }} // Prevents stretching
        />
      </div>
    )}
    <div className="ArtistCard--Content">
      {title && <h3 className="ArtistCard--Title">{title}</h3>}
    </div>
  </a>
);

export default ArtistCard;
