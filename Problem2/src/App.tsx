import { SnackbarProvider } from 'notistack';
import ExchangePage from './pages/ExchangePage';

function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'top',
      }}
      maxSnack={3}>
      <ExchangePage />
    </SnackbarProvider>
  );
}

export default App;
