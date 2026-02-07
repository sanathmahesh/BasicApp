package com.expensecalc.dto;

import com.expensecalc.entity.Category;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseRequest(
    @NotBlank(message = "Title is required") String title,
    String description,
    @NotNull(message = "Amount is required") @DecimalMin(value = "0.01", message = "Amount must be greater than zero") BigDecimal amount,
    @NotNull(message = "Category is required") Category category,
    @NotNull(message = "Date is required") LocalDate date
) {}
