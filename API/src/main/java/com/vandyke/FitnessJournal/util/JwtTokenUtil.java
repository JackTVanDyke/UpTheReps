package com.vandyke.FitnessJournal.util;

import com.vandyke.FitnessJournal.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
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
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public Date getIssuedAtDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getIssuedAt);
    }

    public Date getExpirationDateFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        return claims.getExpiration();
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
        Key signatureKey = new SecretKeySpec(DatatypeConverter.parseBase64Binary(secret), SignatureAlgorithm.HS256.getJcaName());
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .setExpiration(Date.from(LocalDateTime.now().plusMinutes(480).atZone(ZoneId.systemDefault()).toInstant()))
                .signWith(signatureKey)
                .compact();
    }

    public boolean canTokenBeRefreshed(String token) {
        return (!isTokenExpired(token) || ignoreTokenExpiration(token));
    }

    public ResponseCookie generateRefreshToken(User user) {
        Key signatureKey = new SecretKeySpec(DatatypeConverter.parseBase64Binary(secret), SignatureAlgorithm.HS256.getJcaName());
        String refreshJwt = Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()))
                .setExpiration(Date.from(LocalDateTime.now().plusDays(7).atZone(ZoneId.systemDefault()).toInstant()))
                .signWith(signatureKey)
                .compact();
        return ResponseCookie.from("refreshToken", refreshJwt)
                .httpOnly(true).secure(true).path("/api/users/auth/refresh").maxAge(LocalDateTime.now().plusDays(7).atZone(ZoneId.systemDefault()).getSecond()).sameSite("lax").build();
    }

    public ResponseCookie getCleanJwtCookie() {
        return ResponseCookie.from("refreshToken", null).path("/api/users/auth/refresh").build();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String email = getEmailFromToken(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

}

