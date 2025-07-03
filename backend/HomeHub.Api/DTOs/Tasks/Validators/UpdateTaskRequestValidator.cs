using FluentValidation;

namespace HomeHub.Api.DTOs.Tasks.Validators;

public class UpdateTaskRequestValidator : AbstractValidator<UpdateTaskRequest>
{
    public UpdateTaskRequestValidator()
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
            .GreaterThanOrEqualTo(DateOnly.FromDateTime(DateTime.UtcNow))
            .WithMessage("Due date must be today or in the future.");
    }
}