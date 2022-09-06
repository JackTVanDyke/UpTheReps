package com.vandyke.FitnessJournal.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtAuthOncePerRequest jwtAuthOncePerRequest;
    private final JwtUnauthorizedResponse jwtUnauthorizedResponse;

    @Autowired
    public SecurityConfig(UserDetailsServiceImpl userDetailsService, JwtAuthOncePerRequest jwtAuthOncePerRequest, JwtUnauthorizedResponse jwtUnauthorizedResponse) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthOncePerRequest = jwtAuthOncePerRequest;
        this.jwtUnauthorizedResponse = jwtUnauthorizedResponse;
    }

    @Autowired
    public void configureAuth(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf().disable()
                .exceptionHandling()
                .and()
                .authorizeRequests().antMatchers("/api/users/auth/**").permitAll() // allows authorization
                .antMatchers(HttpMethod.POST, "/api/users/register").permitAll() // allows registration
                .antMatchers(HttpMethod.GET, "/api/users/confirmed/**").permitAll() // allows verification
                .anyRequest().authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        httpSecurity.addFilterBefore(jwtAuthOncePerRequest, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
