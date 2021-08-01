import React from 'react';

const Footer = () => {
  const date = new Date().getFullYear()

  return (
    <footer>
      <h2>&copy; {date} myBid - <a href="https://github.com/PrimalOrB">Andrew Ogilvie</a>,  <a href="https://github.com/JonWaaler">Jon Waaler</a>, <a href="https://github.com/JessicaJeyanthiran">Jessica Jeyanthiran</a>, <a href="https://github.com/JohnnyMatharu">Johny Matharu</a>, and <a href="https://github.com/JeffGrant274">Jeff Grant</a></h2>
    </footer>
  );
};

export default Footer;
