// SubscriptionPage.jsx
import React, { useState } from 'react';
import './SubscriptionPlan.css';
import Navbar from '../navbar/Navbar1';

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const subscriptionPlans = [
    {
      id: 1,
      name: 'Basic Plan',
      price: '$29.99',
      period: 'monthly',
      features: [
        'Access to basic therapy resources',
        '2 therapy sessions per month',
        'Basic progress tracking',
        'Email support'
      ]
    },
    {
      id: 2,
      name: 'Standard Plan',
      price: '$49.99',
      period: 'monthly',
      features: [
        'Access to all therapy resources',
        '5 therapy sessions per month',
        'Advanced progress tracking',
        'Priority email & chat support',
        'Personalized therapy plan'
      ],
      recommended: true
    },
    {
      id: 3,
      name: 'Premium Plan',
      price: '$79.99',
      period: 'monthly',
      features: [
        'Unlimited access to all resources',
        '10 therapy sessions per month',
        'Comprehensive progress analytics',
        '24/7 priority support',
        'Personalized therapy plan',
        'Family access (up to 3 members)'
      ]
    }
  ];

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = () => {
    if (!selectedPlan) {
      alert('Please select a subscription plan');
      return;
    }
    
    // Here you would integrate with your payment gateway
    alert(`Proceeding to payment for ${subscriptionPlans.find(plan => plan.id === selectedPlan).name}`);
  };

  return (
   <>
   <Navbar/>
    <div className="subscription-container">
      <div className="subscription-header">
        <h1>Choose Your Subscription Plan</h1>
        <p>Select the plan that best suits your speech therapy needs</p>
      </div>

      <div className="subscription-plans">
        {subscriptionPlans.map((plan) => (
          <div 
            key={plan.id} 
            className={`plan-card ${plan.recommended ? 'recommended' : ''} ${selectedPlan === plan.id ? 'selected' : ''}`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.recommended && <div className="recommended-badge">Most Popular</div>}
            <h2>{plan.name}</h2>
            <div className="price">
              <span className="amount">{plan.price}</span>
              <span className="period">/{plan.period}</span>
            </div>
            <ul className="features">
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button 
              className={`select-plan-btn ${selectedPlan === plan.id ? 'selected' : ''}`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="subscription-benefits">
        <h2>Why Subscribe?</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <div className="benefit-icon">🎯</div>
            <h3>Personalized Therapy</h3>
            <p>Get customized therapy plans tailored to your specific needs and goals.</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Monitor your improvement with detailed analytics and progress reports.</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🧠</div>
            <h3>Expert Guidance</h3>
            <p>Connect with certified speech therapists for professional support.</p>
          </div>
          <div className="benefit-item">
            <div className="benefit-icon">🔄</div>
            <h3>Flexible Sessions</h3>
            <p>Schedule, reschedule, or cancel sessions as per your convenience.</p>
          </div>
        </div>
      </div>

      <div className="subscription-action">
        <button className="subscribe-btn" onClick={handleSubscribe}>
          Subscribe Now
        </button>
        <p className="subscription-note">
          All plans include a 7-day free trial. Cancel anytime. No hidden fees.
        </p>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>Can I switch plans after subscribing?</h3>
          <p>Yes, you can upgrade or downgrade your plan at any time. Changes will be effective from the next billing cycle.</p>
        </div>
        <div className="faq-item">
          <h3>How do I cancel my subscription?</h3>
          <p>You can cancel your subscription anytime from your account settings. You'll continue to have access until the end of your billing period.</p>
        </div>
        <div className="faq-item">
          <h3>Are there any refunds if I'm not satisfied?</h3>
          <p>We offer a 30-day money-back guarantee if you're not completely satisfied with our services.</p>
        </div>
      </div>
    </div>
   </>
  );
};

export default SubscriptionPage;