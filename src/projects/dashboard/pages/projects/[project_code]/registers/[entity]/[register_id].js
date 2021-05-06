import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FieldRenderer from '../../../../../../../components/FieldRenderer';
import DashboardLayout from '../../../../../../../components/DashboardLayout';
import EnsureLoggedIn from '../../../../../../../components/EnsureLoggedIn';
import LoadingPage2 from '../../../../../../../components/LoadingPage2';
import useDashboardConfiguration from '../../../../../hooks/useDashboardConfiguration';
import SectionButton from '../../../../../components/SectionButton';
import BackButton from '../../../../../components/BackButton';
import RegisterList from '../../../../../components/RegisterList';
import { removeOneSlashToUrl } from '../../../../../../../utils/url';
import { updateProjectConfigurationSection } from '../../../../../../../services/api/project';
import { getClientModels } from '../../../../../../../services/api/user';
import { setProject } from '../../../../../../../shared/actions/project';
import usePushAlert from '../../../../../../../shared/hooks/usePushAlert';
import { getLanguage } from '../../lang';
import { showClientModel } from '../../../../../../../services/api/clientModel';

export const getServerSideProps = ({ query }) => {
  const { entity, register_id } = query;

  return { props: { entity, register_id } };
};

const EditRegister = props => {
  const { entity, register_id } = props;
  const dashboardConfiguration = useDashboardConfiguration();
  const dispatch = useDispatch();
  const pushAlert = usePushAlert();
  const project = useSelector(store => store.dashboardProject);
  const language = getLanguage(useSelector(store => store.language));
  const projectLink = `/projects/${encodeURIComponent(project?.code)}`;
  const [clientDocument, setClientDocument] = useState({});
  const [clientModel, setClientModel] = useState(null);
  const [selectedClientModel, setSelectedClientModel] = useState(null);

  const handlePartialChange = newData => {
    console.log('newData', newData);
  };
  const handleUpdateDocument = newData => {
    console.log('newData', newData);
  };

  useEffect(() => {
    if (!project) return;
    showClientModel(project, entity).then(({ data: givenClientModel }) => {
      setClientModel(givenClientModel);
    });
  }, [project]);

  return (
    <EnsureLoggedIn Loading={LoadingPage2}>
      <DashboardLayout
        breadcrumbItems={dashboardConfiguration.breadcrumbItems}
        sidebarButtons={dashboardConfiguration.sidebarButtons}
        backTitle={`${project ? `${language.project} ${project?.name}: ` : ''}${language.registers}`}
        backHref={typeof window === 'object' ? removeOneSlashToUrl(window.location.href) : ''}
      >
        {project && clientModel && (
          <>
            <FieldRenderer
              formCode={clientModel.entity}
              fields={clientModel.fields}
              data={clientDocument}
              onChange={handleUpdateDocument}
              onPartialChange={handlePartialChange}
              saveButton
            />
          </>
        )}
      </DashboardLayout>
    </EnsureLoggedIn>
  );
};

EditRegister.propTypes = {
  entity: PropTypes.string.isRequired,
  register_id: PropTypes.string.isRequired
};

export default EditRegister;
