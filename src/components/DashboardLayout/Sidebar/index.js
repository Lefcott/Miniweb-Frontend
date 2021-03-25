import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import MenuOpenRounded from '@material-ui/icons/MenuOpenRounded';
import MenuRounded from '@material-ui/icons/MenuRounded';
import SettingsRounded from '@material-ui/icons/SettingsRounded';
import BorderColorRounded from '@material-ui/icons/BorderColorRounded';

import { setSidebarWidth } from '../../../shared/actions/sidebarWidth';

import Button from './Button';
import { getLanguage } from './lang';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const language = getLanguage(useSelector(store => store.language));
  const sidebarWidth = open ? 200 : 50;

  const handleToggle = () => {
    setOpen(!open);
    if (open) sessionStorage.removeItem('sidebarOpen');
    else sessionStorage.setItem('sidebarOpen', 'true');
  };

  const handleRedirect = link => () => {
    window.location.href = link;
  };

  useEffect(() => {
    dispatch(setSidebarWidth(sidebarWidth));
  }, [sidebarWidth]);

  useEffect(() => {
    if (typeof window === 'object') {
      const newOpen = sessionStorage?.getItem('sidebarOpen') === 'true';
      setOpen(newOpen);
    }
  }, []);

  return (
    <div className={`sidebar${open ? ' sidebarOpen' : ''}`}>
      <Link href="/">
        <a>
          <img className="favicon" src="/favicon.png" />
        </a>
      </Link>
      <Button
        symbol={open ? <MenuOpenRounded /> : <MenuRounded />}
        text={language.options}
        showText={open}
        onClick={handleToggle}
      />
      <Link href="/configuration">
        <a>
          <Button symbol={<SettingsRounded />} text={language.basicConfig} showText={open} />
        </a>
      </Link>
      <Link href="/content_editor">
        <a>
          <Button symbol={<BorderColorRounded />} text={language.contentEditor} showText={open} />
        </a>
      </Link>
      <style jsx>
        {`
          .sidebar {
            position: absolute;
            left: 0;
            top: 0;
            width: ${sidebarWidth}px;
            height: 100%;
            border-top-right-radius: 14px;
            background-image: linear-gradient(to top, skyblue, #ebebeb);
            transition: 0.7s;
            z-index: 500;
          }
          .sidebarOpen {
            width: ${sidebarWidth}px;
          }
          .favicon {
            margin: 5px;
            width: 40px;
            transition: 0.7s;
          }
          .favicon:hover {
            transform: scale(1.1);
          }
          .favicon:active {
            transform: rotate(5deg) scale(1.2);
            transition: 0.1s;
          }
          @media only screen and (max-width: 768px) {
            .sidebarOpen {
              width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;
