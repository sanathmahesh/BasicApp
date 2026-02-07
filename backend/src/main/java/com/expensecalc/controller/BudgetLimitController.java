package com.expensecalc.controller;

import com.expensecalc.dto.BudgetLimitRequest;
import com.expensecalc.dto.BudgetLimitResponse;
import com.expensecalc.service.BudgetLimitService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
public class BudgetLimitController {

    private final BudgetLimitService budgetLimitService;

    @GetMapping
    public ResponseEntity<List<BudgetLimitResponse>> getBudgets(
            @RequestParam int month, @RequestParam int year) {
        return ResponseEntity.ok(budgetLimitService.getBudgetLimitsForMonth(month, year));
    }

    @PostMapping
    public ResponseEntity<BudgetLimitResponse> setBudget(@Valid @RequestBody BudgetLimitRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(budgetLimitService.setBudgetLimit(request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBudget(@PathVariable Long id) {
        budgetLimitService.deleteBudgetLimit(id);
        return ResponseEntity.noContent().build();
    }
}
