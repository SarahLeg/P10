import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux/userSlice';
import Account from '../components/account';
import '../styles/main.css';

function Accounts() {
  const user = useSelector(selectUser);  // Assurez-vous que `selectUser` est correctement importé

  if (!user) {
    return <div>Loading...</div>;  // Affiche un message ou un loader si l'utilisateur est null
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />
          {user.firstName} {user.lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>

      <h2 className="sr-only">Accounts</h2>

      {/* Affichage dynamique des comptes */}
      {user.accounts.map((account, index) => (
        <Account
          key={index}
          title={account.title}  // Titre du compte (checking, savings, etc.)
          amount={account.amount}  // Montant du solde
          description={account.description}  // Description (solde disponible, balance actuelle)
        />
      ))}
    </main>
  );
}

export default Accounts;