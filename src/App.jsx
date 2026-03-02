import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import UploadResume from './pages/UploadResume'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
import AnalysisResult from './pages/AnalysisResult'
import ProtectedRoute from './components/ProtectedRoute'
import ResetPassword from './pages/ResetPassword'
import DashboardLayout from './layouts/DashboardLayout'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>

  {/* Public Routes */}
  <Route path='/' element={<Login />} />
  <Route path='/register' element={<SignUp />} />
  <Route path='/ForgotPassword' element={<ForgotPassword />} />
  <Route path='/ResetPassword/:userId/:token' element={<ResetPassword />} />

  {/* Protected Layout WITH SIDEBAR */}
  <Route
    element={
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    }
  >
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/upload' element={<UploadResume />} />
    <Route path='/analysis/:id' element={<AnalysisResult />} />
    <Route
      path='/history'
      element={<div className="p-6"><h1 className="text-2xl font-bold">History</h1></div>}
    />
  </Route>

  <Route path='*' element={<h1>404 Not Found</h1>} />

</Routes>
      </BrowserRouter>
    </>
  )
}

export default App
