import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Tabs from '../tabs/tabs';
import TabContent from '../tab-content/tab-content';

const TabsElements = (props) => {
  const {activeTab, onClick, viewportType} = props;

  return (
    <Fragment>
      <Tabs activeTab={activeTab} onClick={onClick} />

      <TabContent tabName={activeTab} viewportType={viewportType} />
    </Fragment>
  );
};

TabsElements.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  viewportType: PropTypes.string.isRequired,
};

export default TabsElements;
