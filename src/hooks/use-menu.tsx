import React, {
  createContext,
  Reducer,
  useReducer,
  Dispatch,
  useContext,
  useEffect,
} from 'react';

export enum MenuState {
  open = 'open',
  closed = 'closed',
}

interface MenuManagerState {
  [key: string]: MenuState | undefined;
}

type MenuManagerAction =
  | { type: 'open'; key: string }
  | { type: 'close'; key: string }
  | { type: 'toggle'; key: string }
  | { type: 'register'; key: string; initialState?: MenuState }
  | { type: 'unregister'; key: string };

const reducer: Reducer<MenuManagerState, MenuManagerAction> = (
  state,
  action,
) => {
  const hasMenu = state[action.key] !== undefined;

  switch (action.type) {
    case 'open':
      if (!hasMenu) return state;
      return {
        ...state,
        [action.key]: MenuState.open,
      };

    case 'close':
      if (!hasMenu) return state;
      return {
        ...state,
        [action.key]: MenuState.closed,
      };

    case 'toggle':
      if (!hasMenu) return state;
      const currentState = state[action.key];
      return {
        ...state,
        [action.key]:
          currentState === MenuState.open ? MenuState.closed : MenuState.open,
      };

    case 'register':
      if (hasMenu) return state;
      return {
        ...state,
        [action.key]: action.initialState || MenuState.closed,
      };

    case 'unregister':
      if (!hasMenu) return state;
      return {
        ...state,
        [action.key]: undefined,
      };

    default:
      return state;
  }
};

const initState = (initialMenus: string[]): MenuManagerState => {
  return initialMenus.reduce(
    (state, key) => ({
      ...state,
      [key]: MenuState.closed,
    }),
    {} as MenuManagerState,
  );
};

interface MenuManagerProps {
  initialMenus?: string[];
}

const MenuManagerContext = createContext<MenuManagerState>({});
const MenuManagerDispatchContext = createContext<Dispatch<MenuManagerAction>>(
  () => {},
);

export const MenuManager: React.FC<MenuManagerProps> = ({
  initialMenus = [],
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialMenus, initState);
  return (
    <MenuManagerDispatchContext.Provider value={dispatch}>
      <MenuManagerContext.Provider value={state}>
        {children}
      </MenuManagerContext.Provider>
    </MenuManagerDispatchContext.Provider>
  );
};

interface Menu {
  state: MenuState | undefined;
  show: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  register: () => void;
  unregister: () => void;
}

export const useMenu = (key: string, register?: boolean): Menu => {
  const state = useContext(MenuManagerContext);
  const dispatch = useContext(MenuManagerDispatchContext);

  const menu = state[key];

  useEffect(() => {
    if (register) dispatch({ type: 'register', key });
  }, [key, register, dispatch]);

  return {
    state: menu,
    show: menu === MenuState.open,
    open: () => dispatch({ type: 'open', key }),
    close: () => dispatch({ type: 'close', key }),
    toggle: () => dispatch({ type: 'toggle', key }),
    register: () => dispatch({ type: 'register', key }),
    unregister: () => dispatch({ type: 'unregister', key }),
  };
};
