import React from 'react';
import NaveBar from "../NaveBar/NaveBar";
import Footer from "../Footer/Footer";

const PaymentDetailsR = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)' }}>
      <NaveBar />
      
      <main style={{ flex: 1, padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '1rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Payment Details</h1>
          <p style={{ color: '#64748b', fontSize: '1.1rem', fontWeight: 500 }}>Track your hostel fees, semester payments, and transaction history.</p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)', borderRadius: '32px', padding: '3rem', boxShadow: '0 20px 50px rgba(37,99,235,0.1)', border: '1px solid rgba(255,255,255,0.5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', marginBottom: '0.5rem' }}>Current Semester Balance</h2>
              <p style={{ color: '#64748b', fontSize: '1rem' }}>Semester 1, 2024 · All-inclusive hostel fee</p>
            </div>
            <div style={{ padding: '0.6rem 1.5rem', background: '#ecfdf5', color: '#059669', borderRadius: '100px', fontSize: '0.9rem', fontWeight: 800, border: '1px solid #10b98133', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></span>
              PAID IN FULL
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {[
              { label: 'Room Rent', value: 'LKR 45,000.00', icon: '🏠', color: '#3b82f6' },
              { label: 'Electricity/Water', value: 'LKR 8,500.00', icon: '⚡', color: '#f59e0b' },
              { label: 'Maintenance Fee', value: 'LKR 2,500.00', icon: '🛠️', color: '#8b5cf6' },
              { label: 'Total Amount', value: 'LKR 56,000.00', icon: '💰', color: '#1e40af', highlight: true },
            ].map((item) => (
              <div key={item.label} style={{ padding: '2rem', background: item.highlight ? 'linear-gradient(135deg, #1e40af, #3b82f6)' : '#ffffff', borderRadius: '24px', border: item.highlight ? 'none' : '1px solid #f1f5f9', boxShadow: item.highlight ? '0 10px 25px rgba(37,99,235,0.3)' : '0 4px 12px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: item.highlight ? 'rgba(255,255,255,0.2)' : `${item.color}15`, color: item.highlight ? '#ffffff' : item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '1.25rem' }}>{item.icon}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: item.highlight ? 'rgba(255,255,255,0.8)' : '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{item.label}</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: item.highlight ? '#ffffff' : '#0f172a' }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '2px solid #f1f5f9', paddingTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1e293b' }}>Payment History</h3>
              <button style={{ background: 'transparent', border: 'none', color: '#3b82f6', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Download All Invoices
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </button>
            </div>
            <div style={{ overflowX: 'auto', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
               <table style={{ width: '100%', borderCollapse: 'collapse', background: '#ffffff' }}>
                  <thead>
                    <tr style={{ textAlign: 'left', background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                      <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>TRANSACTION ID</th>
                      <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>DATE</th>
                      <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>TYPE</th>
                      <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>AMOUNT</th>
                      <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>STATUS</th>
                      <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: '#475569' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'TXN-98231', date: '12 Jan 2024', type: 'Semester Fee', amount: 'LKR 56,000.00', status: 'Success' },
                      { id: 'TXN-97102', date: '15 Aug 2023', type: 'Semester Fee', amount: 'LKR 52,000.00', status: 'Success' },
                    ].map((row) => (
                      <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f8faff'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#1e293b' }}>{row.id}</td>
                        <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.9rem', color: '#64748b' }}>{row.date}</td>
                        <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.9rem', color: '#64748b' }}>{row.type}</td>
                        <td style={{ padding: '1.25rem 1.5rem', fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{row.amount}</td>
                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', background: '#f0fdf4', color: '#166534', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
                            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                            {row.status}
                          </span>
                        </td>
                        <td style={{ padding: '1.25rem 1.5rem' }}>
                          <button style={{ padding: '0.5rem', color: '#64748b', background: 'transparent', border: '1px solid #e2e8f0', borderRadius: '8px', cursor: 'pointer' }}>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentDetailsR;
