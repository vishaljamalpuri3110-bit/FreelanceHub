package com.freelancer.freelancer_platform.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.freelancer.freelancer_platform.dto.NotificationRequest;
import com.freelancer.freelancer_platform.dto.NotificationResponse;
import com.freelancer.freelancer_platform.service.NotificationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {

        this.notificationService = notificationService;
    }

    @PostMapping
    public NotificationResponse createNotification(
            @Valid @RequestBody NotificationRequest request) {

        return notificationService.createNotification(request);
    }

    @GetMapping("/user/{userId}")
    public List<NotificationResponse> getUserNotifications(
            @PathVariable Long userId) {

        return notificationService
                .getUserNotifications(userId);
    }

    @PutMapping("/{id}/read")
    public NotificationResponse markAsRead(
            @PathVariable Long id) {

        return notificationService.markAsRead(id);
    }
}