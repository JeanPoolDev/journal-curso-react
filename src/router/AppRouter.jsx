import { Navigate, Route, Routes } from "react-router";
import { AuthRouter } from "../auth/router/AuthRouter";
import { JournalRouter } from "../journal/router/JournalRouter";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { useAuth } from "../hooks/useAuth";


export function AppRouter() {

  const status = useAuth();

  if (status === 'checking') {
    return <CheckingAuth />
  }

  return (
    <Routes>

      {
        (status === 'authenticated')
          ? <Route path="/*" element={<JournalRouter />} />
          : <Route path="/auth/*" element={<AuthRouter />} />
      }

      <Route path="/*" element={<Navigate to={'auth/login'} />} />

      {/* Login and Logout */}
      {/* <Route path="/auth/*" element={<AuthRouter />} /> */}

      {/* Journal */}
      {/* <Route path="/*" element={<JournalRouter />} /> */}

    </Routes>
  );
};

