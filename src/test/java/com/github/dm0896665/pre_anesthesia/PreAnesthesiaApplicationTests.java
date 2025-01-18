package com.github.dm0896665.pre_anesthesia;

import com.github.dm0896665.pre_anesthesia.model.Result;
import com.github.dm0896665.pre_anesthesia.service.IResultService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
class PreAnesthesiaApplicationTests {

	@Autowired
	private IResultService service;

	@Test
	void testConnection() {
		List<Result> entities = service.getResults();
		assertThat(entities).isNotNull();
	}

}
