import React from 'react';
import moment from 'moment';

const Footer = () => {
  const year = moment().get('year');
  return (
    <div className="bg-dark py-3 text-center">
      <span className="text-light">
        Copyright © {year}
      </span>
    </div>
  );
};

export default Footer;
