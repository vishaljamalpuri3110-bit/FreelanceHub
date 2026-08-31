package com.freelancer.freelancer_platform.config;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.freelancer.freelancer_platform.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expiration;

    

    public String generateToken(User user){
        
        Date now=new Date();

        String token=Jwts.builder()
            .subject(user.getEmail())
            .claim("role",user.getRole().name())
            .issuedAt(now)
            .expiration(new Date(now.getTime()+expiration))
            .signWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
            .compact();   
        return token;

        
    }

    public String extractEmail(String token){
        return Jwts.parser()
              .verifyWith(Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8)))
              .build()
              .parseSignedClaims(token)
              .getPayload()
              .getSubject();

    }
}
