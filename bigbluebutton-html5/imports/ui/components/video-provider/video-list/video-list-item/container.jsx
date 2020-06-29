import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import VoiceUsers from '/imports/api/voice-users/';
import VideoListItem from './component';
import { Session } from 'meteor/session';

const VideoListItemContainer = props => (
  <VideoListItem {...props} />
);

export default withTracker((props) => {
  const {
    user,
  } = props;

  return {
    voiceUser: VoiceUsers.findOne({ intId: user.userId }),
    streaming: Session.get('streaming'),
  };
})(VideoListItemContainer);
