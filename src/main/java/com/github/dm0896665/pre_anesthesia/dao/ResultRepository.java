package com.github.dm0896665.pre_anesthesia.dao;

import com.github.dm0896665.pre_anesthesia.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResultRepository extends JpaRepository<Result, Integer> {

}
