"use client";
import React, { useState, useEffect } from "react";
import styles from "./TrainerList.module.scss";

interface Trainer {
    id: string;
    firstName: string;
    lastInitial: string;
    profilePicture: string;
    title: string;
    about: {
        paragraph: string;
    }[];
    yearsOfExperience: number;
    expertise: {
        expertiseTitle: string;
    }[];
    ifOwner: boolean;
}

function TrainerList() {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTrainers() {
            try {
                setLoading(true);
                
                const getTrainers = await fetch("https://cdn.builder.io/api/v3/content/trainers?apiKey=49da8b8581a648f6989d85ec423cf285");
                const data = await getTrainers.json();
                const trainers: Trainer[] = [];

                console.log(data);
                
                data.results.map((trainerResults: {id: string, data: Trainer}) => {
                    trainers.push({
                        id: trainerResults.id,
                        firstName: trainerResults.data.firstName,
                        lastInitial: trainerResults.data.lastInitial,
                        profilePicture: trainerResults.data.profilePicture,
                        title: trainerResults.data.title,
                        about: trainerResults.data.about,
                        yearsOfExperience: trainerResults.data.yearsOfExperience,
                        expertise: trainerResults.data.expertise,
                        ifOwner: trainerResults.data.ifOwner || false,
                    });
                });

                setTrainers(trainers);
            } catch (err) {
                console.error('Error fetching trainers:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchTrainers();
    }, []);

    return (
        <div className={styles.trainersContainer}>
            <div className={styles.trainersListContainer}>
                <div className={styles.sectionTitle}>
                    <h3>Owners</h3>
                    <span />
                </div>
                {trainers.map((trainer, index) => (
                    trainer.ifOwner && (
                        <div key={`owner-${index}`} className={styles.trainerContainer}>
                            <div 
                                className={styles.imageContainer}
                                style={{ backgroundImage: `url(${trainer.profilePicture})` }}
                            />
                            <h2>{trainer.firstName} {trainer.lastInitial}</h2>
                            <p className={styles.title}>{trainer.title}</p>
                            <p>Trainer with {trainer.yearsOfExperience} years experience that specializes in Strength and conditioning.</p>
                            <a href={`/trainer/${trainer.id}`}>Request Consultation</a>
                        </div>
                    )
                ))}
            </div>
            <div className={styles.trainersListContainer}>
                <div className={styles.sectionTitle}>
                    <h3>Trainers</h3>
                    <span />
                </div>
                {trainers.map((trainer, index) => (
                    !trainer.ifOwner && (
                        <div key={`trainer-${index}`} className={styles.trainerContainer}>
                            <div 
                                className={styles.imageContainer}
                                style={{ backgroundImage: `url(${trainer.profilePicture})` }}
                            />
                            <h2>{trainer.firstName} {trainer.lastInitial}</h2>
                            <p className={styles.title}>{trainer.title}</p>
                            <p>Trainer with {trainer.yearsOfExperience} years experience that specializes in Strength and conditioning.</p>                            
                            <a href={`/contact`}>Request Consultation</a>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}

export default TrainerList;
