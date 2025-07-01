using System.ComponentModel;

namespace HomeHub.Api.Entities;

public enum FinanceType
{
    [Description("In Progress")]
    Income = 1,

    [Description("In Progress")]
    Expense = 2
}