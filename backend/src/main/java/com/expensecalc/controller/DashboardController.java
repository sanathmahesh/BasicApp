package com.expensecalc.controller;

import com.expensecalc.dto.DashboardSummary;
import com.expensecalc.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardSummary> getDashboard(
            @RequestParam int month, @RequestParam int year) {
        return ResponseEntity.ok(dashboardService.getDashboardSummary(month, year));
    }
}
