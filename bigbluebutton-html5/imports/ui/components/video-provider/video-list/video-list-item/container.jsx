import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import VoiceUsers from '/imports/api/voice-users/';
import { Session } from 'meteor/session';
import VideoListItem from './component';

const VideoListItemContainer = props => (
  <VideoListItem {...props} />
);

export default withTracker((props) => {
  const {
    userId,
  } = props;

  return {
    voiceUser: VoiceUsers.findOne({ intId: userId }),
    streaming: Session.get('streaming'),
  };
})(VideoListItemContainer);
