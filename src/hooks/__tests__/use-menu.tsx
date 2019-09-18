import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MenuManager, useMenu } from '../use-menu';

it('should control the state of a menu with context', async () => {
  const Menu = () => {
    const menu = useMenu('context', true);

    if (!menu.show) return null;
    return <p>Menu open</p>;
  };

  const ToggleMenu = () => {
    const menu = useMenu('context');
    return <button onClick={menu.toggle}>Toggle menu</button>;
  };

  const { findByText } = render(
    <MenuManager>
      <Menu />
      <ToggleMenu />
    </MenuManager>,
  );

  const btn = await findByText(/toggle menu/i);
  fireEvent.click(btn);

  const menu = await findByText(/menu open/i);
  expect(menu).toBeInTheDocument();
});

it('should accept initial menus as convinience', async () => {
  const Menu = () => {
    /**
     * Since it's already registered on initial render of <MenuManager /> we
     * don't have to "bother" with registering it here.
     */
    const menu = useMenu('context');

    if (!menu.show) return null;
    return <p>Menu open</p>;
  };

  const ToggleMenu = () => {
    const menu = useMenu('context');
    return <button onClick={menu.toggle}>Toggle menu</button>;
  };

  const { findByText } = render(
    <MenuManager initialMenus={['context']}>
      <Menu />
      <ToggleMenu />
    </MenuManager>,
  );

  const btn = await findByText(/toggle menu/i);
  fireEvent.click(btn);

  const menu = await findByText(/menu open/i);
  expect(menu).toBeInTheDocument();
});
