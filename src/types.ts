/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  seatsTotal: number;
  seatsBooked: number;
}

export interface Donor {
  id: string;
  name: string;
  email: string;
  amount: number;
  message: string;
  timestamp: string;
  isAnonymous: boolean;
  tier: string;
}

export interface DonationTier {
  id: string;
  label: string;
  amount: number;
  description: string;
  benefits: string[];
}

export interface MembershipTier {
  id: string;
  name: string;
  price: string;
  description: string;
  frequency: string;
  benefits: string[];
}

export interface ContactInquiry {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
