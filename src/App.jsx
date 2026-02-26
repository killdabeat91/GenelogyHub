import { useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import { Layout } from './components/Layout'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { FamilyTree } from './pages/FamilyTree'
import { Members } from './pages/Members'
import { Events } from './pages/Events'
import { Fund } from './pages/Fund'
import { Library } from './pages/Library'
import { BranchMap } from './pages/BranchMap'
import { AuditLog } from './pages/AuditLog'
import { Settings } from './pages/Settings'
import { MemberProfile } from './pages/MemberProfile'
import { AdvancedSearch } from './pages/AdvancedSearch'
import './App.css'

function App() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedMember, setSelectedMember] = useState(null);

  // Show Login if not authenticated
  if (!user) {
    return <Login />;
  }

  const handleViewProfile = (member) => {
    setSelectedMember(member);
    setActiveTab('profile');
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'tree': return <FamilyTree />;
      case 'members': return <Members onViewProfile={handleViewProfile} />;
      case 'events': return <Events />;
      case 'fund': return <Fund />;
      case 'library': return <Library />;
      case 'map': return <BranchMap />;
      case 'audit': return <AuditLog />;
      case 'settings': return <Settings />;
      case 'search': return <AdvancedSearch />;
      case 'profile': return (
        <MemberProfile
          member={selectedMember}
          onBack={() => setActiveTab('members')}
        />
      );
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderPage()}
    </Layout>
  );
}

export default App
