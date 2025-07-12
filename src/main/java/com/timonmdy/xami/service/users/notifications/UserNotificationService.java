package com.timonmdy.xami.service.users.notifications;

import com.timonmdy.xami.domain.models.users.User;
import com.timonmdy.xami.domain.models.users.notifications.NotificationSeverity;
import com.timonmdy.xami.domain.models.users.notifications.NotificationType;
import com.timonmdy.xami.domain.models.users.notifications.UserNotification;

import java.util.List;

public interface UserNotificationService {
    UserNotification createNotification(
            User user,
            NotificationType type,
            NotificationSeverity severity,
            String icon,
            String title,
            String description,
            String targetUrl,
            String contentId // nullable
    );

    List<UserNotification> getAllNotifications(User user);

    List<UserNotification> getUnreadNotifications(User user);

    void markAsSeen(Long notificationId, User user);

    void deleteNotification(Long notificationId, User user);

    void markAllAsSeen(User user);

    void deleteAllNotifications(User user);
}
