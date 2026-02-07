package com.expensecalc.dto;

import com.expensecalc.entity.Category;
import java.math.BigDecimal;

public record CategoryBreakdown(
    Category category,
    BigDecimal total,
    double percentage
) {}
