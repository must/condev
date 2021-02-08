import { createContext, useContext } from 'react';

export type MasterType = {
    current: string;
    setCurrent: (current: string) => void;
}

export const MasterContext = createContext<MasterType>({
  current: '',
  setCurrent: () => console.warn('No content provider was provided')});

export const useMasterContext = () => useContext(MasterContext);
