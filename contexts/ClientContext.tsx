'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from './AuthContext';
import { Client, CreateClientData, UpdateClientData, ClientStats, Service } from '@/types/client';

// Generate unique ID for services
const generateServiceId = () => `service_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

interface ClientContextType {
  clients: Client[];
  loading: boolean;
  error: string | null;
  createClient: (data: CreateClientData) => Promise<string>;
  updateClient: (id: string, data: UpdateClientData) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  getClientById: (id: string) => Client | undefined;
  refreshClients: () => Promise<void>;
  getClientStats: () => ClientStats;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const useClient = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};

export const ClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Convert Firestore document to Client object
  const convertFirestoreToClient = (doc: any): Client => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };
  };

  // Load clients from Firestore
  const loadClients = async () => {
    if (!user) {
      setClients([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Simplified query without orderBy to avoid index requirement
      const clientsQuery = query(
        collection(db, 'clients'),
        where('userId', '==', user.uid)
      );

      const querySnapshot = await getDocs(clientsQuery);
      const clientsData = querySnapshot.docs.map(convertFirestoreToClient);
      
      // Sort by createdAt in JavaScript (most recent first)
      clientsData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      
      setClients(clientsData);
    } catch (err: any) {
      console.error('Error loading clients:', err);
      setError(`Failed to load clients: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Create new client
  const createClient = async (data: CreateClientData): Promise<string> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);
      
      // Process services with unique IDs
      const servicesWithIds: Service[] = data.services.map(service => ({
        ...service,
        id: generateServiceId()
      }));

      const clientData = {
        userId: user.uid,
        businessName: data.businessName,
        contactEmail: data.contactEmail,
        industry: data.industry || '',
        website: data.website || '',
        description: data.description || '',
        services: servicesWithIds,
        targetMarket: data.targetMarket || '',
        businessGoals: data.businessGoals || [],
        competitorAnalysis: data.competitorAnalysis || '',
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'clients'), clientData);
      
      // Refresh clients list
      await loadClients();
      
      return docRef.id;
    } catch (err: any) {
      console.error('Error creating client:', err);
      setError(`Failed to create client: ${err.message}`);
      throw err;
    }
  };

  // Update existing client
  const updateClient = async (id: string, data: UpdateClientData): Promise<void> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);

      const updateData: any = {
        ...data,
        updatedAt: serverTimestamp(),
      };

      // Process services if provided
      if (data.services) {
        updateData.services = data.services.map(service => 
          'id' in service ? service : { ...service, id: generateServiceId() }
        );
      }

      await updateDoc(doc(db, 'clients', id), updateData);
      
      // Refresh clients list
      await loadClients();
    } catch (err: any) {
      console.error('Error updating client:', err);
      setError(`Failed to update client: ${err.message}`);
      throw err;
    }
  };

  // Delete client
  const deleteClient = async (id: string): Promise<void> => {
    if (!user) throw new Error('User not authenticated');

    try {
      setError(null);
      await deleteDoc(doc(db, 'clients', id));
      
      // Refresh clients list
      await loadClients();
    } catch (err: any) {
      console.error('Error deleting client:', err);
      setError(`Failed to delete client: ${err.message}`);
      throw err;
    }
  };

  // Get client by ID
  const getClientById = (id: string): Client | undefined => {
    return clients.find(client => client.id === id);
  };

  // Refresh clients
  const refreshClients = async (): Promise<void> => {
    await loadClients();
  };

  // Get client statistics
  const getClientStats = (): ClientStats => {
    const totalClients = clients.length;
    const activeClients = clients.filter(client => client.isActive).length;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentClients = clients.filter(client => client.createdAt >= thirtyDaysAgo).length;

    // Calculate top industries
    const industryCount: { [key: string]: number } = {};
    clients.forEach(client => {
      if (client.industry) {
        industryCount[client.industry] = (industryCount[client.industry] || 0) + 1;
      }
    });

    const topIndustries = Object.entries(industryCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([industry, count]) => ({ industry, count }));

    return {
      totalClients,
      activeClients,
      recentClients,
      topIndustries,
    };
  };

  // Load clients when user changes
  useEffect(() => {
    loadClients();
  }, [user]);

  const value: ClientContextType = {
    clients,
    loading,
    error,
    createClient,
    updateClient,
    deleteClient,
    getClientById,
    refreshClients,
    getClientStats,
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
}; 