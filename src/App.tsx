import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';
import Layout from './components/layout/Layout';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoadingScreen from './components/common/LoadingScreen';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Suspense fallback={<LoadingScreen />}>
              <Layout>
                <AppRoutes />
              </Layout>
            </Suspense>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;