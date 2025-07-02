using System.ComponentModel;

namespace HomeHub.Api.Entities;

public enum FinanceType
{
    [Description("Income")]
    Income = 1,

    [Description("Expense")]
    Expense = 2
}