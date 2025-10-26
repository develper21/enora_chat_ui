'use client';

import { useAuth } from '@/lib/auth/AuthContext';
import { useState } from 'react';

interface PricingTier {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  highlight?: boolean;
}

const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: [
      'Basic cyber security assistance',
      '100 messages per month',
      'Community access',
      'Email support'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 29,
    interval: 'month',
    features: [
      'Advanced security analysis',
      'Unlimited messages',
      'Priority support',
      'Custom integrations',
      'API access',
      'Team collaboration'
    ],
    highlight: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    interval: 'month',
    features: [
      'Everything in Professional',
      'Custom AI model training',
      'Dedicated account manager',
      'SLA guarantees',
      'Advanced analytics',
      'SSO & advanced security'
    ]
  }
];

export default function SubscriptionPage() {
  const { user } = useAuth();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (tierId: string) => {
    setLoading(true);
    try {
      // Mock Stripe checkout session creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In production, this would create a Stripe checkout session and redirect
      alert('In production, this would redirect to Stripe Checkout. Currently mocked for demo purposes.');
      
    } catch (error) {
      console.error('Subscription error:', error);
      alert('An error occurred while processing your subscription');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Upgrade Your Security Assistant</h1>
        <p className="text-lg text-muted">
          Choose the perfect plan for your security needs
        </p>
      </div>

      {/* Current Plan Banner */}
      {user?.subscription && (
        <div className="bg-panel p-6 rounded-lg mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Current Plan</h2>
              <p className="text-muted">
                You are currently on the{' '}
                <span className="text-primary font-medium capitalize">
                  {user.subscription.plan}
                </span>{' '}
                plan
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted">
                Status:{' '}
                <span className={user.subscription.status === 'active' ? 'text-green-400' : 'text-yellow-400'}>
                  {user.subscription.status}
                </span>
              </div>
              <div className="text-sm text-muted mt-1">
                Expires: {new Date(user.subscription.expiresAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pricing Tiers */}
      <div className="grid md:grid-cols-3 gap-8">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`bg-panel rounded-xl p-6 ${
              tier.highlight
                ? 'ring-2 ring-primary'
                : ''
            }`}
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
              <div className="text-3xl font-bold mb-2">
                ${tier.price}
                <span className="text-muted text-sm font-normal">/{tier.interval}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span className="mr-2 text-primary">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSubscribe(tier.id)}
              disabled={loading || (user?.subscription?.plan === tier.id.toLowerCase())}
              className={`w-full py-2 rounded font-medium transition-colors ${
                tier.highlight
                  ? 'bg-primary text-black hover:bg-primary/90'
                  : 'bg-slate-700 hover:bg-slate-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading
                ? 'Processing...'
                : user?.subscription?.plan === tier.id.toLowerCase()
                ? 'Current Plan'
                : `Subscribe to ${tier.name}`}
            </button>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-panel p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Can I change plans later?</h3>
            <p className="text-muted text-sm">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.
            </p>
          </div>
          <div className="bg-panel p-6 rounded-lg">
            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-muted text-sm">
              We accept all major credit cards, debit cards, and various payment methods through Stripe.
            </p>
          </div>
          <div className="bg-panel p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Is there a free trial?</h3>
            <p className="text-muted text-sm">
              Yes, all paid plans come with a 14-day free trial. No credit card required for the trial period.
            </p>
          </div>
          <div className="bg-panel p-6 rounded-lg">
            <h3 className="font-semibold mb-2">What happens after my trial?</h3>
            <p className="text-muted text-sm">
              After your trial ends, you'll be automatically switched to the free plan unless you choose to subscribe.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}