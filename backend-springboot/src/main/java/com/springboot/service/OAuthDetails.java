package com.springboot.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;


@Service
public class OAuthDetails {

    public String getEmail() {
        OAuth2User oauthUser = (OAuth2User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (oauthUser != null) {
            return oauthUser.getAttribute("email");
        }
        return null;
    }

}
