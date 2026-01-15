"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Gallery.module.scss";
import Link from "next/link";

interface GalleryImage {
    image: string;
    altText: string;
    category: string;
}

function Gallery({
    galleryImages
} : {
    galleryImages: GalleryImage[];
}) {

    const categories = ["Free Weights", "Cardio Zone", "Sectorized Machines", "Recovery Lounge", "Boxing Area", "Spin Room", "Posing Room", "Functional Turf", "Basketball Court"];

    return (
        <div className={styles.gallery}>
            <div className={styles.categoriesContainer}>
                <div className={styles.stickyContainer}>
                    <p className={styles.categoryTitle}>Training Areas</p>
                    <div className={styles.categoriesList}>
                        {categories.map((category, index) => (
                            <Link 
                                key={`category-` + index} 
                                href={`#${category.replace(/\s+/g, '-').toLowerCase()}`}
                                className={styles.categoryItem}
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.galleryImagesContainer}>
                {categories.map((category, catIndex) => (
                    <div 
                        key={`category-section-` + catIndex} 
                        className={styles.categorySection}
                        id={category.replace(/\s+/g, '-').toLowerCase()}
                    >
                        {galleryImages.filter(img => img.category === category).map((img, index) => (
                            <Image src={img.image} width={600} height={400} alt={img.altText} key={`gallery-` + catIndex + `-` + index} className={styles.galleryImage} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gallery;
