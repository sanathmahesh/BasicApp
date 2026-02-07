package com.expensecalc.dto;

import com.expensecalc.entity.Category;
import java.math.BigDecimal;

public record BudgetLimitResponse(
    Long id,
    Category category,
    BigDecimal limitAmount,
    BigDecimal spent,
    BigDecimal remaining,
    double percentageUsed,
    Integer month,
    Integer year
) {}
