"use client"; // ✅ Fix: Mark this as a Client Component

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import PostSection from '@/components/PostSection';
import { Carousel } from 'react-responsive-carousel';
import Slider from 'react-slick';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'slick-carousel/slick/slick.css';
import './home-page.css';
import "@/styles/styles.css";

const SlideContent = ({ url }) => {
  const [type, setType] = useState('');

  useEffect(() => {
    if (!url) return;
    getType(url);
  }, [url]);

  const getType = async (url) => {
    if (!url || url.includes("via.placeholder.com")) {
      setType("image"); // Directly set type for placeholders
      return;
    }
    
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      setType(res.headers.get('Content-Type') || "");
    } catch (error) {
      console.error("Failed to fetch URL:", url, error);
      setType(""); 
    }
  };

  return (
    <>
      {type.includes('image') && <img src={url} alt="Slide" />}
      {type.includes('video') && <video controls src={url}></video>}
    </>
  );
};

export default function HomePage() {
  const [data, setData] = useState({
    listedmix: 'Mix Of The Month',
    listedmixlk: 'https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1997778871&show_artwork=true',
    posts: [{ title: 'Placeholder Post', excerpt: '...' }],
    artists: [
        { title: 'Gets Physical', slug: '#' },
        { title: 'Anja Schneider', slug: '#' },
        { title: 'Anthony Middleton', slug: '#' },
        { title: 'Atish', slug: '#' },
        { title: 'Atnarko', slug: '#' },
        { title: 'Beauty & the Beast', slug: '#' },
        { title: 'Ben Annand', slug: '#' },
        { title: 'Bilaliwood', slug: '#' },
        { title: 'Camea', slug: '#' },
        { title: 'Clarian', slug: '#' },
        { title: 'Dory', slug: '#' },
        { title: 'Dubtribe Sound System', slug: '#' },
        { title: 'GALEN', slug: '#' },
        { title: 'H Foundation', slug: '#' },
        { title: 'HALO', slug: '#' },
        { title: 'HIPP-E', slug: '#' },
        { title: 'Holmar', slug: '#' },
        { title: 'Jay Tripwire', slug: '#' },
        { title: 'Justin Marchacos', slug: '#' },
        { title: 'KMLN EPK', slug: '#' },
        { title: 'Lola B', slug: '#' },
        { title: 'Lovestruckk', slug: '#' },
        { title: 'm.O.N.R.O.E', slug: '#' },
        { title: 'Mark Slee', slug: '#' },
        { title: 'Matt Caines', slug: '#' },
        { title: 'Matthias Meyer', slug: '#' },
        { title: 'Maxi Storrs', slug: '#' },
        { title: 'MightyKat', slug: '#' },
        { title: 'Mike Khoury', slug: '#' },
        { title: 'Mr.C - Superfreq', slug: '#' },
        { title: 'Muffs & Mykola', slug: '#' },
        { title: 'Navbox', slug: '#' },
        { title: 'Naveen G', slug: '#' },
        { title: 'Nico Stojan', slug: '#' },
        { title: 'NIki Sadeki', slug: '#' },
        { title: 'NIKITA', slug: '#' },
        { title: 'Nitin', slug: '#' },
        { title: 'Philipp Jung', slug: '#' },
        { title: 'RAY ZUNIGA', slug: '#' },
        { title: 'Reza Safinia', slug: '#' },
        { title: 'Ruede Hagelstein', slug: '#' },
        { title: 'Saqib', slug: '#' },
        { title: 'SHAWNA', slug: '#' },
        { title: 'Sunshine Jones', slug: '#' },
        { title: 'Tara Brooks', slug: '#' },
        { title: 'Tony y Not', slug: '#' },
        { title: 'Tooker', slug: '#' }
      ],

    featuredImages: [
      'https://i.imgur.com/HgM9bSI.png',
      'https://i.imgur.com/uneL2Iq.jpeg',
      'https://i.imgur.com/LYawlIg.jpeg',
      'https://i.imgur.com/lBXRROy.jpeg'
    ]
  });

  const settings = {
    dots: false,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2800,
    speed: 2800,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Layout title="Home">
      <div className="fixcenter">
        <Slider {...settings} className="slider">
          {data.featuredImages.map((image, index) => (
            <div className="slide" key={index}>
              <SlideContent url={image} />
            </div>
          ))}
        </Slider>
      </div>
      <div style={{ textAlign: 'center' }}>
      <h2>Buzz</h2>
      </div>
      <main className="Blog">
        <section className="section">
          <div className="container">
            <br/>
            <PostSection posts={data.posts} />
          </div>
        </section>
        <div style={{ textAlign: 'center' }}>
        <div className="soundcloud-container">
            <h2>{data.listedmix}</h2>
            <div className="glow-card">
                <iframe
                title="listed-playlist"
                width="98%"
                height="100%"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={data.listedmixlk}
                ></iframe>
            </div>
            </div>
          <div className="home-artists-links">
            <div style={{ textAlign: 'center' }}>
            <h2>Artists</h2>
              <p>
                {data.artists.map((artist) => (
                  <a key={artist.slug} href={artist.slug} style={{ marginRight: '1em' }}>
                    {artist.title.trim()}
                  </a>
                ))}
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}