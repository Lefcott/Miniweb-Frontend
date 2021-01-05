import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { getSessions } from '../../services/session';
import { setUser } from '../../actions/user';
import LoadingPage from '../LoadingPage';

import Background from './components/background';
import Title from './components/title';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const Configuration = props => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSessions().then(({ data }) => {
      setLoading(false);
      if (!data[0]) return;
      dispatch(setUser(data[0].user));
    });
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-container">
          <Background backgroundImage={props.backgroundImage} />
          <Title title={props.title} />
          {loading && <LoadingPage />}
          {!loading && (
            <>
              {user && <Dashboard />}
              {!user && <Login />}
            </>
          )}
          <style jsx>
            {`
              .Configuration {
                display: flex;
                flex-direction: column;
                height: 100%;
              }
            `}
          </style>
        </div>
      </header>
    </div>
  );
};

Configuration.propTypes = {
  backgroundImage: PropTypes.string,
  title: PropTypes.string
};
Configuration.defaultProps = {
  backgroundImage: '',
  title: ''
};

export default Configuration;
