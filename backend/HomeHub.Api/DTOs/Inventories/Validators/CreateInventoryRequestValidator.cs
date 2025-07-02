using FluentValidation;
using HomeHub.Api.DTOs.Inventories;

public class CreateInventoryRequestValidator : AbstractValidator<CreateInventoryRequest>
{
    public CreateInventoryRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
                .MaximumLength(256)
                .WithMessage("Name must not exceed 256 characters.");

        RuleFor(x => x.Quantity)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Quantity must be zero or greater.");

        RuleFor(x => x.CategoryId)
            .NotEmpty()
            .WithMessage("CategoryId is required.")
            .MaximumLength(128)
            .WithMessage("CategoryId must not exceed 128 characters.");

        RuleFor(x => x.LocationId)
            .NotEmpty()
            .WithMessage("LocationId is required.")
            .MaximumLength(128)
            .WithMessage("LocationId must not exceed 128 characters.");

        RuleFor(x => x.Threshold)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Threshold must be zero or greater.");
    }
}