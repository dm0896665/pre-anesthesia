package com.github.dm0896665.pre_anesthesia.model;


import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.List;

//@Entity
//@Table(name="results")
public class Result {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int uid;

//    @Enumerated(EnumType.STRING)
//    @Column(name="resourceType")
    private Education education;

//    @ElementCollection
//    @Enumerated(EnumType.STRING)
    private List<State> states;

    private boolean isMostKnowledgeable;
    private boolean isLikeSupervising;
    private boolean isLiveInCity;

    public Result() {
    }

    public Result(Education education, List<State> states, boolean isMostKnowledgeable, boolean isLikeSupervising, boolean isLiveInCity) {
        this.education = education;
        this.states = states;
        this.isMostKnowledgeable = isMostKnowledgeable;
        this.isLikeSupervising = isLikeSupervising;
        this.isLiveInCity = isLiveInCity;
    }

    public int getUid() {
        return uid;
    }

    public void setUid(int uid) {
        this.uid = uid;
    }

    public Education getEducation() {
        return education;
    }

    public void setEducation(Education education) {
        this.education = education;
    }

    public List<State> getStates() {
        return states;
    }

    public void setStates(List<State> states) {
        this.states = states;
    }

    public boolean isMostKnowledgeable() {
        return isMostKnowledgeable;
    }

    public void setMostKnowledgeable(boolean mostKnowledgeable) {
        isMostKnowledgeable = mostKnowledgeable;
    }

    public boolean isLikeSupervising() {
        return isLikeSupervising;
    }

    public void setLikeSupervising(boolean likeSupervising) {
        isLikeSupervising = likeSupervising;
    }

    public boolean isLiveInCity() {
        return isLiveInCity;
    }

    public void setLiveInCity(boolean liveInCity) {
        isLiveInCity = liveInCity;
    }
}
