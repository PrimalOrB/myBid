import React from 'react';

const Footer = () => {
  const date = new Date().getFullYear()

  return (
    <footer>
      <h2>&copy; {date} myBid - Andrew Ogilvie, Jon Waaler, Jessica Jeyanthiran, Johny Matharu, and Jeff Grant</h2>
    </footer>
  );
};

export default Footer;
