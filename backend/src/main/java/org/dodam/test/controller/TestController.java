package org.dodam.test.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.dodam.test.entity.Test;
import org.dodam.test.model.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Tag(name = "예제 API", description = "Swagger 테스트용 API")
@RestController
@RequestMapping("api/v1/test")
public class TestController {

    @Autowired
    private TestService testService;

    @PostMapping
    public Test createTest(@RequestBody Test test){
        return testService.saveTest(test);
    }

    @GetMapping("/{id}")
    public Test getTest(@PathVariable Long id){
        return testService.getTestById(id);
    }
}
