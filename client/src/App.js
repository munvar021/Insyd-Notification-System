import React from 'react';
import './App.css';
import NotificationList from './components/NotificationList/notificationList';
import EventTrigger from './components/EventTrigger/eventTrigger';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Insyd Notification System POC</h1>
      </header>
      <main>
        <EventTrigger />
        <NotificationList />
      </main>
    </div>
  );
}

export default App;
