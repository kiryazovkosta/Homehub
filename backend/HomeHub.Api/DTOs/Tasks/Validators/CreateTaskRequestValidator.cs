using FluentValidation;

namespace HomeHub.Api.DTOs.Tasks.Validators;

public class CreateTaskRequestValidator : AbstractValidator<CreateTaskRequest>
{
    public CreateTaskRequestValidator()
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

        RuleFor(x => x.Priority)
            .IsInEnum()
            .WithMessage("Priority must be a valid enum value.");

        RuleFor(x => x.DueDate)
            .GreaterThan(DateOnly.FromDateTime(DateTime.UtcNow))
            .WithMessage("Due date must be in the future.");
    }
}