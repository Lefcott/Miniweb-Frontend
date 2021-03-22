import PropTypes from 'prop-types';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Content from './Content';

const DashboardLayout = props => (
  <div className="dashboardLayout">
    <Navbar breadcrumbItems={props.breadcrumbItems} />
    <Sidebar />
    <Content>{props.children}</Content>
    <style jsx>
      {`
        .dashboardLayout {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: skyblue;
        }
      `}
    </style>
  </div>
);

DashboardLayout.propTypes = {
  children: PropTypes.any.isRequired,
  breadcrumbItems: PropTypes.object.isRequired
};

export default DashboardLayout;