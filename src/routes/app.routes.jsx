import { Routes, Route, Navigate } from 'react-router-dom';

import { NewNote } from '../pages/NewNote';
import { Home } from '../pages/Home';
import { Profile } from '../pages/Profile/Index';
import { Details } from '../pages/Details';

export function AppRoutes() {
  return(
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/newnote' element={<NewNote />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/details/:id' element={<Details />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}