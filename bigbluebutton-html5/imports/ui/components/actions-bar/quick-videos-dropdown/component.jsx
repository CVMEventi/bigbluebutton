import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, intlShape } from 'react-intl';
import _ from 'lodash';
import { makeCall } from '/imports/ui/services/api';
import Button from '/imports/ui/components/button/component';
import Dropdown from '/imports/ui/components/dropdown/component';
import DropdownTrigger from '/imports/ui/components/dropdown/trigger/component';
import DropdownContent from '/imports/ui/components/dropdown/content/component';
import DropdownList from '/imports/ui/components/dropdown/list/component';
import DropdownListItem from '/imports/ui/components/dropdown/list/item/component';
import { styles } from '../styles';

const intlMessages = defineMessages({
  startExternalVideoLabel: {
    id: 'app.actionsBar.actionsDropdown.shareExternalVideo',
    description: 'Start sharing external video button',
  },
});

const propTypes = {
  intl: intlShape.isRequired,
  parseCurrentSlideContent: PropTypes.func.isRequired,
  amIPresenter: PropTypes.bool.isRequired,
};

const handleClickQuickVideo = (videoUrl) => {
  makeCall('startWatchingExternalVideo', { externalVideoUrl: videoUrl });
};

const getAvailableVideoPolls = (slideId, parsedUrls) => parsedUrls.map(parsedUrl => (
  <DropdownListItem
    label={parsedUrl}
    key={_.uniqueId('quick-video-item')}
    onClick={() => handleClickQuickVideo(parsedUrl)}
  />
));

const QuickVideoDropdown = (props) => {
  const { amIPresenter, intl, parseCurrentSlideContent } = props;
  const parsedSlide = parseCurrentSlideContent();

  const { slideId, videoUrls } = parsedSlide;

  return amIPresenter && videoUrls && videoUrls.length ? (
    <Dropdown>
      <DropdownTrigger tabIndex={0}>
        <Button
          aria-label={intl.formatMessage(intlMessages.startExternalVideoLabel)}
          circle
          className={styles.button}
          color="primary"
          hideLabel
          icon="video"
          label={intl.formatMessage(intlMessages.startExternalVideoLabel)}
          onClick={() => null}
          size="lg"
        />
      </DropdownTrigger>
      <DropdownContent placement="top left">
        <DropdownList>
          {getAvailableVideoPolls(slideId, videoUrls)}
        </DropdownList>
      </DropdownContent>
    </Dropdown>
  ) : null;
};

QuickVideoDropdown.propTypes = propTypes;

export default QuickVideoDropdown;
