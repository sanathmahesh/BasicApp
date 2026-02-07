package com.expensecalc.controller;

import com.expensecalc.dto.DashboardSummary;
import com.expensecalc.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardSummary> getDashboard(
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) Integer year) {
        LocalDate now = LocalDate.now();
        int currentMonth = month != null ? month : now.getMonthValue();
        int currentYear = year != null ? year : now.getYear();
        return ResponseEntity.ok(dashboardService.getDashboardSummary(currentMonth, currentYear));
    }
}
