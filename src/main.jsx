import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './context/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>
);
