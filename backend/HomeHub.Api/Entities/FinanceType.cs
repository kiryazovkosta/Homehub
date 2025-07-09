using System.ComponentModel;

namespace HomeHub.Api.Entities;

public enum FinanceType
{
    [Description("Приход")]
    Income = 1,

    [Description("Разход")]
    Expense = 2
}