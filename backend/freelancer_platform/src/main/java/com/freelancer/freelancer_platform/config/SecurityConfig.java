package com.freelancer.freelancer_platform.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .authorizeHttpRequests(auth -> auth

                // PUBLIC
                .requestMatchers(
                    "/users",
                    "/auth/login"
                ).permitAll()

                // CLIENT ONLY
                .requestMatchers(
                    HttpMethod.POST,
                    "/projects"
                ).hasRole("CLIENT")

                // FREELANCER ONLY
                .requestMatchers(
                    HttpMethod.POST,
                    "/applications"
                ).hasRole("FREELANCER")

                // CLIENT ONLY - ACCEPT
                .requestMatchers(
                    HttpMethod.PUT,
                    "/applications/*/accept"
                ).hasRole("CLIENT")

                // CLIENT ONLY - REJECT
                .requestMatchers(
                    HttpMethod.PUT,
                    "/applications/*/reject"
                ).hasRole("CLIENT")

                // AUTHENTICATED USERS
                .requestMatchers(
                    "/profiles/**",
                    "/projects/**",
                    "/applications/**",
                    "/tasks/**",
                    "/workspaces/**",
                    "/notifications/**"
                ).authenticated()

                .anyRequest().authenticated()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}