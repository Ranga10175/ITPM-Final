import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { QrCode, Phone, MapPin, ShieldCheck, User, Info } from 'lucide-react';

const ResidentIDCard = ({ student, roomInfo }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardData = {
    name: student?.fullName || 'Full Name',
    itNumber: student?.itNumber || 'IT00000000',
    department: student?.department || 'Faculty of Computing',
    room: roomInfo || 'Not Assigned',
    photo: student?.profilePhoto || null,
    emergency: student?.phone || 'N/A'
  };

  const qrData = JSON.stringify({
    id: cardData.itNumber,
    name: cardData.name,
    room: cardData.room,
    status: 'Active Resident'
  });

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(qrData)}&bgcolor=ffffff&color=1e293b&margin=10`;

  return (
    <div style={idStyles.container}>
      <div style={idStyles.instruction}>
        <Info size={16} /> Click the card to flip and view the QR Code
      </div>
      
      <div style={idStyles.scene} onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          style={idStyles.card}
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ ...idStyles.card, transformStyle: 'preserve-3d' }}
        >
          {/* FRONT SIDE */}
          <div style={{ ...idStyles.cardSide, ...idStyles.cardFront, backfaceVisibility: 'hidden' }}>
            <div style={idStyles.cardHeader}>
              <div style={idStyles.brandGroup}>
                <div style={idStyles.logoCircle}>
                  <ShieldCheck size={20} color="#fff" />
                </div>
                <div>
                  <h3 style={idStyles.brandTitle}>UniStay</h3>
                  <span style={idStyles.brandSub}>Resident Identity</span>
                </div>
              </div>
              <div style={idStyles.activeBadge}>
                <span style={idStyles.pulse}></span> Live Resident
              </div>
            </div>

            <div style={idStyles.cardBody}>
              <div style={idStyles.photoContainer}>
                {cardData.photo ? (
                  <img src={`http://localhost:5000/${cardData.photo}`} alt="Profile" style={idStyles.profileImg} />
                ) : (
                  <div style={idStyles.photoPlaceholder}>
                    <User size={48} color="rgba(255,255,255,0.2)" />
                  </div>
                )}
                <div style={idStyles.photoGlow}></div>
              </div>

              <div style={idStyles.detailsContainer}>
                <h2 style={idStyles.studentName}>{cardData.name}</h2>
                <div style={idStyles.idRow}>
                  <span style={idStyles.label}>IT NUMBER</span>
                  <span style={idStyles.value}>{cardData.itNumber}</span>
                </div>
                <div style={idStyles.idRow}>
                  <span style={idStyles.label}>ROOM</span>
                  <span style={idStyles.value}>{cardData.room}</span>
                </div>
                <div style={idStyles.idRow}>
                  <span style={idStyles.label}>FACULTY</span>
                  <span style={{...idStyles.value, fontSize: '0.75rem'}}>{cardData.department}</span>
                </div>
              </div>
            </div>

            <div style={idStyles.cardFooter}>
              <div style={idStyles.footerItem}>
                <MapPin size={12} /> Malabe Campus
              </div>
              <div style={idStyles.validDate}>Valid: 2024 Semester 1</div>
            </div>
            
            <div style={idStyles.hologram}></div>
          </div>

          {/* BACK SIDE */}
          <div style={{ 
            ...idStyles.cardSide, 
            ...idStyles.cardBack, 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            top: 0,
            left: 0
          }}>
            <div style={idStyles.backContent}>
              <div style={idStyles.qrTitle}>GATE PASS VERIFICATION</div>
              <div style={idStyles.qrWrapper}>
                <img src={qrCodeUrl} alt="QR Code" style={idStyles.qrImage} />
                <div style={idStyles.qrCornerTL}></div>
                <div style={idStyles.qrCornerBR}></div>
              </div>
              <p style={idStyles.qrHint}>Scan at the main entrance or dining hall for resident verification</p>
              
              <div style={idStyles.contactBox}>
                <div style={idStyles.contactItem}>
                  <Phone size={14} /> 
                  <span>Emergency: {cardData.emergency}</span>
                </div>
                <div style={idStyles.contactItem}>
                  <ShieldCheck size={14} /> 
                  <span>Security: 011-234-5678</span>
                </div>
              </div>

              <div style={idStyles.backFooter}>
                This card is non-transferable and remains the property of UniStay Hostel Management.
              </div>
            </div>
            <div style={idStyles.backPattern}></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const idStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
  },
  instruction: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#94a3b8',
    fontSize: '0.85rem',
    background: 'rgba(255,255,255,0.05)',
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  scene: {
    width: '340px',
    height: '480px',
    perspective: '1000px',
    cursor: 'pointer',
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  cardSide: {
    width: '100%',
    height: '100%',
    borderRadius: '24px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  cardFront: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    position: 'relative',
  },
  cardBack: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
  },
  brandGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)',
  },
  brandTitle: {
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: 800,
    margin: 0,
    fontFamily: "'Syne', sans-serif",
  },
  brandSub: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.65rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  activeBadge: {
    background: 'rgba(16, 185, 129, 0.1)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    color: '#10b981',
    fontSize: '0.7rem',
    fontWeight: 700,
    padding: '4px 10px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  pulse: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#10b981',
    boxShadow: '0 0 0 rgba(16, 185, 129, 0.4)',
    animation: 'pulse 2s infinite',
  },
  cardBody: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  photoContainer: {
    position: 'relative',
    width: '140px',
    height: '140px',
    marginBottom: '24px',
  },
  profileImg: {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    objectFit: 'cover',
    border: '3px solid rgba(255,255,255,0.1)',
    zIndex: 2,
    position: 'relative',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: '20px',
    background: 'rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed rgba(255,255,255,0.1)',
  },
  photoGlow: {
    position: 'absolute',
    top: '-10px',
    left: '-10px',
    right: '-10px',
    bottom: '-10px',
    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
    zIndex: 1,
  },
  studentName: {
    color: '#fff',
    fontSize: '1.4rem',
    fontWeight: 700,
    marginBottom: '20px',
    fontFamily: "'Syne', sans-serif",
  },
  detailsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  idRow: {
    display: 'flex',
    justifyContent: 'space-between',
    background: 'rgba(255,255,255,0.03)',
    padding: '8px 12px',
    borderRadius: '12px',
  },
  label: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '0.65rem',
    fontWeight: 700,
  },
  value: {
    color: '#e2e8f0',
    fontSize: '0.85rem',
    fontWeight: 600,
  },
  cardFooter: {
    marginTop: 'auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '16px',
  },
  footerItem: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  validDate: {
    color: '#3b82f6',
    fontSize: '0.75rem',
    fontWeight: 700,
  },
  hologram: {
    position: 'absolute',
    bottom: '-30px',
    right: '-30px',
    width: '100px',
    height: '100px',
    background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
    borderRadius: '50%',
  },
  backContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    zIndex: 2,
  },
  qrTitle: {
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 800,
    letterSpacing: '2px',
    marginBottom: '30px',
  },
  qrWrapper: {
    background: '#fff',
    padding: '12px',
    borderRadius: '16px',
    position: 'relative',
    marginBottom: '20px',
    boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
  },
  qrImage: {
    width: '160px',
    height: '160px',
  },
  qrCornerTL: {
    position: 'absolute',
    top: '-8px',
    left: '-8px',
    width: '24px',
    height: '24px',
    borderTop: '3px solid #3b82f6',
    borderLeft: '3px solid #3b82f6',
    borderRadius: '4px 0 0 0',
  },
  qrCornerBR: {
    position: 'absolute',
    bottom: '-8px',
    right: '-8px',
    width: '24px',
    height: '24px',
    borderBottom: '3px solid #3b82f6',
    borderRight: '3px solid #3b82f6',
    borderRadius: '0 0 4px 0',
  },
  qrHint: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.75rem',
    textAlign: 'center',
    lineHeight: 1.5,
    maxWidth: '200px',
    marginBottom: 'auto',
  },
  contactBox: {
    width: '100%',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '16px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#cbd5e1',
    fontSize: '0.8rem',
  },
  backFooter: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: '0.6rem',
    textAlign: 'center',
    lineHeight: 1.4,
  },
  backPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
    backgroundSize: '24px 24px',
    zIndex: 1,
  }
};

export default ResidentIDCard;
