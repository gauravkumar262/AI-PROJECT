
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// The Index page now just redirects to Dashboard
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/');
  }, [navigate]);
  
  return null;
};

export default Index;
