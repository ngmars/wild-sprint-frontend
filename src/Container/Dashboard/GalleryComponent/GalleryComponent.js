import React, { Component } from "react";
import Gallery from 'react-grid-gallery';
import "./GalleryComponent.css";

class GalleryComponent extends Component {
  render(){
  const IMAGES =
    [{
            src: "http://localhost:3000/galleryimg/proj-1.jpg",
            thumbnail: "http://localhost:3000/galleryimg/proj-1.jpg",
            thumbnailWidth: 400,
            thumbnailHeight: 300,
    },
    {
      src: "http://localhost:3000/galleryimg/proj-2.jpg",
      thumbnail: "http://localhost:3000/galleryimg/proj-2.jpg",
      thumbnailWidth: 400,
      thumbnailHeight: 300,
    },
    {
      src: "http://localhost:3000/galleryimg/proj-3.jpg",
      thumbnail: "http://localhost:3000/galleryimg/proj-3.jpg",
      thumbnailWidth: 400,
      thumbnailHeight: 300,
    },
    {
      src: "http://localhost:3000/galleryimg/proj-4.jpg",
      thumbnail: "http://localhost:3000/galleryimg/proj-4.jpg",
      thumbnailWidth: 400,
      thumbnailHeight: 300,
    },
    {
      src: "http://localhost:3000/galleryimg/proj-5.jpg",
      thumbnail: "http://localhost:3000/galleryimg/proj-5.jpg",
      thumbnailWidth: 400,
      thumbnailHeight: 300,
    },
    {
      src: "http://localhost:3000/galleryimg/proj-6.jpg",
      thumbnail: "http://localhost:3000/galleryimg/proj-6.jpg",
      thumbnailWidth: 400,
      thumbnailHeight: 300,
    },
    {
      src: "http://localhost:3000/galleryimg/proj-7.jpeg",
      thumbnail: "http://localhost:3000/galleryimg/proj-7.jpeg",
      thumbnailWidth: 400,
      thumbnailHeight: 300,
    },
    {
      src: "http://localhost:3000/galleryimg/proj-8.jpeg",
      thumbnail: "http://localhost:3000/galleryimg/proj-8.jpeg",
      thumbnailWidth: 400,
      thumbnailHeight: 300,
    },
    {
      src: "http://localhost:3000/galleryimg/proj-9.jpeg",
      thumbnail: "http://localhost:3000/galleryimg/proj-9.jpeg",
      thumbnailWidth: 400,
      thumbnailHeight: 300,
    },
    {
      src: "http://localhost:3000/galleryimg/proj-10.jpeg",
      thumbnail: "http://localhost:3000/galleryimg/proj-10.jpeg",
      thumbnailWidth: 400,
      thumbnailHeight: 300,
    },
    {
      src: "http://localhost:3000/galleryimg/proj-11.jpeg",
      thumbnail: "http://localhost:3000/galleryimg/proj-11.jpeg",
      thumbnailWidth: 400,
      thumbnailHeight: 300,
    },
    {
      src: "http://localhost:3000/galleryimg/proj-12.jpeg",
      thumbnail: "http://localhost:3000/galleryimg/proj-12.jpeg",
      thumbnailWidth: 400,
      thumbnailHeight: 300,
    },
    ]

  return(
    <div className="gal-comp">
      <Gallery 
      images={IMAGES}
      rowHeight='250'/>
    </div>        
    )
  }  
}

export default GalleryComponent;