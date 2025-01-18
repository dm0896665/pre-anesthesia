package com.github.dm0896665.pre_anesthesia.service;

import com.github.dm0896665.pre_anesthesia.model.Result;
import org.springframework.stereotype.Service;

import java.util.List;

public interface IResultService {
    List<Result> getResults();

    Integer addResult(Result result);

    Result getResult(Integer resultID);
}
