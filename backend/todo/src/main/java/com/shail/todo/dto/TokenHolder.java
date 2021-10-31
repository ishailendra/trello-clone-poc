package com.shail.todo.dto;

public class TokenHolder {
    private String accessToken;
    private String refreshToken;
    private int accessKid;
    private int refreshKid;

    public int getAccessKid() {
        return accessKid;
    }

    public void setAccessKid(int accessKid) {
        this.accessKid = accessKid;
    }

    public int getRefreshKid() {
        return refreshKid;
    }

    public void setRefreshKid(int refreshKid) {
        this.refreshKid = refreshKid;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public TokenHolder(String accessToken, int accessKid, String refreshToken,  int refreshKid) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.accessKid = accessKid;
        this.refreshKid = refreshKid;
    }

    public TokenHolder() {
    }
}
