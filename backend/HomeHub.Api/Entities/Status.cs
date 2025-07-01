using System.ComponentModel;

namespace HomeHub.Api.Entities;

public enum Status
{
    [Description("In Progress")]
    Active = 1,

    [Description("In Progress")]
    Completed = 2,
}