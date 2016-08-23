package org.bigbluebutton.app.screenshare.red5;

import java.util.HashMap;
import java.util.Map;
import org.bigbluebutton.app.screenshare.events.*;
import com.google.gson.Gson;
import org.red5.logging.Red5LoggerFactory;
import org.slf4j.Logger;

public class EventListenerImp implements IEventListener {
  private static Logger log = Red5LoggerFactory.getLogger(EventListenerImp.class, "screenshare");
  private ConnectionInvokerService sender;
  
  @Override
  public void handleMessage(IEvent event) {
    if (event instanceof ScreenShareStartedEvent) {
      sendShareStartedEvent((ScreenShareStartedEvent) event);
    } else if (event instanceof ScreenShareStoppedEvent) {
      sendShareStoppedEvent((ScreenShareStoppedEvent) event);
    } else if (event instanceof ScreenSharePausedEvent) {
      sendSharePausedEvent((ScreenSharePausedEvent) event);
    } else if (event instanceof ScreenShareStartRequestSuccessResponse) {
      sendStartShareRequestResponse((ScreenShareStartRequestSuccessResponse) event);
    } else if (event instanceof ScreenShareStartRequestFailedResponse) {
      sendStartShareRequestFailedResponse((ScreenShareStartRequestFailedResponse) event);
    } else if (event instanceof IsScreenSharingResponse) {
        sendIsScreenSharingResponse((IsScreenSharingResponse) event);
    } else if (event instanceof ScreenShareClientPing) {
      sendScreenShareClientPing((ScreenShareClientPing) event);
    }

  }

  private void sendScreenShareClientPing(ScreenShareClientPing event) {
    Map<String, Object> data = new HashMap<String, Object>();
    data.put("meetingId", event.meetingId);
    data.put("session", event.session);
    data.put("timestamp", event.timestamp);

    Map<String, Object> message = new HashMap<String, Object>();
    Gson gson = new Gson();
    message.put("msg", gson.toJson(data));

    log.info("Sending ScreenShareClientPing to client, meetingId=" + event.meetingId + " userid=" + event.userId);
    DirectClientMessage msg = new DirectClientMessage(event.meetingId, event.userId, "screenShareClientPingMessage", message);
    sender.sendMessage(msg);
  }

  private void sendIsScreenSharingResponse(IsScreenSharingResponse event) {
      Map<String, Object> data = new HashMap<String, Object>();
      data.put("sharing", event.info.sharing);

      if (event.info.sharing) {
          data.put("streamId", event.info.streamId);
          data.put("width", event.info.width);
          data.put("height", event.info.height);
          data.put("url", event.info.url);
          data.put("session", event.info.session);
      }

      Map<String, Object> message = new HashMap<String, Object>();
      Gson gson = new Gson();
      message.put("msg", gson.toJson(data));

      log.info("Sending isSharingScreenRequestResponse to client, meetingId=" + event.meetingId + " userid=" + event.userId);
      DirectClientMessage msg = new DirectClientMessage(event.meetingId, event.userId, "isSharingScreenRequestResponse", message);
      sender.sendMessage(msg);
  }

  private void  sendStartShareRequestFailedResponse(ScreenShareStartRequestFailedResponse event) {
    Map<String, Object> data = new HashMap<String, Object>();

    data.put("reason", event.reason);

    Map<String, Object> message = new HashMap<String, Object>();
    Gson gson = new Gson();
    message.put("msg", gson.toJson(data));

    DirectClientMessage msg = new DirectClientMessage(event.meetingId, event.userId, "startShareRequestRejectedResponse", message);
    sender.sendMessage(msg);

    Map<String, Object> logData = new HashMap<String, Object>();
    logData.put("meetingId", event.meetingId);
    logData.put("userId", event.userId);
    logData.put("reason", event.reason);

    Gson gson2 = new Gson();
    String logStr =  gson2.toJson(logData);

    log.info("Start ScreenShare request rejected response: data={}", logStr);
  }

  private void  sendStartShareRequestResponse(ScreenShareStartRequestSuccessResponse event) {
    Map<String, Object> data = new HashMap<String, Object>();

    data.put("authToken", event.token);
    data.put("jnlp", event.jnlp);
    data.put("streamId", event.streamId);
    data.put("session", event.session);

    Map<String, Object> message = new HashMap<String, Object>();
    Gson gson = new Gson();
    message.put("msg", gson.toJson(data));

    DirectClientMessage msg = new DirectClientMessage(event.meetingId, event.userId, "startShareRequestResponse", message);
    sender.sendMessage(msg);

    Map<String, Object> logData = new HashMap<String, Object>();
    logData.put("meetingId", event.meetingId);
    logData.put("userId", event.userId);

    logData.put("authToken", event.token);
    logData.put("jnlp", event.jnlp);


    Gson gson2 = new Gson();
    String logStr =  gson2.toJson(logData);

    log.info("Start ScreenShare request response: data={}", logStr);
  }

  private void sendSharePausedEvent(ScreenSharePausedEvent event) {
    Map<String, Object> data = new HashMap<String, Object>();
    data.put("meetingId", event.meetingId);
    data.put("streamId", event.streamId);

    Map<String, Object> message = new HashMap<String, Object>();
    Gson gson = new Gson();
    message.put("msg", gson.toJson(data));

    BroadcastClientMessage msg = new BroadcastClientMessage(event.meetingId, "screenSharePausedMessage", message);
    sender.sendMessage(msg);

    Map<String, Object> logData = new HashMap<String, Object>();
    logData.put("meetingId", event.meetingId);
    logData.put("streamId", event.streamId);

    gson = new Gson();
    String logStr =  gson.toJson(logData);

    log.info("Screenshare paused message: data={}", logStr);
  }

  private void sendShareStartedEvent(ScreenShareStartedEvent event) {
    Map<String, Object> data = new HashMap<String, Object>();
    data.put("meetingId", event.meetingId);
    data.put("streamId", event.streamId);
    data.put("width", event.width);
    data.put("height", event.height);
    data.put("url", event.url);

    Map<String, Object> message = new HashMap<String, Object>();
    Gson gson = new Gson();
    message.put("msg", gson.toJson(data));
    
    BroadcastClientMessage msg = new BroadcastClientMessage(event.meetingId, "screenShareStartedMessage", message);
    sender.sendMessage(msg);

    Map<String, Object> logData = new HashMap<String, Object>();
    logData.put("meetingId", event.meetingId);
    logData.put("streamId", event.streamId);

    gson = new Gson();
    String logStr =  gson.toJson(logData);

    log.info("Screenshare started message: data={}", logStr);
  }
  
  private void sendShareStoppedEvent(ScreenShareStoppedEvent event) {
    Map<String, Object> data = new HashMap<String, Object>();
    data.put("meetingId", event.meetingId);
    data.put("session", event.session);

    Map<String, Object> message = new HashMap<String, Object>(); 
    Gson gson = new Gson();
    message.put("msg", gson.toJson(data));
    
    BroadcastClientMessage msg = new BroadcastClientMessage(event.meetingId, "screenShareStoppedMessage", message);
    sender.sendMessage(msg);

    Map<String, Object> logData = new HashMap<String, Object>();
    logData.put("meetingId", event.meetingId);

    gson = new Gson();
    String logStr =  gson.toJson(logData);

    log.info("Screenshare stopped message: data={}", logStr);

  }
  

  public void setMessageSender(ConnectionInvokerService sender) {
    this.sender = sender;
  }

}
