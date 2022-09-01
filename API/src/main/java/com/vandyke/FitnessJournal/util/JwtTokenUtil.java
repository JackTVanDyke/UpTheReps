package com.vandyke.FitnessJournal.util;

import com.vandyke.FitnessJournal.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtTokenUtil {

    @Value("${jwt.key}")
    private String secret;

    public String getEmailFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    public Date getIssuedAtDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getIssuedAt);
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    private boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    private boolean ignoreTokenExpiration(String token) {
        // here you specify tokens, for that the expiration is ignored
        return false;
    }

    public String generateJwtToken(User user) {
        LocalDateTime issued = LocalDateTime.now();
        LocalDateTime expires = issued.plusHours(8);
        byte[] keyBytes = DatatypeConverter.parseBase64Binary(secret);
        Key signatureKey = new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(Date.from(issued.atZone(ZoneId.systemDefault()).toInstant()))
                .setExpiration(Date.from(expires.atZone(ZoneId.systemDefault()).toInstant()))
                .signWith(signatureKey)
                .compact();
    }

    public boolean canTokenBeRefreshed(String token) {
        return (!isTokenExpired(token) || ignoreTokenExpiration(token));
    }

    public String refreshToken(String token) {
        final LocalDateTime issued = LocalDateTime.now();
        final LocalDateTime expires = issued.plusHours(1);
        byte[] keyBytes = DatatypeConverter.parseBase64Binary(secret);
        Key signatureKey = new SecretKeySpec(keyBytes, SignatureAlgorithm.HS256.getJcaName());
        final Claims claims = getAllClaimsFromToken(token);
        claims.setIssuedAt(Date.from(issued.atZone(ZoneId.systemDefault()).toInstant()));
        claims.setExpiration(Date.from(expires.atZone(ZoneId.systemDefault()).toInstant()));
        return Jwts.builder().setClaims(claims).signWith(signatureKey).compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String email = getEmailFromToken(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}

