/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { MemberAccount } from "../types";
import { MEMBERSHIP_TIERS } from "../data";

interface AuthContextType {
  currentUser: MemberAccount | null;
  isLoading: boolean;
  signUp: (name: string, email: string, phone: string, password: string, tierId: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => void;
  updateProfile: (updates: Partial<MemberAccount>) => Promise<void>;
  rsvpForEvent: (eventId: string) => boolean;
  hasRSVPd: (eventId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MemberAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and load any active session
  useEffect(() => {
    // Check local storage for active session
    const activeSession = localStorage.getItem("gf_active_session");
    if (activeSession) {
      try {
        const sessionObj = JSON.parse(activeSession);
        // Refresh session data from accounts list to get the latest profile
        const accountsJson = localStorage.getItem("gf_member_accounts");
        if (accountsJson) {
          const accounts: any[] = JSON.parse(accountsJson);
          const freshProfile = accounts.find((acc) => acc.email.toLowerCase() === sessionObj.email.toLowerCase());
          if (freshProfile) {
            const { password, ...safeProfile } = freshProfile;
            setCurrentUser(safeProfile);
          } else {
            setCurrentUser(sessionObj);
          }
        } else {
          setCurrentUser(sessionObj);
        }
      } catch (err) {
        localStorage.removeItem("gf_active_session");
      }
    }
    setIsLoading(false);
  }, []);

  // Sign Up function
  const signUp = async (name: string, email: string, phone: string, password: string, tierId: string) => {
    setIsLoading(true);
    // Simulate networking delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const accountsJson = localStorage.getItem("gf_member_accounts") || "[]";
    let accounts: any[] = [];
    try {
      accounts = JSON.parse(accountsJson);
    } catch (err) {
      accounts = [];
    }

    // Check if email already registered
    const existing = accounts.find((acc) => acc.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setIsLoading(false);
      throw new Error("This email is already registered inside our Gilded Directory.");
    }

    const uid = `member-${Date.now()}`;
    const nameSeed = name.toUpperCase().replace(/[^A-Z]/g, "") || "MEMBER";
    const sum = nameSeed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 1988);
    const cardNumber = `GF-2026-${sum}`;
    
    const formattedJoinDate = new Date();
    const joinedStr = `Est. Freetown, ${formattedJoinDate.getFullYear()}/${String(formattedJoinDate.getMonth() + 1).padStart(2, "0")}`;

    const newAccount = {
      id: uid,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: password, // In production this would be hashed server side.
      selectedTierId: tierId,
      cardNumber: cardNumber,
      decreedDate: joinedStr,
      rsvps: [],
      createdAt: new Date().toISOString()
    };

    // Save account
    accounts.push(newAccount);
    localStorage.setItem("gf_member_accounts", JSON.stringify(accounts));

    // Save session without password
    const { password: _, ...safeProfile } = newAccount;
    localStorage.setItem("gf_active_session", JSON.stringify(safeProfile));
    
    // Also update classic legacy storage for backward compatibility with existing views if any
    const legacyCard = {
      name: newAccount.name,
      email: newAccount.email,
      tier: MEMBERSHIP_TIERS.find((t) => t.id === tierId)?.name || MEMBERSHIP_TIERS[1].name,
      cardNumber: cardNumber,
      status: "ACTIVE_DECREED"
    };
    localStorage.setItem("gf_social_club_membership", JSON.stringify(legacyCard));

    setCurrentUser(safeProfile);
    setIsLoading(false);
  };

  // Log In function
  const logIn = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const accountsJson = localStorage.getItem("gf_member_accounts") || "[]";
    let accounts: any[] = [];
    try {
      accounts = JSON.parse(accountsJson);
    } catch (err) {
      accounts = [];
    }

    const matched = accounts.find(
      (acc) => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
    );

    if (!matched) {
      setIsLoading(false);
      throw new Error("Invalid Gilded Email or Secret Passcode combination.");
    }

    // Save session
    const { password: _, ...safeProfile } = matched;
    localStorage.setItem("gf_active_session", JSON.stringify(safeProfile));
    
    // Legacy support
    const legacyCard = {
      name: matched.name,
      email: matched.email,
      tier: MEMBERSHIP_TIERS.find((t) => t.id === matched.selectedTierId)?.name || MEMBERSHIP_TIERS[1].name,
      cardNumber: matched.cardNumber,
      status: "ACTIVE_DECREED"
    };
    localStorage.setItem("gf_social_club_membership", JSON.stringify(legacyCard));

    setCurrentUser(safeProfile);
    setIsLoading(false);
  };

  // Log Out function
  const logOut = () => {
    localStorage.removeItem("gf_active_session");
    localStorage.removeItem("gf_social_club_membership");
    setCurrentUser(null);
  };

  // Update Profile function
  const updateProfile = async (updates: Partial<MemberAccount>) => {
    if (!currentUser) return;

    const accountsJson = localStorage.getItem("gf_member_accounts") || "[]";
    let accounts: any[] = [];
    try {
      accounts = JSON.parse(accountsJson);
    } catch (err) {
      accounts = [];
    }

    const updatedAccounts = accounts.map((acc) => {
      if (acc.id === currentUser.id) {
        return { ...acc, ...updates };
      }
      return acc;
    });

    localStorage.setItem("gf_member_accounts", JSON.stringify(updatedAccounts));

    const updatedUser = { ...currentUser, ...updates };
    localStorage.setItem("gf_active_session", JSON.stringify(updatedUser));

    // Update legacy support
    const legacyCard = {
      name: updatedUser.name,
      email: updatedUser.email,
      tier: MEMBERSHIP_TIERS.find((t) => t.id === updatedUser.selectedTierId)?.name || MEMBERSHIP_TIERS[1].name,
      cardNumber: updatedUser.cardNumber,
      status: "ACTIVE_DECREED"
    };
    localStorage.setItem("gf_social_club_membership", JSON.stringify(legacyCard));

    setCurrentUser(updatedUser);
  };

  // RSVP For Event
  const rsvpForEvent = (eventId: string): boolean => {
    if (!currentUser) return false;

    // Check if already RSVP'd
    if (currentUser.rsvps.includes(eventId)) {
      return false;
    }

    const updatedRsvps = [...currentUser.rsvps, eventId];
    updateProfile({ rsvps: updatedRsvps });

    // Sync to user specific local storage lists
    localStorage.setItem("gf_social_club_user_rsvps", JSON.stringify(updatedRsvps));
    return true;
  };

  // Check if RSVP'd
  const hasRSVPd = (eventId: string): boolean => {
    if (!currentUser) return false;
    return currentUser.rsvps.includes(eventId);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        signUp,
        logIn,
        logOut,
        updateProfile,
        rsvpForEvent,
        hasRSVPd,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
