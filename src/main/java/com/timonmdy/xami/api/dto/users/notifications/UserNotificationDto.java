package com.timonmdy.xami.api.dto.users.notifications;

import com.timonmdy.xami.domain.models.users.notifications.NotificationSeverity;
import com.timonmdy.xami.domain.models.users.notifications.NotificationType;
import com.timonmdy.xami.domain.models.users.notifications.UserNotification;
import lombok.Getter;

@Getter
public class UserNotificationDto {

    private final Long id;
    private final NotificationType type;
    private final NotificationSeverity severity;
    private final String icon;
    private final String title;
    private final String description;
    private final boolean seen;
    private final String targetUrl;
    private final String contentId;

    public UserNotificationDto(UserNotification notification) {
        this.id = notification.getId();
        this.type = notification.getType();
        this.severity = notification.getSeverity();
        this.icon = notification.getIcon();
        this.title = notification.getTitle();
        this.description = notification.getDescription();
        this.seen = notification.isSeen();

        if (notification.getClickAction() != null) {
            this.targetUrl = notification.getClickAction().getTargetUrl();
            this.contentId = notification.getClickAction().getContentId();
        } else {
            this.targetUrl = null;
            this.contentId = null;
        }
    }
}
