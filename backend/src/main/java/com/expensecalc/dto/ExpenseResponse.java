package com.expensecalc.dto;

import com.expensecalc.entity.Category;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record ExpenseResponse(
    Long id,
    String title,
    String description,
    BigDecimal amount,
    Category category,
    LocalDate date,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}
