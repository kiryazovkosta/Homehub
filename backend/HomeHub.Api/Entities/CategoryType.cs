using System.ComponentModel;

namespace HomeHub.Api.Entities;

public enum CategoryType
{
    [Description("Finance")]
    Finance = 1,

    [Description("Inventory")]
    Inventory = 2,

    [Description("Bill")]
    Bill = 3
}