import { useState, useCallback } from 'react';
import { Ticket } from '../types';
import ticketsData from '../data/tickets.json';

export const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>(ticketsData as Ticket[]);

  const updateTicket = useCallback((ticketId: string, updates: Partial<Ticket>) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, ...updates }
        : ticket
    ));
  }, []);

  const createTicket = useCallback((newTicket: Omit<Ticket, 'id' | 'createdDate' | 'updatedDate'>) => {
    const ticket: Ticket = {
      ...newTicket,
      id: `ticket-${Date.now()}`,
      createdDate: new Date().toISOString(),
      updatedDate: new Date().toISOString(),
    };
    setTickets(prev => [ticket, ...prev]);
  }, []);

  const getTicketsByProperty = useCallback((propertyId: string) => {
    return tickets.filter(ticket => ticket.propertyId === propertyId);
  }, [tickets]);

  return {
    tickets,
    updateTicket,
    createTicket,
    getTicketsByProperty,
  };
};