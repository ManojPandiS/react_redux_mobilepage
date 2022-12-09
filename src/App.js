import { Provider } from 'react-redux';
import HomePage from './pages/HomePage';
import './styles/styles.css'
import store from './redux/store';


function App() {
  return (
    <Provider store={ store }>
      <div className="App">
        <HomePage/>
      </div>
    </Provider>
  );
}

export default App;

