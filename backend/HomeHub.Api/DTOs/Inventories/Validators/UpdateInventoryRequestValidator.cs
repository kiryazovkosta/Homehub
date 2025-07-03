using FluentValidation;

namespace HomeHub.Api.DTOs.Inventories.Validators;

public class UpdateInventoryRequestValidator : AbstractValidator<UpdateInventoryRequest>
{
    public UpdateInventoryRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Name is required.")   
            .MaximumLength(256)
            .WithMessage("Name must not exceed 256 characters.");

        RuleFor(x => x.Quantity)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Quantity must be a non-negative integer.");

        RuleFor(x => x.CategoryId)
            .NotEmpty()
            .WithMessage("CategoryId is required.");

        RuleFor(x => x.LocationId)
            .NotEmpty()
            .WithMessage("LocationId is required.");

        RuleFor(x => x.Threshold)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Threshold must be a non-negative integer.");
    }
}