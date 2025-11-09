import React from 'react';
import { BusTrip } from '../types';

interface BookingDetails {
  from: string;
  to: string;
  date: string;
  passengers: number;
}

interface ConfirmationModalProps {
  trip: BusTrip;
  bookingDetails: BookingDetails;
  onConfirm: () => void;
  onCancel: () => void;
}

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    maxWidth: '500px',
    width: '90%',
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
  },
  header: {
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem',
    marginBottom: '1rem',
  },
  title: {
    margin: 0,
    color: '#1a237e',
    fontSize: '1.8rem',
  },
  content: {
    marginBottom: '1.5rem',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #f0f0f0',
  },
  detailLabel: {
    fontWeight: '600',
    color: '#333',
  },
  detailValue: {
    color: '#555',
  },
  totalPrice: {
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '2px solid #1a237e',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '1rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  confirmButton: {
    backgroundColor: '#303f9f',
    color: 'white',
  },
  cancelButton: {
    backgroundColor: '#f1f1f1',
    color: '#333',
    border: '1px solid #ddd',
  },
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ trip, bookingDetails, onConfirm, onCancel }) => {
  const { from, to, date, passengers } = bookingDetails;
  const totalPrice = trip.price * passengers;

  // Format date for display
  const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Confirmer la réservation</h2>
        </div>
        <div style={styles.content}>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Trajet</span>
            <span style={styles.detailValue}>{from} → {to}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Date</span>
            <span style={styles.detailValue}>{formattedDate}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Horaire</span>
            <span style={styles.detailValue}>{trip.departureTime} - {trip.arrivalTime}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Compagnie</span>
            <span style={styles.detailValue}>{trip.company}</span>
          </div>
          <div style={styles.detailRow}>
            <span style={styles.detailLabel}>Passagers</span>
            <span style={styles.detailValue}>{passengers}</span>
          </div>
          <div style={styles.totalPrice}>
            <span style={styles.detailLabel}>Prix Total</span>
            <span style={{ color: '#1a237e' }}>{totalPrice} {trip.currency}</span>
          </div>
        </div>
        <div style={styles.footer}>
          <button style={{...styles.button, ...styles.cancelButton}} onClick={onCancel}>
            Annuler
          </button>
          <button style={{...styles.button, ...styles.confirmButton}} onClick={onConfirm}>
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;