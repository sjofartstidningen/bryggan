import React, {
  createContext,
  Reducer,
  useReducer,
  Dispatch,
  useContext,
  useEffect,
  useMemo,
} from 'react';

export enum MenuState {
  open = 'open',
  closed = 'closed',
}

interface MenuManagerState {
  [key: string]: MenuState | undefined;
}

enum MenuActionType {
  open = 'open',
  close = 'close',
  toggle = 'toggle',
  register = 'register',
  unregister = 'unregister',
}

type MenuManagerAction =
  | { type: MenuActionType.open; key: string }
  | { type: MenuActionType.close; key: string }
  | { type: MenuActionType.toggle; key: string }
  | { type: MenuActionType.register; key: string; initialState?: MenuState }
  | { type: MenuActionType.unregister; key: string };

const reducer: Reducer<MenuManagerState, MenuManagerAction> = (
  state,
  action,
) => {
  const hasMenu = state[action.key] !== undefined;

  switch (action.type) {
    case MenuActionType.open:
      if (!hasMenu) return state;
      return {
        ...state,
        [action.key]: MenuState.open,
      };

    case MenuActionType.close:
      if (!hasMenu) return state;
      return {
        ...state,
        [action.key]: MenuState.closed,
      };

    case MenuActionType.toggle:
      if (!hasMenu) return state;
      const currentState = state[action.key];
      return {
        ...state,
        [action.key]:
          currentState === MenuState.open ? MenuState.closed : MenuState.open,
      };

    case MenuActionType.register:
      if (hasMenu) return state;
      return {
        ...state,
        [action.key]: action.initialState || MenuState.closed,
      };

    case MenuActionType.unregister:
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

export const useMenuControls = (key: string): Omit<Menu, 'state' | 'show'> => {
  const dispatch = useContext(MenuManagerDispatchContext);
  return useMemo(
    () => ({
      open: () => dispatch({ type: MenuActionType.open, key }),
      close: () => dispatch({ type: MenuActionType.close, key }),
      toggle: () => dispatch({ type: MenuActionType.toggle, key }),
      register: () => dispatch({ type: MenuActionType.register, key }),
      unregister: () => dispatch({ type: MenuActionType.unregister, key }),
    }),
    [dispatch, key],
  );
};

export const useMenu = (key: string, register?: boolean): Menu => {
  const state = useContext(MenuManagerContext);
  const controls = useMenuControls(key);

  const menu = state[key];

  useEffect(() => {
    if (register) controls.register();
  }, [register, controls]);

  return useMemo(
    () => ({
      state: menu,
      show: menu === MenuState.open,
      ...controls,
    }),
    [menu, controls],
  );
};
