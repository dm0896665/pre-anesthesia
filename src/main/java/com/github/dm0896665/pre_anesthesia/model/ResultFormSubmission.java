package com.github.dm0896665.pre_anesthesia.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

//@Data
//@AllArgsConstructor
//@NoArgsConstructor
//@Builder
public class ResultFormSubmission {
    private String education;
    private List<String> states;
    private String isMostKnowledgeable;
    private String isLikeSupervising;
    private String isLiveInCity;

    public Result toResult() {
        Education education = Education.values()[Integer.parseInt(this.education) - 1];
        List<State> stateList = states.stream().map(State::fromAbbreviation).collect(Collectors.toList());
        boolean isMostKnowledgeable = Boolean.parseBoolean(this.isMostKnowledgeable);
        boolean isLikeSupervising = Boolean.parseBoolean(this.isLikeSupervising);
        boolean isLiveInCity = Boolean.parseBoolean(this.isLiveInCity);
        return new Result(education, stateList, isMostKnowledgeable, isLikeSupervising, isLiveInCity);
    }
}
