package com.expensecalc.dto;

import java.math.BigDecimal;

public record MonthlyExpenseSummary(
    int month,
    String monthName,
    BigDecimal total
) {}
