package com.freelancer.freelancer_platform.config;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.freelancer.freelancer_platform.entity.User;
import com.freelancer.freelancer_platform.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserRepository userRepository) {

        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        String email = jwtService.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElse(null);

        if (user != null &&
                jwtService.isTokenValid(token)) {

                    System.out.println("EMAIL = " + user.getEmail());
System.out.println("ROLE = " + user.getRole());
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(user.getEmail(),null,
                                        java.util.List.of(
                                            new SimpleGrantedAuthority(
                                                "ROLE_" + user.getRole().name())));

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);
            System.out.println("EMAIL = " + email);
    System.out.println("ROLE = " + user.getRole());
    System.out.println("AUTHORITIES = " + authentication.getAuthorities());
    System.out.println("AUTHENTICATED = " + authentication.isAuthenticated());
        }

        filterChain.doFilter(request, response);
    }
}