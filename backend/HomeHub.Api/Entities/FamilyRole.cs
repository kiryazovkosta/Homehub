namespace HomeHub.Api.Entities;

using System.ComponentModel;

public enum FamilyRole
{
    [Description("Баща")]
    Father = 1,

    [Description("Майка")]
    Mother = 2,

    [Description("Брат на бащата")]
    PaternalUncle = 3,

    [Description("Брат на майката")]
    MaternalUncle = 4,

    [Description("Сестра на бащата")]
    PaternalAunt = 5,

    [Description("Сестра на майката")]
    MaternalAunt = 6,

    [Description("Братовчед по бащина линия")]
    PaternalCousin = 7,

    [Description("Братовчед по майчина линия")]
    MaternalCousin = 8,

    [Description("Син")]
    Son = 9,

    [Description("Дъщеря")]
    Daughter = 10,

    [Description("Друг")]
    Other = 99
}