import React, {useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import TabsElements from '../tabs-elements/tabs-elements';
import TabsSlider from '../tabs-slider/tabs-slider';
import {TabType, Viewport} from '../../const';
import {getViewport} from '../../store/page/selectors';

const TabsSection = () => {
  const viewportType = useSelector(getViewport);
  const [activeTab, setActiveTab] = useState(TabType.DEPOSIT);

  const onTabClick = useCallback((evt) => {
    const newTab = evt.currentTarget.id;
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    }
  }, [activeTab]);

  const isDesktop = viewportType === Viewport.DESKTOP;

  if (isDesktop) {
    return (
      <section className="tabs-section">
        <div className="tabs-section__container">
          {isDesktop &&
            <TabsElements activeTab={activeTab} onClick={onTabClick} viewportType={Viewport.DESKTOP} />
          }
        </div>
      </section>
    );
  }

  return <TabsSlider viewportType={viewportType}/>;
};

export default TabsSection;
