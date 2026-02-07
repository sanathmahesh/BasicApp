package com.expensecalc.dto;

import java.math.BigDecimal;
import java.util.List;

public record DashboardSummary(
    BigDecimal totalExpensesThisMonth,
    BigDecimal totalExpensesThisYear,
    long expenseCountThisMonth,
    List<CategoryBreakdown> categoryBreakdown,
    List<MonthlyExpenseSummary> monthlyTrend,
    List<ExpenseResponse> recentExpenses,
    List<BudgetLimitResponse> budgetStatus
) {}
