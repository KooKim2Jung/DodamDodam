package org.dodam.test.model;

import org.dodam.test.entity.Test;
import org.dodam.test.repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestService {

    @Autowired
    private TestRepository testRepository;

    public Test saveTest(Test test){ return testRepository.save(test); }

    public Test getTestById(Long id){ return testRepository.findById(id).orElse(null);}
}
