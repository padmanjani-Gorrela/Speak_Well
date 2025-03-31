import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Home1 from './home/Home1.jsx'

import Signup from './navbar/Signup.jsx'
import FeaturedTherapyServices from './home/FeaturedTherapyServices.jsx'
import SpeechTherapyScheduler from './navcomp/SpeechTherapyScheduler.jsx'
import ResourceLibrary from './navcomp/ResourceLibrary.jsx'
import SpeechTherapyPro from './navcomp/SpeechTherapyPro.jsx'
import CommunicationTools from './navcomp/CommunicationTools.jsx'
import HelpSupport from './navcomp/HelpSupport.jsx'
import SubscriptionPage from './navcomp/SubscriptionPlan.jsx'
import TherapyReviews from './navcomp/TherapyReviews.jsx'
import Navbar1 from './navbar/Navbar1.jsx'
import Homes from './home/Homes.jsx'
import Navbar from './navbar/Navbar.jsx'
import SpeechTherapyTracker from './navcomp/ProgressDashboard.jsx'
import './darkmode.css'
import Settings from './navcomp/Settings.jsx'
import UserProfilePage from './navcomp/UpdateProfile.jsx'
const Layout = ({ navbar, children }) => {
  return (
    <>
      {navbar}
      {children}
    </>
  );
};

const App = () => {
  return (
    <>
      <div className="app">

        <Routes>
        <Route path="/" element={<Layout navbar={<Navbar />}><Homes/></Layout>} />
        <Route path="/home" element={<Layout navbar={<Navbar1 />}><Home1/></Layout>} />
        <Route path = "/update" element={<UserProfilePage/>}/>
          <Route path="/signup" element={<Signup />} />
          <Route path='/therapyservices' element={<FeaturedTherapyServices />} />
          <Route path='/therapyscheduling' element={<SpeechTherapyScheduler />} />
          <Route path='/resourcelib' element={<ResourceLibrary />} />
          <Route path="/progress" element={<SpeechTherapyTracker />} />
          <Route path='/speech' element={<SpeechTherapyPro />} />
          <Route path='/communicate' element={<CommunicationTools />} />
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/help' element={<HelpSupport />} />
          <Route path='/subscribe' element={<SubscriptionPage />} />
          <Route path='/reviewrate' element={<TherapyReviews />} />
          
        </Routes>

      </div>


    </>
  )
}

export default App