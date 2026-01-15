"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./ContactForm.module.scss";

interface BusinessData {
    email: string;
    hoursOfOperation: {
      hoursText: string;
      dayText: string;
    }[];
    location: string;
    phone: string;
    socialMedia: {
      socialMediaType: string;
      socialMediaUrl: string;
    }[]
  };

function ContactForm({
    formImage
}: {
    formImage?: string;
}) {

    const [businessData, setBusinessData] = useState<BusinessData | null>(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        message: ''
    });

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        console.log(formData);
    };

    useEffect(() => {

        async function fetchFooterData() {
            try {
                const footerData = await fetch("https://cdn.builder.io/api/v3/content/footer-information/fac3daf7c9584beabf3ef19b8b83f9cd?apiKey=49da8b8581a648f6989d85ec423cf285");
                const response = await footerData.json();
                setBusinessData(response.data);
            } catch (err) {
                console.error('Error fetching footer data:', err);
            }
        }

        fetchFooterData();
    }, []);

    return (
        <div className={styles.contactForm}>
            <div className={styles.innerContainer}>
                <div className={styles.column}>
                    <Image src={formImage || '/default-contact-image.jpg'} alt="Contact Form Image" width={600} height={800} className={styles.formImage} />
                    <div className={styles.addressContainer}>
                        <h2 className={styles.title}>Address</h2>
                        <p>{businessData?.location}</p>
                    </div>
                    <div className={styles.phoneContainer}>
                        <h2 className={styles.title}>Phone</h2>
                        <p>{businessData?.phone}</p>
                    </div>
                    <div className={styles.emailContainer}>
                        <h2 className={styles.title}>Email</h2>
                        <p>{businessData?.phone}</p>
                    </div>
                    <div className={styles.hoursContainer}>
                        <h2 className={styles.title}>Staffed Hours</h2>
                        {businessData?.hoursOfOperation.map((hours, index) => (
                            <>
                                <p>{hours.dayText}</p> 
                                <p>{hours.hoursText}</p>
                            </>
                        ))}
                    </div>
                </div>
                <div className={styles.column}>
                    <h3 className={styles.title}>Send a Message</h3>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className={styles.inputContainer}>
                            <label htmlFor="first_name">First Name</label>
                            <input 
                                type="text" 
                                id="first_name" 
                                name="first_name" 
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="last_name">Last Name</label>
                            <input 
                                type="text" 
                                id="last_name" 
                                name="last_name" 
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="email">Email</label>
                            <input 
                                type="text" 
                                id="email" 
                                name="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="dob">Date of Birth</label>
                            <input 
                                type="text" 
                                id="dob" 
                                name="dob" 
                                value={formData.dob}
                                onChange={(e) => setFormData({...formData, dob: e.target.value})}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label htmlFor="message">Message</label>
                            <textarea  
                                id="message" 
                                name="message" 
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                            />
                        </div>
                        <button type="submit" className={styles.submitButton}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactForm;
