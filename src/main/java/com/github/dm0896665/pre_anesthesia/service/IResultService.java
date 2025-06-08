package com.github.dm0896665.pre_anesthesia.service;

import com.github.dm0896665.pre_anesthesia.model.quiz.QuizResult;
import com.github.dm0896665.pre_anesthesia.model.Result;

import java.util.List;

public interface IResultService {
    List<Result> getResults();

    Integer addResult(Result result);

    Result getResult(Integer resultID);

    QuizResult getQuizResultFromJson(String results);
}
