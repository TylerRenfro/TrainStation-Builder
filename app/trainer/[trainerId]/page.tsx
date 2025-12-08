"use client";
import React, { useState, useEffect } from "react";
import styles from "./Trainer.module.scss";

interface Trainer {
    firstName: string;
    lastInitial: string;
    profilePicture: string;
    title: string;
    ifOwner: boolean;
    about: {
        paragraph: string;
    }[];
    yearsOfExperience: number;
    expertise: {
        expertiseTitle: string;
    }[];
    achievements: {
        event: string;
        categories: {
            category: string;
            entries: {
                entry: string;
            }[]
        }[]
    }[]
}

function Trainer({ params }: { params: { trainerId: string } }) {
    const { trainerId } = params;
    const [trainer, setTrainer] = useState<Trainer>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTrainers() {
            try {                
                const getTrainer = await fetch(`https://cdn.builder.io/api/v3/content/trainers/${trainerId}?apiKey=49da8b8581a648f6989d85ec423cf285`);
                const data = await getTrainer.json();
                console.log(data.data);
                setTrainer(data.data);
            } catch (err) {
                console.error('Error fetching trainers:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchTrainers();
    }, []);

    return (
        !loading && (
            <div className={styles.trainerContainer}>
                <div className={styles.trainerInnerContainer}>
                    <div className={styles.trainerHeader}>
                        <div 
                            className={styles.trainerImageContainer} 
                            style={{ backgroundImage: `url(${trainer!.profilePicture})` }}
                        />
                        <div className={styles.trainerInfo}>
                            <h2>{trainer!.firstName} {trainer!.lastInitial}.</h2>
                            <h4>{trainer!.title}</h4>
                        </div>
                    </div>
                    {trainer!.about.length > 0 && (
                        <div className={styles.mainContainer}>
                            <h3 className={styles.title}>About {trainer?.firstName}</h3>
                            {trainer?.about.map((aboutItem, index) => (
                                <p key={`about-${index}`}>{aboutItem.paragraph}</p>
                            ))}
                        </div>
                    )}
                    {trainer!.expertise.length > 0 && (
                        <div className={styles.secondaryContainer}>
                            <p className={styles.title}>Expertise</p>
                            <div className={styles.expertiseItemsContainer}>
                                {trainer?.expertise.map((expertiseItem, index) => (
                                    <p key={`expertise-${index}`} className={styles.expertiseItem}>{expertiseItem.expertiseTitle}</p>
                                ))}
                            </div>
                        </div>
                    )}
                    {trainer!.achievements.length > 0 && (
                        trainer!.achievements.map((achievement, index) => (
                            <div key={`achievement-${achievement.event}-${index}`} className={styles.secondaryContainer}>
                                <p className={styles.title}>{achievement.event}</p>
                                <div className={styles.achievementContainer}>
                                    {achievement.categories.map((category, catIndex) => (
                                        <div key={`category-${category.category}-${catIndex}`} className={styles.achievementCategory}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>
                                            <div className={styles.textContainer}>
                                                <h4>{category.category}</h4>
                                                <div>
                                                    {category.entries.map((entry, entryIndex) => (
                                                        <p key={`entry-${entry.entry}-${entryIndex}`}>{entry.entry}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                    <div className={styles.secondaryContainer}>
                        <p className={styles.title}>Wanna train with {trainer?.firstName}</p>
                        <p>Schedule a consultation to start training with {trainer?.firstName}.</p>
                        <p>Train Station Membership Required.</p>
                        <a href="#">Request Appointment</a>
                    </div>
                </div>
            </div>
        )
    );
}

export default Trainer;
