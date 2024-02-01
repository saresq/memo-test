import React from 'react';
import './main-menu-button.css';
import Link from 'next/link';

interface MainMenuButtonProps {

}

/**
 * Primary UI component for user interaction
 */
export const MainMenuButton = ({
}: MainMenuButtonProps) => {
  return (
    <Link href="/" className="hover:underline text-white">
      &#x3c; Return to Main Menu
    </Link>
  );
};
