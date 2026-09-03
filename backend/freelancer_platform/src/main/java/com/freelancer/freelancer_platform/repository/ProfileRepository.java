package com.freelancer.freelancer_platform.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freelancer.freelancer_platform.entity.Profile;
import com.freelancer.freelancer_platform.entity.UserRole;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Optional<Profile> findByUserId(Long userId);

    List<Profile> findByUserRoleAndSkillsContainingIgnoreCase(
            UserRole role,
            String skill
    );

    List<Profile> findByUserRoleAndLocationContainingIgnoreCase(
            UserRole role,
            String location
    );
}
