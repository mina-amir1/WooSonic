import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Define the expected attributes for HTML elements
      // Example: 
      // 'button': React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
      [elementName: string]: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
