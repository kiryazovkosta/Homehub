using FluentValidation;
using HomeHub.Api.DTOs.Finances;

public class UpdateFinanceRequestValidator : AbstractValidator<UpdateFinanceRequest>
{
    public UpdateFinanceRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .WithMessage("Title is required.")
            .MaximumLength(256)
            .WithMessage("Title must not exceed 256 characters.");

        RuleFor(x => x.Description)
            .NotEmpty()
            .WithMessage("Description is required.")
            .MaximumLength(512)
            .WithMessage("Description must not exceed 512 characters.");
        
        RuleFor(x => x.Type)
            .IsInEnum()
            .WithMessage("Type must be a valid FinanceType enum value.");

        RuleFor(x => x.Amount)
            .GreaterThan(0)
            .WithMessage("Amount must be greater than zero.");

        RuleFor(x => x.Date)
            .GreaterThanOrEqualTo(DateOnly.FromDateTime(DateTime.Now))
            .WithMessage("Date must not be in the past.");

        RuleFor(x => x.CategoryId)
            .NotEmpty()
            .WithMessage("CategoryId is required.")
            .MaximumLength(128)
            .WithMessage("CategoryId must not exceed 128 characters.");
    }
}