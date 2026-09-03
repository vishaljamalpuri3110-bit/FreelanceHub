package com.freelancer.freelancer_platform.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.freelancer.freelancer_platform.dto.NotificationRequest;
import com.freelancer.freelancer_platform.dto.NotificationResponse;
import com.freelancer.freelancer_platform.entity.Notification;
import com.freelancer.freelancer_platform.entity.User;
import com.freelancer.freelancer_platform.repository.NotificationRepository;
import com.freelancer.freelancer_platform.repository.UserRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(
            NotificationRepository notificationRepository,
            UserRepository userRepository) {

        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    public NotificationResponse createNotification(
            NotificationRequest request) {

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Notification notification = new Notification();

        notification.setUser(user);
        notification.setMessage(request.getMessage());
        notification.setType(request.getType());

        Notification saved =
                notificationRepository.save(notification);

        return convertToResponse(saved);
    }

    public List<NotificationResponse> getUserNotifications(
            Long userId) {

        return notificationRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    public NotificationResponse markAsRead(Long id) {

        Notification notification =
                notificationRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Notification not found"));

        notification.setRead(true);

        Notification updated =
                notificationRepository.save(notification);

        return convertToResponse(updated);
    }

    private NotificationResponse convertToResponse(
            Notification notification) {

        NotificationResponse response =
                new NotificationResponse();

        response.setId(notification.getId());
        response.setUserId(notification.getUser().getId());
        response.setMessage(notification.getMessage());
        response.setType(notification.getType());
        response.setRead(notification.isRead());
        response.setCreatedAt(notification.getCreatedAt());

        return response;
    }
}