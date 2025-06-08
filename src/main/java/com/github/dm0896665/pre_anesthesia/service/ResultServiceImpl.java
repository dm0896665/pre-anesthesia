package com.github.dm0896665.pre_anesthesia.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.dm0896665.pre_anesthesia.dao.ResultRepository;
import com.github.dm0896665.pre_anesthesia.model.Result;
import com.github.dm0896665.pre_anesthesia.model.quiz.Question;
import com.github.dm0896665.pre_anesthesia.model.quiz.QuizResult;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ResultServiceImpl implements IResultService {
    //@Autowired
    private ResultRepository resultRepo;

    public List<Result> getResults() {
        return null;//return resultRepo.findAll();
    }

    @Override
    public Integer addResult(Result result) {
        Result saved = null;//resultRepo.save(result);
        return saved.getUid();
    }

    @Override
    public Result getResult(Integer resultID) {
        Optional<Result> result = null;//resultRepo.findById(resultID);
        if (result.isPresent() && !result.isEmpty()) {
            return result.get();
        } else {
            return null;
        }
    }

    public QuizResult getQuizResultFromJson(String json) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT);
        try {
            Map<String, Question> map = mapper.readValue(json, HashMap.class);
            return new QuizResult(map);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }
}
