package com.expensecalc.service;

import com.expensecalc.dto.BudgetLimitRequest;
import com.expensecalc.dto.BudgetLimitResponse;
import com.expensecalc.entity.BudgetLimit;
import com.expensecalc.exception.ResourceNotFoundException;
import com.expensecalc.repository.BudgetLimitRepository;
import com.expensecalc.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BudgetLimitService {

    private final BudgetLimitRepository budgetLimitRepository;
    private final ExpenseRepository expenseRepository;

    public List<BudgetLimitResponse> getBudgetLimitsForMonth(int month, int year) {
        return budgetLimitRepository.findByMonthAndYear(month, year)
            .stream().map(bl -> toResponse(bl, month, year)).toList();
    }

    public BudgetLimitResponse setBudgetLimit(BudgetLimitRequest request) {
        BudgetLimit budgetLimit = budgetLimitRepository
            .findByCategoryAndMonthAndYear(request.category(), request.month(), request.year())
            .map(existing -> {
                existing.setLimitAmount(request.limitAmount());
                return existing;
            })
            .orElse(BudgetLimit.builder()
                .category(request.category())
                .limitAmount(request.limitAmount())
                .month(request.month())
                .year(request.year())
                .build());

        BudgetLimit saved = budgetLimitRepository.save(budgetLimit);
        return toResponse(saved, request.month(), request.year());
    }

    public void deleteBudgetLimit(Long id) {
        if (!budgetLimitRepository.existsById(id)) {
            throw new ResourceNotFoundException("Budget limit not found with id: " + id);
        }
        budgetLimitRepository.deleteById(id);
    }

    private BudgetLimitResponse toResponse(BudgetLimit bl, int month, int year) {
        BigDecimal spent = expenseRepository.sumByCategoryAndMonth(bl.getCategory(), month, year);
        BigDecimal remaining = bl.getLimitAmount().subtract(spent);
        double percentageUsed = bl.getLimitAmount().compareTo(BigDecimal.ZERO) > 0
            ? spent.divide(bl.getLimitAmount(), 4, RoundingMode.HALF_UP).doubleValue() * 100
            : 0;

        return new BudgetLimitResponse(
            bl.getId(),
            bl.getCategory(),
            bl.getLimitAmount(),
            spent,
            remaining,
            percentageUsed,
            bl.getMonth(),
            bl.getYear()
        );
    }
}
