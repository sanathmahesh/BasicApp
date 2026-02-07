package com.expensecalc.dto;

import com.expensecalc.entity.Category;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record BudgetLimitRequest(
    @NotNull Category category,
    @NotNull @DecimalMin("0.01") BigDecimal limitAmount,
    @NotNull @Min(1) @Max(12) Integer month,
    @NotNull @Min(2000) Integer year
) {}
