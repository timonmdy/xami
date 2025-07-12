package com.timonmdy.xami.domain.models.users.notifications;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class NotificationClickAction {
    private String targetUrl; // full URL to redirect to
    private String contentId; // ID of the content to be opened, link to real contentIds once implemented
}
