import React, { useState, useMemo } from 'react';
import { CITIES } from './constants';
import { BusTrip } from './types';
import Spinner from './components/Spinner';
import ConfirmationModal from './components/ConfirmationModal';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '600px',
    width: '100%',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e0e0e0',
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    color: '#1a237e',
    fontSize: '2.5rem',
    margin: '0',
  },
  subtitle: {
    color: '#555',
    fontSize: '1rem',
    marginTop: '0.5rem',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  label: {
    marginBottom: '0.5rem',
    color: '#333',
    fontWeight: '600',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '0.85rem',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#303f9f',
    color: 'white',
    fontSize: '1.1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    width: '100%',
    marginTop: '1rem',
  },
  buttonDisabled: {
    backgroundColor: '#9fa8da',
    cursor: 'not-allowed',
  },
  resultsContainer: {
    marginTop: '2rem',
  },
  resultsHeader: {
    fontSize: '1.5rem',
    color: '#1a237e',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '0.5rem',
    marginBottom: '1rem',
  },
  tripCard: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripInfo: {
    flex: 1,
  },
  tripTime: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
  },
  tripCompany: {
    color: '#666',
    marginTop: '0.25rem',
  },
  tripPrice: {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'right',
  },
  bookButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#4caf50',
    color: 'white',
    fontSize: '0.9rem',
    cursor: 'pointer',
    marginLeft: '1rem',
  },
   error: {
    color: '#d32f2f',
    gridColumn: '1 / -1',
    textAlign: 'center',
    marginTop: '0.5rem',
  },
};

const App: React.FC = () => {
  // Booking state
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [passengers, setPassengers] = useState<number>(1);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<BusTrip[]>([]);
  const [error, setError] = useState<string>('');
  const [selectedTrip, setSelectedTrip] = useState<BusTrip | null>(null);

  const toCities = useMemo(() => CITIES.filter(city => city !== from), [from]);

  const handleSearch = () => {
    setError('');
    if (from === to && from !== '') {
      setError('La ville de départ et de destination ne peuvent pas être identiques.');
      return;
    }

    setIsSearching(true);
    setSearchResults([]);

    setTimeout(() => {
      const mockResults: BusTrip[] = [
        { id: 1, departureTime: '08:00', arrivalTime: '12:00', company: 'Congo Express', price: 25, currency: 'USD' },
        { id: 2, departureTime: '09:30', arrivalTime: '13:30', company: 'Fleuve Congo', price: 22, currency: 'USD' },
        { id: 3, departureTime: '11:00', arrivalTime: '15:00', company: 'Rapide Trans', price: 28, currency: 'USD' },
      ];
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1500);
  };

  const handleBookClick = (trip: BusTrip) => {
    setSelectedTrip(trip);
  };

  const handleConfirmBooking = () => {
    if (!selectedTrip) return;
    alert(
      `Votre réservation a été confirmée !\n\n` +
      `Compagnie : ${selectedTrip.company}\n` +
      `Trajet : ${from} → ${to}\n` +
      `Date : ${date}\n` +
      `Passagers : ${passengers}`
    );
    setSelectedTrip(null);
  };

  const handleCancelBooking = () => {
    setSelectedTrip(null);
  };
  
  const isSearchDisabled = !from || !to;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>MBOKA Motuka</h1>
        <p style={styles.subtitle}>Votre compagnon de voyage au Congo</p>
      </header>

      <>
        <div style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="from" style={styles.label}>Départ</label>
            <select id="from" value={from} onChange={(e) => { setFrom(e.target.value); setTo(''); }} style={styles.input}>
              <option value="" disabled>Choisir une ville</option>
              {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="to" style={styles.label}>Destination</label>
            <select id="to" value={to} onChange={(e) => setTo(e.target.value)} style={styles.input} disabled={!from}>
              <option value="" disabled>Choisir une ville</option>
              {toCities.map(city => <option key={city} value={city}>{city}</option>)}
            </select>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="date" style={styles.label}>Date</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="passengers" style={styles.label}>Passagers</label>
            <input type="number" id="passengers" min="1" value={passengers} onChange={(e) => setPassengers(parseInt(e.target.value))} style={styles.input} />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.fullWidth}>
            <button onClick={handleSearch} style={{...styles.button, ...(isSearchDisabled ? styles.buttonDisabled : {})}} disabled={isSearchDisabled}>
              Rechercher des bus
            </button>
          </div>
        </div>
        <div style={styles.resultsContainer}>
          {isSearching && <Spinner />}
          {searchResults.length > 0 && (
            <>
              <h2 style={styles.resultsHeader}>Résultats pour {from} → {to}</h2>
              {searchResults.map(trip => (
                <div key={trip.id} style={styles.tripCard}>
                  <div style={styles.tripInfo}>
                    <div style={styles.tripTime}>{trip.departureTime} - {trip.arrivalTime}</div>
                    <div style={styles.tripCompany}>{trip.company}</div>
                  </div>
                  <div>
                    <span style={styles.tripPrice}>{trip.price} {trip.currency}</span>
                    <button style={styles.bookButton} onClick={() => handleBookClick(trip)}>Réserver</button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </>
       {selectedTrip && (
        <ConfirmationModal
          trip={selectedTrip}
          bookingDetails={{ from, to, date, passengers }}
          onConfirm={handleConfirmBooking}
          onCancel={handleCancelBooking}
        />
      )}
    </div>
  );
};

export default App;