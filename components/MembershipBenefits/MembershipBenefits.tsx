"use client";

import React from "react";
import styles from "./MembershipBenefits.module.scss";
import Link from "next/link";

interface Plans {
  planTitle: string;
  planSubtitle: string;
  planPrice: string;
  planPriceSubtext: string;
  planBenefits: {
    benefitText: string;
  }[]
}

interface MembershipBenefitsProps {
  plans: Plans[];
  overviewTitle: string;
  overviewSubtitle: string;
  additionalBenefits: {
    benefitText: string;
  }[];
  additionalResources: {
    resourceText: string;
  }[],
  rightColumnTitle: string;
  rightColumnText: string;
}

function MembershipBenefits({
  plans,
  overviewTitle,
  overviewSubtitle,
  additionalBenefits,
  additionalResources,
  rightColumnTitle,
  rightColumnText
}: MembershipBenefitsProps) {

  return (
    <div className={styles.membershipBenefitsContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.plansContainer}>
          {plans && plans.map((plan, index) => (
            <div
              key={`plan-card-` + index} 
              className={styles.planCard}
            >
              <div className={styles.planHeader}>
                {plan.planTitle && <h3 className={styles.planTitle}>{plan.planTitle}</h3>}
                {plan.planSubtitle && <p>{plan.planSubtitle}</p>}
              </div>
              <div className={styles.priceContainer}>
                {plan.planPrice && <p className={styles.price}>{plan.planPrice}</p>}
                {plan.planPriceSubtext && <p>{plan.planPriceSubtext}</p>}
              </div>
              {plan.planBenefits && (
                <div className={styles.planBenefitsContainer}>
                  {plan.planBenefits.map((benefit, subindex) => (
                    <div key={`plan-${index}-benefit-${subindex}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                          <path fill="#10B981" d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/>
                      </svg>
                      <p>{benefit.benefitText}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.buttonContainer}>
                <Link href="#" className={styles.signupButton}>Sign Up Now</Link>
              </div>
            </div>
          ))}
        </div>
        {overviewTitle && (
          <div className={styles.overviewContainer}>
            <h4 className={styles.title}>{overviewTitle}</h4>
            {overviewSubtitle && <p>{overviewSubtitle}</p>}
          </div>
        )}
        <div className={styles.additionalInformation}>
          <div className={styles.leftColumn}>
            {additionalBenefits && (
              <div className={styles.additionalMembershipContainer}>
                <h4 className={styles.title}>Membership Benefits</h4>
                <div className={styles.benefitsListContainer}>
                  {additionalBenefits.map((benefit, index) => (
                    <div 
                      key={`additional-benefit-` + index}
                      className={styles.benefitItem}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                          <path fill="#10B981" d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/>
                      </svg>
                      <p>{benefit.benefitText}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {additionalResources && (
              <div className={styles.additionalMembershipContainer}>
                <h4 className={styles.title}>Additional Resources</h4>
                <div className={styles.benefitsListContainer}>
                  {additionalResources.map((resource, index) => (
                    <div key={`additional-resource-${index}`} className={styles.benefitItem}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                          <path fill="#10B981" d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/>
                      </svg>
                      <p>{resource.resourceText}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {rightColumnTitle && (
            <div className={styles.rightColumn}>
              {rightColumnTitle && <h4 className={styles.title}>{rightColumnTitle}</h4>}
              {rightColumnText && <p>{rightColumnText}</p>}
              <Link href="#" className={styles.signupButton}>Sign Up Now</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MembershipBenefits;
