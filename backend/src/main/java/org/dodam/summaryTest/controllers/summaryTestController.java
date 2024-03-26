package org.dodam.summaryTest.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/summaryTest")
public class summaryTestController {
    private final SummaryTestService summaryTestService;

}
