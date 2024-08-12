import { useContext } from 'react';
import { UserContext, AppContextType } from './context';

const useAppContext = (): AppContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
}


export {useAppContext}