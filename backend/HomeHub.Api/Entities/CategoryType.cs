using System.ComponentModel;

namespace HomeHub.Api.Entities;

public enum CategoryType
{
    [Description("Финанси")]
    Finance = 1,

    [Description("Наличности")]
    Inventory = 2,

    [Description("Сметки")]
    Bill = 3
}