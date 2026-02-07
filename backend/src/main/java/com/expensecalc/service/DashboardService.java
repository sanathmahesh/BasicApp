package com.expensecalc.service;

import com.expensecalc.dto.*;
import com.expensecalc.entity.Category;
import com.expensecalc.entity.Expense;
import com.expensecalc.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Month;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ExpenseRepository expenseRepository;
    private final BudgetLimitService budgetLimitService;

    public DashboardSummary getDashboardSummary(int month, int year) {
        BigDecimal totalMonth = expenseRepository.sumByMonthAndYear(month, year);
        BigDecimal totalYear = expenseRepository.sumByYear(year);
        long countMonth = expenseRepository.countByMonthAndYear(month, year);

        List<CategoryBreakdown> categoryBreakdown = buildCategoryBreakdown(month, year, totalMonth);
        List<MonthlyExpenseSummary> monthlyTrend = buildMonthlyTrend(year);
        List<ExpenseResponse> recentExpenses = expenseRepository.findTop5ByOrderByDateDescCreatedAtDesc()
            .stream().map(this::toExpenseResponse).toList();
        List<BudgetLimitResponse> budgetStatus = budgetLimitService.getBudgetLimitsForMonth(month, year);

        return new DashboardSummary(
            totalMonth, totalYear, countMonth,
            categoryBreakdown, monthlyTrend, recentExpenses, budgetStatus
        );
    }

    private List<CategoryBreakdown> buildCategoryBreakdown(int month, int year, BigDecimal totalMonth) {
        List<Object[]> results = expenseRepository.sumByMonthGroupedByCategory(month, year);
        return results.stream().map(row -> {
            Category category = (Category) row[0];
            BigDecimal total = (BigDecimal) row[1];
            double percentage = totalMonth.compareTo(BigDecimal.ZERO) > 0
                ? total.divide(totalMonth, 4, RoundingMode.HALF_UP).doubleValue() * 100
                : 0;
            return new CategoryBreakdown(category, total, percentage);
        }).toList();
    }

    private List<MonthlyExpenseSummary> buildMonthlyTrend(int year) {
        List<Object[]> results = expenseRepository.monthlyTotalsForYear(year);
        return results.stream().map(row -> {
            int m = ((Number) row[0]).intValue();
            BigDecimal total = (BigDecimal) row[1];
            String monthName = Month.of(m).getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            return new MonthlyExpenseSummary(m, monthName, total);
        }).toList();
    }

    private ExpenseResponse toExpenseResponse(Expense expense) {
        return new ExpenseResponse(
            expense.getId(), expense.getTitle(), expense.getDescription(),
            expense.getAmount(), expense.getCategory(), expense.getDate(),
            expense.getCreatedAt(), expense.getUpdatedAt()
        );
    }
}
