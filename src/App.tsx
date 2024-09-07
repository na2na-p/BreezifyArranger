import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthMain } from '@/pages/auth/top';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthMain />} />
      </Routes>
    </BrowserRouter>
  );
};
