import { createContext, useContext } from 'react';
import { Game } from './Game';

export const StoreContext = createContext<Game>(new Game());

export const StoreProvider = StoreContext.Provider;

export const useStore = (): Game => useContext(StoreContext);
