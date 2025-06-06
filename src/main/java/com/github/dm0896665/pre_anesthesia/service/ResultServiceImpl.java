package com.github.dm0896665.pre_anesthesia.service;

import com.github.dm0896665.pre_anesthesia.dao.ResultRepository;
import com.github.dm0896665.pre_anesthesia.model.Result;

import java.util.List;
import java.util.Optional;

//@Service
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
}
