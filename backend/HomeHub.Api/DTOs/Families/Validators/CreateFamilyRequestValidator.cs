using FluentValidation;

namespace HomeHub.Api.DTOs.Families.Validators;

public class CreateFamilyRequestValidator : AbstractValidator<CreateFamilyRequest>
{
    public CreateFamilyRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(64)
            .WithMessage("Name must not exceed 64 characters.");

        RuleFor(x => x.Description)
            .NotEmpty()
            .WithMessage("Description is required.")
            .MaximumLength(128)
            .WithMessage("Description must not exceed 128 characters.");
    }
}