import React from 'react';
import { useNavigate } from 'react-router-dom';

function Account({ title, amount, description }) {

  const navigate = useNavigate();

  // Fonction appelée lors du clic sur le bouton
  const handleViewTransactions = () => {
    navigate('/transactions');
  };

  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">${amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button" onClick={handleViewTransactions}>View transactions</button>
      </div>
    </section>
  );
}

export default Account;
