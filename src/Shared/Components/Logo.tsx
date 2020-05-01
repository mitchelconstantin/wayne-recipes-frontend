import React from 'react';
import logo from './logo.svg';
import { Link } from 'react-router-dom';

interface Props {
  className: string;
}
export const Logo = ({ className }: Props) => {
  return (
    <Link to={'/all'}>
      <img className={className} src={logo} alt={'Logo'} />
    </Link>
  );
};
